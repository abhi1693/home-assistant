const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const {chromium}=require('playwright');
const {fixture}=require('./finance_dashboard_components');
const OUTPUT=process.env.HA_FINANCE_TEST_OUTPUT||'/tmp/ha-finance-periods';

async function periodFixture(page) {
  await page.clock.setFixedTime(new Date('2026-09-06T12:00:00+05:30'));
  await fixture(page,true);
  await page.evaluate(()=>{
    const original=window.hass.connection.sendMessagePromise;
    const accounts=window.financeFixture.accounts;
    accounts.push({...accounts[0],id:12,name:'Sample investment',kind:'investment',balance:'50000'});
    const endMonth=month=>new Date(Date.UTC(Number(month.slice(0,4)),Number(month.slice(5,7)),0)).toISOString().slice(0,10);
    const nextMonth=month=>new Date(Date.UTC(Number(month.slice(0,4)),Number(month.slice(5,7)),1)).toISOString().slice(0,7);
    window.hass.connection.sendMessagePromise=async msg=>{
      if(!msg.start)return original(msg);
      window.messages.push(msg);
      if(window.holdRequest?.(msg))await new Promise((resolve,reject)=>window.pendingRequests.push({msg,resolve,reject}));
      const kind=msg.type.split('/')[1],start=msg.start,end=msg.end,asOf=end<'2026-09-06'?end:'2026-09-06';
      const months=[];for(let m=start.slice(0,7);`${m}-01`<=end;m=nextMonth(m))months.push(m);
      const values=(m)=>({spend:1000*(Number(m.slice(0,4))-2020)+100*Number(m.slice(5)),income:20000*(Number(m.slice(0,4))-2020)});
      const observed=months.filter(m=>`${m}-01`<=asOf);
      const monthly=months.map(m=>({month:m,total:`${m}-01`<=asOf?String(values(m).spend):null}));
      const income=months.map(m=>({month:m,total:`${m}-01`<=asOf?String(values(m).income):null}));
      const daily=accounts.map(a=>({...a,balance:a.id===1?String(100000+(Number(asOf.slice(0,4))-2020)*10000+Number(asOf.slice(5,7))*100):a.balance}));
      const overview={entry_id:'firefly',currency:'INR',accounts:daily,me:{censored:false,revealed:true,code_required:false,can_reveal:false},default_reveal_ttl_minutes:0};
      if(kind==='overview')return overview;
      if(kind==='series')return {censored:false,series:daily.map(a=>({account_id:a.id,points:[
        {ts:new Date(Date.parse(`${start}T00:00:00Z`)-1000).toISOString(),balance:String(Number(a.balance)-1000)},
        ...observed.map((m,i)=>({ts:`${endMonth(m)<asOf?endMonth(m):asOf}T12:00:00+05:30`,balance:String(Number(a.balance)-(observed.length-i-1)*100)})),
      ]}))};
      const total=rows=>String(rows.reduce((sum,r)=>sum+Number(r.total??0),0));
      if(kind==='spending_summary')return {month:start.slice(0,7),censored:false,total_spend:total(monthly),total_income:total(income),monthly,income_monthly:income,
        themes:[{theme:'Housing',total:String(Number(total(monthly))*(start.startsWith('2024')?.7:.8)),count:observed.length},{theme:'Groceries',total:String(Number(total(monthly))*.2),count:observed.length},...(start.startsWith('2024')?[{theme:'Travel',total:String(Number(total(monthly))*.09),count:3},{theme:'Uncategorised',total:String(Number(total(monthly))*.01),count:1}]:[])]};
      if(kind==='spending_recurring') {
        const payments=observed.map(m=>({merchant_key:'bill',date:`${m}-01`,amount:'200',is_income:false}));
        return {month:start.slice(0,7),censored:false,today:start<='2026-09-06'&&end>='2026-09-06'?'2026-09-06':'',
          streams:[{merchant_key:'bill',merchant:'Sample bill',frequency:'monthly',active:true,is_income:false,theme:'housing'}],
          actuals:payments,expected:[],total_due:String(payments.length*200),total_remaining:'0',bill_count:1,
          monthly:months.map(m=>({month:m,total:`${m}-01`<=asOf?'200':null}))};
      }
      if(kind==='spending_investments')return {month:start.slice(0,7),censored:false,
        total_recorded:String(observed.length*500),total_pending:'0',total_committed:String(observed.length*500),
        recorded:observed.map((m,i)=>({id:String(i),date:`${m}-01`,name:'Sample fund',amount:'500',status:'recorded',source_account_id:1,destination_account_id:12})),expected:[],
        monthly:months.map(m=>({month:m,total:`${m}-01`<=asOf?'500':null}))};
      if(kind==='spending_transactions')return {month:start.slice(0,7),censored:false,transactions:observed.flatMap((m,i)=>[
        {id:i*10+1,posted_at:`${m}-01T12:00:00+05:30`,account_id:3,transaction_type:'withdrawal',amount:String(values(m).spend*.8),theme:'Housing',merchant:'Sample housing',description:'Sample housing',pending:false},
        {id:i*10+2,posted_at:`${m}-01T12:00:00+05:30`,account_id:1,transaction_type:'withdrawal',amount:String(values(m).spend*.2),theme:'Groceries',merchant:'Sample groceries',description:'Sample groceries',pending:false},
        {id:i*10+3,posted_at:`${m}-01T12:00:00+05:30`,account_id:1,transaction_type:'deposit',amount:String(-values(m).income),merchant:'Employer',description:'Sample salary',pending:false},
        {id:i*10+4,posted_at:`${m}-01T12:00:00+05:30`,account_id:3,transaction_type:'transfer',amount:'-500',theme:'transfers',merchant:'Card payment',description:'Own transfer',pending:false},
      ]).filter(t=>!msg.theme||t.theme===msg.theme)};
      throw Error(`Unexpected period request ${kind}`);
    };
    for(const kind of ['stat','worth']){
      const el=document.querySelector(`family-finance-${kind}-card`);
      el.setConfig({type:`custom:family-finance-${kind}-card`,allowed_user_id:window.hass.user.id,month_group:'finance',background:'off',layout:'banner',range:kind==='stat'?'1m':'6m',title:kind==='stat'?'Tracked net worth':'Net worth over time',show_range_selector:kind!=='stat'});
    }
  });
}
async function ready(page) {
  await page.waitForFunction(()=>[...document.querySelectorAll('main > *')].every(el=>!el.shadowRoot?.querySelector('.card[aria-busy="true"]')));
  assert.equal(await page.locator('.error-box').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Period charts must not widen the page');
}
(async()=>{
 fs.mkdirSync(OUTPUT,{recursive:true});const browser=await chromium.launch({headless:true});
 try {
  for(const width of [375,768,1440]) {
   const page=await browser.newPage({viewport:{width,height:1100},hasTouch:width===375,timezoneId:'Asia/Kolkata'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await periodFixture(page);
   const picker=page.locator('family-finance-month-card');
   await picker.getByRole('button',{name:'Calendar year',exact:true}).click();
   await picker.getByLabel('Reporting year').selectOption('2025');
   await ready(page);
   await picker.getByLabel('Comparison year').selectOption('2024');
   await ready(page);
   const requests=await page.evaluate(()=>window.messages.filter(m=>m.start==='2025-01-01'&&m.end==='2025-12-31'));
   for(const kind of ['overview','series','spending_summary','spending_recurring','spending_investments','spending_transactions'])assert(requests.some(r=>r.type===`family_finance/${kind}`),`${kind} uses calendar year`);
   assert.match(await page.locator('family-finance-spending-card .period-total-comparison').innerText(),/₹67,800.*₹55,800/s);
   assert.equal(await page.locator('.comparison-history').count(),1);
   assert(await page.locator('.account-sparkline').count()>0);
   assert.equal(await page.locator('family-finance-cardcycle-card .comparison-balance-line').count(),1);
   assert.equal(await page.locator('.period-trend').count(),3);
   assert.match(await page.locator('family-finance-investments-card .investment-total').innerText(),/6,000/);
   assert.equal(await page.locator('family-finance-spending-card .spend-comparison').count(),4);
   assert.equal(await page.locator('family-finance-spending-card .spend-row:disabled').count(),2);
   const colors=await page.locator('family-finance-spending-card .spend-theme-dot').evaluateAll(els=>els.map(el=>el.style.background));
   assert.equal(new Set(colors).size,colors.length);
   await page.locator('family-finance-spending-card .spend-row').first().click();
   await page.locator('family-finance-spending-card .spend-txn').first().waitFor();
   assert.equal(await page.locator('family-finance-spending-card .spend-txn').count(),12);
   assert.match((await page.locator('family-finance-spending-card .spend-txn-date').allTextContents()).join(' '),/2025/);
   await page.locator('family-finance-spending-card .spend-row').first().click();
   await page.locator('family-finance-spending-card [aria-label="View income sources"]').click();
   await page.locator('.income-source').waitFor();
   assert.equal(await page.locator('.income-transaction').count(),12);
   assert(!((await page.locator('.income-breakdown').innerText()).includes('Own transfer')));
   await page.locator('family-finance-spending-card [aria-label="View income sources"]').click();
   await page.evaluate(()=>window.scrollTo(0,0));
   await page.screenshot({path:path.join(OUTPUT,`calendar-comparison-${width}.png`)});
   await page.locator('family-finance-spending-card').screenshot({path:path.join(OUTPUT,`spending-comparison-${width}.png`)});
   await picker.getByRole('button',{name:'Financial year',exact:true}).click();
   await picker.getByLabel('Reporting year').selectOption('2025');
   await picker.getByLabel('Comparison year').selectOption('2024');
   await ready(page);
   assert.match(await picker.locator('.period-context').innerText(),/1 Apr 2025.*31 Mar 2026/s);
   assert(await page.evaluate(()=>window.messages.some(m=>m.start==='2024-04-01'&&m.end==='2025-03-31')));
   const labels=await page.locator('family-finance-spending-card .recharts-xAxis .recharts-cartesian-axis-tick-value').allTextContents();
   assert.equal(labels[0],'Apr');assert.equal(labels.at(-1),'Mar');
   await page.evaluate(()=>window.scrollTo(0,0));
   await page.screenshot({path:path.join(OUTPUT,`financial-comparison-${width}.png`)});
   await picker.getByRole('button',{name:'Calendar year',exact:true}).click();
   await picker.getByLabel('Reporting year').selectOption('2026');
   await picker.getByLabel('Comparison year').selectOption('2025');
   await ready(page);
   assert(await page.evaluate(()=>window.messages.some(m=>m.start==='2025-01-01'&&m.end==='2025-09-06')));
   assert.match(await picker.locator('.period-context').innerText(),/Actuals through 6 Sept 2026/);
   // An unfinished comparison request keeps only its own panel busy.
   await page.evaluate(()=>{window.holdRequest=m=>m.type==='family_finance/spending_investments'&&m.start==='2024-01-01';});
   await picker.getByLabel('Comparison year').selectOption('2024');
   await page.waitForFunction(()=>window.pendingRequests.length>0);
   await page.waitForFunction(()=>[...document.querySelectorAll('main > *')].filter(el=>el.tagName!=='FAMILY-FINANCE-INVESTMENTS-CARD').every(el=>!el.shadowRoot?.querySelector('.card[aria-busy="true"]')));
   assert.equal(await page.locator('.loading-spinner').count(),1);
   await picker.getByLabel('Reporting year').selectOption('2023');
   await ready(page);
   const value=await page.locator('family-finance-investments-card .investment-total').innerText();
   await page.evaluate(()=>{window.holdRequest=null;window.pendingRequests.splice(0).forEach(r=>r.resolve());});
   await page.waitForTimeout(30);
   assert.equal(await page.locator('family-finance-investments-card .investment-total').innerText(),value);
   // Leap-day custom ranges clamp the comparison start to 28 February.
   await picker.getByRole('button',{name:'Custom',exact:true}).click();
   await picker.getByLabel('Period start').fill('2024-02-29');
   await picker.getByLabel('Period end').fill('2024-03-01');
   await picker.getByRole('button',{name:'Apply dates'}).click();
   await picker.getByLabel('Comparison year').selectOption('2023');
   await ready(page);
   assert(await page.evaluate(()=>window.messages.some(m=>m.start==='2023-02-28'&&m.end==='2023-03-01')));
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   const before=await page.evaluate(()=>window.messages.length);
   await page.evaluate(()=>{for(const el of document.querySelectorAll('main > *'))if(el.shadowRoot)el.hass={...window.hass,user:{id:'another-user'}};});
   await page.locator('family-finance-stat-card .status').filter({hasText:'private'}).waitFor();
   assert.equal(await page.locator('.comparison-history,.account-sparkline,.period-trend').count(),0);
   assert.equal(await page.evaluate(()=>window.messages.length),before);
   assert.deepEqual(errors,[]);
   await page.close();
  }
 }finally{await browser.close();}
 console.log(`Calendar/FY/custom periods, same-date year comparisons, aggregated charts, drill-down, leap day, per-panel loading, stale responses and access isolation passed. Screenshots: ${OUTPUT}`);
})().catch(e=>{console.error(e);process.exitCode=1;});
