/* Three equipment slots, hidden materials, artisans and persistent durability. */
(function(root){
'use strict';
const R=root.PaperRPG||(typeof require!=='undefined'?require('./journey.js'):null),B={...R},C=R.center;
const GEAR={
 sword:{slot:'weapon',name:'旅人長劍',family:'sword',chapter:1,repair:20,description:'出手迅速，攻守均衡。'},
 spear:{slot:'weapon',name:'巡林長槍',family:'spear',chapter:1,repair:24,description:'攻擊距離較長，適合拉開距離。'},
 axe:{slot:'weapon',name:'渡口戰斧',family:'axe',chapter:1,repair:24,description:'單次傷害高，出手較慢。'},
 starblade:{slot:'weapon',name:'星芽長劍',family:'sword',chapter:1,attack:6,repair:28,description:'苔心木與螢晶鑄成，額外攻擊 +6。'},
 tidepike:{slot:'weapon',name:'潮鳴長槍',family:'spear',chapter:2,attack:10,repair:40,description:'霧銀槍身映著潮光，額外攻擊 +10。'},
 dawnaxe:{slot:'weapon',name:'歸星戰斧',family:'axe',chapter:3,attack:16,repair:55,description:'晨星礦與風羽平衡斧身，額外攻擊 +16。'},
 traveler:{slot:'body',name:'旅人護甲',chapter:1,repair:16,description:'熟悉的護甲，可繼續接受強化。'},
 leather:{slot:'body',name:'巡林皮甲',chapter:1,defense:2,price:55,repair:20,description:'輕巧皮甲，額外減傷 2。'},
 mail:{slot:'body',name:'港灣鎖甲',chapter:2,defense:5,price:120,repair:30,description:'細密鎖環保護身體，額外減傷 5。'},
 dawncoat:{slot:'body',name:'晨星戰衣',chapter:3,defense:8,price:220,repair:42,description:'要塞守衛的戰衣，額外減傷 8。'},
 mosscoat:{slot:'body',name:'苔紋護衣',chapter:1,defense:3,stamina:2,repair:26,description:'額外減傷 3；每秒體力恢復 +2。'},
 mistweave:{slot:'body',name:'霧織護衣',chapter:2,defense:6,mana:.12,repair:38,description:'額外減傷 6；每秒魔力恢復 +0.12。'},
 starplate:{slot:'body',name:'星紋鎧甲',chapter:3,defense:10,stamina:3,repair:52,description:'額外減傷 10；每秒體力恢復 +3。'},
 none:{slot:'charm',name:'不裝備護符',chapter:1,repair:0,description:'護符欄位留空。'},
 ward:{slot:'charm',name:'銅紋護符',base:'ward',chapter:1,repair:16,description:'額外減傷 2。'},
 moon:{slot:'charm',name:'月露護符',base:'moon',chapter:1,repair:18,description:'非戰鬥時魔力恢復加快。'},
 glowcharm:{slot:'charm',name:'螢石護符',chapter:1,mana:.35,repair:24,description:'每秒魔力恢復 +0.35，戰鬥中仍有效。'},
 mirrorcharm:{slot:'charm',name:'潮鏡護符',chapter:2,defense:2,mana:.5,repair:34,description:'額外減傷 2；每秒魔力恢復 +0.5。'},
 oatcharm:{slot:'charm',name:'守燈誓符',chapter:3,attack:6,defense:2,stamina:2,repair:48,description:'攻擊 +6、額外減傷 2、每秒體力恢復 +2。'}
};
// Five ordinary finds per chapter, plus three crafted pieces; starter sword/armor are additional.
Object.assign(GEAR,{
 tidesword:{slot:'weapon',name:'潮鋼長劍',family:'sword',chapter:2,attack:6,price:110,description:'潮鋼鍛造的劍刃，額外攻擊 +6。'},
 harborpike:{slot:'weapon',name:'港衛長槍',family:'spear',chapter:2,attack:5,price:125,description:'港口衛隊的長槍，額外攻擊 +5。'},
 shorecharm:{slot:'charm',name:'浪紋護符',chapter:2,attack:3,price:85,description:'潮聲鼓舞出手，攻擊 +3。'},
 reedcharm:{slot:'charm',name:'蘆風護符',chapter:2,stamina:2,price:95,description:'讓呼吸平穩，每秒體力恢復 +2。'},
 starsword:{slot:'weapon',name:'晨星長劍',family:'sword',chapter:3,attack:12,price:230,description:'要塞精製的長劍，額外攻擊 +12。'},
 skypike:{slot:'weapon',name:'雲途長槍',family:'spear',chapter:3,attack:10,price:245,description:'雲上巡守的長槍，額外攻擊 +10。'},
 dawnward:{slot:'charm',name:'晨光護符',chapter:3,defense:4,price:180,description:'晨光護住要害，額外減傷 4。'},
 starcharm:{slot:'charm',name:'星語護符',chapter:3,mana:.65,price:195,description:'每秒魔力恢復 +0.65，戰鬥中仍有效。'}
});
const GEAR_LEVELS={sword:1,traveler:1,spear:3,leather:3,ward:5,axe:7,moon:7,starblade:5,mosscoat:5,glowcharm:7,tidesword:11,shorecharm:11,mail:13,harborpike:15,mistweave:15,tidepike:17,reedcharm:17,mirrorcharm:19,starsword:21,dawnward:21,dawncoat:23,skypike:25,dawnaxe:27,starplate:27,starcharm:27,oatcharm:29,none:1};
const ECONOMY=Object.freeze({version:1,upgradeMultiplier:Object.freeze({1:1,2:1.15,3:1.15}),repairMultiplier:Object.freeze({1:1,2:2.1,3:2.2})});
const scaledGold=(amount,multiplier)=>Math.round(amount*Math.round(multiplier*100)/100);
const CRAFTED_IDS=new Set(['starblade','mosscoat','glowcharm','tidepike','mistweave','mirrorcharm','dawnaxe','starplate','oatcharm']);
function durabilityBudget(slot,level,special=false){const ordinary=slot==='body'?14+2*level:36+6*level;return Math.round(ordinary*(special?1.6:1));}
for(const [id,spec]of Object.entries(GEAR)){spec.level=GEAR_LEVELS[id];spec.special=CRAFTED_IDS.has(id);spec.durability=id==='none'?0:durabilityBudget(spec.slot,spec.level,spec.special);const baseRepair=id==='none'?0:Math.max(2,Math.round(((spec.slot==='weapon'?5:spec.slot==='body'?3:4)+spec.level*(spec.slot==='body'?.3:.4))*(spec.special?1.4:1)));spec.repair=scaledGold(baseRepair,ECONOMY.repairMultiplier[spec.chapter]);}
const MATERIALS={heartwood:{name:'苔心木',chapter:1},glowshard:{name:'螢晶碎片',chapter:1},rootore:{name:'守根銅礦',chapter:1},tideglass:{name:'潮鏡晶',chapter:2},mistsilver:{name:'霧銀礦',chapter:2},oldcloth:{name:'古紋布',chapter:2},dawnore:{name:'晨星礦',chapter:3},windfeather:{name:'風羽',chapter:3},starsilk:{name:'星絲',chapter:3}};
const ARTISANS={1:{name:'苔爐匠・洛木',workshop:'苔爐工坊',intro:'我只替願意走進原野的人加工。苔光藏室、倒木與舊石牆裡，還藏著會發光的材料。'},2:{name:'潮紋匠・汐蘭',workshop:'潮紋工坊',intro:'把潮鏡晶、霧銀礦與古紋布帶來，霧海留下的記憶就能成為裝備。'},3:{name:'星鑄師・嵐恩',workshop:'星鑄工坊',intro:'晨星礦、風羽與星絲能承受星脈。去看那些被人忽略的石縫、舊巢與藏室。'}};
const RECIPES={
 starblade:{chapter:1,cost:25,materials:{heartwood:2,glowshard:1}},mosscoat:{chapter:1,cost:30,materials:{heartwood:1,rootore:2}},glowcharm:{chapter:1,cost:25,materials:{glowshard:2,rootore:1}},
 tidepike:{chapter:2,cost:85,materials:{mistsilver:2,tideglass:1}},mistweave:{chapter:2,cost:95,materials:{oldcloth:2,mistsilver:1}},mirrorcharm:{chapter:2,cost:80,materials:{tideglass:2,oldcloth:1}},
 dawnaxe:{chapter:3,cost:150,materials:{dawnore:2,windfeather:1}},starplate:{chapter:3,cost:170,materials:{dawnore:1,starsilk:2}},oatcharm:{chapter:3,cost:145,materials:{windfeather:2,starsilk:1}}
};
const SOURCES={};
for(const [n,fields,mats]of [[1,['forest','river','ruins'],['heartwood','glowshard','rootore']],[2,['ashland','mirrormarsh','sandcity'],['tideglass','mistsilver','oldcloth']],[3,['skyroad','silentcourt','sanctuary'],['dawnore','windfeather','starsilk']]]){
 const spots=[['secret-'+fields[0],16,5,mats[0],2,'泛光的石縫'],['secret-'+fields[0],19,11,mats[1],1,'角落的舊行囊'],[fields[0],13,12,mats[0],1,'裂開的倒木'],[fields[1],18,12,mats[1],2,'水岸的暗光'],[fields[2],18,12,mats[2],2,'石牆下的包裹'],[fields[2],19,4,mats[2],1,'被苔遮住的石縫']];
 spots.forEach(([map,x,y,material,amount,name],i)=>{const id='material-'+n+'-'+i;SOURCES[id]={id,chapter:n,map,x,y,material,amount,name};});
 const hub=R.CHAPTERS[n-1].hub,id=hub+'-forge',a=ARTISANS[n];a.map=id;a.hub=hub;
 R.HOMES[id]={id,parent:hub,chapter:n,kind:'forge',name:a.workshop,door:[12,4]};
 R.MAPS[hub].blocks.push([10,1,4,3]);R.MAPS[hub].objects.push(['door-forge','dungeon',12,4,a.workshop,{map:id,at:[...R.HOME_LAYOUT.spawn],house:true}]);
 R.MAPS[id]={name:R.MAPS[hub].name+'・'+a.workshop,subtitle:'把沿途找到的微光，打造成能同行的力量',theme:'home',parent:hub,chapter:n,recommended:R.MAPS[hub].recommended,spawn:[...R.HOME_LAYOUT.spawn],blocks:R.HOME_LAYOUT.furniture.map(b=>[...b]),objects:[['home-exit','exit',...R.HOME_LAYOUT.exit,'走出工坊',{map:hub,at:[12,5]}],['artisan','gear-artisan',...R.HOME_LAYOUT.artisan,a.name],['forge-note','gear-note',...R.HOME_LAYOUT.note,'工匠的材料筆記']],enemies:[]};
}
const DEFAULT_EQUIPPED={weapon:'sword',body:'traveler',charm:'none'};
function makeState(){return {version:1,owned:['sword','traveler','none'],equipped:{...DEFAULT_EQUIPPED},durability:{sword:GEAR.sword.durability,traveler:GEAR.traveler.durability,none:0},materials:Object.fromEntries(Object.keys(MATERIALS).map(k=>[k,0])),collected:[],seen:[],met:[],crafted:[],tracked:null};}
function addOwned(g,id){if(!GEAR[id]||g.owned.includes(id))return;g.owned.push(id);g.durability[id]=GEAR[id].durability;}
function sync(s){const g=s.gear??=makeState();for(const id of [...(s.armory||[]),...(s.relics||[])])if(GEAR[id])addOwned(g,id);
 if(['sword','spear','axe'].includes(g.equipped.weapon)&&g.owned.includes(s.weapon))g.equipped.weapon=s.weapon;
 if(['none','ward','moon'].includes(g.equipped.charm)&&(g.equipped.charm==='none'||g.durability[g.equipped.charm]>0)&&g.owned.includes(s.accessory))g.equipped.charm=s.accessory;
 const weapon=GEAR[g.equipped.weapon],charm=GEAR[g.equipped.charm];s.weapon=weapon.family;s.accessory=(g.durability[g.equipped.charm]>0?charm.base:null)||'none';return g;
}
function usable(s,slot){const g=sync(s),id=g.equipped[slot];return g.durability[id]>0?GEAR[id]:null;}
function stats(s){const g=sync(s),active=Object.values(g.equipped).filter(id=>g.durability[id]>0).map(id=>GEAR[id]);return {attack:active.reduce((n,a)=>n+(a.attack||0),0),defense:active.reduce((n,a)=>n+(a.defense||0),0),mana:active.reduce((n,a)=>n+(a.mana||0),0),stamina:active.reduce((n,a)=>n+(a.stamina||0),0)};}
function equip(s,id){const g=sync(s),spec=GEAR[id];if(!spec||!g.owned.includes(id)||id!=='none'&&g.durability[id]<=0)return {ok:false,text:'這件裝備尚未取得，或已損壞，請先找工匠重鑄。'};g.equipped[spec.slot]=id;if(spec.slot==='weapon')s.weapon=spec.family;if(spec.slot==='charm')s.accessory=spec.base||'none';return {ok:true,text:'已裝備「'+spec.name+'」。'};}
function wear(s,slot,amount=1){const g=sync(s),id=g.equipped[slot],spec=GEAR[id],before=g.durability[id]||0;if(!spec.durability||before<=0)return '';amount=Number.isFinite(amount)?Math.max(0,Math.floor(amount)):0;g.durability[id]=Math.max(0,before-amount);const left=g.durability[id];if(left===0){if(slot==='charm')s.accessory='none';return spec.name+(slot==='weapon'?'已損壞，暫以徒手應戰。請到工坊重鑄。':'已損壞，效果停止。請到工坊重鑄。');}for(const threshold of [.05,.2])if(before>spec.durability*threshold&&left<=spec.durability*threshold)return spec.name+'耐久剩下 '+left+' / '+spec.durability+'，記得找工匠修理。';return '';}
function artisanNear(s){const a=ARTISANS[R.chapter(s)];if(!a||s.map!==a.map)return null;const o=R.objects(s).find(o=>o.id==='artisan');return o&&R.dist(s,o)<=90&&R.lineOfSight(s,s,o)?a:null;}
function repairQuote(s,id){const g=sync(s),spec=GEAR[id];if(!spec||!g.owned.includes(id)||!spec.durability)return null;const current=g.durability[id],missing=spec.durability-current;return {id,current,max:spec.durability,broken:current===0,cost:missing?current===0?spec.repair*2:Math.max(2,Math.ceil(spec.repair*missing/spec.durability)):0};}
function repair(s,id){if(!artisanNear(s))return {ok:false,text:'請先走到工匠身旁。'};const q=repairQuote(s,id);if(!q||!q.cost)return {ok:false,text:'這件裝備目前不需要修理。'};if(s.gold<q.cost)return {ok:false,text:'金幣不足，需要 '+q.cost+' G。'};s.gold-=q.cost;const g=sync(s);g.durability[id]=q.max;if(g.equipped.charm===id)s.accessory=GEAR[id].base||'none';return {ok:true,text:(q.broken?'重鑄':'修理')+'完成：「'+GEAR[id].name+'」耐久恢復 '+q.max+' / '+q.max+'。'};}
function craftStatus(s,id){const g=sync(s),r=RECIPES[id];if(!r)return null;const missing=Object.entries(r.materials).filter(([key,count])=>g.materials[key]<count).map(([key,count])=>({id:key,name:MATERIALS[key].name,count:count-g.materials[key]}));return {owned:g.owned.includes(id),missing,canCraft:g.met.includes(r.chapter)&&!g.owned.includes(id)&&!missing.length&&s.gold>=r.cost,chapter:r.chapter,cost:r.cost};}
function craft(s,id){const r=RECIPES[id],g=sync(s),a=artisanNear(s);if(!a||!r||R.chapter(s)!==r.chapter||!g.met.includes(r.chapter))return {ok:false,text:'請把材料帶給熟悉這項配方的工匠。'};const status=craftStatus(s,id);if(status.owned)return {ok:false,text:'這件裝備已經完成；損壞時可以重鑄。'};if(status.missing.length)return {ok:false,text:'還缺少 '+status.missing.map(m=>m.name+' ×'+m.count).join('、')+'。'};if(s.gold<r.cost)return {ok:false,text:'加工需要 '+r.cost+' G，金幣還不夠。'};for(const [key,count]of Object.entries(r.materials))g.materials[key]-=count;s.gold-=r.cost;addOwned(g,id);g.crafted.push(id);R.log(s,a.name+'完成了「'+GEAR[id].name+'」。');return {ok:true,text:'加工完成，獲得「'+GEAR[id].name+'」！可在背包裝備。'};}
function buyGear(s,id){const spec=GEAR[id],g=sync(s);if(!spec?.price||R.chapter(s)<spec.chapter||g.owned.includes(id))return {ok:false,text:'這件裝備目前無法購買。'};const merchant=R.objects(s).find(o=>o.type==='shop'&&R.dist(s,o)<=90&&R.lineOfSight(s,s,o));if(!merchant)return {ok:false,text:'請先靠近商人。'};if(s.gold<spec.price)return {ok:false,text:'金幣不足。'};s.gold-=spec.price;addOwned(g,id);return {ok:true,text:'獲得「'+spec.name+'」。可在背包裝備。'};}
function hints(id){return Object.values(SOURCES).filter(x=>x.material===id).map(x=>R.MAPS[x.map].name+'的'+x.name).join('、');}
R.upgradePrice=(s,type)=>{if(!['weapon','armor'].includes(type))return Infinity;const target=(s.equipment?.[type]||0)+1,stage=target<=3?1:target<=6?2:3;return scaledGold(B.upgradePrice(s,type),ECONOMY.upgradeMultiplier[stage]);};
R.create=(...args)=>{const s=B.create(...args);sync(s);return s;};
R.validate=raw=>{const s=B.validate(raw),g=makeState(),old=raw?.gear;s.gear=g;for(const id of [...(s.armory||[]),...(s.relics||[])])if(GEAR[id])addOwned(g,id);g.equipped.weapon=s.weapon;g.equipped.charm=s.accessory;
 if(old&&typeof old==='object'){for(const id of Array.isArray(old.owned)?old.owned:[])if(Object.hasOwn(GEAR,id))addOwned(g,id);for(const slot of ['weapon','body','charm']){const id=old.equipped?.[slot];if(g.owned.includes(id)&&GEAR[id]?.slot===slot)g.equipped[slot]=id;}for(const id of g.owned){const d=old.durability?.[id];if(Number.isFinite(d))g.durability[id]=Math.max(0,Math.min(GEAR[id].durability,Math.floor(d)));}for(const id of Object.keys(MATERIALS)){const count=old.materials?.[id];if(Number.isFinite(count))g.materials[id]=Math.max(0,Math.min(99,Math.floor(count)));}for(const key of ['collected','seen'])if(Array.isArray(old[key]))g[key]=[...new Set(old[key].filter(id=>Object.hasOwn(SOURCES,id)))];g.met=Array.isArray(old.met)?[...new Set(old.met.filter(n=>[1,2,3].includes(n)))]:[];g.crafted=Array.isArray(old.crafted)?[...new Set(old.crafted.filter(id=>Object.hasOwn(RECIPES,id)&&g.owned.includes(id)))]:[];if(Object.hasOwn(RECIPES,old.tracked)&&g.met.includes(RECIPES[old.tracked].chapter))g.tracked=old.tracked;}
 s.weapon=GEAR[g.equipped.weapon].family;s.accessory=(g.durability[g.equipped.charm]>0?GEAR[g.equipped.charm].base:null)||'none';return s;};
R.objects=s=>{const g=sync(s),objects=B.objects(s);for(const p of Object.values(SOURCES).filter(p=>p.map===s.map)){const distance=Math.hypot(s.x-C(p.x),s.y-C(p.y));objects.push({id:p.id,type:'gear-source',x:C(p.x),y:C(p.y),name:g.collected.includes(p.id)?'已採集的痕跡':p.name,data:{hidden:distance>220&&!g.seen.includes(p.id),source:p.id,spent:g.collected.includes(p.id)}});}const a=ARTISANS[R.chapter(s)];if(s.map===a?.map){const npc=objects.find(o=>o.id==='artisan');if(npc&&Object.keys(RECIPES).some(id=>RECIPES[id].chapter===R.chapter(s)&&craftStatus(s,id).canCraft))npc.data={...npc.data,questStatus:'ready'};}return objects;};
R.interact=(s,id)=>{const p=SOURCES[id],g=sync(s);if(p&&s.map===p.map){const o=R.objects(s).find(o=>o.id===id);if(!o||R.dist(s,o)>90||!R.lineOfSight(s,s,o))return {text:'再靠近一點，找到能伸手採集的位置。'};if(g.collected.includes(id))return {text:'這裡的材料已經收好，不會重複出現。'};if(p.map.startsWith('secret-')&&!s.exploration.gates.includes(p.map))return {text:'先解開藏室的入口機關。'};g.collected.push(id);if(!g.seen.includes(id))g.seen.push(id);g.materials[p.material]=Math.min(99,g.materials[p.material]+p.amount);R.log(s,'找到 '+MATERIALS[p.material].name+' ×'+p.amount+'。');return {loot:true,important:true,text:'找到隱藏材料：'+MATERIALS[p.material].name+' ×'+p.amount+'。可交給'+ARTISANS[p.chapter].name+'加工。'};}
 const a=artisanNear(s);if(id==='artisan'&&a){if(!g.met.includes(R.chapter(s))){g.met.push(R.chapter(s));R.log(s,'拜訪'+a.name+'，記下特殊裝備的加工配方。');}return {crafting:R.chapter(s),important:true};}if(id==='forge-note'&&s.map===ARTISANS[R.chapter(s)].map){const o=R.objects(s).find(o=>o.id===id);if(R.dist(s,o)>90)return {text:'再靠近一點。'};return {speaker:'工匠的材料筆記',lines:[ARTISANS[R.chapter(s)].intro,'耐久歸零前可用金幣修理；歸零後效果停止，需花較高費用重鑄。','武器命中敵人或割開草藤才耗 1，蓄力命中耗 2；空揮不耗，一次攻擊只扣一次。護甲承受攻擊或完美防禦都耗 1；護符在有效攻擊、成功施法或承受攻擊時耗 1。']};}return B.interact(s,id);};
R.updateWorld=s=>{const text=B.updateWorld(s),g=sync(s);let found='';for(const p of Object.values(SOURCES))if(p.map===s.map&&!g.seen.includes(p.id)&&Math.hypot(s.x-C(p.x),s.y-C(p.y))<=150){g.seen.push(p.id);found='附近的'+p.name+'似乎藏著材料。';}return text||found;};
R.weaponProfile=s=>{const spec=usable(s,'weapon');return spec?{...R.WEAPONS[spec.family],family:spec.family,name:spec.name}:{family:'sword',name:'徒手',range:55,cooldown:.65,broken:true};};
R.attackPower=s=>{const weapon=usable(s,'weapon');if(!weapon)return 8+(s.level-1)*2+stats(s).attack;return B.attackPower(s)+stats(s).attack;};
R.receivedDamage=(s,amount)=>{const g=sync(s),body=usable(s,'body'),charm=usable(s,'charm'),copy={...s,equipment:{...s.equipment,armor:body?s.equipment.armor:0},accessory:charm?.base||'none'};return Math.max(1,B.receivedDamage(copy,amount)-stats(s).defense);};
R.stepParty=(s,mobs,dt)=>{sync(s);const events=B.stepParty(s,mobs,dt);s.mp=Math.min(R.maxMp(s),s.mp+Math.max(0,dt)*stats(s).mana);return events;};
R.gearComparison=(s,id)=>{const g=sync(s),copy={...s,gear:JSON.parse(JSON.stringify(g)),armory:[...s.armory],relics:[...s.relics]};addOwned(copy.gear,id);if(!equip(copy,id).ok)return null;return {attack:R.attackPower(copy)-R.attackPower(s),defense:R.receivedDamage(s,100)-R.receivedDamage(copy,100)};};
R.staminaRecovery=(s,guard)=> (guard?3:17)+stats(s).stamina;
const oldLedger=B.taskLedger;
R.taskLedger=s=>{const g=sync(s);return [...oldLedger(s),...Object.entries(RECIPES).filter(([,r])=>g.met.includes(r.chapter)).map(([id,r])=>{const status=craftStatus(s,id);return {id:'craft:'+id,title:'加工・'+GEAR[id].name,map:ARTISANS[r.chapter].map,receiver:'artisan',status:status.owned?'done':status.canCraft?'ready':'investigating',hint:status.owned?'工匠已完成這件裝備。':status.missing.length?status.missing.map(m=>m.name+'還缺 '+m.count+'；'+hints(m.id)).join('。'):s.gold<r.cost?'材料已備齊，再準備 '+r.cost+' G 交給工匠。':'材料與費用已備齊，回工坊加工。',reward:GEAR[id].name};})];};
R.trackTask=(s,id)=>{const g=sync(s);if(id.startsWith('craft:')){const key=id.slice(6);if(!RECIPES[key]||!g.met.includes(RECIPES[key].chapter))return false;g.tracked=key;return true;}g.tracked=null;return B.trackTask(s,id);};
R.trackedQuest=s=>{const g=sync(s),row=g.tracked&&R.taskLedger(s).find(t=>t.id==='craft:'+g.tracked);if(row&&row.status!=='done')return {title:row.title,text:row.hint};return B.trackedQuest(s);};
Object.assign(R,{ECONOMY,GEAR,durabilityBudget,MATERIALS,ARTISANS,RECIPES,MATERIAL_SOURCES:SOURCES,gearState:sync,gearStats:stats,equipGear:equip,wearGear:wear,repairQuote,repairGear:repair,craftStatus,craftGear:craft,buyGear,materialHints:hints});
if(typeof module!=='undefined')module.exports=R;
})(typeof window==='undefined'?globalThis:window);
