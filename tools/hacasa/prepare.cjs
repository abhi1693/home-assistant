// Generate reviewable per-user imports and an isolated upstream preview.
// Does not contact Home Assistant or edit runtime settings.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'design/hacasa');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const write=(p,v)=>{const dest=path.join(out,p);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,JSON.stringify(v,null,2)+'\n');};
const registry=read('access/rooms.json'),policy=read('access/family-dashboard.json');
const pages={},fans=[];
for(const room of registry.rooms){const add=[];for(const mod of room.modules){if(mod.pending)continue;if(mod.type==='fans')for(const f of mod.fans){fans.push(f);add.push(f.fan);}if(mod.type==='media'&&mod.players.length)add.push(mod.players[0]);if(mod.kind==='dishwasher')add.push('device:'+mod.device_id);}pages[room.area_id]={add};}
assert.equal(registry.rooms.length,7);assert.equal(fans.length,8);
const profiles={};
for(const [key,profile]of Object.entries(policy.profiles)){
 const more=[{label:'Full fan controls',sub:'Existing sleep, timer, LED and Boost controls',icon:'mdi:fan',path:'/home-tablet/rooms'},{label:'Security & clips',icon:'mdi:shield-home-outline',path:'/home-tablet/security'},{label:'People & household',icon:'mdi:account-group-outline',path:'/home-tablet/people'},{label:'Household lists & announcements',icon:'mdi:home-outline',path:'/home-tablet/home'},{label:'My health',icon:'mdi:heart-pulse',path:'/home-tablet/health'}];
 if(profile.is_owner)more.push({label:'Finance',icon:'mdi:finance',path:'/home-tablet/finance'},{label:'Rack',icon:'mdi:server-network',path:'/rack-admin/overview'});
 const config={rooms:registry.rooms.map(r=>r.area_id),pages,home:{weather:'weather.home',temperature:'sensor.home_temperature',humidity:'sensor.home_humidity',calendars:key==='abhimanyu'?[...policy.calendars.shared,...policy.calendars.owner_only]:policy.calendars.shared},more};
 profiles[key]=config;write('generated/profiles/'+key+'.json',config);
}
write('preview/rooms.json',registry);write('preview/profiles.json',profiles);
write('generated/fan-control-coverage.json',fans.map(f=>({fan:f.fan,default_hacasa:['power','percentage speed'],existing_full_control_route:'/home-tablet/rooms',preserved_existing_entities:{led:f.led,sleep:f.sleep,timer:f.timer,timer_elapsed:f.timer_elapsed},limitation:'Native HaCasa does not bind separate Atomberg sleep/timer entities. Existing guarded controls remain available; native control parity is not claimed.'})));
console.log('Generated seven rooms, eight explicit fans and three profile imports. No live changes.');
