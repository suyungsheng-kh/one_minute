(function(root){
'use strict';
const R=root.PaperRPG||(typeof require!=='undefined'?require('./world-recovery.js'):null),B={...R},C=R.center;
const SHED='harbor-cargo-shed',ARCHIVE='ashland-archive',REFUGE='ashland-refuge';
const BATCHES={rail:{name:'窄軌上的藥箱',initial:[4,2,5,1,3]},hoist:{name:'吊架下的藥箱',initial:[4,2,5,1,3]},arrival:{name:'後到碼頭的藥箱',initial:[2,5,1,4,3]}};
const CODES=[3,7,11,16,22,28,35,41,48,54,63,69,76,83,91,97],NOTES=[48,7,91,22,63,3,76,35,97,54,11,69,83,16,41,28],TARGET=83;
const SEARCHES={notes:{name:'散頁航記',ordered:false,values:NOTES},index:{name:'編號索引',ordered:true,values:CODES},courier:{name:'第一位送信人的出發單',ordered:false,values:CODES},navigator:{name:'第二位送信人的出發單',ordered:true,values:CODES}};
const cargoFresh=()=>({accepted:false,logs:{rail:[],hoist:[],arrival:[]},claimed:false,supply:false});
const archiveFresh=()=>({accepted:false,logs:{notes:[],index:[],courier:[],navigator:[]},visited:false,claimed:false});
function fresh(){return {version:1,cargo:cargoFresh(),archive:archiveFresh(),tracked:null};}
function state(s){return s.harborStories||fresh();}
function cargoStart(id){return {order:[...BATCHES[id].initial],pass:0,cursor:0,front:0,scan:1,best:0,revealed:false,held:null,hole:2,next:2,comparisons:0,moves:0,done:false};}
function cargoStep(v,id,action){
 if(v.done)return false;
 const a=v.order,n=a.length;
 if(id==='rail'){
  if(action==='inspect'&&!v.revealed){v.revealed=true;v.comparisons++;return true;}
  if(!v.revealed||!['swap','keep'].includes(action)||(a[v.cursor]>a[v.cursor+1])!==(action==='swap'))return false;
  if(action==='swap'){[a[v.cursor],a[v.cursor+1]]=[a[v.cursor+1],a[v.cursor]];v.moves++;}
  v.revealed=false;v.cursor++;if(v.cursor>=n-v.pass-1){v.pass++;v.cursor=0;}v.done=v.pass>=n-1;return true;
 }
 if(id==='hoist'){
  if(v.scan<n){
   if(action==='inspect'&&!v.revealed){v.revealed=true;v.comparisons++;return true;}
   if(!v.revealed||!['select','keep'].includes(action)||(a[v.scan]<a[v.best])!==(action==='select'))return false;
   if(action==='select')v.best=v.scan;v.scan++;v.revealed=false;return true;
  }
  if(action!=='place')return false;
  if(v.best!==v.front){[a[v.front],a[v.best]]=[a[v.best],a[v.front]];v.moves++;}
  v.front++;v.best=v.front;v.scan=v.front+1;v.done=v.front>=n-1;return true;
 }
 if(v.held===null){if(action!=='take')return false;v.held=a[v.next];v.hole=v.next;a[v.hole]=null;return true;}
 if(v.hole>0&&action==='inspect'&&!v.revealed){v.revealed=true;v.comparisons++;return true;}
 if(action==='shift'&&v.hole>0&&v.revealed&&a[v.hole-1]>v.held){a[v.hole]=a[v.hole-1];a[--v.hole]=null;v.moves++;v.revealed=false;return true;}
 if(action==='insert'&&(v.hole===0||v.revealed&&a[v.hole-1]<=v.held)){a[v.hole]=v.held;v.held=null;v.revealed=false;v.next++;v.done=v.next>=n;return true;}
 return false;
}
function searchStart(id){return {cursor:0,low:0,high:15,revealed:false,seen:[],comparisons:0,done:false};}
function searchAt(v,id){return SEARCHES[id].ordered?Math.floor((v.low+v.high)/2):v.cursor;}
function searchStep(v,id,action){
 if(v.done)return false;
 const d=SEARCHES[id],at=searchAt(v,id),value=d.values[at];
 if(action==='inspect'&&!v.revealed){v.revealed=true;v.comparisons++;v.seen.push(at);if(value===TARGET)v.done=true;return true;}
 if(!v.revealed)return false;
 if(!d.ordered){if(action!=='next'||v.cursor>=15)return false;v.cursor++;}
 else if(action==='earlier'&&TARGET<value)v.high=at-1;
 else if(action==='later'&&TARGET>value)v.low=at+1;
 else return false;
 v.revealed=false;return true;
}
function replay(start,step,raw){const v=start(),log=[];for(const action of Array.isArray(raw)?raw.slice(0,180):[]){if(typeof action!=='string'||!step(v,action))break;log.push(action);}return {v,log};}
function cargo(s,id){return replay(()=>cargoStart(id),(v,a)=>cargoStep(v,id,a),state(s).cargo.logs[id]).v;}
function search(s,id){return replay(()=>searchStart(id),(v,a)=>searchStep(v,id,a),state(s).archive.logs[id]).v;}
function status(s){const h=state(s),batches=Object.fromEntries(Object.keys(BATCHES).map(id=>[id,cargo(s,id)])),searches=Object.fromEntries(Object.keys(SEARCHES).map(id=>[id,search(s,id)]));return {cargoOpen:R.worldRecoveryStatus(s).ferry,archiveOpen:!!s.campaign.quests['side-5']?.done,cargoDone:Object.values(batches).every(v=>v.done),located:searches.notes.done&&searches.index.done,raceDone:searches.courier.done&&searches.navigator.done,batches,searches,...h};}
function house(id,parent,name,door,objects){R.HOMES[id]={id,parent,chapter:2,kind:'story',name,door};R.MAPS[id]={name:R.MAPS[parent].name+'・'+name,subtitle:'每一箱藥、每一頁手記，都記著仍在等待的人',theme:'home',parent,chapter:2,recommended:[11,11],spawn:[7,7],blocks:R.HOME_LAYOUT.furniture.map(b=>[...b]),objects:[['home-exit','exit',7,8,'走回外面',{map:parent,at:[door[0],door[1]+1]}],...objects],enemies:[]};}
house(SHED,'harbor','沿岸貨棚',[14,6],[['port-foreman','port-person',7,3,'藥船的理貨員'],['port-rail','port-station',3,5,'窄軌貨台',{batch:'rail'}],['port-hoist','port-station',7,5,'挑箱吊架',{batch:'hoist'}],['port-arrival','port-station',10,5,'接貨長桌',{batch:'arrival'}],['port-reply','port-note',10,7,'收貨站的回信']]);
house(ARCHIVE,'ashland','航記小屋',[14,4],[['port-keeper','port-person',7,3,'守著手記的抄寫人'],['port-notes','port-records',3,5,'散頁航記',{search:'notes'}],['port-index','port-records',7,5,'編號索引',{search:'index'}],['port-couriers','port-note',10,6,'兩名送信人的出發單']]);
house(REFUGE,'ashland','東岸避風所',[14,12],[['port-survivor','port-person',7,4,'曾被老師救下的旅人'],['port-memory','port-note',10,6,'燈下保留的舊信']]);
function obj(id,type,x,y,name,data={}){return {id,type,x:C(x),y:C(y),name,data};}
R.objects=s=>{const list=B.objects(s),v=status(s);
 if(s.map==='harbor'){list.push(obj('port-clerk','port-person',14,9,v.cargo.claimed?'準備出航的理貨員':'正核對藥箱的理貨員'),obj('port-shed-door',v.cargoOpen?'dungeon':'port-note',14,6,'沿岸貨棚',{map:SHED,at:[7,7],house:true}));if(v.cargo.claimed)list.push(obj('port-supply','port-cache',12,13,v.cargo.supply?'已領過的碼頭補給':'碼頭留給旅人的補給',{spent:v.cargo.supply}));}
 if(s.map==='ashland'){list.push(obj('port-archive-door',v.archiveOpen?'dungeon':'port-note',14,4,'老師的航記小屋',{map:ARCHIVE,at:[7,7],house:true}));if(v.located)list.push(obj('port-refuge-door','dungeon',14,12,'東岸避風所',{map:REFUGE,at:[7,7],house:true}));}
 if(s.map===SHED)for(const o of list)if(o.data?.batch)o.data={...o.data,done:v.batches[o.data.batch].done,order:v.batches[o.data.batch].order};
 return list;};
R.create=(...args)=>{const s=B.create(...args);s.harborStories=fresh();return s;};
R.validate=raw=>{const s=B.validate(raw),h=fresh(),old=raw?.harborStories;
 if(old?.version===1){for(const [group,defs,start,step]of [['cargo',BATCHES,cargoStart,cargoStep],['archive',SEARCHES,searchStart,searchStep]]){h[group].accepted=old[group]?.accepted===true;for(const id of Object.keys(defs))h[group].logs[id]=replay(()=>start(id),(v,a)=>step(v,id,a),old[group]?.logs?.[id]).log;}s.harborStories=h;const v=status(s);h.cargo.claimed=old.cargo?.claimed===true&&v.cargoDone;h.cargo.supply=old.cargo?.supply===true&&h.cargo.claimed;h.archive.visited=old.archive?.visited===true&&v.located;h.archive.claimed=old.archive?.claimed===true&&h.archive.visited;if(['port-cargo-task','port-archive-task'].includes(old.tracked))h.tracked=old.tracked;}
 s.harborStories=h;const v=status(s),blocked=s.map===SHED&&!v.cargoOpen||s.map===ARCHIVE&&!v.archiveOpen||s.map===REFUGE&&(!v.archiveOpen||!v.located);
 if(blocked){const at=s.map===SHED?[14,7]:s.map===ARCHIVE?[14,5]:[14,13];s.map=s.map===SHED?'harbor':'ashland';s.x=C(at[0]);s.y=C(at[1]);R.placeParty(s);}
 else if([SHED,ARCHIVE,REFUGE].includes(s.map)&&raw.homes?.version===3&&s.map===raw.map&&Number.isFinite(raw.x)&&Number.isFinite(raw.y)&&R.walkable(s,raw.x,raw.y)){s.x=raw.x;s.y=raw.y;}
 return s;};
function near(s,id){const o=R.objects(s).find(o=>o.id===id);return o&&R.dist(s,o)<=90&&R.lineOfSight(s,s,o)?o:null;}
function init(s){return s.harborStories??=fresh();}
const row=a=>a.map(n=>n===null?'空位':String(n)).join(' → ');
function cargoMenu(s,id){const v=cargo(s,id),a=v.order,n=a.length;let text='藥箱按收貨站 1 → 5 出船。這批：'+row(a)+'\n已比較 '+v.comparisons+' 次；搬動 '+v.moves+' 次。',options=[];
 if(v.done)text+='\n這批已封箱。三批都完成後，找理貨員回報。';
 else if(id==='rail'){text+='\n窄軌只能處理相鄰兩箱。由左往右檢查，每走完一輪，最後一箱留在原位。\n目前第 '+(v.cursor+1)+'、'+(v.cursor+2)+' 箱'+(v.revealed?'：'+a[v.cursor]+' 與 '+a[v.cursor+1]+'。':'尚未核對。');options=v.revealed?[{id:'swap',text:'交換這兩箱'},{id:'keep',text:'保持原位，往下一對'}]:[{id:'inspect',text:'核對這對相鄰藥箱'}];}
 else if(id==='hoist'){text+='\n前 '+v.front+' 箱已裝妥。先看完剩下的箱子，記住站號最前的一箱，再吊到本輪前端。\n目前暫記 '+a[v.best]+' 號箱'+(v.scan<n?(v.revealed?'；正比較 '+a[v.scan]+' 號箱。':'；下一箱還沒核對。'):'；本輪全部核對完畢。');options=v.scan>=n?[{id:'place',text:'把暫記藥箱吊到前端'}]:v.revealed?[{id:'select',text:'改記剛看的藥箱'},{id:'keep',text:'保留原先記住的藥箱'}]:[{id:'inspect',text:'核對下一箱的站號'}];}
 else{text+='\n最初兩箱已排好。每次取出下一箱，把前段比它晚到站的箱子向右挪，再放進留下的空位。';if(v.held===null)options=[{id:'take',text:'取出第 '+(v.next+1)+' 箱'}];else{text+='\n手上是 '+v.held+' 號箱。'+(v.hole===0?'已到最前端。':v.revealed?'左邊是 '+a[v.hole-1]+' 號箱。':'先核對空位左邊的箱子。');options=v.hole>0&&!v.revealed?[{id:'inspect',text:'核對左邊藥箱'}]:[{id:'shift',text:'將左箱向右挪一格'},{id:'insert',text:'把手上的箱子放入空位'}];}}
 if(!v.done)options.push({id:'reset',text:'免費重整這批貨'});
 const active=id==='rail'?[v.cursor,v.cursor+1]:id==='hoist'?[v.best,v.scan]:v.held!==null?[v.hole-1,v.hole]:[v.next];
 return {id:'port-cargo-'+id,title:BATCHES[id].name,text,options,board:{caption:'收貨站順序｜'+(v.held!==null?'手持 '+v.held+' 號箱':'每格一箱'),cells:a.map((n,i)=>({text:n===null?'空位':String(n)+' 號',state:v.done||(id==='rail'?i>=a.length-v.pass:id==='hoist'?i<v.front:i<v.next&&v.held===null)?'fixed':active.includes(i)?'active':''}))}};
}
function archiveMenu(s,id){const v=search(s,id),d=SEARCHES[id],at=searchAt(v,id),value=d.values[at];let text='要找的救援站號：'+TARGET+'。共 '+d.values.length+' 頁。\n'+(d.ordered?'這份出發單已按站號由小到大整理。整理十六頁是先前工作，不算進這次查閱次數。':'這份記錄從第一頁逐頁核對，不跳頁。')+'\n已查閱 '+v.comparisons+' 次；這是頁數比較，不是秒數。',options=[];
 if(v.done)text+='\n找到 '+TARGET+' 號：東岸避風所。兩套原記錄核對完成後，林地南側會出現探訪入口。';
 else if(!v.revealed){text+=d.ordered?'\n目前範圍：第 '+(v.low+1)+' 至 '+(v.high+1)+' 頁；中間為第 '+(at+1)+' 頁。':'\n下一份：第 '+(at+1)+' 頁。';options=[{id:'inspect',text:d.ordered?'翻開範圍中間的索引':'翻開這一頁航記'}];}
 else{text+='\n第 '+(at+1)+' 頁記著 '+value+' 號站。';options=d.ordered?[{id:'earlier',text:'目標站號較小，保留前半段'},{id:'later',text:'目標站號較大，保留後半段'}]:[{id:'next',text:'這頁不是，接著查下一頁'}];}
 if(['courier','navigator'].includes(id))options.push({id:'reset',text:'重新核對這份出發單'});
 return {id:'port-search-'+id,title:d.name,text,options,board:{caption:d.ordered?'編好號的索引｜暗格已排除':'依頁次保存的航記',cells:d.values.map((n,i)=>({text:(i+1)+'頁 '+(v.seen.includes(i)?n:'？'),state:v.seen.includes(i)&&n===TARGET?'fixed':d.ordered&&(i<v.low||i>v.high)?'muted':i===at?'active':''}))}};
}
function courierMenu(s){const v=status(s);return {id:'port-couriers',title:'兩名送信人的同一張清單',text:'兩人都用同一份已編號的十六頁記錄，確認同一個 '+TARGET+' 號站。第一人逐頁核對，第二人依中間站號縮小範圍。\n'+(v.raceDone?'核對完成：第一人 '+v.searches.courier.comparisons+' 次；第二人 '+v.searches.navigator.comparisons+' 次。':'各完成一份，這裡會留下兩人的查閱次數。')+'\n只比較本次查閱，不把整理資料的成本算成零，也不比較閱讀速度。這項重查不另發獎勵。',options:[{id:'courier',text:'替第一位送信人核對'},{id:'navigator',text:'替第二位送信人核對'}]};}
function cargoReport(s){const h=init(s),v=status(s);h.cargo.accepted=true;if(!v.cargoOpen)return {speaker:'藥船的理貨員',text:'先讓渡船恢復：到鏡沼取航標零件交給修船人，並向港口旅人回報「送不出去的藥箱」。船能走了，我們再整理下一批貨。',important:true};if(v.cargo.claimed)return {speaker:'藥船的理貨員',text:'三批藥箱已送上船，收貨站的回信放在貨棚。碼頭南側留了一份旅人補給，尚未領取時可以帶走。'};if(!v.cargoDone)return {speaker:'藥船的理貨員',lines:['船已能靠岸，新的藥箱也到了。每箱寫著收貨站號；依 1 到 5 排好，船夫沿途就不必反覆翻箱。','北邊的沿岸貨棚有窄軌、吊架和接貨長桌。三批各有不同搬法，完成後回來找我。露米託我們把藥送到每一處有人等待的岸邊。'],important:true};h.cargo.claimed=true;s.gold=Math.min(999999,s.gold+60);s.bag.tonic=Math.min(9999,s.bag.tonic+2);R.log(s,'三批藥箱依沿岸站號出航，港口收到了回信。');return {speaker:'藥船的理貨員',text:'三批藥箱都已裝妥。船夫逐站交貨，岸邊藥師也送來了平安回信。收下 60 G、星露 ×2；南側碼頭另留了一份旅人補給。',important:true};}
R.interact=(s,id)=>{
 if(!id.startsWith('port-'))return B.interact(s,id);
 const o=near(s,id);if(!o)return {text:'再靠近一點。'};
 const v=status(s),h=init(s);
 if(['port-clerk','port-foreman','port-shed-door'].includes(id))return cargoReport(s);
 if(o.data?.batch&&s.map===SHED&&v.cargoOpen){h.cargo.accepted=true;return {choice:cargoMenu(s,o.data.batch)};}
 if(id==='port-reply')return {speaker:'沿岸收貨站的回信',text:v.cargo.claimed?'「藥已按站送達。孩子今晚終於退了燒，桌上也替下一位送藥人留了一盞燈。」落款是東岸的藥師。':'桌上留著空白回信紙。三批藥箱送出、向理貨員回報後，會有新的消息。'};
 if(id==='port-supply'){if(h.cargo.supply)return {text:'這份碼頭補給已領取，留下的物資要送給下一位旅人。'};h.cargo.supply=true;s.bag.potion=Math.min(9999,s.bag.potion+2);s.bag.tonic=Math.min(9999,s.bag.tonic+1);return {text:'領取碼頭補給：紅葉藥水 ×2、星露 ×1。',loot:true,important:true};}
 if(['port-archive-door','port-keeper'].includes(id)){h.archive.accepted=true;return {speaker:'守著手記的抄寫人',lines:!v.archiveOpen?['老師第三頁還沒帶回來。到餘火迷廊的東南石壁尋找筆記，再交回灰燼林地西側、等著它的旅人。']:v.archive.claimed?['東岸旅人的故事已經記下。原記錄仍放在桌上，兩名送信人的出發單也可以隨時重新核對。']:['伊娜把找回的第三頁交給我。頁角寫著「尋八十三號，讓燈留在岸邊」。','老師留了散頁航記與編號索引。兩份都核對過，就能確認那位旅人當年在哪裡避難。南側的舊門也會有了方向。'],important:true};}
 if(o.data?.search&&s.map===ARCHIVE&&v.archiveOpen){h.archive.accepted=true;return {choice:archiveMenu(s,o.data.search)};}
 if(id==='port-couriers'){if(!v.located)return {text:'先核對散頁航記與編號索引，確認同一個救援站號，再替兩名送信人準備出發單。'};return {choice:courierMenu(s)};}
 if(id==='port-survivor'&&s.map===REFUGE&&v.located){h.archive.visited=true;if(h.archive.claimed)return {speaker:o.name,text:'老師留下的那盞燈還亮著。謝謝你替我們把消息帶回來，這段約定已經完成了。'};h.archive.claimed=true;s.gold=Math.min(999999,s.gold+45);s.bag.ether=Math.min(9999,s.bag.ether+1);R.log(s,'在東岸避風所聽見老師當年守住旅人的故事。');return {speaker:o.name,lines:['當年霧潮追上岸時，是老師把我們送進這裡。他封住星脈，替船上的人爭取了一夜；那不是拋下誰，而是讓還來不及出發的人能活下來。','伊娜若在這裡，請讓她知道：我們從來沒有怪他。這盞燈會繼續留給後來的人。請收下 45 G 與月露精華 ×1，當作旅途的補給。'],important:true};}
 if(id==='port-memory')return {speaker:'避風所的舊信',text:'「若只能多留一夜，就替還沒上船的人留燈。別替我守住名字，替他們守住回家的路。」這段話與老師手記中的筆跡相同。'};
 return {text:'記錄留在這裡，等下次回訪時再繼續。'};
};
R.resolveChoice=(s,id,value)=>{
 if(!id.startsWith('port-'))return B.resolveChoice(s,id,value);
 const v=status(s),h=state(s);
 if(id.startsWith('port-cargo-')){const batch=id.slice(11);if(!Object.hasOwn(BATCHES,batch)||s.map!==SHED||!v.cargoOpen||!h.cargo.accepted||!near(s,'port-'+batch))return null;
  if(value==='reset'&&!v.batches[batch].done){h.cargo.logs[batch]=[];return {text:'這批貨已重新擺妥，其他兩批保留。',choice:cargoMenu(s,batch)};}
  const current=cargo(s,batch);if(!cargoStep(current,batch,value))return {text:'這樣會把到站順序排反，先看清目前核對的箱子。',choice:cargoMenu(s,batch)};
  h.cargo.logs[batch].push(value);return {choice:cargoMenu(s,batch),important:true};
 }
 if(id==='port-couriers'){if(s.map!==ARCHIVE||!v.archiveOpen||!v.located||!near(s,'port-couriers')||!['courier','navigator'].includes(value))return null;return {choice:archiveMenu(s,value)};}
 if(id.startsWith('port-search-')){const key=id.slice(12),race=['courier','navigator'].includes(key);if(!Object.hasOwn(SEARCHES,key)||s.map!==ARCHIVE||!v.archiveOpen||!h.archive.accepted||race&&!v.located||!near(s,race?'port-couriers':'port-'+key))return null;
  if(value==='reset'&&race){h.archive.logs[key]=[];return {choice:archiveMenu(s,key)};}
  const current=search(s,key);if(!searchStep(current,key,value))return {text:'目標是 '+TARGET+' 號，請依剛看的站號重新判斷；查閱次數沒有增加。',choice:archiveMenu(s,key)};
  h.archive.logs[key].push(value);return {choice:archiveMenu(s,key),important:true};
 }
 return null;
};
R.travel=(s,o)=>{const to=o.data?.map,v=status(s);if(to===SHED&&!v.cargoOpen)return {text:'先修復航標並回報港口的藥箱委託。'};if(to===ARCHIVE&&!v.archiveOpen||to===REFUGE&&(!v.archiveOpen||!v.located))return {text:'先把第三頁交回，再核對兩套航道記錄。'};return B.travel(s,o);};
function tasks(s){const v=status(s),out=[];if(v.cargo.accepted)out.push({id:'port-cargo-task',title:'藥船出港前的三批貨',map:'harbor',receiver:'port-clerk',status:v.cargo.claimed?'done':v.cargoDone?'ready':'investigating',hint:!v.cargoOpen?'取回航標零件交給修船人，並向港口旅人回報藥箱委託。':!v.cargoDone?'進入港口北側沿岸貨棚，依三種設備整理三批藥箱；進度會保留。':v.cargo.claimed?'藥箱已出航，貨棚可讀回信；碼頭補給可領一次。':'回港口理貨員或貨棚內的理貨員回報。',reward:'60 G、星露 ×2，另有一次碼頭補給'});if(v.archive.accepted)out.push({id:'port-archive-task',title:'老師留下的兩套索引',map:'ashland',receiver:'port-archive-door',status:v.archive.claimed?'done':v.located?'ready':'investigating',hint:!v.archiveOpen?'在餘火迷廊取第三頁，再向灰燼林地西側旅人回報。':!v.located?'在航記小屋核對散頁航記與編號索引，找八十三號站。':v.archive.claimed?'東岸故事已記下；可回航記小屋替兩名送信人重查出發單。':'進入灰燼林地南側的東岸避風所，與倖存旅人交談。',reward:'45 G、月露精華 ×1、老師往事與避風所探訪'});return out;}
R.taskLedger=s=>[...B.taskLedger(s),...tasks(s)];
R.trackTask=(s,id)=>{if(['port-cargo-task','port-archive-task'].includes(id)){if(!tasks(s).some(t=>t.id===id&&t.status!=='done'))return false;init(s).tracked=id;if(s.worldRecovery)s.worldRecovery.tracked=null;return true;}const ok=B.trackTask(s,id);if(ok&&s.harborStories)s.harborStories.tracked=null;return ok;};
R.trackedQuest=s=>{const t=tasks(s).find(t=>t.id===state(s).tracked&&t.status!=='done');return t?{title:t.title,text:t.hint,progress:t.status==='ready'?.9:.35}:B.trackedQuest(s);};
Object.assign(R,{HARBOR_BATCHES:BATCHES,HARBOR_SEARCHES:SEARCHES,HARBOR_CODES:CODES,HARBOR_SEARCH_TARGET:TARGET,HARBOR_STORY_MAPS:{shed:SHED,archive:ARCHIVE,refuge:REFUGE},harborStoriesStatus:status,BUILD:'20261031.41'});
if(typeof module!=='undefined'&&module.exports)module.exports=R;
})(typeof globalThis!=='undefined'?globalThis:this);
