(function(root){
'use strict';
const R=root.PaperRPG||(typeof require!=='undefined'?require('./equipment.js'):null),B={...R},C=R.center;
const POINTS={};
for(const chapter of R.CHAPTERS){
 const s=B.create();s.campaign.chapter=chapter.id;R.applyCampaign(s);
 const add=(id,map,x,y,name,kind)=>{s.map=map;let pos=null;for(let r=0;r<=3&&!pos;r++)for(let dy=-r;dy<=r&&!pos;dy++)for(let dx=-r;dx<=r;dx++){if(R.walkable(s,C(x+dx),C(y+dy),18)){pos={x:x+dx,y:y+dy};break;}}if(!pos)throw Error('No safe star lamp: '+id);POINTS[id]={id,chapter:chapter.id,map,...pos,name,kind};};
 add('lamp-hub-'+chapter.id,chapter.hub,7,9,R.MAPS[chapter.hub].name+'・旅人星燈','town');
 const camp=R.journeySites(s).find(p=>p.id==='reed-camp');add('lamp-camp-'+chapter.id,'overworld',camp.x+1,camp.y+1,'蘆葦營地・星燈','camp');
 for(const [map,def]of Object.entries(R.MAPS))if(def.chapter===chapter.id&&def.enemies.some(e=>R.ENEMIES[e[1]].boss))add('lamp-'+map,map,3,8,def.name+'・入口星燈','boss');
}
function state(s){const cp=s.checkpoints??={version:1,lit:[],active:{}};const n=R.chapter(s),id='lamp-hub-'+n;if(!cp.lit.includes(id))cp.lit.push(id);if(!POINTS[cp.active[n]]||!cp.lit.includes(cp.active[n])||POINTS[cp.active[n]].chapter!==n)cp.active[n]=id;return cp;}
function current(s){const cp=state(s);return POINTS[cp.active[R.chapter(s)]];}
function activate(s,id){const p=POINTS[id];if(!p||p.chapter!==R.chapter(s)||p.map!==s.map)return {ok:false,text:'這盞星燈不在附近。'};const o={x:C(p.x),y:C(p.y)};if(R.dist(s,o)>90||!R.lineOfSight(s,s,o))return {ok:false,text:'再靠近星燈一點。'};const cp=state(s),first=!cp.lit.includes(id);if(first)cp.lit.push(id);cp.active[p.chapter]=id;R.log(s,(first?'點亮':'回到')+p.name+'，將光留作歸途。');return {ok:true,first,checkpoint:true,important:true,text:(first?'星燈亮起。':'星燈回應你的腳步。')+'倒下後可回到「'+p.name+'」。'};}
R.create=(...args)=>{const s=B.create(...args);state(s);return s;};
R.validate=raw=>{const s=B.validate(raw),old=raw?.checkpoints;s.checkpoints={version:1,lit:[],active:{}};if(old&&typeof old==='object'){if(Array.isArray(old.lit))s.checkpoints.lit=[...new Set(old.lit.filter(id=>typeof id==='string'&&Object.hasOwn(POINTS,id)))];for(const n of [1,2,3]){const id=old.active?.[n];if(Object.hasOwn(POINTS,id)&&POINTS[id].chapter===n&&s.checkpoints.lit.includes(id))s.checkpoints.active[n]=id;}}state(s);return s;};
R.objects=s=>{const objects=B.objects(s),cp=state(s);for(const p of Object.values(POINTS))if(p.chapter===R.chapter(s)&&p.map===s.map){const distance=R.dist(s,{x:C(p.x),y:C(p.y)});objects.push({id:p.id,type:'star-lamp',x:C(p.x),y:C(p.y),name:p.name,data:{lit:cp.lit.includes(p.id),active:cp.active[p.chapter]===p.id,hidden:p.kind==='camp'&&!cp.lit.includes(p.id)&&distance>360}});}return objects;};
R.interact=(s,id)=>Object.hasOwn(POINTS,id)?activate(s,id):B.interact(s,id);
R.spawnSafe=(s,mobs,x,y)=>B.spawnSafe(s,mobs,x,y)&&!Object.values(POINTS).some(p=>p.chapter===R.chapter(s)&&p.map===s.map&&Math.hypot(C(p.x)-x,C(p.y)-y)<160);
R.death=s=>{const point=current(s);B.death(s);s.map=point.map;s.x=C(point.x);s.y=C(point.y);R.placeParty(s);const text='星光帶你回到'+point.name+'。損失一成金幣，裝備仍保留原有損耗。';if(s.journal[0]==='旅人泉的微光帶你回村。損失了一成金幣，道具仍在。')s.journal[0]=text;else R.log(s,text);};
Object.assign(R,{CHECKPOINTS:POINTS,checkpointState:state,currentCheckpoint:current,activateCheckpoint:activate});
if(typeof module!=='undefined'&&module.exports)module.exports=R;
})(typeof globalThis!=='undefined'?globalThis:this);
