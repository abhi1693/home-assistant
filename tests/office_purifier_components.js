
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const ROOT = path.resolve(__dirname, "..");
const output = "/tmp/ha-office-purifier";
const office = JSON.parse(fs.readFileSync(path.join(ROOT, "access/rooms.json"))).rooms.find(room => room.slug === "office");
(async () => {
  fs.mkdirSync(output, {recursive:true});
  const browser = await chromium.launch({executablePath:"/usr/bin/google-chrome",headless:true});
  for (const [name,width,height] of [["phone",375,812],["landscape",844,390],["tablet",1024,768],["desktop",1440,1000]]) {
    const page = await browser.newPage({viewport:{width,height}});
    await page.setContent(`<style>:root{--primary-text-color:#f8f9fb;--rgb-primary-text-color:248,249,251;--primary-font-family:Arial;--secondary-font-family:Arial;--contrast1:#080b10;--contrast2:#11161e;--contrast3:#18202b;--contrast4:#222d3a;--contrast5:#2d3a49;--contrast8:#6d7d91;--contrast9:#8898ac;--contrast10:#97a5b7;--contrast12:#b9c6d8;--contrast13:#c4cede;--contrast15:#d7dee7;--contrast20:#fff;--teal:#57ded4;--pink:#f47dcc;--red:#ff768a;--room-accent:var(--teal)}*{box-sizing:border-box}body{margin:0;padding:12px;background:#080b10;color:#f8f9fb;font-family:Arial}main{max-width:1200px;margin:auto}ha-card{display:block}</style><main></main>`);
    await page.evaluate(() => {
      customElements.define("ha-card", class extends HTMLElement {});
      customElements.define("ha-icon", class extends HTMLElement {});
      window.loadCardHelpers = async () => ({createCardElement(config) {
        const card = document.createElement(config.type.slice(7)); card.setConfig(config); return card;
      }});
    });
    for (const file of ["family-fan-card.js","family-purifier-card.js","family-room-card.js","family-media-card.js","family-rooms-card.js"]) await page.addScriptTag({path:path.join(ROOT,"www",file)});
    await page.evaluate(office => {
      window.calls = [];
      const e = office.modules[0].entities;
      const state = (state,attributes={}) => ({state,attributes});
      const states = {
        [e.fan]:state("on",{preset_modes:["Auto","Normal"],preset_mode:"Auto",percentage:null}),
        [e.pm25]:state("26",{unit_of_measurement:"µg/m³"}),[e.pm10]:state("26",{unit_of_measurement:"µg/m³"}),
        [e.night]:state("off"),[e.hepa]:state("100"),[e.carbon]:state("100"),
        "fan.office_fan":state("unavailable"),"media_player.abhimanyu_s_echo":state("idle",{friendly_name:"Abhimanyu’s Echo",volume_level:0.2,supported_features:0})
      };
      window.hass = {states,callService:async (...args) => {window.calls.push(args);}};
      const router = document.createElement("family-rooms-card");
      const room = document.createElement("family-room-card");
      room.setConfig({name:"Office",icon:"mdi:desk",accent:"var(--teal)",occupants:["Primary: Abhimanyu"],cards:office.modules.map(m=>router._moduleConfig(m))});
      room.hass=window.hass;document.querySelector("main").append(room);window.room=room;window.e=e;
    }, office);
    const purifier = page.locator("family-purifier-card");
    await purifier.getByRole("button",{name:"Auto",exact:true}).waitFor();
    assert.equal(await purifier.getByLabel("Purifier fan speed").isEnabled(),false);
    assert.equal(await purifier.getByLabel("Purifier fan speed").inputValue(),"");
    await purifier.getByRole("button",{name:"Manual",exact:true}).click();
    assert.deepEqual(await page.evaluate(()=>window.calls.pop()),["fan","set_preset_mode",{entity_id:office.modules[0].entities.fan,preset_mode:"Normal"}]);
    await page.evaluate(()=>{window.hass.states[window.e.fan].attributes={preset_modes:["Auto","Normal"],preset_mode:"Normal",percentage:40};window.room.hass={...window.hass};});
    await purifier.getByLabel("Purifier fan speed").selectOption("70");
    assert.deepEqual(await page.evaluate(()=>window.calls.pop()),["fan","set_percentage",{entity_id:office.modules[0].entities.fan,percentage:70}]);
    await purifier.getByRole("button",{name:"Night off",exact:true}).click();
    assert.deepEqual(await page.evaluate(()=>window.calls.pop()),["switch","turn_on",{entity_id:office.modules[0].entities.night}]);
    await purifier.getByRole("button",{name:"Turn purifier off"}).click();
    assert.deepEqual(await page.evaluate(()=>window.calls.pop()),["fan","turn_off",{entity_id:office.modules[0].entities.fan}]);
    await purifier.locator("summary").focus();await page.keyboard.press("Enter");
    assert.equal(await purifier.locator("details").getAttribute("open"),"");
    assert.match(await purifier.locator("details").innerText(),/100% remaining/);
    const fanHeight = await page.locator("family-fan-card").boundingBox();
    assert.ok(fanHeight.height < 150,`compact fan too large ${fanHeight.height}`);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    assert.equal(overflow,false,`overflow at ${name}`);
    await page.evaluate(()=>{window.hass.states[window.e.fan].attributes.preset_mode="Auto";window.hass.states[window.e.fan].attributes.percentage=null;window.room.hass={...window.hass};});
    await page.screenshot({path:path.join(output,`${name}.png`),fullPage:true});
    // Unknown sensor values must never appear as zero; commands disabled when unavailable.
    await page.evaluate(()=>{window.hass.states[window.e.pm25].state="unavailable";window.hass.states[window.e.fan].state="unavailable";window.room.hass={...window.hass};});
    assert.equal(await purifier.getByRole("button",{name:"Purifier unavailable"}).isEnabled(),false);
    assert.match(await purifier.locator(".readings").innerText(),/Indoor PM2.5\s*Unavailable/);
    // A focused select defers incoming state changes only until focus leaves.
    await page.evaluate(()=>{window.hass.states[window.e.fan]={state:"on",attributes:{preset_modes:["Auto","Normal"],preset_mode:"Normal",percentage:40}};window.room.hass={...window.hass};});
    await purifier.getByLabel("Purifier fan speed").focus();
    await page.evaluate(()=>{window.hass.states[window.e.fan].attributes.preset_mode="Auto";window.hass.states[window.e.fan].attributes.percentage=null;window.room.hass={...window.hass};});
    await purifier.locator("summary").focus();
    assert.equal(await purifier.getByLabel("Purifier fan speed").isEnabled(),false);
    // Background sensor updates must not pull focus back into the card.
    await purifier.locator("summary").focus();
    await page.evaluate(() => {
      const outside = document.createElement("button"); outside.id = "outside"; outside.textContent = "Outside";
      document.body.append(outside); outside.focus();
      window.hass.states[window.e.pm10].state = "27"; window.room.hass = {...window.hass};
    });
    assert.equal(await page.evaluate(() => document.activeElement.id), "outside");
    // Service failure is visible without optimistic device state.
    await page.evaluate(()=>{window.hass.states[window.e.fan].state="on";window.hass.callService=async()=>{throw new Error("Device did not respond");};window.room.hass={...window.hass};});
    await purifier.getByRole("button",{name:"Turn purifier off"}).click();
    assert.match(await purifier.getByRole("alert").innerText(),/Device did not respond/);
    await page.close();
  }
  await browser.close();
  console.log("Office purifier: 4 responsive layouts; control contracts, Auto/null speed, unavailable/error states, compact fan and accessible details passed.");
})().catch(error=>{console.error(error);process.exit(1);});
