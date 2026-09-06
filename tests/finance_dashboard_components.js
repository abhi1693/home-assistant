const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = process.env.HA_FINANCE_TEST_OUTPUT || "/tmp/ha-finance-components";
const OWNER = "9302d11f48c64fe796a3c9e5cb563650";

async function fixture(page, grouped = false, initiallyLoading = false) {
  await page.route("http://finance.test/**", route => route.fulfill({
    contentType: "text/html", body: "<!doctype html><title>Finance test data</title>"
  }));
  await page.goto("http://finance.test/");
  await page.setContent(`<style>
    * { box-sizing: border-box; } body { margin:0; padding:20px; color:#dce5f1; background:#0b1018; font:14px Arial,sans-serif; }
    main { max-width:1200px; margin:auto; display:grid; grid-template-columns: 1fr 2fr; gap:16px; }
    .full { grid-column:1/-1; } h1 { font-size:22px; margin:12px 0; } .note { color:#a0afc5; }
    @media(max-width:700px) { body { padding:10px; } main { grid-template-columns:1fr; } }
  </style><main><header class="full"><h1>Abhimanyu · Finance</h1><p class="note">Sample ledger for browser validation</p></header></main>`);
  await page.addScriptTag({path: path.join(ROOT, "www/family-finance-cards.js"), type: "module"});
  await page.waitForFunction(() => customElements.get("family-finance-worth-card"));
  await page.evaluate(({owner,grouped,initiallyLoading}) => {
    const today = new Date();
    const month = new Intl.DateTimeFormat("en-CA", {timeZone:"Asia/Kolkata", year:"numeric",month:"2-digit"}).format(today).slice(0,7);
    const now = today.toISOString();
    const accounts = [
      {id:1,name:"Daily account",balance:"72000",kind:"cash"},
      {id:2,name:"Savings",balance:"640000",kind:"cash"},
      {id:3,name:"Credit card",balance:"-18000",kind:"credit"},
      ...(grouped ? Array.from({length:8},(_,i)=>({id:i+4,name:`Long account name for household savings ${i+1}`,balance:"10000",kind:"cash"})) : []),
    ].map(a=>({...a,provider:"firefly-iii",org_name:"Firefly III",org_domain:"",nickname:null,currency:"INR",category:null,hidden:a.kind==="credit",balance_at:now,created_at:"2026-01-01"}));
    const overview = {entry_id:"firefly",currency:"INR",accounts,me:{censored:false,can_reveal:false,revealed:true,code_required:false,reveal_expires:null},default_reveal_ttl_minutes:0};
    const series = accounts.map(a=>({account_id:a.id,points:Array.from({length:181},(_,i)=>({
      ts:new Date(today.getTime()-(180-i)*86400000).toISOString(),
      balance:String(Number(a.balance)-(a.kind==="credit"||i===180?0:((180-i)*250+Math.sin(i)*3000))),
    }))}));
    window.financeFixture = {accounts, series};
    const recurring = {month,censored:false,today:now.slice(0,10),total_due:"25000",total_remaining:"0",bill_count:1,streams:[{
      merchant_key:"rent",merchant:"Rent",theme:"housing",frequency:"quarterly",frequency_label:"every 2 monthly periods",interval_days:60.875,
      average_amount:"25000",monthly_amount:"25000",last_amount:"25000",active:true,is_income:false,
      first_seen:"2026-01-01",last_seen:`${month}-02`,count:1,logo_url:null,
    }],actuals:[{merchant_key:"rent",date:`${month}-02`,amount:"25000",is_income:false}],expected:[]};
    window.messages=[];
    window.pendingMonths=[];
    window.pendingRequests=[];
    window.holdRequest=initiallyLoading ? () => true : null;
    const connection={sendMessagePromise:async msg=>{
      window.messages.push(msg);
      if(window.holdRequest?.(msg))await new Promise((resolve,reject)=>window.pendingRequests.push({msg,resolve,reject}));
      if(msg.month&&msg.month===window.delayedMonth)await new Promise(resolve=>window.pendingMonths.push(resolve));
      const kind=msg.type.split("/")[1];
      if(kind==="history")return {first_date:"2023-02-28"};
      if(kind==="overview")return {...overview,accounts:accounts.map(a=>({...a,balance:msg.month&&msg.month!==month&&a.id===1?"91000":a.balance}))};
      if(kind==="series")return {series:msg.month?accounts.map(a=>{
        const closing=Number(msg.month!==month&&a.id===1?'91000':a.balance);
        const start=Date.parse(`${msg.month}-01T00:00:00+05:30`);
        const end=msg.month===month?now:new Date(Date.UTC(Number(msg.month.slice(0,4)),Number(msg.month.slice(5,7)),0,18,29,59)).toISOString();
        return {account_id:a.id,points:[
          {ts:new Date(start-1000).toISOString(),balance:String(closing-(a.id===1?1000:0))},
          {ts:new Date(start+43200000).toISOString(),balance:String(closing-(a.id===1?500:0))},
          {ts:end,balance:String(closing)},
        ]};
      }):series,censored:false};
      if(kind==="spending_recurring")return {...recurring,month:msg.month};
      if(kind==="spending_investments")return {month:msg.month,censored:false,total_recorded:"2000",total_pending:msg.month===month?"1000":"0",total_committed:msg.month===month?"3000":"2000",recorded:[
        {id:"fund-payment",date:`${msg.month}-01`,name:"Sample fund",amount:"2000",source_account_id:1,destination_account_id:2,status:"recorded"}],expected:msg.month===month?[
        {id:"gold-planned",date:`${msg.month}-08`,name:"Sample gold",amount:"1000",source_account_id:1,destination_account_id:2,status:"scheduled"}]:[]};
      if(kind==="spending_summary")return {month:msg.month,censored:false,total_spend:msg.month!==month?"45000":"32000",total_income:"130592.02",
        themes:grouped?[
        {theme:'House Renovation - Fixtures and Fittings',total:'18000',count:7},
        {theme:'Networking Equipment and Home Office Supplies',total:'8000',count:4},
        ...Array.from({length:10},(_,i)=>({theme:`Household category ${i+1}`,total:'480',count:2})),
        {theme:'Uncategorised',total:'1200',count:1},
      ]:[
        {theme:"Housing",total:"25000",count:1},{theme:"Groceries",total:"5000",count:7},{theme:"Dining",total:"2000",count:3},
      ]};
      if(kind==="spending_transactions")return {month:msg.month,censored:false,transactions:[{
        id:1,account_id:3,posted_at:`${msg.month}-02T12:00:00+05:30`,amount:"25000",merchant:"Rent <script>bad()</script>",merchant_key:"rent",description:"Test rent",theme:grouped?'House Renovation - Fixtures and Fittings':"Housing",logo_url:null,pending:false,transaction_type:"withdrawal",
      },{id:2,account_id:3,posted_at:`${msg.month}-03T12:00:00+05:30`,amount:"-12000",merchant:"Card payment",merchant_key:"payment",description:"Repayment",theme:"transfers",pending:false,transaction_type:"transfer"},
      ...(grouped ? [
        ...Array.from({length:20},(_,i)=>({id:100+i,account_id:1,posted_at:`${msg.month}-04T12:00:00+05:30`,amount:'240',merchant:`Sample merchant ${i+1}`,merchant_key:`sample-${i}`,description:'Sample category expense',theme:`Household category ${Math.floor(i/2)+1}`,pending:false,transaction_type:'withdrawal'})),
        {id:200,account_id:1,posted_at:`${msg.month}-04T12:00:00+05:30`,amount:'1200',merchant:'Unassigned purchase',description:'Sample unassigned expense',theme:'Uncategorised',pending:false,transaction_type:'withdrawal'},
      ] : []),
      ...(!msg.theme?[
        {id:3,account_id:1,posted_at:`${msg.month}-03T12:00:00+05:30`,amount:"-125000",merchant:"Employer",description:"Monthly salary",category:"Salary",theme:'Household category 6',transaction_type:"deposit"},
        {id:5,account_id:1,posted_at:`${msg.month}-05T12:00:00+05:30`,amount:"-14.04",merchant:"Amazon Royalties",description:"Book royalty",category:"Royalty Income",transaction_type:"deposit"},
        {id:6,account_id:1,posted_at:`${msg.month}-06T12:00:00+05:30`,amount:"-577.98",merchant:"Amazon Royalties",description:"Book royalty",category:"Royalty Income",transaction_type:"deposit"},
        {id:4,account_id:1,posted_at:`${msg.month}-04T12:00:00+05:30`,amount:"-5000",merchant:"Retailer",description:"Purchase refund",category:"Shopping",transaction_type:"deposit"},
      ]:[])]};
      throw Error(`Unexpected finance request ${msg.type}`);
    }};
    window.hass={user:{id:owner},connection};
    const cards=[
      ...(grouped?[["month",{title:"Reporting period",month_group:"finance"},true]]:[]),
      ["stat",{title:"Tracked net worth",layout:"banner",show_range_selector:false,range:"1m"},true],
      ["worth",{title:"Net worth over time",range:"6m",mode:"total",compact:true},true],
      ["spending",{title:"Spending"},true],
      ["investments",{title:"Investments"},true],
      ["accounts",{title:"Accounts",show_range_selector:false},grouped],
      ["bills",{title:"Scheduled bills"},grouped],
      ["cardcycle",{title:"Credit cards"},true],
    ];
    for(const [kind,config,full] of cards){
      const card=document.createElement(`family-finance-${kind}-card`);
      const shared=grouped&&["stat","spending","accounts","bills","cardcycle","investments"].includes(kind)?{month_group:"finance"}:{};
      card.setConfig({type:`custom:family-finance-${kind}-card`,allowed_user_id:owner,background:"off",...config,...shared});
      if(full)card.className="full";
      card.hass=window.hass;
      document.querySelector("main").append(card);
    }
  }, {owner:OWNER,grouped,initiallyLoading});
  if(initiallyLoading)return;
  await page.locator("family-finance-stat-card .stat-value").waitFor();
  await page.waitForFunction(() => [...document.querySelectorAll("main > [class],main > family-finance-accounts-card,main > family-finance-bills-card")].every(c=>!c.shadowRoot?.textContent.includes("Loading…")));
}

async function loadingCheck(page, width) {
  await fixture(page, true, true);
  await page.waitForFunction(()=>window.pendingRequests.length>=12);
  const busy=page.locator('.card[aria-busy="true"]');
  const spinners=page.locator('.loading-spinner');
  assert.equal(await busy.count(),7,'Every data panel shows its initial request');
  assert.equal(await spinners.count(),7);
  assert.equal(await page.locator('family-finance-month-card .loading-spinner').count(),0);
  for(const kind of ['stat','worth','spending','accounts','bills','cardcycle','investments']) {
    const panel=page.locator(`family-finance-${kind}-card .card`);
    const spinner=panel.locator('.loading-spinner');
    const box=await panel.boundingBox(), ring=await spinner.boundingBox();
    assert(ring.x>=box.x&&ring.y>=box.y&&ring.x+ring.width<=box.x+box.width&&ring.y+ring.height<=box.y+box.height);
    assert.equal(await spinner.evaluate(el=>getComputedStyle(el).animationName),'finance-spin');
  }
  await page.screenshot({path:path.join(OUTPUT,`finance-initial-loading-${width}.png`),fullPage:true});
  await page.evaluate(()=>{window.holdRequest=null;window.pendingRequests.splice(0).forEach(r=>r.resolve());});
  await page.locator('family-finance-stat-card .stat-value').waitFor();
  await page.waitForFunction(()=>[...document.querySelectorAll('main > *')].every(el=>!el.shadowRoot?.querySelector('.loading-spinner')));

  // Only the slow investment panel stays busy on the normal visibility refresh.
  const spending=page.locator('family-finance-spending-card');
  const investments=page.locator('family-finance-investments-card');
  const before=await investments.locator('.investment-total').allTextContents();
  await page.evaluate(()=>{
    window.holdRequest=msg=>msg.type==='family_finance/spending_investments';
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await investments.locator('.panel-loading-refresh').waitFor();
  await page.waitForFunction(()=>[...document.querySelectorAll('main > *')].filter(el=>el.tagName!=='FAMILY-FINANCE-INVESTMENTS-CARD').every(el=>!el.shadowRoot?.querySelector('.loading-spinner')));
  assert.equal(await busy.count(),1);
  assert.equal(await spinners.count(),1);
  assert.deepEqual(await investments.locator('.investment-total').allTextContents(),before,'Keep current figures during refresh');
  assert.equal(await investments.locator('.panel-loading-refresh').evaluate(el=>getComputedStyle(el).pointerEvents),'none');
  await investments.screenshot({path:path.join(OUTPUT,`finance-investments-refresh-${width}.png`)});
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await spinners.evaluate(el=>getComputedStyle(el).animationName),'none');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.evaluate(()=>{window.holdRequest=null;window.pendingRequests.splice(0).forEach(r=>r.resolve());});
  await spending.locator('.panel-loading').waitFor({state:'detached'});

  // Detail requests show activity inside the expanded section only.
  await page.evaluate(()=>window.holdRequest=msg=>msg.type==='family_finance/spending_transactions');
  await page.getByRole('button',{name:'View income sources',exact:true}).click();
  await spending.locator('.income-breakdown .loading-spinner').waitFor();
  assert.equal(await busy.count(),0);
  assert.equal(await spinners.count(),1);
  await page.evaluate(()=>{window.holdRequest=null;window.pendingRequests.splice(0).forEach(r=>r.resolve());});
  await spending.locator('.income-source').first().waitFor();
  assert.equal(await spinners.count(),0);
  await page.evaluate(()=>window.holdRequest=msg=>msg.type==='family_finance/spending_transactions');
  await spending.locator('.spend-row').first().click();
  await spending.locator('.spend-txns .loading-spinner').waitFor();
  assert.equal(await spinners.count(),1);
  assert.equal(await busy.count(),0);
  await page.evaluate(()=>{window.holdRequest=null;window.pendingRequests.splice(0).forEach(r=>r.reject(Error('Test failure')));});
  await spending.locator('.spend-txns .error-box').waitFor();
  assert.equal(await spinners.count(),0,'Detail failure stops its spinner');

  // An obsolete net-worth request must not settle the newer range's spinner.
  const worth=page.locator('family-finance-worth-card');
  await page.evaluate(()=>window.holdRequest=msg=>msg.type==='family_finance/series'&&!msg.month);
  await worth.getByRole('button',{name:'1y',exact:true}).click();
  await worth.locator('.loading-spinner').waitFor();
  await worth.getByRole('button',{name:'all',exact:true}).click();
  await page.waitForFunction(()=>window.pendingRequests.length===2);
  await page.evaluate(()=>window.pendingRequests.shift().resolve());
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  assert.equal(await busy.count(),1);
  assert.equal(await worth.locator('.loading-spinner').count(),1);
  await page.evaluate(()=>{window.holdRequest=null;window.pendingRequests.splice(0).forEach(r=>r.reject(Error('Test failure')));});
  await worth.locator('.error-box').waitFor();
  assert.equal(await busy.count(),0,'Failed panel settles loading');
  assert.equal(await spinners.count(),0);
  await worth.getByRole('button',{name:'6m',exact:true}).click();
  await worth.locator('svg.recharts-surface').waitFor();
  assert.equal(await spinners.count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
}

async function sharedMonthCheck(page, width) {
  await fixture(page, true);
  const picker=page.locator('main family-finance-month-card input[type="month"]');
  const current=await picker.inputValue();
  const previous=new Date(`${current}-01T00:00:00Z`);previous.setUTCMonth(previous.getUTCMonth()-1);
  const prior=previous.toISOString().slice(0,7);
  previous.setUTCMonth(previous.getUTCMonth()-1);const delayed=previous.toISOString().slice(0,7);
  const worth=await page.locator('family-finance-stat-card .stat-value').innerText();
  const independent=await page.evaluate(()=>window.messages.filter(m=>!m.month).length);
  assert.equal(await page.getByRole('button',{name:'Previous month',exact:true}).count(),1);
  assert.equal((await page.locator('.recurring-month-total .spend-stat-value').innerText()).trim(),'₹25,000');
  assert.match(await page.locator('.recurring-month-total').innerText(),/1 bill this month/);
  assert.equal((await page.locator('.investment-total').innerText()).trim(),'₹3,000');
  assert.equal(await page.locator('.investment-row').count(),2);
  assert.match(await page.locator('.investment-remaining').innerText(),/95,592/);
  const categories=page.locator('family-finance-spending-card .spend-row');
  assert.equal(await categories.count(),10,'Eight named categories plus Others and Uncategorised');
  const spending=page.locator('family-finance-spending-card');
  const labels=await spending.locator('.spend-row-label').allTextContents();
  assert.deepEqual(labels.slice(-2),['Others','Uncategorised']);
  assert.equal(await spending.locator('.spend-show-all').count(),0);
  const colors=await spending.locator('.spend-theme-dot').evaluateAll(els=>els.map(el=>el.style.background));
  assert.equal(new Set(colors).size,10,'Every displayed category has a distinct color');
  const slices=spending.locator('.spend-donut path');
  assert.equal(await slices.count(),10,'Donut uses exactly the displayed groups');
  assert.deepEqual(await slices.evaluateAll(els=>els.map(el=>{const probe=document.createElement('span');probe.style.color=el.getAttribute('fill');return probe.style.color;})),colors);
  const others=categories.filter({has:page.locator('.spend-row-label',{hasText:/^Others$/})});
  assert.match(await others.innerText(),/1,920/);
  assert.match(await others.innerText(),/8 txns/);
  await others.click();
  await spending.locator('.spend-txn-desc').first().waitFor();
  assert.equal(await spending.locator('.spend-txn').count(),8,'Others contains only its member withdrawals');
  assert.doesNotMatch(await spending.locator('.spend-txns').innerText(),/Employer|Card payment|Unassigned purchase/);
  assert.equal(await spending.locator('.spend-txn-category').count(),8);
  await spending.screenshot({path:path.join(OUTPUT,`finance-others-${width}.png`)});
  await categories.last().click();
  await spending.getByText('Unassigned purchase',{exact:true}).waitFor();
  assert.equal(await spending.locator('.spend-txn').count(),1);
  await categories.last().click();
  assert.equal(await page.locator('family-finance-spending-card .spend-txn-desc').count(),0);
  assert(await page.locator('family-finance-spending-card .spend-row-label').first().evaluate(el=>getComputedStyle(el).whiteSpace!=='nowrap'));
  assert.equal(await page.locator('family-finance-accounts-card .account-item').count(),11);
  await page.getByRole('button',{name:'View income sources',exact:true}).click();
  await page.locator('.income-source').first().waitFor();
  assert.equal(await page.locator('.income-source').count(),3);
  assert.equal((await page.locator('.spend-income-trigger .spend-stat-value').innerText()).trim(),'₹1,30,592');
  assert.match(await page.locator('.income-breakdown-head').innerText(),/1,30,592.02/);
  assert.match(await page.locator('.income-source').filter({hasText:'Amazon Royalties'}).innerText(),/592.02/);
  assert.equal(await page.getByText('Other credits',{exact:false}).count(),0);
  assert.match(await page.locator('.income-source-group[aria-label="Income"]').innerText(),/Employer/);
  assert.match(await page.locator('.income-source-group[aria-label="Income"]').innerText(),/Retailer/);
  assert.doesNotMatch(await page.locator('.income-breakdown').innerText(),/Card payment/);
  await page.locator('.income-source').filter({hasText:'Retailer'}).locator('summary').click();
  assert.match(await page.locator('.income-source[open] .income-transaction-meta').last().innerText(),/Daily account/);
  await page.screenshot({path:path.join(OUTPUT,`finance-income-sources-${width}.png`),fullPage:true});
  await picker.fill(prior);
  await page.locator('family-finance-accounts-card .num').filter({hasText:'91,000'}).waitFor();
  assert.equal(await page.locator('.income-breakdown').count(),0);
  assert.equal((await page.locator('.investment-total').innerText()).trim(),'₹2,000');
  assert.equal(await page.locator('.investment-row').count(),1);
  assert.equal(await page.locator(`.card[data-reporting-month="${prior}"]`).count(),6);
  const requested=await page.evaluate(month=>window.messages.filter(m=>m.month===month).map(m=>m.type),prior);
  for(const kind of ['overview','series','spending_summary','spending_recurring','spending_transactions','spending_investments'])assert(requested.includes(`family_finance/${kind}`));
  const stat=page.locator('family-finance-stat-card');
  assert.equal(await stat.locator('.stat-value').innerText(),'₹8,11,000');
  assert.notEqual(await stat.locator('.stat-value').innerText(),worth);
  assert.equal(await stat.locator('.worth-component-value').innerText(),'₹8,11,000');
  assert.match(await stat.locator('.change-explainer').innerText(),/\+₹1,000 \(\+0.1%\)/);
  assert.match(await stat.locator('.worth-balance-date').innerText(),/Closing balance/);
  await stat.getByRole('button',{name:'Explain net worth change'}).click();
  const tooltip=stat.getByRole('tooltip');
  await tooltip.waitFor();
  assert.match(await tooltip.innerText(),/previous day's closing balance/);
  const dates=await tooltip.locator('.worth-change-details dt').allTextContents();
  const formatDate=date=>date.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Kolkata'});
  assert.equal(dates[0],`Opening · ${formatDate(new Date(Date.parse(`${prior}-01T00:00:00+05:30`)-1000))}`);
  assert.equal(dates[1],`Closing · ${formatDate(new Date(Date.parse(`${current}-01T00:00:00+05:30`)-1000))}`);
  await page.keyboard.press('Escape');
  assert.equal(await page.evaluate(()=>window.messages.filter(m=>!m.month).length),independent);
  await page.locator('family-finance-spending-card .spend-row').first().click();
  await page.locator('family-finance-spending-card .spend-txn-desc').first().waitFor();
  await page.evaluate(month=>window.delayedMonth=month,delayed);
  await picker.fill(delayed);
  await page.locator('family-finance-accounts-card .status').filter({hasText:'Loading'}).waitFor();
  assert.equal(await page.locator('.card[aria-busy="true"]').count(),6,'Shared month also refreshes the net-worth summary');
  assert.equal(await stat.locator('.stat-value').count(),0,'New period does not show an old closing balance');
  assert.equal(await stat.getByRole('tooltip').count(),0);
  assert.equal(await page.locator('family-finance-worth-card .loading-spinner').count(),0);
  assert.equal(await page.locator('family-finance-spending-card .spend-txn-desc').count(),0);
  await picker.fill(current);
  await page.locator('family-finance-accounts-card .num').filter({hasText:'72,000'}).waitFor();
  await page.evaluate(()=>{window.pendingMonths.forEach(resolve=>resolve());window.pendingMonths=[];});
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  assert.equal(await page.locator(`.card[data-reporting-month="${current}"]`).count(),6);
  assert.equal(await page.locator('family-finance-accounts-card .num').filter({hasText:'91,000'}).count(),0);
  assert.equal(await page.locator('family-finance-stat-card .stat-value').innerText(),worth);
  assert.match(await stat.locator('.worth-balance-date').innerText(),/As of/);
  assert.equal(await page.locator('.loading-spinner').count(),0,'Obsolete month cannot leave a spinner running');
  assert.equal(await page.getByRole('button',{name:'Next month',exact:true}).isDisabled(),true);
  await picker.fill(prior);
  await page.locator('family-finance-accounts-card .num').filter({hasText:'91,000'}).waitFor();
  await page.evaluate(()=>{
    const other=document.createElement('family-finance-month-card');other.id='other-month';
    other.setConfig({type:'custom:family-finance-month-card',month_group:'finance'});
    other.hass={...window.hass,user:{id:'another-user'}};document.body.append(other);
  });
  const other=page.locator('#other-month input[type="month"]');
  assert.equal(await other.inputValue(),current);
  await other.fill(delayed);
  assert.equal(await picker.inputValue(),prior);
  await page.evaluate(()=>document.querySelector('#other-month').remove());
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Shared control overflow at ${width}`);
  await page.screenshot({path:path.join(OUTPUT,`finance-shared-month-${width}.png`),fullPage:true});
}

async function netWorthSummaryCheck(page, width) {
  await fixture(page);
  await page.evaluate(() => {
    const {accounts,series} = window.financeFixture;
    accounts.push(
      {...accounts[0],id:4,name:'Mutual fund',kind:'investment',balance:'100000'},
      {...accounts[0],id:5,name:'Pension',kind:'investment',category:'retirement',balance:'50000'},
      {...accounts[0],id:6,name:'Negative investment ledger',kind:'investment',category:'retirement',balance:'-12000'},
    );
    const starting = {1:90000,2:680000,3:-18000,4:120000,5:60000,6:-10000};
    series.splice(0,series.length,...accounts.map(a=>({account_id:a.id,points:[
      {ts:'2025-12-31T23:59:59+05:30',balance:String(starting[a.id])},
      {ts:'2026-01-30T23:59:59+05:30',balance:a.balance},
    ]})));
    document.querySelector('family-finance-stat-card').setConfig({
      type:'custom:family-finance-stat-card',allowed_user_id:window.hass.user.id,
      title:'Tracked net worth',layout:'banner',view:'all',range:'1m',show_range_selector:false,background:'off',
    });
  });
  const card=page.locator('family-finance-stat-card');
  await card.locator('.stat-value').filter({hasText:'8,50,000'}).waitFor();
  assert.deepEqual(await card.locator('.worth-component-label').allTextContents(),['Cash & bank','Investments','Negative balances']);
  assert.deepEqual(await card.locator('.worth-component-value').allTextContents(),['₹7,12,000','₹1,50,000','₹12,000']);
  assert.equal(await card.locator('.comp-bar').count(),0);
  const badge=card.getByRole('button',{name:'Explain net worth change'});
  assert.match(await badge.innerText(),/-₹90,000 \(-9.6%\)/);
  await card.screenshot({path:path.join(OUTPUT,`net-worth-summary-${width}.png`)});
  if(width===375) await badge.tap(); else await badge.hover();
  let tooltip=card.getByRole('tooltip');
  await tooltip.waitFor();
  assert.match(await tooltip.innerText(),/31 Dec 2025/);
  assert.match(await tooltip.innerText(),/30 Jan 2026/);
  assert.match(await tooltip.innerText(),/₹9,40,000.00/);
  assert.match(await tooltip.innerText(),/₹8,50,000.00/);
  assert.match(await tooltip.innerText(),/absolute starting balance/);
  const bounds=await tooltip.boundingBox();
  assert(bounds.x>=0 && bounds.x+bounds.width<=width && bounds.y>=0,`Tooltip bounds at ${width}`);
  await page.screenshot({path:path.join(OUTPUT,`net-worth-change-tooltip-${width}.png`),fullPage:true});
  await page.keyboard.press('Escape');
  await tooltip.waitFor({state:'detached'});
  await badge.focus();
  await page.keyboard.press('Enter');
  await card.getByRole('tooltip').waitFor();
  await page.keyboard.press('Escape');
  await card.getByRole('button',{name:/Negative balances:/}).click();
  tooltip=card.getByRole('tooltip');
  await tooltip.waitFor();
  assert.match(await tooltip.innerText(),/Negative investment ledger/);
  assert.match(await tooltip.innerText(),/-₹12,000.00/);
  assert.doesNotMatch(await tooltip.innerText(),/Credit card/);
  await page.locator('h1').click();
  await tooltip.waitFor({state:'detached'});
  await page.evaluate(()=>{
    for(const s of window.financeFixture.series)s.points[0].balance='0';
    const card=document.querySelector('family-finance-stat-card');
    card.setConfig({type:'custom:family-finance-stat-card',allowed_user_id:window.hass.user.id,layout:'banner',range:'all',background:'off'});
  });
  await card.locator('.change-explainer').filter({hasText:'+₹8,50,000'}).waitFor();
  assert.doesNotMatch(await card.locator('.change-explainer').innerText(),/%/);
  await card.getByRole('button',{name:'Explain net worth change'}).click();
  await card.getByRole('tooltip').waitFor();
  assert.match(await card.getByRole('tooltip').innerText(),/starting balance is ₹0/);
  await page.evaluate(()=>{document.querySelector('family-finance-stat-card').hass={...window.hass,user:{id:'someone-else'}};});
  await card.locator('.status').filter({hasText:'private'}).waitFor();
  assert.equal(await card.getByRole('tooltip').count(),0);
}

module.exports={fixture};

if(require.main===module)(async()=>{
  fs.mkdirSync(OUTPUT,{recursive:true});
  const browser=await chromium.launch({headless:true});
  try {
    for(const width of [375,768,1440]) {
      const page=await browser.newPage({viewport:{width,height:1100},timezoneId:"Asia/Kolkata",hasTouch:width===375});
      const errors=[];page.on("pageerror",e=>errors.push(e.message));
      await fixture(page);
      assert.match(await page.locator("family-finance-stat-card .stat-value").innerText(),/₹/);
      assert.match(await page.locator("family-finance-stat-card .stat-value").innerText(),/7,12,000/);
      await page.locator("family-finance-cardcycle-card .spend-card-row").waitFor();
      assert.match(await page.locator("family-finance-accounts-card .card").innerText(),/Credit card/);
      assert.equal(await page.locator("button.lock").count(),0);
      assert.match((await page.locator("family-finance-bills-card svg title").allTextContents()).join(" "),/every 2 monthly periods/);
      await page.screenshot({path:path.join(OUTPUT,`finance-${width}.png`),fullPage:true});
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
      assert.equal(overflow,false,`Page overflow at ${width}`);
      const cardsOverflow=await page.evaluate(()=>[...document.querySelectorAll("main > *")].filter(e=>e.shadowRoot).filter(e=>e.shadowRoot.querySelector(".card").scrollWidth>e.clientWidth+2).map(e=>e.tagName));
      assert.deepEqual(cardsOverflow,[],`Card overflow at ${width}`);
      await page.screenshot({path:path.join(OUTPUT,`finance-${width}.png`),fullPage:true});
      await page.locator("family-finance-spending-card .spend-row").first().click();
      await page.locator("family-finance-spending-card .spend-txn-desc").first().waitFor();
      assert.match((await page.locator("family-finance-spending-card .spend-txn-desc").allTextContents()).join(" "),/<script>/);
      await page.locator("family-finance-cardcycle-card button[aria-label='Previous month']").click();
      await page.waitForFunction(()=>window.messages.filter(m=>m.type==="family_finance/series"&&m.month).some(m=>m.month<new Date().toISOString().slice(0,7)));
      const before=await page.evaluate(()=>window.messages.length);
      await page.evaluate(()=>{for(const e of document.querySelectorAll("main > *")){if(e.shadowRoot)e.hass={...window.hass,user:{id:"another-user"}};}});
      await page.locator("family-finance-stat-card .status").filter({hasText:"private"}).waitFor();
      assert.equal(await page.locator(".stat-value").count(),0);
      assert.equal(await page.evaluate(()=>window.messages.length),before);
      assert.deepEqual(errors,[]);
      await sharedMonthCheck(page, width);
      await loadingCheck(page, width);
      await netWorthSummaryCheck(page, width);
      assert.deepEqual(errors,[]);
      await page.close();
    }
  } finally { await browser.close(); }
  console.log(`Finance desktop/tablet/mobile, INR, drill-down, monthly controls, per-panel initial/refresh/detail spinners, failures, stale responses and account isolation passed. Screenshots: ${OUTPUT}`);
})().catch(e=>{console.error(e);process.exitCode=1;});
