const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = process.env.HA_FINANCE_TEST_OUTPUT || "/tmp/ha-finance-components";
const OWNER = "9302d11f48c64fe796a3c9e5cb563650";

async function fixture(page) {
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
  await page.evaluate(owner => {
    const today = new Date();
    const month = new Intl.DateTimeFormat("en-CA", {timeZone:"Asia/Kolkata", year:"numeric",month:"2-digit"}).format(today).slice(0,7);
    const now = today.toISOString();
    const accounts = [
      {id:1,name:"Daily account",balance:"72000",kind:"cash"},
      {id:2,name:"Savings",balance:"640000",kind:"cash"},
      {id:3,name:"Credit card",balance:"-18000",kind:"credit"},
    ].map(a=>({...a,provider:"firefly-iii",org_name:"Firefly III",org_domain:"",nickname:null,currency:"INR",category:null,hidden:false,balance_at:now,created_at:"2026-01-01"}));
    const overview = {entry_id:"firefly",currency:"INR",accounts,me:{censored:false,can_reveal:false,revealed:true,code_required:false,reveal_expires:null},default_reveal_ttl_minutes:0};
    const series = accounts.map(a=>({account_id:a.id,points:Array.from({length:181},(_,i)=>({
      ts:new Date(today.getTime()-(180-i)*86400000).toISOString(),
      balance:String(Number(a.balance)-(a.kind==="credit"?0:((180-i)*250+Math.sin(i)*3000))),
    }))}));
    const recurring = {month,censored:false,today:now.slice(0,10),streams:[{
      merchant_key:"rent",merchant:"Rent",theme:"housing",frequency:"monthly",interval_days:30.4375,
      average_amount:"25000",monthly_amount:"25000",last_amount:"25000",active:true,is_income:false,
      first_seen:"2026-01-01",last_seen:`${month}-02`,count:1,logo_url:null,
    }],actuals:[{merchant_key:"rent",date:`${month}-02`,amount:"25000",is_income:false}],expected:[]};
    window.messages=[];
    const connection={sendMessagePromise:async msg=>{
      window.messages.push(msg);
      const kind=msg.type.split("/")[1];
      if(kind==="overview")return overview;
      if(kind==="series")return {series,censored:false};
      if(kind==="spending_recurring")return {...recurring,month:msg.month};
      if(kind==="spending_summary")return {month:msg.month,censored:false,total_spend:"32000",total_income:"125000",themes:[
        {theme:"Housing",total:"25000",count:1},{theme:"Groceries",total:"5000",count:7},{theme:"Dining",total:"2000",count:3},
      ]};
      if(kind==="spending_transactions")return {month:msg.month,censored:false,transactions:[{
        id:1,account_id:3,posted_at:`${msg.month}-02T12:00:00+05:30`,amount:"25000",merchant:"Rent <script>bad()</script>",merchant_key:"rent",description:"Test rent",theme:"Housing",logo_url:null,pending:false,transaction_type:"withdrawal",
      },{id:2,account_id:3,posted_at:`${msg.month}-03T12:00:00+05:30`,amount:"-12000",merchant:"Card payment",merchant_key:"payment",description:"Repayment",theme:"transfers",pending:false,transaction_type:"transfer"}]};
      throw Error(`Unexpected finance request ${msg.type}`);
    }};
    window.hass={user:{id:owner},connection};
    const cards=[
      ["stat",{title:"Tracked net worth",layout:"banner",show_range_selector:false,range:"1m"},true],
      ["worth",{title:"Net worth over time",range:"6m",mode:"total",compact:true},true],
      ["spending",{title:"Monthly spending"},true],
      ["accounts",{title:"Accounts",show_range_selector:false},false],
      ["bills",{title:"Scheduled bills"},false],
      ["cardcycle",{title:"Credit cards"},true],
    ];
    for(const [kind,config,full] of cards){
      const card=document.createElement(`family-finance-${kind}-card`);
      card.setConfig({type:`custom:family-finance-${kind}-card`,allowed_user_id:owner,background:"off",...config});
      if(full)card.className="full";
      card.hass=window.hass;
      document.querySelector("main").append(card);
    }
  }, OWNER);
  await page.locator("family-finance-stat-card .stat-value").waitFor();
  await page.waitForFunction(() => [...document.querySelectorAll("main > [class],main > family-finance-accounts-card,main > family-finance-bills-card")].every(c=>!c.shadowRoot?.textContent.includes("Loading…")));
}

(async()=>{
  fs.mkdirSync(OUTPUT,{recursive:true});
  const browser=await chromium.launch({headless:true});
  try {
    for(const width of [375,768,1440]) {
      const page=await browser.newPage({viewport:{width,height:1100},timezoneId:"Asia/Kolkata"});
      const errors=[];page.on("pageerror",e=>errors.push(e.message));
      await fixture(page);
      assert.match(await page.locator("family-finance-stat-card .stat-value").innerText(),/₹/);
      assert.equal(await page.locator("button.lock").count(),0);
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
      await page.close();
    }
  } finally { await browser.close(); }
  console.log(`Finance desktop/tablet/mobile, INR, drill-down, month requests and account switching passed. Screenshots: ${OUTPUT}`);
})().catch(e=>{console.error(e);process.exitCode=1;});
