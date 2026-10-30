(function(root){
'use strict';
const R=root.PaperRPG||(typeof require!=='undefined'?require('./campaign.js'):null),B={...R},C=R.center;
const TOOLS={lantern:{name:'螢光提燈',hint:'照亮沉睡的石門，也能照出水氣裡的足跡',map:'forest'},hook:{name:'星索鉤',hint:'架起斷開的繩橋，也能扣住高處鉤環取回貨物',map:'ashland'},gauntlet:{name:'山脈手甲',hint:'推開擋路的巨岩，也能移開淺渠落石、打通山道',map:'skyroad'}};
const CAVES={},TRAILS=[];
const groups=[['village','forest','river','ruins','castle'],['harbor','ashland','mirrormarsh','sandcity','mistwatch'],['bastion','skyroad','silentcourt','sanctuary','homeward']];
function state(s){return s.exploration??={version:1,tools:[],gates:[],treasures:[],grass:[],seen:[]};}
function addTrail(a,b,x,y,bx,by){const id='trail-'+b,back='trail-'+a;R.MAPS[a].objects.push([id,'exit',x,y,'小徑・'+R.MAPS[b].name,{map:b,at:[bx,by+2]}]);R.MAPS[b].objects.push([back,'exit',bx,by,'小徑・'+R.MAPS[a].name,{map:a,at:[x,y+2]}]);TRAILS.push({a,b,from:[x,y],to:[bx,by]});}
for(let n=0;n<3;n++){
 const ids=groups[n];
 addTrail(ids[0],ids[1],3,2,3,2);
 addTrail(ids[1],ids[2],3,12,3,2);
 addTrail(ids[2],ids[3],21,12,3,2);
 addTrail(ids[3],ids[4],21,2,3,2);
 const tool=Object.keys(TOOLS)[n];R.MAPS[ids[1]].objects.push(['explore-tool','explore',7,4,TOOLS[tool].name,{tool}]);
 for(let i=0;i<3;i++){
  const parent=ids[i+1],id='secret-'+parent,need=Object.keys(TOOLS)[i],level=R.MAPS[parent].recommended[0],names=[['苔光藏室','垂藤水窟','沉鐘石穴'],['餘燼密窟','月鏡藏室','沙岩寶庫'],['風眠石洞','王庭密室','星光藏室']];
  CAVES[id]={id,parent,chapter:n+1,tool:need,name:names[n][i]};
  R.MAPS[id]={name:names[n][i],subtitle:'岩壁後面，還留著旅人的足跡',theme:i===0?'grove':i===1?'tide':'belfry',parent,chapter:n+1,recommended:[level,Math.min(30,level+1)],spawn:[2,8],blocks:[[4,3,3,2],[13,11,3,2]],objects:[['secret-return','exit',1,8,'回到'+R.MAPS[parent].name,{map:parent,at:[3,6]}],['secret-gate','explore',8,8,i===0?'無光的石門':i===1?'斷開的繩橋':'擋路的巨岩',{tool:need}],['secret-cache','explore',18,8,'星紋寶匣'],['secret-note','explore',4,11,'刻在石壁上的字']],enemies:[]};
  R.MAPS[parent].objects.push(['secret-entry','dungeon',3,3,'岩壁上的幽光',{map:id,at:[2,8],secret:true}]);
  for(const [j,at]of [[0,[8,12]],[1,[13,3]],[2,[19,10]]])R.MAPS[parent].objects.push(['grass-'+j,'grass',...at,'可割的草叢']);
 }
 // An optional return passage forms a circuit once its rope bridge is repaired.
 const id='passage-'+(n+1),a=ids[1],b=ids[3];
 R.MAPS[id]={name:['苔風近道','海霧近道','晨星近道'][n],subtitle:'回頭看，原來路一直在這裡',theme:'forest',chapter:n+1,parent:a,recommended:R.MAPS[a].recommended,spawn:[2,8],blocks:[],objects:[['pass-west','exit',1,8,'通往'+R.MAPS[a].name,{map:a,at:[20,12]}],['pass-east','exit',22,8,'通往'+R.MAPS[b].name,{map:b,at:[3,12]}],['secret-gate','explore',8,8,'斷開的繩橋',{tool:'hook'}],['secret-gate-east','explore',12,8,'繩橋的另一端',{tool:'hook'}]],enemies:[]};
 R.MAPS[a].objects.push(['passage-entry','dungeon',20,14,'山壁間的小路',{map:id,at:[3,8]}]);
 R.MAPS[b].objects.push(['passage-entry','dungeon',3,14,'山壁間的小路',{map:id,at:[20,8]}]);
}
function gateDone(s,id=s.map){return state(s).gates.includes(id);}
R.create=(...args)=>{const s=B.create(...args);state(s);return s;};
R.validate=raw=>{const s=B.validate(raw),e=raw?.exploration||{};s.exploration={version:1,tools:[],gates:[],treasures:[],grass:[],seen:[]};const v=state(s);v.tools=Array.isArray(e.tools)?[...new Set(e.tools.filter(id=>Object.hasOwn(TOOLS,id)))]:[];const gates=[...Object.keys(CAVES),...groups.map((_,i)=>'passage-'+(i+1))];v.gates=Array.isArray(e.gates)?[...new Set(e.gates.filter(id=>gates.includes(id)))]:[];v.treasures=Array.isArray(e.treasures)?[...new Set(e.treasures.filter(id=>Object.hasOwn(CAVES,id)))]:[];v.seen=Array.isArray(e.seen)?[...new Set(e.seen.filter(id=>Object.hasOwn(R.MAPS,id)))]:[];const grass=groups.flatMap(ids=>ids.slice(1,4).flatMap(map=>[0,1,2].map(i=>map+':grass-'+i)));v.grass=Array.isArray(e.grass)?[...new Set(e.grass.filter(id=>grass.includes(id)))]:[];if(s.map===raw.map&&raw.hp>0){s.x=raw.x;s.y=raw.y;}if(!R.walkable(s,s.x,s.y)){s.x=C(R.MAPS[s.map].spawn[0]);s.y=C(R.MAPS[s.map].spawn[1]);}return s;};
R.grid=(s,map=s.map)=>{const g=B.grid(s,map);if((CAVES[map]||map.startsWith('passage-'))&&!gateDone(s,map))for(let y=1;y<15;y++)g[y][10]=1;return g;};
R.objects=s=>{const e=state(s);return B.objects(s).filter(o=>o.type!=='grass'||!e.grass.includes(s.map+':'+o.id)).map(o=>o.id==='secret-entry'?{...o,name:e.seen.includes(o.data.map)?R.MAPS[o.data.map].name:o.name}:o);};
R.travel=(s,o)=>{const result=B.travel(s,o);if(result){const e=state(s);if(!e.seen.includes(s.map))e.seen.push(s.map);}return result;};
R.interact=(s,id)=>{
 const o=R.objects(s).find(o=>o.id===id);if(!o||R.dist(s,o)>90)return {text:'再靠近一點。'};const e=state(s);
 if(o.type==='grass')return {text:'劍鋒可以割開草叢。'};
 if(o.type!=='explore')return B.interact(s,id);
 if(id==='explore-tool'){if(e.tools.includes(o.data.tool))return {text:'已帶上'+TOOLS[o.data.tool].name+'。'};e.tools.push(o.data.tool);R.log(s,'取得探索道具：'+TOOLS[o.data.tool].name);return {speaker:'旅人的遺贈',lines:['獲得'+TOOLS[o.data.tool].name+'。',TOOLS[o.data.tool].hint+'。往後遇到相應障礙，靠近調查就能使用；別忘了先前走過的地方。'],important:true};}
 if(id.startsWith('secret-gate')){
  if(gateDone(s))return {text:'這條路已經打通了。'};
  if(!e.tools.includes(o.data.tool))return {speaker:o.name,text:'留下的刻痕像是'+({lantern:'一盞提燈',hook:'一個鉤環',gauntlet:'一副手甲'}[o.data.tool])+'。'+toolSourceHint(o.data.tool)};
  e.gates.push(s.map);R.log(s,'用'+TOOLS[o.data.tool].name+'打開'+R.MAPS[s.map].name+'的通路。');return {text:TOOLS[o.data.tool].name+'回應了刻痕，前方的路打通了。',important:true};
 }
 if(id==='secret-cache'){
  if(!gateDone(s))return {text:'寶匣在障礙另一側，先打通道路。'};
  if(e.treasures.includes(s.map))return {text:'寶匣已經打開，星紋仍微微發亮。'};
  e.treasures.push(s.map);const n=R.MAPS[s.map].chapter;s.gold+=40*n;s.bag.tonic+=2;if(n>1){s.bag.highpotion++;s.bag.ether++;}else s.bag.potion+=2;R.log(s,'找到'+R.MAPS[s.map].name+'的星紋寶藏。');return {text:'獲得 '+40*n+' 金幣、星露 ×2、'+(n>1?'濃縮紅葉藥水與月露精華。':'紅葉藥水 ×2。'),loot:true,important:true};
 }
 return {speaker:'石壁上的字',text:'「不必一次走完所有的路。帶著新發現回來，原野也會給你新的回答。」'};
};
function strike(s){const e=state(s),w=R.WEAPONS[s.weapon],cut=R.objects(s).filter(o=>o.type==='grass'&&R.dist(s,o)<w.range&&((o.x-s.x)*s.facing.x+(o.y-s.y)*s.facing.y)/(R.dist(s,o)||1)>(s.weapon==='spear'?.55:s.weapon==='axe'?-.6:-.25)&&R.lineOfSight(s,s,o));for(const o of cut){e.grass.push(s.map+':'+o.id);if(o.id==='grass-1')s.bag.potion++;else s.gold+=3;}return cut.length?'割開草叢，找到'+(cut.some(o=>o.id==='grass-1')?'紅葉藥水與沿途補給。':'幾枚遺落的金幣。'):null;}
function toolSourceHint(id){const t=TOOLS[id];return t?'第 '+R.MAPS[t.map].chapter+' 章「'+R.MAPS[t.map].name+'」西北側可找到「'+t.name+'」。這是探索支線，可先繼續主線，拿到工具後再回來。':'';}
function summary(s){const e=state(s);return {tools:e.tools.map(id=>TOOLS[id].name),treasures:e.treasures.length,total:Object.keys(CAVES).length};}
Object.assign(R,{EXPLORATION_TOOLS:TOOLS,SECRET_CAVES:CAVES,WORLD_TRAILS:TRAILS,explorationState:state,explorationSummary:summary,toolSourceHint,strikeEnvironment:strike,explorationGateDone:gateDone,BUILD:'2026.10.25-exploration7'});
if(typeof module!=='undefined')module.exports=R;
})(typeof window==='undefined'?globalThis:window);
