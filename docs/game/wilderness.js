(function(root){
'use strict';
const R=root.PaperRPG||(typeof require!=='undefined'?require('./exploration.js'):null),B={...R},C=R.center;
const AWAY=120,QUIET=120,EVENTS={},CAVES={},groups=[['village','forest','river','ruins','castle'],['harbor','ashland','mirrormarsh','sandcity','mistwatch'],['bastion','skyroad','silentcourt','sanctuary','homeward']];
R.ITEMS.herbkit={name:'採藥人的補給包',description:'恢復 75 生命與 15 魔力。',price:18};
function state(s){s.wilderness??={version:1,discovered:[],events:{},caves:{},areas:{},worldChapter:1};if(s.bag.herbkit===undefined)s.bag.herbkit=0;return s.wilderness;}
function key(s,map=s.map){return map==='overworld'?'overworld-'+R.chapter(s):map;}
function area(s,map=s.map){const w=state(s);return w.areas[key(s,map)]??={initialized:false,lastExit:null,clearedAt:null,quietUntil:0,homes:{}};}
function eventState(s,id){return state(s).events[id]??={started:false,done:false,clues:[]};}
function caveState(s,id=s.map){return state(s).caves[id]??={step:0,solved:false,rescued:false,rested:false};}
function guardType(id,level){const spec=R.ENEMIES.guard;R.ENEMIES[id]={...spec,name:'巢穴的木靈',level,hp:45+level*9,speed:45,damage:5+level*2,xp:0,gold:0,patrol:true};return id;}
for(let n=0;n<3;n++){
 const ids=groups[n];
 for(const [i,kind]of [[1,'rescue'],[2,'camp'],[3,'stone'],[3,'nest']]){
  const map=ids[i],id=map+'-'+kind,level=R.MAPS[map].recommended[0],title={rescue:'受困的採藥人',camp:'營火熄滅之後',stone:'會回應的石碑',nest:'山壁下的巢穴'}[kind];EVENTS[id]={id,map,kind,title,chapter:n+1,guards:[]};
  const at={rescue:[12,13],camp:[7,12],stone:[7,7],nest:[17,12]}[kind];R.MAPS[map].objects.push([id,'wild-event',...at,title]);
  if(kind==='rescue'||kind==='nest'){const type=guardType(id+'-type',level),positions=kind==='rescue'?[[15,13],[17,13]]:[[18,11],[20,11]];for(const [j,p]of positions.entries()){const eid=id+'-guard-'+j;EVENTS[id].guards.push(eid);R.MAPS[map].enemies.push([eid,type,...p]);}}
  if(kind==='camp')for(const [j,p]of [[0,[5,11]],[1,[8,13]],[2,[9,12]]])R.MAPS[map].objects.push([id+'-clue-'+j,'wild-clue',...p,['濕泥上的腳印','落下的藥草','沒有寄出的信'][j],{event:id,index:j}]);
 }
 for(let i=0;i<3;i++){
  const map=ids[i+1],id='secret-'+map,cover=['vines','tracks','rock'][i],kind=['shelter','puzzle','rescue'][i];
  CAVES[id]={id,parent:map,chapter:n+1,cover,kind,order:[[0,1,2],[2,0,1],[1,2,0]][n]};
  R.MAPS[map].objects.push(['hidden-cover','wild-cover',3,3,{vines:'風吹動的藤蔓',tracks:'延伸向水幕的腳印',rock:'透出風聲的裂岩'}[cover],{cave:id,cover}]);
  const interior=R.MAPS[id];
  if(kind==='shelter')interior.objects.push(['cave-bed','wild-cave',16,11,'乾燥的舊床鋪']);
  if(kind==='puzzle')for(const [j,p]of [[0,[13,4]],[1,[17,11]],[2,[19,4]]])interior.objects.push(['cave-lamp-'+j,'wild-cave',...p,['月紋燈','星紋燈','日紋燈'][j],{index:j}]);
  if(kind==='rescue'){const eid=id+'-sentry',type=guardType(eid+'-type',Math.min(30,R.MAPS[id].recommended[0]+1));interior.enemies.push([eid,type,16,6]);interior.objects.push(['cave-traveler','wild-cave',18,11,'蜷縮的探險者']);CAVES[id].guard=eid;}
 }
}
const orderedNames=['月','星','日'];
function discover(s,id){const w=state(s);if(w.discovered.includes(id))return false;w.discovered.push(id);R.log(s,'發現隱藏洞窟：'+R.MAPS[id].name+'。');return true;}
function leave(s){if(R.SPAWN_RULES[s.map])area(s).lastExit=s.playtime;}
function prepare(s){if(!R.SPAWN_RULES[s.map])return;const w=state(s),a=area(s);if(s.map==='overworld'&&w.worldChapter!==R.chapter(s)){w.worldChapter=R.chapter(s);if(s.wildlife.areas.overworld)s.wildlife.areas.overworld.active=[];a.initialized=false;}if(a.lastExit!==null&&s.playtime-a.lastExit>=AWAY&&s.playtime>=a.quietUntil){const ids=R.MAPS[s.map].enemies.filter(e=>!R.ENEMIES[e[1]].boss&&!e[0].includes('-guard-')).map(e=>e[0]);s.defeated=s.defeated.filter(id=>!ids.includes(id));a.initialized=false;a.clearedAt=null;const pop=R.populationArea(s);pop.cooldowns=[];}a.lastExit=null;}
function homes(s,mobs){const a=area(s);for(const e of mobs){const old=a.homes[e.id];if(old){e.homeX=old[0];e.homeY=old[1];}else a.homes[e.id]=[e.homeX??e.x,e.homeY??e.y];}}
R.create=(...args)=>{const s=B.create(...args);state(s);return s;};
R.enemies=s=>{R.applyCampaign(s);prepare(s);const mobs=B.enemies(s);if(R.SPAWN_RULES[s.map])homes(s,mobs);return mobs;};
R.ensurePopulation=(s,mobs,random=Math.random)=>{const rule=R.SPAWN_RULES[s.map];if(!rule)return;const a=area(s);if(!a.initialized){const target=Math.min(rule.cap,4);for(let count=0;count<target;count++){if(mobs.filter(e=>e.hp>0).length>=target)break;const pop=R.populationArea(s);pop.nextAt=s.playtime;pop.cooldowns=[];const e=B.updateSpawns(s,mobs,random);if(e)e.spawnIn=0;}a.initialized=true;}homes(s,mobs);R.syncWildlife(s,mobs);};
// Resident populations are prepared only when entering. No timer creates enemies during exploration.
R.updateSpawns=()=>null;
R.markDefeated=(s,e)=>{const ok=B.markDefeated(s,e);if(ok&&R.SPAWN_RULES[s.map]){const a=area(s);a.quietUntil=Math.max(a.quietUntil,s.playtime+QUIET);}return ok;};
R.updateEcology=(s,mobs)=>{if(!R.SPAWN_RULES[s.map])return;const a=area(s);if(mobs.every(e=>e.hp<=0)&&a.clearedAt===null){a.clearedAt=s.playtime;a.quietUntil=Math.max(a.quietUntil,s.playtime+QUIET);R.log(s,'這一帶暫時安靜下來，可以安心探索。');return '這一帶暫時安靜了。';}return null;};
R.travel=(s,o)=>{leave(s);return B.travel(s,o);};
R.advanceChapter=(s,n)=>{const old=s.map,previous=R.SPAWN_RULES[old]?area(s):null,ok=B.advanceChapter(s,n);if(ok&&previous)previous.lastExit=s.playtime;return ok;};
R.death=s=>{leave(s);return B.death(s);};
R.objects=s=>{const w=state(s);return B.objects(s).filter(o=>{if(o.id==='secret-entry')return w.discovered.includes(o.data.map);if(o.type==='wild-cover')return !w.discovered.includes(o.data.cave);if(o.id==='cave-traveler'&&w.caves[s.map]?.rescued)return false;return true;});};
R.strikeEnvironment=s=>{const old=B.strikeEnvironment(s),w=R.WEAPONS[s.weapon];for(const o of R.objects(s).filter(o=>o.type==='wild-cover'&&o.data.cover==='vines')){const d=R.dist(s,o),dot=((o.x-s.x)*s.facing.x+(o.y-s.y)*s.facing.y)/(d||1);if(d<w.range&&dot>(s.weapon==='spear'?.55:s.weapon==='axe'?-.6:-.25)&&R.lineOfSight(s,s,o)&&discover(s,o.data.cave))return '藤蔓後露出一道入口，裡面傳來微弱的風聲。';}return old;};
function rewardEvent(s,def){const e=eventState(s,def.id);if(e.done)return {text:'這件事已經完成，沿途的人會記得你的幫忙。'};e.done=true;s.gold=Math.min(999999,s.gold+20*def.chapter);s.bag.tonic++;if(def.kind==='rescue'){s.bag.herbkit+=2;return {speaker:'平安的採藥人',text:'謝謝你！這兩包藥草帶著走吧。米菈的小舖今後也會替你準備這種補給。',important:true};}if(def.kind==='nest'){area(s).quietUntil=Math.max(area(s).quietUntil,s.playtime+300);R.log(s,'清除了'+R.MAPS[s.map].name+'的巢穴。');return {text:'巢穴已清除，這一帶會安寧更久。獲得 '+20*def.chapter+' 金幣與星露。',important:true};}return {text:'獲得 '+20*def.chapter+' 金幣與星露。沿著岩壁還能找到別的痕跡。',important:true};}
R.interact=(s,id)=>{
 const o=R.objects(s).find(o=>o.id===id);if(!o||R.dist(s,o)>90)return {text:'再靠近一點。'};
 const w=state(s),def=EVENTS[id],cave=CAVES[s.map];
 if(o.type==='wild-cover'){
  if(o.data.cover==='vines')return {text:'藤蔓後透出微光，劍鋒也許能割開它。'};
  if(o.data.cover==='rock'&&!s.exploration.tools.includes('gauntlet'))return {text:'裂縫裡有風聲。岩面留下手甲的刻紋。'+R.toolSourceHint('gauntlet')};
  discover(s,o.data.cave);return {text:o.data.cover==='rock'?'山脈手甲推開巨岩，露出一條向下的石階。':'你沿著腳印撥開水幕，找到一處藏起的入口。',important:true};
 }
 if(o.type==='wild-clue'){const e=eventState(s,o.data.event);e.started=true;if(!e.clues.includes(o.data.index))e.clues.push(o.data.index);return {speaker:o.name,text:['腳印往水聲傳來的方向延伸。','包紮用的藥草還很新，留下它的人也許就在附近。','「我先去岩壁後避雨，若你回來，請沿著腳印找我。」'][o.data.index],important:true};}
 if(def){const e=eventState(s,id);e.started=true;if(e.done)return {text:'這件事已經完成。'};if(def.kind==='rescue'||def.kind==='nest'){if(!def.guards.every(g=>s.defeated.includes(g)))return {speaker:def.title,text:def.kind==='rescue'?'那兩隻木靈守著我的退路……請先幫我趕走牠們。':'兩隻巢穴守衛仍在附近巡邏，先擊退牠們再清理巢穴。',important:true};return rewardEvent(s,def);}if(def.kind==='camp'){if(e.clues.length<3)return {speaker:'廢棄營地',text:'濕泥、藥草與壓在石頭下的信。調查附近三處痕跡，也許能知道旅人去了哪裡。',important:true};return rewardEvent(s,def);}if(!s.exploration.tools.includes('lantern'))return {text:'石碑上的紋路像一盞提燈，普通的光似乎照不出文字。'+R.toolSourceHint('lantern')};return rewardEvent(s,def);}
 if(cave){const cs=caveState(s);if(id==='secret-note'){if(cave.kind==='puzzle')return {speaker:'水幕後的壁畫',text:'依序點亮：'+cave.order.map(i=>orderedNames[i]).join('、')+'。錯了就從頭開始。',important:true};return {speaker:'避雨者的手記',text:cave.kind==='shelter'?'「這裡留一張乾燥的床，給下一位在雨裡迷路的人。休息一次，再把光帶出去。」':'「同伴被守衛困在裡面。若有人看到這行字，請替我帶他回到地面。」'};}
  if(id==='cave-bed'){if(cs.rested)return {text:'床鋪已經收拾好，留給下一位旅人吧。'};cs.rested=true;s.hp=s.maxHp;s.mp=R.maxMp(s);R.restoreParty(s);return {text:'你們在避難小屋休息，生命與魔力恢復。',heal:true,important:true};}
  if(id.startsWith('cave-lamp-')){if(!R.explorationGateDone(s))return {text:'燈臺在通路另一側，先架起繩橋。'};if(cs.solved)return {text:'三盞燈已經連成一道光。'};if(o.data.index===cave.order[cs.step])cs.step++;else cs.step=o.data.index===cave.order[0]?1:0;if(cs.step===3)cs.solved=true;return {text:cs.solved?'壁畫上的光連成星紋，寶匣的封印解開了。':'目前亮起 '+cs.step+' 盞燈。',important:true};}
  if(id==='cave-traveler'){if(!s.defeated.includes(cave.guard))return {text:'守衛還在附近，先幫探險者脫困。'};if(cs.rescued)return {text:'探險者已沿著你開通的路平安離開。'};cs.rescued=true;s.bag.ether++;R.log(s,'救出'+R.MAPS[s.map].name+'的探險者。');return {speaker:'脫困的探險者',text:'我以為再也出不去了……寶匣就在那邊，請收下裡面的東西。這瓶月露也送給你。',important:true};}
  if(id==='secret-cache'&&!s.exploration.treasures.includes(s.map)){if(cave.kind==='puzzle'&&!cs.solved)return {text:'寶匣上的三道紋路仍暗著。附近的壁畫似乎留下了線索。'};if(cave.kind==='rescue'&&!cs.rescued)return {text:'先讓受困的探險者平安離開。'};}
 }
 return B.interact(s,id);
};
R.buy=(s,id)=>{if(id!=='herbkit')return B.buy(s,id);if(!Object.values(EVENTS).some(d=>d.kind==='rescue'&&eventState(s,d.id).done)||s.gold<18)return false;s.gold-=18;s.bag.herbkit++;return true;};
R.use=(s,id)=>{if(id!=='herbkit')return B.use(s,id);state(s);if(!s.bag.herbkit)return {ok:false,text:'沒有採藥人的補給包。'};if(s.hp>=s.maxHp&&s.mp>=R.maxMp(s))return {ok:false,text:'目前生命與魔力已滿。'};s.bag.herbkit--;s.hp=Math.min(s.maxHp,s.hp+75);s.mp=Math.min(R.maxMp(s),s.mp+15);return {ok:true,text:'恢復 75 生命與 15 魔力。'};};
R.herbStock=s=>Object.values(EVENTS).some(d=>d.kind==='rescue'&&state(s).events[d.id]?.done);
R.wildernessTasks=s=>Object.values(EVENTS).filter(d=>d.chapter===R.chapter(s)&&state(s).events[d.id]?.started).map(d=>({title:d.title,map:R.MAPS[d.map].name,...state(s).events[d.id]}));
R.wildernessStatus=(s,mobs)=>R.SPAWN_RULES[s.map]?(mobs.some(e=>e.hp>0)?'野怪 '+mobs.filter(e=>e.hp>0).length+'・領地活動':'暫時安寧・可安心探索'):null;
R.validate=raw=>{const s=B.validate(raw),old=raw?.wilderness||{},w={version:1,discovered:[],events:{},caves:{},areas:{},worldChapter:1};s.wilderness=w;s.bag.herbkit=Number.isInteger(raw.bag?.herbkit)?Math.max(0,Math.min(9999,raw.bag.herbkit)):0;w.discovered=[...new Set([...(Array.isArray(old.discovered)?old.discovered.filter(id=>Object.hasOwn(CAVES,id)):[]),...Object.keys(CAVES).filter(id=>s.visited.includes(id)||s.exploration.seen.includes(id)||s.exploration.treasures.includes(id))])];w.worldChapter=[1,2,3].includes(old.worldChapter)?old.worldChapter:R.chapter(s);for(const id of Object.keys(EVENTS)){const e=old.events?.[id];if(e)w.events[id]={started:e.started===true,done:e.done===true,clues:Array.isArray(e.clues)?[...new Set(e.clues.filter(i=>[0,1,2].includes(i)))]:[]};}for(const id of Object.keys(CAVES)){const c=old.caves?.[id];if(c)w.caves[id]={step:Number.isInteger(c.step)?Math.max(0,Math.min(3,c.step)):0,solved:c.solved===true,rescued:c.rescued===true,rested:c.rested===true};if(s.exploration.treasures.includes(id))w.caves[id]={step:3,solved:true,rescued:true,rested:c?.rested===true};}const keys=[...Object.keys(R.SPAWN_RULES).filter(m=>m!=='overworld'),'overworld-1','overworld-2','overworld-3'];for(const id of keys){const a=old.areas?.[id];if(!a)continue;const validTime=t=>Number.isFinite(t)&&t>=0&&t<=s.playtime;const map=id.startsWith('overworld-')?'overworld':id,allowed=new Set([...R.MAPS[map].enemies.map(e=>e[0]),...(s.wildlife.areas[map]?.active||[]).map(e=>e.id)]),h={};for(const [eid,at]of Object.entries(a.homes||{}))if(allowed.has(eid)&&Array.isArray(at)&&at.length===2&&at.every((v,i)=>Number.isFinite(v)&&v>=48&&v<48*(i?15:23)))h[eid]=at;w.areas[id]={initialized:a.initialized===true,lastExit:validTime(a.lastExit)?a.lastExit:null,clearedAt:validTime(a.clearedAt)?a.clearedAt:null,quietUntil:Number.isFinite(a.quietUntil)?Math.max(0,Math.min(s.playtime+300,a.quietUntil)):0,homes:h};}if(s.map===raw.map&&raw.hp>0&&(!R.HOMES?.[s.map]||raw.homes?.version===3)){s.x=raw.x;s.y=raw.y;}if(!R.walkable(s,s.x,s.y)){s.x=C(R.MAPS[s.map].spawn[0]);s.y=C(R.MAPS[s.map].spawn[1]);}return s;};
// Lightweight finite-state behavior; the existing combat loop handles attack timing while chasing.
function hash(id){let h=0;for(const c of id)h=(Math.imul(h,31)+c.charCodeAt(0))>>>0;return h;}
function navigate(s,e,target,speed,dt){const d=R.dist(e,target);if(d<5)return true;let p=target;if(!R.lineOfSight(s,e,target)){e.navCd=(e.navCd||0)-dt;if(!e.nav?.length||e.navCd<=0){const temp={...s,x:e.x,y:e.y};e.nav=R.pathfind(temp,Math.floor(target.x/48),Math.floor(target.y/48));e.navCd=1;}while(e.nav?.length&&R.dist(e,e.nav[0])<6)e.nav.shift();if(e.nav?.length)p=e.nav[0];else return false;}const len=R.dist(e,p),step=Math.min(len,speed*dt),dx=(p.x-e.x)/(len||1)*step,dy=(p.y-e.y)/(len||1)*step;if(R.walkable(s,e.x+dx,e.y,14))e.x+=dx;if(R.walkable(s,e.x,e.y+dy,14))e.y+=dy;return false;}
function stepMind(s,e,targets,dt){const spec=R.ENEMIES[e.type];if(spec.boss)return null;e.homeX??=e.x;e.homeY??=e.y;const h=hash(e.id),home={x:e.homeX,y:e.homeY},patrol=spec.patrol||e.type==='guard'||e.type==='shade';e.mind??={mode:'idle',wait:.3+(h%12)/10,turn:0,lost:0,alert:0};const m=e.mind,near=targets.filter(p=>p.hp>0&&R.dist(p,home)<360&&R.dist(p,e)<(e.hit>0?260:190)&&R.lineOfSight(s,e,p)).sort((a,b)=>R.dist(a,e)-R.dist(b,e))[0];
 if(m.mode==='return'){e.windup=0;if(navigate(s,e,home,spec.speed*1.2,dt)){m.mode='idle';m.wait=1;m.goal=null;}return {handled:true};}
 if(m.mode==='chase'){if(R.dist(e,home)>380||!near&&(m.lost+=dt)>1.8){m.mode='return';m.goal=null;e.nav=[];e.windup=0;return {handled:true};}if(near)m.lost=0;return near?{target:near}:{handled:true};}
 if(m.mode==='alert'){e.windup=0;if(!near){m.mode='idle';return {handled:true};}m.alert-=dt;if(m.alert<=0)m.mode='chase';return {handled:true};}
 if(near){m.mode='alert';m.alert=.5;m.lost=0;return {handled:true};}
 m.wait-=dt;if(m.wait>0)return {handled:true};if(!m.goal){const angle=(h%628)/100+(m.turn++)*(patrol?Math.PI/2:2.399),r=patrol?65:45+(h%65),goal={x:home.x+Math.cos(angle)*r,y:home.y+Math.sin(angle)*r};if(R.walkable(s,goal.x,goal.y,16))m.goal=goal;else{m.wait=.35;return {handled:true};}}
 if(navigate(s,e,m.goal,spec.speed*.48,dt)){m.goal=null;m.wait=patrol?.45:.7+(h%11)/10;}return {handled:true};}
Object.assign(R,{WILDERNESS_EVENTS:EVENTS,HIDDEN_CAVES:CAVES,wildernessState:state,wildernessArea:area,wildernessCaveState:caveState,discoverCave:discover,stepEnemyMind:stepMind,ECOLOGY_AWAY:AWAY,ECOLOGY_QUIET:QUIET,BUILD:'2026.10.25-wilderness8'});
if(typeof module!=='undefined')module.exports=R;
})(typeof window==='undefined'?globalThis:window);
