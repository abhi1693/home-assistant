const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {chromium} = require('playwright');
const {buildSync} = require('../frontend/finance/node_modules/esbuild');
const {fixture} = require('./finance_dashboard_components');
const OUTPUT = '/tmp/ha-finance-cashflow';

// Exercise transaction semantics independently of chart rendering.
function modelChecks() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'finance-cashflow-model-'));
  try {
    buildSync({entryPoints:[path.resolve(__dirname,'../frontend/finance/src/lib/cashflow.ts')],bundle:true,platform:'node',format:'cjs',outfile:path.join(dir,'model.cjs'),logLevel:'silent'});
    const {savingsAccounts,paymentBreakdown,paymentTimeline,savingsTimeline} = require(path.join(dir,'model.cjs'));
    const accounts = [{id:1,name:'Renamed bank',kind:'cash'},{id:2,name:'Savings',kind:'cash'},
      {id:3,name:'Card',kind:'credit',hidden:true,balance:'5000'}, {id:4,name:'Cash wallet',kind:'cash'},
      {id:5,name:'EMI Principal',kind:'cash'}, {id:6,name:'Savings fund',kind:'investment'}];
    assert.deepEqual(savingsAccounts(accounts).map(a=>a.id),[2]);
    assert.deepEqual(savingsAccounts(accounts,[1,2,6]).map(a=>a.id),[1,2]);
    assert.deepEqual(savingsAccounts(accounts,[]),[]);
    const period={start:'2026-09-01',end:'2026-09-30',actualEnd:'2026-09-06',wide:false};
    const txn=(id,account_id,amount,transaction_type='withdrawal',posted_at='2026-09-02T12:00:00+05:30')=>({id,account_id,amount,transaction_type,posted_at});
    const rows=[txn(1,1,'100.01'),txn(2,2,'200.02'),txn(3,3,'400.03'),txn(4,4,'50.04'),
      txn(3,3,'400.03'), // duplicated journal returned twice
      txn(5,1,'5000','transfer'),txn(5,2,'-5000','transfer'), // own transfer, both legs
      txn(6,1,'400','transfer'),txn(6,3,'-400','transfer'), // repayment, both legs
      txn(7,1,'1000','transfer'),txn(7,6,'-1000','transfer'), // investment contribution
      txn(8,1,'-10000','deposit'),txn(9,3,'-40','deposit'), // income/refund
      txn(10,1,'999','withdrawal','2026-09-07T00:00:00+05:30'), // future
      txn(11,1,'999','withdrawal','2026-08-31T12:00:00+05:30'), // outside selection
      {...txn(12,1,'999'),pending:true}, txn(13,1,'-20'), // invalid/unfinished
      txn(14,1,'0.10'), txn(15,1,'0.20'), // decimal accuracy
      txn(16,3,'1','withdrawal','2026-08-31T19:00:00Z')]; // Sept 1 in India
    const actual=paymentBreakdown(rows,accounts,savingsAccounts(accounts,[1,2]),period);
    assert.deepEqual(actual.totals,{savings:30033,credit:40103,other:5004});
    assert.equal(actual.total,75140);
    const daily=paymentTimeline(actual,period);
    assert.equal(daily.length,30);
    assert.equal(daily[6].savings,null,'Future is not a recorded zero');
    assert.equal(daily.reduce((sum,r)=>sum+Math.round((r.credit||0)*100),0),40103);
    const monthlyPeriod={...period,start:'2026-01-01',end:'2026-12-31',wide:true};
    const monthly=paymentTimeline(paymentBreakdown(rows,accounts,savingsAccounts(accounts,[1,2]),monthlyPeriod),monthlyPeriod);
    assert.equal(monthly.length,12);assert.equal(monthly[9].credit,null);
    const leap={start:'2024-02-28',end:'2024-03-01',actualEnd:'2024-03-01',wide:false};
    const ref={start:'2023-02-28',end:'2023-03-01',actualEnd:'2023-03-01',wide:false};
    const old=paymentBreakdown([txn(1,1,'123','withdrawal','2023-02-28')],accounts,[accounts[0]],ref);
    const empty=paymentBreakdown([],accounts,[],leap);
    assert.equal(paymentTimeline(empty,leap,old,ref).reduce((sum,r)=>sum+(r.savingsPrevious||0),0),123,'Leap day does not count Feb 28 twice');
    const nonLeap = {start:'2025-02-28',end:'2025-03-01',actualEnd:'2025-03-01',wide:false};
    const leapPayments = paymentBreakdown([txn(20,1,'10','withdrawal','2024-02-28'),txn(21,1,'20','withdrawal','2024-02-29')],accounts,[accounts[0]],leap);
    const aligned = paymentTimeline(empty,nonLeap,leapPayments,leap);
    assert.equal(aligned.reduce((sum,r)=>sum+(r.savingsPrevious||0),0),30,'Reference Feb 29 is not dropped when current year is not leap');
    assert.equal(aligned[0].refEndDate,'2024-02-29');
    const onlyLeapDay = {...leap,start:'2024-02-29',end:'2024-02-29',actualEnd:'2024-02-29'};
    assert.equal(paymentTimeline(empty,onlyLeapDay,old,{...ref,end:'2023-02-28',actualEnd:'2023-02-28'})[0].savingsPrevious,123);
    const history=[{account_id:1,points:[{ts:'2026-08-31T23:59:59+05:30',balance:'1000'},{ts:'2026-09-01T23:59:59+05:30',balance:'900'}]},
      {account_id:3,points:[{ts:'2026-09-01T23:59:59+05:30',balance:'-99999'}]}];
    const line=savingsTimeline(history,[accounts[0]],period);
    assert.deepEqual(line.map(r=>r.value),[1000,900]);
    assert.equal(line[0].ts,Date.parse('2026-09-01T00:00:00+05:30'),'Opening uses the previous closing balance');
    console.log('Cashflow model: exact cents, savings scope, purchase classification, transfer exclusions, dates and leap comparisons passed.');
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
}
async function ready(page) {
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await page.waitForFunction(()=>[...document.querySelectorAll('main > *')].every(el=>!el.shadowRoot?.querySelector('.card[aria-busy="true"]')));
}
(async()=>{
  modelChecks();fs.mkdirSync(OUTPUT,{recursive:true});const browser=await chromium.launch({headless:true});
  try {
    for(const width of [375,768,1440]) {
      const page=await browser.newPage({viewport:{width,height:1100},hasTouch:width===375,timezoneId:'Asia/Kolkata'});
      await page.clock.setFixedTime(new Date('2026-09-06T12:00:00+05:30'));
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await fixture(page,true);
      await page.evaluate(()=>{
        const original=window.hass.connection.sendMessagePromise;
        window.hass.connection.sendMessagePromise=async msg=>{
          const result=await original(msg);
          if(msg.type!=='family_finance/spending_transactions')return result;
          const t=(id,account_id,amount,transaction_type='withdrawal')=>({id,account_id,amount,transaction_type,posted_at:`${msg.month}-02T12:00:00+05:30`,pending:false});
          return {...result,transactions:window.emptyCashflow?[]:[t(1,1,'100.01'),t(2,2,'200.02'),t(3,3,'400.03'),t(4,4,'50.04'),t(5,1,'9999','transfer'),t(5,3,'-9999','transfer'),t(6,1,'-40000','deposit')]};
        };
      });
      const picker=page.locator('family-finance-month-card');
      await picker.getByLabel('Reporting month').fill('2026-08');await ready(page);
      const card=page.locator('family-finance-accounts-card');
      assert.equal(await card.locator('.account-item').count(),0);
      assert.equal(await card.locator('.savings-tabs button').count(),3);
      assert.equal(await card.locator('.savings-total').innerText(),'₹7,31,000');
      assert.equal(await card.locator('.payment-total').innerText(),'₹750 spent');
      assert.equal(await card.locator('[data-method="savings"] strong').innerText(),'₹300');
      assert.equal(await card.locator('[data-method="credit"] strong').innerText(),'₹400');
      assert.equal(await card.locator('[data-method="other"] strong').innerText(),'₹50');
      assert.equal(await card.locator('.savings-balance-line').count(),1);
      assert(await card.locator('.payment-chart .recharts-bar').count()===3);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      const height=(await card.boundingBox()).height;assert(height<(width>800?460:790),`${width}px panel too tall: ${height}`);
      await card.screenshot({path:path.join(OUTPUT,`cashflow-${width}.png`)});
      const count=await page.evaluate(()=>window.messages.length);
      await card.getByRole('button',{name:'Daily account',exact:true}).click();
      assert.equal(await card.locator('.savings-total').innerText(),'₹91,000');
      assert.equal(await card.locator('.payment-total').innerText(),'₹750 spent','Savings chart filter does not change purchase scope');
      await card.getByRole('button',{name:'Show credit cards spending by account'}).click();
      assert.equal(await card.locator('.payment-account').count(),1);
      assert.match(await card.locator('.payment-account').innerText(),/Credit card.*₹400/s);
      assert.equal(await page.evaluate(()=>window.messages.length),count,'Chart filters and details use loaded data');
      await card.getByRole('button',{name:'Show direct from savings spending by account'}).click();
      assert.equal(await card.locator('.payment-account').count(),2);
      await card.getByRole('button',{name:'Close spending by account'}).click();
      const explain=card.getByRole('button',{name:'Explain spending by payment method'});
      await explain.click();await card.getByRole('tooltip').waitFor();
      assert.match(await card.getByRole('tooltip').innerText(),/Paying the card bill does not count again/);
      const tip=await card.getByRole('tooltip').boundingBox();assert(tip.x>=0&&tip.x+tip.width<=width);
      await page.keyboard.press('Escape');
      await page.evaluate(()=>{window.emptyCashflow=true;});
      await picker.getByLabel('Reporting month').fill('2026-09');await ready(page);
      assert.equal(await card.locator('.payment-total').innerText(),'₹0 spent');
      assert.equal(await card.locator('[data-method="other"]').count(),0);
      assert.equal(await card.getByText('No purchases recorded in this period.').count(),1);
      assert.equal(await card.locator('.savings-total').innerText(),'₹7,12,000','Period resets account filter');
      const before=await page.evaluate(()=>window.messages.length);
      await page.evaluate(()=>{document.querySelector('family-finance-accounts-card').hass={...window.hass,user:{id:'other'}};});
      await card.getByText('This dashboard is private.').waitFor();
      assert.equal(await card.locator('.cashflow-charts').count(),0);assert.equal(await page.evaluate(()=>window.messages.length),before);
      assert.deepEqual(errors,[]);console.log(`${width}px charts, exact totals, account filters, details, empty state, tooltip and privacy passed (${height}px high).`);
      await page.close();
    }
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
