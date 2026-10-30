(function(root){
'use strict';
const R=root.PaperRPG||(typeof require!=='undefined'?require('./endings.js'):null),B={...R},MAP='tide-cargo';
const GOODS={wood:{name:'浮木捆',weight:1,at:[7,3],color:'#a18459'},medicine:{name:'小藥箱',weight:2,at:[8,5],color:'#89956c'},food:{name:'乾糧箱',weight:2,at:[12,12],color:'#b59b6a'},heavy:{name:'大藥箱',weight:3,at:[14,12],color:'#8b9e83'}};
const SOLVED={wood:'left',heavy:'left',medicine:'right',food:'right'};
const layout=R.MAPS[MAP];layout.objects=layout.objects.filter(o=>!['piece-a','piece-b','piece-c'].includes(o[0]));for(const [id,g]of Object.entries(GOODS))layout.objects.push(['cargo-'+id,'cargo-crate',...g.at,g.name,{good:id}]);layout.objects.push(['cargo-left','cargo-platform',15,8,'左升降台',{side:'left'}],['cargo-right','cargo-platform',18,8,'右升降台',{side:'right'}],['cargo-lock','cargo-lever',17,5,'固定纜索的鎖桿'],['cargo-reset','cargo-reset',3,4,'卸貨鈴・重新擺放']);
function done(s){return !!s.campaign.rooms[MAP]?.done;}
function fresh(){return {version:1,places:Object.fromEntries(Object.keys(GOODS).map(id=>[id,'bank']))};}
function state(s){return s.cargoLift||fresh();}
function status(s){let places=state(s).places;const sum=side=>Object.entries(GOODS).reduce((n,[id,g])=>n+(places[id]===side?g.weight:0),0);if(done(s)&&(sum('left')!==4||sum('right')!==4))places=SOLVED;const left=Object.entries(GOODS).filter(([id])=>places[id]==='left'),right=Object.entries(GOODS).filter(([id])=>places[id]==='right'),held=Object.keys(GOODS).find(id=>places[id]==='held')||null;return {places,left:left.reduce((n,[,g])=>n+g.weight,0),right:right.reduce((n,[,g])=>n+g.weight,0),leftGoods:left.map(([id])=>id),rightGoods:right.map(([id])=>id),held,heldName:held?GOODS[held].name:null,allPlaced:Object.values(places).every(v=>v==='left'||v==='right'),done:done(s)};}
R.create=(...args)=>{const s=B.create(...args);s.cargoLift=fresh();return s;};
R.validate=raw=>{const s=B.validate(raw),v=fresh();if(done(s))v.places={...SOLVED};else if(raw?.cargoLift?.version===1){let held=false;for(const id of Object.keys(GOODS)){const place=raw.cargoLift.places?.[id];if(['bank','left','right'].includes(place))v.places[id]=place;else if(place==='held'&&!held&&s.map===MAP){v.places[id]='held';held=true;}}}s.cargoLift=v;return s;};
R.grid=(s,map=s.map)=>{const g=B.grid(s,map);if(map===MAP)for(let y=1;y<15;y++)g[y][20]=done(s)&&y===8?0:1;return g;};
R.objects=s=>{const objects=B.objects(s);if(s.map!==MAP)return objects;const st=status(s);return objects.filter(o=>o.type!=='cargo-crate'||st.places[o.data.good]==='bank').map(o=>{if(o.type==='cargo-crate')return {...o,name:GOODS[o.data.good].name+' · 重 '+GOODS[o.data.good].weight};if(o.type==='cargo-platform'){const side=o.data.side,weight=st[side];return {...o,name:(side==='left'?'左':'右')+'升降台 · 重 '+weight+(st.held?'（放上'+st.heldName+'）':weight?'（取回貨物）':''),data:{...o.data,weight,goods:st[side+'Goods'],done:st.done}};}if(o.id==='cargo-lock')return {...o,name:st.done?'鎖桿已固定':'固定纜索的鎖桿 · 左 '+st.left+'／右 '+st.right};return o;});};
R.interact=(s,id)=>{if(s.map!==MAP||!id.startsWith('cargo-'))return B.interact(s,id);const o=R.objects(s).find(o=>o.id===id);if(!o||R.dist(s,o)>90||!R.lineOfSight(s,s,o))return {text:'再靠近貨物或木臺一點。'};const st=status(s);if(st.done)return {text:'纜索已經固定，補給也繫牢了。從東側石板路繼續前進吧。'};s.cargoLift??=fresh();const places=s.cargoLift.places;
if(id==='cargo-reset'){s.cargoLift=fresh();return {text:'卸貨鈴響起，你把尚未固定的貨物放回岸邊。可以重新擺放了。',important:true};}
if(id==='cargo-lock'){if(!st.allPlaced)return {text:'還有貨物沒繫上木臺。先把四件貨物都安置好，再固定纜索。'};if(st.left!==st.right)return {text:'兩台刻度還不一致，鎖桿拉不下來。左台重 '+st.left+'、右台重 '+st.right+'；取回一些貨物，換到另一邊試試。'};R.completeCampaignRoom(s,MAP);return {speaker:'接通的漂木長廊',lines:['兩座木臺終於對齊。你拉下鎖桿，纜索繃緊，東側沉下去的石板重新露出了水面。','藥箱與乾糧已經繫牢，露米等候的補給有了送回渡口的機會。沿石板路，繼續往泉眼走吧。'],important:true};}
if(o.type==='cargo-crate'){if(st.held)return {text:'你正搬著'+st.heldName+'，先放到一座升降台上；卸貨鈴也能把貨物放回岸邊。'};places[o.data.good]='held';return {text:'搬起'+GOODS[o.data.good].name+'（重 '+GOODS[o.data.good].weight+'）。靠近左台或右台，調查木臺放上。',important:true};}
if(o.type==='cargo-platform'){const side=o.data.side;if(st.held){places[st.held]=side;const next=status(s);return {text:st.heldName+'已放上'+(side==='left'?'左':'右')+'台。左台重 '+next.left+'／右台重 '+next.right+'。'+(next.allPlaced&&next.left===next.right?'木臺已對齊，去拉下鎖桿。':'空手調查木臺可取回貨物。'),important:true};}const goods=st[side+'Goods'];if(!goods.length)return {text:'這座木臺還是空的。把岸邊貨物搬上來，調整兩台的重量。'};const good=goods[goods.length-1];places[good]='held';return {text:'從木臺取回'+GOODS[good].name+'，可以換到另一邊。',important:true};}return B.interact(s,id);};
function returnHeld(s){const held=status(s).held;if(held)s.cargoLift.places[held]='bank';}
R.travel=(s,o)=>{const from=s.map,result=B.travel(s,o);if(from===MAP&&s.map!==MAP)returnHeld(s);return result;};
R.death=s=>{returnHeld(s);return B.death(s);};
Object.assign(R,{CARGO_GOODS:GOODS,cargoLiftStatus:status});
if(typeof module!=='undefined'&&module.exports)module.exports=R;
})(typeof globalThis!=='undefined'?globalThis:this);
