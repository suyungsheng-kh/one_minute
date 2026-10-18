'use strict';
(() => {
  const catalog=window.ONE_MINUTE_CATALOG;if(!catalog)return;
  const $=id=>document.getElementById(id),series=new Map(catalog.series.map(s=>[s.id,s]));
  const lessons=catalog.lessons.filter(l=>l.status!=='draft'),published=lessons.filter(l=>l.status!=='coming-soon'),lessonMap=new Map(published.map(l=>[l.id,l]));
  const paths=catalog.paths||catalog.series.map(s=>({id:s.id,series:s.id,title:s.title,description:s.subtitle,goal:s.subtitle,lessonIds:published.filter(l=>l.series===s.id).map(l=>l.id)}));
  let completed=[],activeSeries='all';
  function loadCompleted(){try{const saved=JSON.parse(localStorage.getItem('one-minute-watched-v1')||'[]');completed=Array.isArray(saved)?saved.filter(x=>typeof x==='string'):[];}catch{completed=[];}}
  loadCompleted();
  function el(tag,cls,value){const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=value;return n;}
  function link(href,cls,text){const a=el('a',cls,text);a.href=href;return a;}
  function duration(s){return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
  function timeLabel(s){const m=Math.floor(s/60),r=s%60;return `${m?m+' 分鐘':''}${m&&r?' ':''}${r?r+' 秒':''}`;}
  function tone(s){return `tone-${s.color||'green'}`;}
  function members(p){return p.lessonIds.map(id=>lessonMap.get(id)).filter(Boolean);}
  function courseUrl(id,p){return `lesson.html?id=${encodeURIComponent(id)}${p?'&path='+encodeURIComponent(p.id):''}`;}
  function pathUrl(p){return `path.html?id=${encodeURIComponent(p.id)}`;}
  function pathFor(l,id){return paths.find(p=>p.id===id&&p.lessonIds.includes(l.id))||paths.find(p=>p.lessonIds.includes(l.id))||{id:l.series,series:l.series,title:series.get(l.series).title,lessonIds:published.filter(x=>x.series===l.series).map(x=>x.id)};}
  function remember(l){if(!completed.includes(l.id))completed.push(l.id);try{localStorage.setItem('one-minute-watched-v1',JSON.stringify(completed));}catch{}}
  function setLink(id,href){$(id).hidden=!href;if(href)$(id).href=href;else $(id).removeAttribute('href');}
  function total(p){return members(p).reduce((sum,l)=>sum+l.seconds,0);}
  function renderPlayback(video){
    $('video-enhancements').hidden=false;
    $('replay-video').addEventListener('click',()=>{video.currentTime=0;video.dispatchEvent(new Event('timeupdate'));video.play().catch(()=>video.focus());});
    $('slow-video').addEventListener('click',()=>{video.playbackRate=video.playbackRate===.75?1:.75;});
    video.addEventListener('ratechange',()=>{const slow=video.playbackRate===.75;$('slow-video').setAttribute('aria-pressed',String(slow));$('slow-video').textContent=slow?'恢復正常速度':'慢慢看：0.75 倍';});
  }
  function renderGuide(l,video){
    const g=l.guide;if(!g)return;$('course-guide').hidden=false;
    for(const text of g.intro)$('guide-intro').append(el('p','',text));$('guide-example-title').textContent=g.exampleTitle;
    for(const item of g.example){const card=el('div');card.append(el('span','',item.label),el('strong','',item.value));$('guide-example-items').append(card);}
    for(const step of g.steps){const row=el('li');row.append(el('h3','',step.title),el('p','',step.text));$('guide-steps').append(row);}
    for(const text of g.reminders){const note=el('aside','guide-reminder');note.append(el('strong','','小提醒'),el('p','',text));$('guide-reminders').append(note);}$('guide-watch').textContent=g.watch;
    const table=catalog.comparisons[g.comparison];$('method-comparison').hidden=false;$('comparison-title').textContent=table.title;$('comparison-note').textContent=table.note;
    const caption=el('caption','',table.caption),head=el('thead'),header=el('tr'),body=el('tbody');for(const text of table.headers){const cell=el('th','',text);cell.scope='col';header.append(cell);}head.append(header);
    for(const row of table.rows){const tr=el('tr');for(const [i,text] of row.cells.entries()){const cell=el('td');cell.append(i===0&&row.lesson&&row.lesson!==l.id?link(courseUrl(row.lesson,pathFor(lessonMap.get(row.lesson))),'',text):document.createTextNode(text));tr.append(cell);}body.append(tr);}$('comparison-table').append(caption,head,body);
    if(g.cues){$('video-cue-panel').hidden=false;const update=()=>{const cues=video.dataset.version==='original'?l.originalVersion.cues:g.cues;let current=cues[0].text;for(const cue of cues){if(cue.t>video.currentTime+.001)break;current=cue.text;}$('video-cue').textContent=current;};for(const event of ['timeupdate','seeked','loadedmetadata'])video.addEventListener(event,update);update();
    }
    if(g.extraPractice){const q=g.extraPractice;$('extra-practice').hidden=false;$('extra-question').textContent=q.question;for(const [i,text] of q.choices.entries()){const b=el('button','answer-choice extra-answer-choice',text);b.type='button';b.dataset.extraChoice=i;b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{$('extra-choices').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const correct=i===q.correctChoice;$('extra-feedback').hidden=false;$('extra-feedback').dataset.correct=correct;$('extra-feedback').textContent=correct?`答對了！${q.answer}`:'再想想：回顧上方的操作步驟，或比較三種方法的差異。';});$('extra-choices').append(b);}}
  }
  function renderConnections(data,id){
    const section=$(id);if(!data||!section)return;
    section.hidden=false;section.append(el('p','eyebrow','從這個概念，連到下一個問題'));
    const title=el('h2','',data.title);title.id=id+'-title';section.append(title);
    for(const note of data.notes||[]){const block=el('div','concept-note');block.append(el('h3','',note.title),el('p','',note.text));section.append(block);}
    if(data.relatedLessons?.length){section.append(el('h3','related-heading','相關單元'));const list=el('ul','related-lesson-list');
      for(const item of data.relatedLessons){const target=lessonMap.get(item.lesson);if(!target)continue;const row=el('li'),a=link(courseUrl(target.id,pathFor(target)),'related-lesson-link','');a.dataset.relatedLesson=target.id;a.append(el('span','eyebrow',`${series.get(target.series).title} · ${target.seconds} 秒`),el('strong','',target.title+' →'),el('span','related-reason',item.reason));row.append(a);list.append(row);}section.append(list);
    }
  }
  const icons={search:'<circle cx="14" cy="14" r="9"/><path d="m21 21 8 8"/>',hanoi:'<path d="M6 5v21m10-21v21m10-21v21M2 27h28M2 23h8M3 19h6M4 15h4"/>',steps:'<path d="M5 9h6v6H5zM21 9h6v6h-6zM13 22h6v6h-6zM11 12h10M24 15v5H16v2"/>',code:'<path d="m11 10-6 6 6 6m10-12 6 6-6 6m-3-15-4 22"/>',bars:'<path d="M5 28V18h5v10M14 28V11h5v17M23 28V4h5v24M3 28h27"/>'};
  function home(){
    function legacy(){if(location.hash.startsWith('#lesson/'))try{const id=decodeURIComponent(location.hash.slice(8));if(lessonMap.has(id)){location.replace(courseUrl(id));return true;}}catch{}return false;}
    if(legacy())return;window.addEventListener('hashchange',legacy);
    const map=catalog.conceptMap,diagram=$('concept-map-diagram');
    if(map&&diagram){
      const ns='http://www.w3.org/2000/svg',svgNode=(tag,attrs)=>{const node=document.createElementNS(ns,tag);for(const [key,value] of Object.entries(attrs||{}))node.setAttribute(key,value);return node;};
      diagram.style.setProperty('--map-ratio',`${map.width} / ${map.height}`);
      const svg=svgNode('svg',{viewBox:`0 0 ${map.width} ${map.height}`,'aria-hidden':'true',focusable:'false',class:'map-lines'}),defs=svgNode('defs'),marker=svgNode('marker',{id:'concept-arrow',viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:7,markerHeight:7,orient:'auto'});marker.append(svgNode('path',{d:'M 1 1 L 9 5 L 1 9',fill:'none',stroke:'context-stroke','stroke-width':1.5}));defs.append(marker);svg.append(defs);
      for(const edge of map.edges){const line=svgNode('path',{d:edge.points.map(([x,y],i)=>`${i?'L':'M'} ${x} ${y}`).join(' '),class:edge.dashed?'map-edge map-edge-dashed':'map-edge'});if(edge.arrow!==false)line.setAttribute('marker-end',`url("${new URL('#concept-arrow',location.href).href}")`);svg.append(line);}
      for(const edge of map.edges){const label=svgNode('text',{x:edge.labelX,y:edge.labelY,class:'map-edge-label','text-anchor':'middle'});label.textContent=edge.label;svg.append(label);}
      diagram.append(svg);
      for(const item of map.nodes){const lesson=lessonMap.get(item.lesson),a=link(courseUrl(lesson.id,pathFor(lesson)),`map-node map-node-${item.id} tone-${item.color}`,'');a.dataset.concept=item.id;a.setAttribute('aria-label',`${item.title}：前往${lesson.title}課程`);for(const [key,value] of Object.entries({left:item.x/map.width*100,top:item.y/map.height*100,width:item.width/map.width*100,height:item.height/map.height*100}))a.style.setProperty('--node-'+key,value+'%');
        const heading=el('div','map-node-heading'),icon=el('span','map-node-icon');icon.setAttribute('aria-hidden','true');icon.innerHTML=`<svg viewBox="0 0 32 32">${icons[item.icon]||icons.steps}</svg>`;heading.append(icon,el('h3','',item.title));a.append(el('span','map-node-role',item.role),heading,el('p','',item.summary),el('span','map-node-action','前往課程 ↗'));diagram.append(a);
      }
      for(const sentence of map.summary)$('concept-map-relations').append(el('li','',sentence));
    }else if($('concept-map')){$('concept-map').hidden=true;document.querySelectorAll('a[href$="#concept-map"]').forEach(a=>a.hidden=true);}
    $('series-count').textContent=catalog.series.length;$('lesson-count').textContent=published.length;
    $('start-first').href=courseUrl(lessonMap.has(catalog.startLesson)?catalog.startLesson:published[0]?.id);
    function recommendations(){
      $('recommendation-grid').replaceChildren();const picks=catalog.recommendations||catalog.series.map(s=>({lesson:s.recommended,label:s.title,reason:s.subtitle}));
      for(const pick of picks){const l=lessonMap.get(pick.lesson);if(!l)continue;const s=series.get(l.series),p=pathFor(l),a=link(courseUrl(l.id,p),`recommendation-card ${tone(s)}`,'');a.dataset.recommendation=l.id;
        a.append(el('p','recommendation-label',pick.label),el('h3','',l.openingQuestion||l.subtitle),el('p','recommendation-reason',pick.reason));const bottom=el('div','recommendation-bottom');bottom.append(el('span','',`${l.title} · ${l.seconds} 秒`),el('span','',completed.includes(l.id)?'已看過，再看一次 ↗':'從這集開始 ↗'));a.append(bottom);$('recommendation-grid').append(a);}
    }
    function routes(){
      $('series-grid').replaceChildren();for(const p of paths){const list=members(p);if(!list.length)continue;const s=series.get(p.series),seen=list.filter(l=>completed.includes(l.id)).length,a=link(pathUrl(p),`series-card ${tone(s)}`,'');a.dataset.path=p.id;
        const icon=el('span','series-icon');icon.setAttribute('aria-hidden','true');icon.innerHTML=`<svg viewBox="0 0 32 32">${icons[s.icon]||icons.steps}</svg>`;const title=el('div');title.append(el('h3','',s.title),el('small','',`${list.length} 集 · 動畫共 ${timeLabel(total(p))}`));
        const bottom=el('span','series-bottom');bottom.append(el('span','',seen?`已看過 ${seen}/${list.length} 集 · 接著探索`:'查看觀看路線'),el('span','arrow','↗'));a.append(icon,title,el('h4','route-card-title',p.title),el('p','',p.description),bottom);$('series-grid').append(a);}
    }
    for(const s of [{id:'all',title:'全部課程'},...catalog.series]){const b=el('button','filter-button',s.title);b.type='button';b.dataset.series=s.id;b.append(el('span','',s.id==='all'?lessons.length:lessons.filter(l=>l.series===s.id).length));b.setAttribute('aria-pressed',String(s.id==='all'));b.addEventListener('click',()=>filter(s.id));$('filters').append(b);}
    function filter(id){activeSeries=id;document.querySelectorAll('.filter-button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.series===id)));render();}
    function render(){
      const term=$('search').value.trim().toLocaleLowerCase(),shown=lessons.filter(l=>(activeSeries==='all'||l.series===activeSeries)&&[l.title,l.subtitle,l.summary,l.openingQuestion||'',series.get(l.series).title,...(l.tags||[])].join(' ').toLocaleLowerCase().includes(term));
      $('lesson-grid').replaceChildren();$('empty-state').hidden=shown.length>0;$('results-count').textContent=`${shown.length} 個概念`;
      for(const l of shown){const s=series.get(l.series),pending=l.status==='coming-soon',card=el('article',`lesson-card ${tone(s)}`);card.dataset.lesson=l.id;
        const cover=pending?el('div','lesson-cover'):link(courseUrl(l.id,pathFor(l)),'lesson-cover','');cover.setAttribute('aria-label',pending?`${l.title}準備中`:`認識${l.title}`);const img=el('img');img.src=l.poster;img.alt=`${l.title}動畫畫面`;img.loading='lazy';img.width=640;img.height=360;cover.append(img,el('span','play-icon'),el('span','duration',pending?'準備中':duration(l.seconds)));
        const body=el('div','lesson-body'),category=el('div','lesson-category',`${s.title} / ${l.type}`);if(completed.includes(l.id))category.append(el('span','completed','✓ 已看過'));const h3=el('h3');h3.append(pending?el('span','',l.title):link(courseUrl(l.id,pathFor(l)),'',l.title));const bottom=el('div','lesson-bottom');bottom.append(el('span','',pending?'新的探索正在準備':`${l.seconds} 秒 · ${l.subtitleFile?'中文旁白':'有聲動畫'}`),pending?el('span','','即將推出'):link(courseUrl(l.id,pathFor(l)),'','認識這個概念 ↗'));body.append(category,h3,el('p','lesson-subtitle',l.subtitle),el('p','lesson-summary',l.summary),bottom);card.append(cover,body);$('lesson-grid').append(card);}
    }
    $('search').addEventListener('input',render);$('reset-search').addEventListener('click',()=>{$('search').value='';filter('all');$('search').focus();});
    function refresh(){loadCompleted();recommendations();routes();render();}window.addEventListener('pageshow',refresh);window.addEventListener('storage',refresh);refresh();if(location.hash==='#series')$('paths').scrollIntoView();
  }
  function lessonPage(){
    const params=new URLSearchParams(location.search),l=lessonMap.get(params.get('id'));if(!l){$('course-error').hidden=false;return;}
    const s=series.get(l.series),p=pathFor(l,params.get('path')),list=members(p),index=list.findIndex(x=>x.id===l.id);
    document.title=`${l.title}｜一分鐘認識`;$('course-content').hidden=false;$('course-crumb').textContent=l.title;$('course-path-link').textContent=s.title;$('course-path-link').href=pathUrl(p);$('course-meta').textContent=`${s.title} / ${l.seconds} 秒 · ${l.type}`;$('course-title').textContent=l.title;$('course-opening').textContent=l.openingQuestion||l.subtitle;
    for(const goal of l.learningGoals||[l.summary])$('course-goals').append(el('li','',goal));$('course-takeaway').textContent=l.keyTakeaway||l.summary;$('practice-question').textContent=l.question||'試著用自己的話說明這個概念。';$('practice-answer').textContent=l.answer||'從動畫中的例子開始說說看。';$('practice-challenge').textContent=l.challenge||'找一個生活例子，試試這個概念。';
    renderConnections(l.connections,'course-connections');
    if(Array.isArray(l.choices)&&Number.isInteger(l.correctChoice))for(const [i,choice] of l.choices.entries()){const b=el('button','answer-choice',choice);b.type='button';b.dataset.choice=i;b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{$('practice-choices').querySelectorAll('.answer-choice').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const correct=i===l.correctChoice;$('practice-feedback').hidden=false;$('practice-feedback').dataset.correct=correct;$('practice-feedback').textContent=correct?`答對了！${l.answer}`:'再想一下：回想動畫中的操作，或展開下方的答案與原因。';});$('practice-choices').append(b);}
    setLink('download-subtitle',l.subtitleFile);setLink('download-video',l.video);const video=$('lesson-video');video.src=l.video;video.poster=l.poster;video.setAttribute('aria-label',`${l.title}教學影片`);video.addEventListener('error',()=>{$('video-error').hidden=false;});renderGuide(l,video);renderPlayback(video);
    if(l.originalVersion){
      $('video-version-control').hidden=false;video.dataset.version='narrated';
      $('video-version').addEventListener('change',()=>{
        const original=$('video-version').value==='original';video.pause();video.dataset.version=original?'original':'narrated';
        video.src=original?l.originalVersion.video:l.video;video.currentTime=0;video.playbackRate=1;
        $('video-error').hidden=true;setLink('download-video',video.getAttribute('src'));setLink('download-subtitle',original?null:l.subtitleFile);
        $('course-meta').textContent=`${s.title} / ${original?l.originalVersion.seconds:l.seconds} 秒 · ${l.type}`;
        video.setAttribute('aria-label',`${l.title}${original?'30 秒實作原版':'60 秒配音教學版'}`);
        video.load();video.dispatchEvent(new Event('timeupdate'));
      });
    }
    $('course-path-title').textContent=p.title;$('course-step').textContent=`第 ${index+1} / ${list.length} 集 · 動畫共 ${timeLabel(total(p))}`;$('view-path').href=pathUrl(p);
    function progress(){$('mark-complete').textContent=completed.includes(l.id)?'已看過 ✓':'標示已看過 ✓';$('course-path-steps').replaceChildren();for(const [i,item] of list.entries()){const row=el('li'),a=link(courseUrl(item.id,p),'',`${String(i+1).padStart(2,'0')} ${item.title}`);if(item.id===l.id)a.setAttribute('aria-current','step');if(completed.includes(item.id))a.append(el('span','completed','✓ 已看過'));row.append(a);$('course-path-steps').append(row);}}
    function complete(){remember(l);progress();}video.addEventListener('ended',complete);$('mark-complete').addEventListener('click',complete);progress();window.addEventListener('pageshow',()=>{loadCompleted();progress();});window.addEventListener('storage',()=>{loadCompleted();progress();});
    const next=list[index+1],previous=list[index-1];$('next-title').textContent=next?next.title:'回顧這條觀看路線';$('next-description').textContent=next?(p.stepNotes?.[next.id]||next.subtitle):(p.reflection||'用自己的話說一次，再看看想探索哪個主題。');$('next-lesson').href=next?courseUrl(next.id,p):pathUrl(p);$('next-lesson').textContent=next?`下一集：${next.title} →`:`回到${s.title}路線 →`;setLink('previous-lesson',previous?courseUrl(previous.id,p):null);
    function restoreAnchor(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}if(id)requestAnimationFrame(()=>$(id)?.scrollIntoView());}restoreAnchor();window.addEventListener('hashchange',restoreAnchor);
  }
  function pathPage(){
    const p=paths.find(x=>x.id===new URLSearchParams(location.search).get('id'));if(!p||!members(p).length){$('path-error').hidden=false;return;}
    const s=series.get(p.series),list=members(p);$('path-content').hidden=false;document.title=`${s.title}觀看路線｜一分鐘認識`;$('path-heading').classList.add(tone(s));$('path-label').textContent=`${s.title} / 觀看路線`;$('path-title').textContent=p.title;$('path-description').textContent=p.description||s.subtitle;$('path-duration').textContent=`${list.length} 集 · 動畫共 ${timeLabel(total(p))} · 可隨時暫停與重看`;$('path-goal').textContent=p.goal||s.subtitle;$('path-reflection').textContent=p.reflection||'用自己的話說說這些概念之間的關係。';
    function refresh(){loadCompleted();const seen=list.filter(l=>completed.includes(l.id)).length,first=list.find(l=>!completed.includes(l.id))||list[0];$('path-progress').textContent=`已看過 ${seen} / ${list.length} 集`;$('path-start').href=courseUrl(first.id,p);$('path-start').textContent=seen===list.length?'再看一次 →':seen?`接著認識${first.title} →`:'從第一集開始 →';$('path-lessons').replaceChildren();
      for(const [i,l] of list.entries()){const row=el('li',`journey-step ${tone(s)}`);row.dataset.lesson=l.id;const number=el('span','journey-number',String(i+1).padStart(2,'0'));number.setAttribute('aria-hidden','true');const a=link(courseUrl(l.id,p),'journey-lesson',''),img=el('img');img.src=l.poster;img.alt=`${l.title}動畫畫面`;img.width=320;img.height=180;const body=el('div','journey-body');body.append(el('p','eyebrow',`${l.seconds} 秒 · ${l.type}`),el('h3','',l.title),el('p','',p.stepNotes?.[l.id]||l.subtitle),el('span',completed.includes(l.id)?'completed':'journey-action',completed.includes(l.id)?'✓ 已看過 · 再看一次 ↗':'認識這個概念 ↗'));a.append(img,body);row.append(number,a);$('path-lessons').append(row);}}
    renderConnections(p.connections,'path-connections');
    refresh();window.addEventListener('pageshow',refresh);window.addEventListener('storage',refresh);
  }
  const page=document.body.dataset.page;if(page==='lesson')lessonPage();else if(page==='path')pathPage();else home();
})();
