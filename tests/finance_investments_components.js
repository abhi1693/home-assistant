const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const {chromium}=require('playwright');
const {fixture}=require('./finance_dashboard_components');
const OUTPUT=process.env.HA_FINANCE_TEST_OUTPUT||'/tmp/ha-finance-investment-design';

async function ready(page) {
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await page.waitForFunction(()=>[...document.querySelectorAll('main > *')].every(el=>!el.shadowRoot?.querySelector('.card[aria-busy="true"]')));
  assert.equal(await page.locator('.error-box').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
}

(async()=>{
  fs.mkdirSync(OUTPUT,{recursive:true});
  const browser=await chromium.launch({headless:true});
  try {
    for(const width of [375,768,1440]) {
      const page=await browser.newPage({viewport:{width,height:1050},hasTouch:width===375,timezoneId:'Asia/Kolkata'});
      await page.clock.setFixedTime(new Date('2026-09-06T12:00:00+05:30'));
      await fixture(page,true);
      await page.evaluate(()=>{
        const original=window.hass.connection.sendMessagePromise;
        const entry=(id,name,amount,date,status='recorded')=>({id,name,amount,date,status,source_account_id:1,destination_account_id:2});
        window.investmentExamples={
          recorded:[entry('monthly','Monthly fund','10000','2026-08-01'),entry('additional','Additional fund','4000','2026-08-03'),
            ...[4,11,18,25].map((d,i)=>entry(`gold-${i}`,'Gold plan','2000',`2026-08-${String(d).padStart(2,'0')}`))],
          expected:[entry('gold-next','Gold plan','2000','2026-09-08','scheduled'),entry('monthly-next','Monthly fund','10000','2026-09-01','awaiting_statement')]
        };
        window.hass.connection.sendMessagePromise=async msg=>{
          if(msg.type!=='family_finance/spending_investments')return original(msg);
          window.messages.push(msg);
          let recorded=msg.month==='2026-08'?window.investmentExamples.recorded:[],expected=msg.month==='2026-09'?window.investmentExamples.expected:[];
          if(window.investmentCase==='empty'){recorded=[];expected=[];}
          if(window.investmentCase==='single'){recorded=[entry('one','Only fund','500','2026-09-02')];expected=[];}
          if(window.investmentCase==='many'){recorded=Array.from({length:16},(_,i)=>entry(`p${i}`,`Example investment with a long name ${i+1}`,'10.01','2026-09-02'));expected=[];}
          const sum=rows=>(rows.reduce((n,r)=>n+Math.round(Number(r.amount)*100),0)/100).toFixed(2);
          return {month:msg.month,censored:false,recorded,expected,total_recorded:sum(recorded),total_pending:sum(expected),total_committed:sum([...recorded,...expected])};
        };
      });
      const picker=page.locator('family-finance-month-card').getByLabel('Reporting month');
      const card=page.locator('family-finance-investments-card');
      await picker.fill('2026-08');await ready(page);
      assert.equal(await card.locator('.investment-total').innerText(),'₹22,000');
      assert.equal(await card.locator('.investment-recorded').innerText(),'₹22,000');
      assert.equal(await card.locator('.investment-pending').innerText(),'₹0');
      assert.equal(await card.locator('.investment-row').count(),0);
      assert.equal(await card.locator('.investment-slice').count(),3);
      assert.deepEqual(await card.locator('.investment-provider-name').allTextContents(),['Monthly fund','Gold plan','Additional fund']);
      assert.deepEqual(await card.locator('.investment-provider > strong').allTextContents(),['₹10,000','₹8,000','₹4,000']);
      const colors=await card.locator('.investment-provider-dot').evaluateAll(els=>els.map(el=>el.style.background));
      assert.equal(new Set(colors).size,3);
      const slices=await card.locator('.investment-slice').evaluateAll(els=>els.map(el=>Number(el.getAttribute('stroke-dasharray').split(' ')[0])));
      assert(Math.abs(slices.reduce((a,b)=>a+b,0)-100)<.0001);
      const collapsed=(await card.boundingBox()).height;
      assert(collapsed<(width===375?460:340),`Compact card height: ${width}px → ${collapsed}px`);
      await card.screenshot({path:path.join(OUTPUT,`investments-${width}.png`)});
      assert.equal(await card.locator('.investment-details-toggle,.investment-payment-details').count(),0);
      assert.equal(await card.locator('button.investment-provider,[aria-controls]').count(),0);
      await card.locator('.investment-provider').filter({hasText:'Gold plan'}).click();
      assert.equal(await card.locator('.investment-row').count(),0,'Legend cannot open a redundant payment list');
      await picker.fill('2026-09');await ready(page);
      assert.equal(await card.locator('.investment-row').count(),0,'No dated list in any period');
      assert.equal(await card.locator('.investment-total').innerText(),'₹12,000');
      assert.equal(await card.locator('.investment-recorded').innerText(),'₹0');
      assert.equal(await card.locator('.investment-pending').innerText(),'₹12,000');
      assert.match(await card.locator('.investment-donut-total').innerText(),/Total committed/);
      assert.deepEqual(await card.locator('.investment-provider-meta').allTextContents(),['1 pending · 83.3%','1 pending · 16.7%']);
      await card.getByRole('button',{name:'Explain income after commitments'}).click();
      await card.getByRole('tooltip').waitFor();
      assert.match(await card.getByRole('tooltip').innerText(),/Recorded income − spending − remaining bills − investments/);
      await page.keyboard.press('Escape');
      for(const scenario of ['single','empty','many']) {
        await page.evaluate(s=>{window.investmentCase=s;document.dispatchEvent(new Event('visibilitychange'));},scenario);
        await ready(page);
        if(scenario==='single')assert.equal(await card.locator('.investment-slice').getAttribute('stroke-dasharray'),'100 0','One investment renders a complete ring');
        if(scenario==='empty'){
          assert.equal(await card.locator('.investment-total').innerText(),'₹0');
          assert.equal(await card.locator('.investment-slice').count(),0);
          assert.match(await card.locator('.investment-allocation').innerText(),/No investments recorded or scheduled/);
        }
        if(scenario==='many') {
          const colors=await card.locator('.investment-provider-dot').evaluateAll(els=>els.map(el=>el.style.background));
          assert.equal(new Set(colors).size,16);
          assert(await card.locator('.investment-provider-list').evaluate(el=>el.scrollHeight>el.clientHeight));
          assert((await card.boundingBox()).height<(width===375?480:375));
          assert.equal(await card.locator('.investment-row,.investment-details-toggle').count(),0);
        }
      }
      await page.evaluate(()=>{document.querySelector('family-finance-investments-card').hass={...window.hass,user:{id:'someone-else'}};});
      await card.locator('.status').filter({hasText:'private'}).waitFor();
      assert.equal(await card.locator('.investment-row,.investment-slice,.investment-total').count(),0);
      console.log(`${width}px: ${collapsed}px collapsed; grouping, totals, recorded/pending, chart-only presentation, single/empty/many cases and privacy passed.`);
      await page.close();
    }
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
