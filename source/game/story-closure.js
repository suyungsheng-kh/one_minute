(function(root){
'use strict';
const R=root.PaperRPG||(typeof require!=='undefined'?require('./harbor-afterword.js'):null),B={...R},C=R.center;
const ARRIVALS={
'mistwatch-2':['長廊裡回應著一路走來的聲音：港口的風鈴、灰燼中的手記與霧岸等待藥箱的人，都在提醒你，這條航道仍有人等著恢復。','你檢查行囊與護符，望向仍被霧影遮住的燈心。潮印已經相聚，接下來還要讓守望者聽見岸上的回應。'],
'mistwatch-3':['三枚潮印在燈心前亮起，霧潮守望者仍擋在星脈與航道之間。岸上的人還在等待第一道能穿過霧的光。','老師留下的手記沒有寫下最後的答案。你必須先讓失控的守望者平靜，再調查燈心，才能知道封印接下來會指向哪裡。'],
'homeward-1':['風、記憶與守護三份誓約已經齊備，歸途之塔因此開門。你帶著山道上的回聲、王庭未寄出的話與聖域重新立下的約定，踏進最後一段路。','塔外還有人等著回家。這一次，你要面對的是把所有星光握在同一處的陰影。'],
'homeward-3':['三份誓約在燈心前彼此回應，吞光之影仍守著最後的核心。村莊、港口與要塞的燈，正在等待這裡重新接通。','你走過的每一段路，都曾有人替下一個人留出位置。現在要把那份約定帶到核心前，讓星脈重新有回應的機會。']};
const POST_BOSS={
'mistwatch-3':['霧潮守望者的倒影散開，燈心前的路終於露出來。岸上的風鈴仍在霧裡等待回音。','調查東側燈心，讓三枚潮印真正接回星脈，再把航道恢復的消息帶回風鈴港。'],
'homeward-3':['吞光之影散去，最後的核心已能靠近。風、記憶與守護三份誓約仍在你身旁發光。','還差最後一步：調查東側核心，讓這段旅程真正回應村莊、港口與要塞。']};
for(const [id,lines]of Object.entries(ARRIVALS)){R.CAMPAIGN_ROOMS[id].story=[...lines];R.MAPS[id].subtitle=lines[0];}
R.SIDEQUESTS.find(q=>q.id==='side-4').text='到灰燼林地找回藥箱，交回港口旅人，讓補給重新送上航道。';
const NEUTRAL={ina:[
['伊娜說，她第一次在這裡學會點亮火花。老師總說，法術應先讓迷路的人看見路。','林徑旁的教學刻痕寫著：「法術應先讓迷路的人看見路。」留下記號的法師，曾在這裡教人點亮第一道火花。'],
['伊娜認出法師的披風。她想知道老師為何離開，但眼前還有被陰影困住的巨靈。','記憶中的法師留下了尚未說完的告別。眼前的巨靈仍被陰影困住，你先把追問過去的念頭收進手札。'],
['伊娜回頭，發現影子仍停在原處','你回頭，發現影子仍停在原處'],
['伊娜在灰燼裡找到老師的筆跡。','你在灰燼裡找到與林間教學刻痕相似的筆跡。'],
['她第一次懷疑，老師是否曾獨自承擔這一切。','手記讓你懷疑，留下封印的人是否曾獨自承擔這一切。'],
['伊娜收起手記，說她想學會的，不只是讓火燒得更旺。','你把手記收好。留下方法的人曾希望火光能指路，而不只是燒得更旺。'],
['水面顯示的是沒有做出的選擇：未出發的你，留下的伊娜，以及放棄行醫的露米。','水面顯示的是沒有做出的選擇：沒有出發的旅人、沒能寄出的信，以及始終等不到補給的岸邊。'],
['伊娜在營地裡找到老師留下的第二封信','你在營地裡找到延續灰燼手記筆跡的另一封信'],
['伊娜放下老師的信，第一次沒有急著替過去找到一個完美的解釋。','你把舊信留在空席旁，沒有急著替過去找到一個完美的解釋。'],
['伊娜卻問：如果那個人也有害怕的一天呢？','門外的刻痕卻留下反問：如果那個人也有害怕的一天呢？'],
['伊娜認出了海面上的符文，那是她老師留下的記號。','海面上的符文與林間手記相互呼應，指向留下封印的法師。'],
['伊娜追尋老師的足跡','你循手記追尋封印的來歷'],
['伊娜終於讀懂老師的手記','你終於讀懂老師留下的手記'],
['伊娜選擇將學到的法術教給願意守護別人的人','引路與法術的記錄被留給願意守護別人的人']
],lumi:[
['露米把濁水收進小瓶。她說，只治好眼前的人還不夠，也要找回讓大家能安心生活的地方。','岸邊留下盛著濁水的小瓶與一張藥草單：要讓旅人安心生活，還得找回乾淨的水源。'],
['露米卻說，那也許是未被聽見的求救','石壁的舊字卻提醒你，那也許是未被聽見的求救'],
['露米聽見一位老人反覆呼喚未歸的孩子。','你聽見一位老人反覆呼喚未歸的孩子。'],
['她取出從故鄉帶來的繃帶，替旅人包住凍傷的手。即使還不知道名字，也能先照顧眼前的人。','渡口留著替傷者準備的乾淨繃帶。即使還不知道名字，也有人願意先照顧眼前的人。'],
['露米說，願意替陌生人留下糧食的人，也值得有人替他們留一條路。','糧袋旁的字寫著：「願意替陌生人留飯的人，也值得有人替他們留一條路。」'],
['露米說，有時人們最需要的，是承認那個位置曾經有人。','空席旁留著一行字：「請記得，這個位置曾經有人。」'],
['露米則收到故鄉風鈴港的求援信。','一封從風鈴港送來的求援信，帶來航道被霧封住的消息。'],
['露米想找回送藥的航道','港口的人盼著找回送藥的航道'],
['露米重新踏上送藥的道路','藥箱重新送往需要的人手中']
]};
function joined(s,id){return (s.party||[]).some(p=>p.id===id);}
function narrate(s,line){let t=String(line);for(const id of ['ina','lumi'])if(!joined(s,id))for(const [a,b]of NEUTRAL[id])t=t.split(a).join(b);if(!s.party?.length){t=t.replace('夥伴提醒彼此','你提醒自己').replace('夥伴確認各自的補給，把仍有光的護符交到彼此手裡','你確認行囊裡的補給，握緊仍有光的護符').replace('接下來的門，將由你們一起推開','接下來的門，將回應一路帶來的約定');}return t;}
function roomLines(s,map=s.map){const def=R.CAMPAIGN_ROOMS[map];if(!def)return [];let lines=def.story;if(POST_BOSS[map]){if(s.campaign.finished.includes(def.end))lines=R.CHAPTERS[def.end-1].outro;else if(s.defeated.includes(map+'-boss'))lines=POST_BOSS[map];}return lines.map(l=>narrate(s,l));}
function echoes(s){const a=[];if(s.guidingPact?.claimed)a.push({id:'pact',line:'晨星要塞的接班石像接過引路約定，守路人終於能把晚飯帶回家。'});else if(s.lamplighter?.claimed)a.push({id:'lamps',line:'灰燼林地的四盞引路燈重新亮起，送藥人已能沿著燈影回家。'});else if(s.runeRepair?.claimed)a.push({id:'runes',line:'巡路副本邊上留下你的記號，另一座石像甦醒，等候有人接續守路。'});
if(s.shelter?.claimed)a.push({id:'shelter',line:'月溪藥屋的屋簷留著乾毛巾與燈火，青葉出門採藥時，送藥人也有地方安心等雨停。'});
if(s.harborAfterword?.letter.claimed)a.push({id:'letter',line:'新航記補上八十四號安置點的往事：地址會變，替晚到的人留燈的約定還在。'});
if(s.harborAfterword?.late.claimed)a.push({id:'cargo',line:'晚到的三號箱也抵達岸站，回信寫著：「晚來的一箱，也有人等它。」'});return a;}
function near(s,id){const o=R.objects(s).find(o=>o.id===id);return o&&R.dist(s,o)<=90&&R.lineOfSight(s,s,o)?o:null;}
R.objects=s=>{const a=B.objects(s);if(s.map===R.LAMPLIGHTER_ROOM&&s.lamplighter?.claimed)a.push({id:'closure-courier',type:'port-person',x:C(17),y:C(10),name:'沿燈回來的送藥人',data:{}});if(s.map==='bastion'){if(s.guidingPact?.claimed)a.push({id:'closure-statue',type:'lamplighter-statue',x:C(16),y:C(8),name:'接班的巡路石像',data:{}});if(echoes(s).length||s.campaign.finished.includes(3))a.push({id:'closure-letters',type:'port-note',x:C(11),y:C(14),name:'沿途寄來的回信集',data:{}});}return a;};
R.interact=(s,id)=>{if(id.startsWith('closure-')){if(!near(s,id))return {text:'再靠近回信或旅人一點。'};if(id==='closure-courier')return {speaker:'沿燈回來的送藥人',lines:['以前走到灰燼邊，我總得等天亮才敢繼續。現在一站一盞燈，走到歸路旗就知道能停下。','藥已送到，我想沿著這條路回家吃晚飯。燈留在這裡，下一個人也用得著。']};if(id==='closure-statue')return {speaker:'接班石像留下的刻痕',text:'石像守著你交來的引路約定。通行旗升起時，下一班守路人已接住山道上的光。'};return {speaker:'沿途寄來的回信集',lines:echoes(s).length?[...echoes(s).map(e=>e.line),'每一份回信都留在這裡。你走通的路，已有人替下一位旅人守著。']:['三座星燈已經彼此回應，村莊、港口與要塞的人正沿著亮起的路重新往來。','還有些回信會在下一次相遇時抵達。今晚，你可以先安心回家。']};}
if(id==='guiding-pact-keeper'&&s.guidingPact?.claimed&&near(s,id))return {speaker:'準備回家的守路人',lines:['接班的石像就在路旁，我不必再守到每一個人都走完才離開。','「'+s.guidingPact.name+'」已交到下一人手中，謝禮也領過了。等晚飯涼掉以前，我要回家了。']};
const r=B.interact(s,id);if(!r)return r;if(id==='record'&&R.CAMPAIGN_ROOMS[s.map]&&near(s,id))return {...r,lines:[...roomLines(s),'留下的線索：'+R.CAMPAIGN_ROOMS[s.map].note]};let out={...r};if(out.lines)out.lines=out.lines.map(l=>narrate(s,l));if(out.choice){out.choice={...out.choice,text:narrate(s,out.choice.text)};if(out.choice.id==='sanctuary-2')out.choice={...out.choice,title:'誰來接住下一盞光',options:[{id:'share',text:'讓願意同行的人共守，分出補給照顧彼此'},{id:'carry',text:'先帶著補給承擔，替後來的人找到出路'}]};if(out.choice.id==='sandcity-2')out.choice={...out.choice,title:'暮砂午後留下的水',options:[{id:'share',text:'把水留給眼前的旅人'},{id:'carry',text:'帶水繼續前行，尋找更多出路'}]};}if(out.text)out.text=narrate(s,out.text);if(id==='recovery-ledger'&&s.shelter?.claimed&&near(s,id)&&out.lines)out.lines.push('青葉在帳邊補記：「藥箱有人接，屋簷有人等；我終於能放心出門採藥。」');if(id==='port-memory'&&s.harborAfterword?.letter.claimed&&near(s,id)&&out.text)out.text+=' 新航記另夾著一張收信回條：八十四號安置點已有人接到消息。';return out;};
R.friendlyAppearance=(s,o)=>o?.id==='closure-courier'?'traveler':B.friendlyAppearance(s,o);
R.victoryText=(s,e)=>{const r=B.victoryText(s,e);return r?POST_BOSS[s.map]?[r[0],...POST_BOSS[s.map]].map(l=>narrate(s,l)):r.map(l=>narrate(s,l)):r;};
function afterword(s,e){if(!e?.finished)return e;const a=echoes(s),choice=s.campaign.choices['sanctuary-2'],lines=[];if(a.length)lines.push('沿途的回信陸續抵達。'+a.map(v=>v.id==='pact'?'守路的約定已有人接班。':v.id==='lamps'?'四盞路燈仍替晚歸的人指路。':v.id==='runes'?'修好的符石已交到下一位守路者手中。':v.id==='shelter'?'送藥人能在藥屋屋簷下安心避雨。':v.id==='letter'?'新航記保存著舊冊之外的人名。':'晚到的藥箱也送到了。').join(''));
if(choice==='share')lines.push('你曾選擇讓願意同行的人一起守望。如今，每一盞回應的燈，都接續著那份選擇。');else if(choice==='carry')lines.push('你曾選擇先帶著責任往前走。如今沿途伸來的手提醒你，承擔也能有人接續。');if(!lines.length)return e;lines.push('你終於能沿著自己點亮的路回家。下一盞燈，已有人願意接住。');return {...e,pages:e.pages.map((p,i)=>i===e.pages.length-1?{...p,lines:[...p.lines,...lines]}:p)};}
R.endingState=s=>afterword(s,B.endingState(s));R.recordEnding=s=>afterword(s,B.recordEnding(s));
Object.assign(R,{storyNarrate:narrate,storyRoomLines:roomLines,storyClosureEchoes:echoes,STORY_ARRIVALS:ARRIVALS,STORY_POST_BOSS:POST_BOSS,BUILD:'20261104.46'});
if(typeof module!=='undefined'&&module.exports)module.exports=R;
})(typeof globalThis!=='undefined'?globalThis:this);
