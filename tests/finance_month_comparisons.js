const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {chromium}=require('playwright');
const {buildSync}=require('../frontend/finance/node_modules/esbuild');
const {periodFixture,ready}=require('./finance_reporting_periods');
const OUTPUT='/tmp/ha-finance-month-comparisons';

function modelChecks() {
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'finance-month-comparison-'));
 try {
  for(const module of ['reportingPeriod','cashflow'])buildSync({entryPoints:[path.resolve(__dirname,`../frontend/finance/src/lib/${module}.ts`)],bundle:true,platform:'node',format:'cjs',outfile:path.join(dir,`${module}.cjs`),logLevel:'silent'});
  const {resolvePeriod,comparisonMonths,alignComparisonDate,comparisonPlotPeriod,periodTicks}=require(path.join(dir,'reportingPeriod.cjs'));
  const {paymentBreakdown,paymentTimeline}=require(path.join(dir,'cashflow.cjs'));
  const select={mode:'month',month:'2026-08',year:2026,start:'2026-08-01',end:'2026-08-31',compareMonth:'2026-07',compareYear:null};
  const resolve=patch=>resolvePeriod({...select,...patch},'2026-09-06');
  assert.deepEqual(resolve({}).comparison.query,{start:'2026-07-01',end:'2026-07-31'});
  assert.deepEqual(resolve({month:'2026-09',compareMonth:'2026-08'}).comparison.query,{start:'2026-08-01',end:'2026-08-06'});
  assert.deepEqual(resolve({month:'2026-01',compareMonth:'2025-12'}).comparison.query,{start:'2025-12-01',end:'2025-12-31'});
  assert.deepEqual(resolve({month:'2024-03',compareMonth:'2024-02'}).comparison.query,{start:'2024-02-01',end:'2024-02-29'});
  assert.equal(resolvePeriod({...select,month:'2026-02',compareMonth:'2026-01'},'2026-02-28').comparison.end,'2026-01-28','The current month still uses elapsed days on its final day');
  for(const compareMonth of ['2026-08','2026-09','2026-13','bad',null])assert.equal(resolve({compareMonth}).comparison,undefined);
  assert.deepEqual(comparisonMonths('2026-01','2025-10'),['2025-12','2025-11','2025-10']);
  assert.deepEqual(comparisonMonths('2023-07','2023-07'),[]);
  assert.deepEqual(resolve({mode:'calendar',compareYear:2025}).comparison.query,{start:'2025-01-01',end:'2025-09-06'});
  const {period,comparison}=resolve({month:'2026-02',compareMonth:'2026-01'});
  assert.equal(comparison.end,'2026-01-31','Completed months compare in full, including longer reference months');
  assert.equal(alignComparisonDate('2026-01-31',comparison,period),'2026-03-03');
  const plot=comparisonPlotPeriod(period,comparison);
  assert.equal(plot.end,'2026-03-03');assert.equal(plot.wide,false);
  assert.equal(periodTicks(plot).at(-1).label,'29','Extended month axis labels stay day numbers');
  const accounts=[{id:1,name:'Savings',kind:'cash'}];
  const empty=paymentBreakdown([],accounts,accounts,period);
  const txns=[29,30,31].map(day=>({id:day,account_id:1,amount:'100.01',transaction_type:'withdrawal',posted_at:`2026-01-${day}T12:00:00+05:30`}));
  const previous=paymentBreakdown(txns,accounts,accounts,comparison);
  const rows=paymentTimeline(empty,period,previous,comparison);
  assert.equal(rows.length,31);
  assert.equal(Math.round(rows.reduce((sum,row)=>sum+(row.savingsPrevious||0),0)*100),30003,'All three extra days counted exactly once');
  assert.deepEqual(rows.slice(28).map(row=>[row.savings,row.savingsPrevious,row.refDate]),[
   [null,100.01,'2026-01-29'],[null,100.01,'2026-01-30'],[null,100.01,'2026-01-31']]);
  const reverse=resolve({month:'2026-03',compareMonth:'2026-02'});
  const reverseRows=paymentTimeline(empty,reverse.period,empty,reverse.comparison);
  assert(reverseRows.slice(28).every(row=>row.savingsPrevious===null),'Short reference months do not invent extra zero days');
  console.log('Month comparison boundaries, complete/elapsed dates, year rollover, leap day and unequal month totals passed.');
 } finally {fs.rmSync(dir,{recursive:true,force:true});}
}

async function monthlyFixture(page) {
 await periodFixture(page);
 await page.evaluate(()=>{
  const request=window.hass.connection.sendMessagePromise;
  const monthEnd=month=>new Date(Date.UTC(Number(month.slice(0,4)),Number(month.slice(5)),0)).toISOString().slice(0,10);
  window.monthComparisonRequests=[];
  window.hass.connection.sendMessagePromise=async msg=>{
   window.monthComparisonRequests.push(msg);
   const query=msg.month?{...msg,start:`${msg.month}-01`,end:monthEnd(msg.month)}:msg;
   const result=await request(query);
   if(msg.type!=='family_finance/series'||!query.start)return result;
   const end=query.end<'2026-09-06'?query.end:'2026-09-06';
   return {...result,series:window.financeFixture.accounts.map(a=>{
    const balance=day=>String((a.id===3?-1:1)*(10000+Number(query.start.slice(5,7))*100+day));
    const points=[{ts:new Date(Date.parse(`${query.start}T00:00:00+05:30`)-1000).toISOString(),balance:balance(0)}];
    for(let ts=Date.parse(query.start);ts<=Date.parse(end);ts+=86400000){
     const date=new Date(ts).toISOString().slice(0,10);
     points.push({ts:`${date}T23:59:59+05:30`,balance:balance(Number(date.slice(8)))});
    }
    return {account_id:a.id,points};
   })};
  };
 });
}

if(require.main===module)(async()=>{
 modelChecks();fs.mkdirSync(OUTPUT,{recursive:true});
 const browser=await chromium.launch({headless:true});
 try {
  for(const width of [320,375,768,1440]) {
   const page=await browser.newPage({viewport:{width,height:1100},hasTouch:width===375,timezoneId:'Asia/Kolkata'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await monthlyFixture(page);
   const picker=page.locator('family-finance-month-card');
   const months=picker.getByLabel('Comparison month');
   const options=await months.locator('option').evaluateAll(els=>els.map(e=>({value:e.value,label:e.textContent})));
   assert.equal(options[1].value,'2026-08');assert.equal(options.at(-1).value,'2023-02');
   assert.equal(options[1].label,'August 2026');assert.equal(options.at(-1).label,'February 2023');
   assert.equal(options.length,44);assert(!options.some(o=>o.value==='2026-09'));
   await picker.getByLabel('Reporting month').fill('2026-08');
   await months.selectOption('2026-07');await ready(page);
   for(const kind of ['overview','series','spending_summary','spending_recurring','spending_investments','spending_transactions']) {
    assert(await page.evaluate(kind=>window.monthComparisonRequests.some(m=>m.type===`family_finance/${kind}`&&m.start==='2026-07-01'&&m.end==='2026-07-31'),kind),`${kind} compares the selected month`);
   }
   assert.match(await picker.locator('.period-context').innerText(),/Full calendar months/);
   assert.match(await page.locator('family-finance-spending-card .period-total-comparison').innerText(),/₹6,800.*₹6,700/s);
   assert.equal(await page.locator('.comparison-history').count(),1);
   assert.equal(await page.locator('.savings-reference-line').count(),1);
   assert.equal(await page.locator('.comparison-balance-line').count(),1);
   assert.equal(await page.locator('.period-trend').count(),3);
   await picker.screenshot({path:path.join(OUTPUT,`month-selector-${width}.png`)});

   await picker.getByLabel('Reporting month').fill('2026-02');await months.selectOption('2026-01');await ready(page);
   assert(await page.evaluate(()=>window.monthComparisonRequests.some(m=>m.start==='2026-01-01'&&m.end==='2026-01-31')));
   const accounts=page.locator('family-finance-accounts-card');
   await accounts.getByRole('button',{name:'Daily account',exact:true}).click();
   for(const selector of ['.savings-chart .recharts-wrapper','.payment-chart .recharts-wrapper']) {
    const chart=accounts.locator(selector);await chart.scrollIntoViewIfNeeded();
    const box=await chart.boundingBox(),point={x:box.width-14,y:70};
    if(width===375)await chart.tap({position:point});else await chart.hover({position:point});
    const tooltip=chart.getByRole('tooltip');await tooltip.waitFor();
    assert.match(await tooltip.innerText(),/31 Jan 2026/);
    assert(!/Mar 2026|Feb 2026/.test(await tooltip.innerText()),'No invented dates for reference-only days');
    const bounds=await tooltip.boundingBox();assert(bounds.x>=0&&bounds.x+bounds.width<=width+1);
    await page.keyboard.press('Escape');
   }
   const history=page.locator('.comparison-history .recharts-wrapper');await history.scrollIntoViewIfNeeded();
   await history.hover({position:{x:(await history.boundingBox()).width-14,y:90}});
   await history.getByRole('tooltip').waitFor();assert.match(await history.getByRole('tooltip').innerText(),/31 Jan 2026/);
   assert(!/Mar 2026/.test(await history.getByRole('tooltip').innerText()));
   await page.mouse.move(0,0);
   const credit=page.locator('family-finance-cardcycle-card');
   const edges=await credit.evaluate(el=>{
    const a=el.shadowRoot.querySelector('.comparison-balance-line').getBBox();
    const b=el.shadowRoot.querySelector('path[stroke="var(--nb-ink)"][opacity="0.95"]').getBBox();
    return {reference:a.x+a.width,current:b.x+b.width};
   });assert(edges.reference>edges.current,'Longer comparison line retains its final days');
   await accounts.screenshot({path:path.join(OUTPUT,`unequal-months-${width}.png`)});

   await picker.getByLabel('Reporting month').fill('2026-09');await months.selectOption('2026-08');await ready(page);
   assert(await page.evaluate(()=>window.monthComparisonRequests.some(m=>m.start==='2026-08-01'&&m.end==='2026-08-06')));
   assert.match(await picker.locator('.period-context').innerText(),/Matching days elapsed/);
   await page.evaluate(()=>{window.holdRequest=m=>m.type==='family_finance/spending_investments'&&m.start==='2026-07-01';});
   await months.selectOption('2026-07');await page.waitForFunction(()=>window.pendingRequests.length>0);
   await page.waitForFunction(()=>[...document.querySelectorAll('main > *')].filter(el=>el.tagName!=='FAMILY-FINANCE-INVESTMENTS-CARD').every(el=>!el.shadowRoot?.querySelector('.card[aria-busy="true"]')));
   assert.equal(await page.locator('.loading-spinner').count(),1);
   await months.selectOption('2026-06');await ready(page);
   await page.evaluate(()=>{window.holdRequest=null;window.pendingRequests.splice(0).forEach(r=>r.resolve());});
   assert.match(await page.locator('family-finance-investments-card .period-legend').innerText(),/June 2026/);
   assert(!/July 2026/.test(await page.locator('family-finance-investments-card .period-legend').innerText()));

   await picker.getByRole('button',{name:'Calendar year',exact:true}).click();
   assert.equal(await months.count(),0);assert.equal(await picker.getByLabel('Comparison year').inputValue(),'');
   await picker.getByLabel('Comparison year').selectOption('2025');await ready(page);
   await picker.getByRole('button',{name:'Month',exact:true}).click();await ready(page);
   assert.equal(await months.inputValue(),'');assert.equal(await page.locator('.comparison-history').count(),0);
   await picker.getByLabel('Reporting month').fill('2023-02');await ready(page);
   assert(await months.isDisabled());assert.equal(await months.locator('option').count(),1);
   await picker.getByLabel('Reporting month').fill('2024-01');await months.selectOption('2023-12');await ready(page);
   assert(await page.evaluate(()=>window.monthComparisonRequests.some(m=>m.start==='2023-12-01'&&m.end==='2023-12-31')));

   const before=await page.evaluate(()=>window.messages.length);
   await page.evaluate(()=>{for(const el of document.querySelectorAll('main > *'))if(el.shadowRoot)el.hass={...window.hass,user:{id:'other'}};});
   await page.locator('family-finance-stat-card .status').filter({hasText:'private'}).waitFor();
   assert.equal(await page.locator('.comparison-history,.cashflow-charts,.period-trend').count(),0);
   assert.equal(await page.evaluate(()=>window.messages.length),before);
   assert.deepEqual(errors,[]);
   console.log(`${width}px month options, all-panel comparisons, longer-month tails, hover/tap dates, spinners, stale requests, mode reset and privacy passed.`);
   await page.close();
  }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
