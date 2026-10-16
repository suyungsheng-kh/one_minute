'use strict';
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),seriesRoot=path.dirname(root),dist=path.join(root,'dist');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'content/catalog.json'),'utf8'));
const safeId=/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function inside(base,target){const rel=path.relative(base,target);if(!rel||rel.startsWith('..')||path.isAbsolute(rel))throw new Error(`Unsafe path: ${target}`);return target;}
function source(value){if(typeof value!=='string'||path.isAbsolute(value))throw new Error('Source must be relative to one_minute.');const p=inside(seriesRoot,path.resolve(seriesRoot,value));if(!fs.existsSync(p))throw new Error(`Missing source: ${value}`);return p;}
function put(src,dest){fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(src,dest);}
const ids=new Set(),sids=new Set();
for(const s of catalog.series){if(!safeId.test(s.id)||sids.has(s.id))throw new Error('Invalid/duplicate series id.');sids.add(s.id);if(!['green','coral','blue','orange'].includes(s.color))throw new Error('Invalid series color.');if(s.siteSource)source(s.siteSource);}
for(const l of catalog.lessons){if(!safeId.test(l.id)||ids.has(l.id)||!sids.has(l.series))throw new Error(`Invalid lesson: ${l.id}`);ids.add(l.id);if(l.status==='draft')continue;if(!['coming-soon',undefined,'published'].includes(l.status))throw new Error('Invalid lesson status.');if(l.status!=='coming-soon'){if(!Number.isInteger(l.seconds)||l.seconds<=0)throw new Error('Invalid duration.');source(l.videoSource);}if(l.posterSource)source(l.posterSource);if(l.subtitleSource)source(l.subtitleSource);}
const publishedIds=new Set(catalog.lessons.filter(l=>!['draft','coming-soon'].includes(l.status)).map(l=>l.id)),pathIds=new Set();
for(const p of catalog.paths||[]){if(!safeId.test(p.id)||pathIds.has(p.id)||!sids.has(p.series)||!Array.isArray(p.lessonIds)||!p.lessonIds.length||new Set(p.lessonIds).size!==p.lessonIds.length)throw new Error('Invalid learning path.');pathIds.add(p.id);for(const id of p.lessonIds)if(!publishedIds.has(id)||catalog.lessons.find(l=>l.id===id).series!==p.series)throw new Error(`Invalid path lesson: ${id}`);}
for(const r of catalog.recommendations||[])if(!publishedIds.has(r.lesson))throw new Error('Recommendation must reference a published lesson.');
for(const id of publishedIds)if(catalog.paths&&!catalog.paths.some(p=>p.lessonIds.includes(id)))throw new Error(`Published lesson must belong to a learning path: ${id}`);
for(const l of catalog.lessons)if(l.choices&&(!Array.isArray(l.choices)||l.choices.length<2||!Number.isInteger(l.correctChoice)||l.correctChoice<0||l.correctChoice>=l.choices.length))throw new Error(`Invalid practice choices: ${l.id}`);
for(const owner of [...catalog.lessons,...(catalog.paths||[])]){
const c=owner.connections;if(c===undefined)continue;
if(!c||typeof c!=='object'||typeof c.title!=='string'||!c.title.trim()||!Array.isArray(c.notes)||!Array.isArray(c.relatedLessons))throw new Error(`Invalid concept connections: ${owner.id}`);
for(const n of c.notes)if(!n||typeof n.title!=='string'||!n.title.trim()||typeof n.text!=='string'||!n.text.trim())throw new Error(`Invalid concept note: ${owner.id}`);
const relatedIds=new Set();for(const r of c.relatedLessons){if(!r||!publishedIds.has(r.lesson)||relatedIds.has(r.lesson)||typeof r.reason!=='string'||!r.reason.trim()||(catalog.lessons.includes(owner)&&r.lesson===owner.id))throw new Error(`Invalid related lesson: ${owner.id}`);relatedIds.add(r.lesson);}
}
const map=catalog.conceptMap;
if(map){
if(!Number.isFinite(map.width)||map.width<=0||!Number.isFinite(map.height)||map.height<=0||!Array.isArray(map.nodes)||!map.nodes.length||!Array.isArray(map.edges)||!Array.isArray(map.summary)||!map.summary.length||map.summary.some(s=>typeof s!=='string'||!s.trim()))throw new Error('Invalid concept map.');
const nodeIds=new Set(),pointValid=([x,y])=>Number.isFinite(x)&&Number.isFinite(y)&&x>=0&&y>=0&&x<=map.width&&y<=map.height;
for(const n of map.nodes){if(!safeId.test(n.id)||nodeIds.has(n.id)||!publishedIds.has(n.lesson)||!['green','coral','blue','orange'].includes(n.color)||!['title','role','summary'].every(key=>typeof n[key]==='string'&&n[key].trim())||!Number.isFinite(n.width)||n.width<=0||!Number.isFinite(n.height)||n.height<=0||!pointValid([n.x,n.y])||!pointValid([n.x+n.width,n.y+n.height]))throw new Error('Invalid concept map node.');nodeIds.add(n.id);}
for(const e of map.edges)if(!nodeIds.has(e.from)||!nodeIds.has(e.to)||e.from===e.to||typeof e.label!=='string'||!e.label.trim()||!pointValid([e.labelX,e.labelY])||!Array.isArray(e.points)||e.points.length<2||e.points.some(p=>!Array.isArray(p)||p.length!==2||!pointValid(p)))throw new Error('Invalid concept map edge.');
const reached=new Set([map.nodes[0].id]);let previous=0;while(previous!==reached.size){previous=reached.size;for(const e of map.edges)if(reached.has(e.from)||reached.has(e.to)){reached.add(e.from);reached.add(e.to);}}if(reached.size!==nodeIds.size)throw new Error('Concept map must connect all nodes.');
}
for(const [key,t] of Object.entries(catalog.comparisons||{})){if(!safeId.test(key)||!t||typeof t.title!=='string'||typeof t.caption!=='string'||typeof t.note!=='string'||!Array.isArray(t.headers)||t.headers.length<2||t.headers.some(v=>typeof v!=='string')||!Array.isArray(t.rows)||t.rows.some(r=>!r||!Array.isArray(r.cells)||r.cells.length!==t.headers.length||r.cells.some(v=>typeof v!=='string')||(r.lesson&&!publishedIds.has(r.lesson))))throw new Error('Invalid comparison table.');}
for(const l of catalog.lessons){const g=l.guide;if(!g)continue;if(!Array.isArray(g.intro)||g.intro.some(v=>typeof v!=='string')||typeof g.exampleTitle!=='string'||!Array.isArray(g.example)||g.example.some(v=>typeof v.label!=='string'||typeof v.value!=='string')||!Array.isArray(g.steps)||g.steps.some(v=>typeof v.title!=='string'||typeof v.text!=='string')||!Array.isArray(g.reminders)||g.reminders.some(v=>typeof v!=='string')||typeof g.watch!=='string'||!catalog.comparisons?.[g.comparison])throw new Error(`Invalid lesson guide: ${l.id}`);
if(g.cues&&(!Array.isArray(g.cues)||!g.cues.length||g.cues.some((v,i)=>!Number.isFinite(v.t)||v.t<0||v.t>=l.seconds||typeof v.text!=='string'||(i>0&&v.t<g.cues[i-1].t))))throw new Error(`Invalid video cues: ${l.id}`);
const q=g.extraPractice;if(q&&(typeof q.question!=='string'||typeof q.answer!=='string'||!Array.isArray(q.choices)||q.choices.length<2||q.choices.some(v=>typeof v!=='string')||!Number.isInteger(q.correctChoice)||q.correctChoice<0||q.correctChoice>=q.choices.length))throw new Error('Invalid extra practice.');}
for(const s of catalog.series)for(const [key,target] of Object.entries(s.legacySections||{}))if(!safeId.test(key)||!target||!publishedIds.has(target.lesson)||catalog.lessons.find(l=>l.id===target.lesson).series!==s.id||(target.anchor&&!safeId.test(target.anchor)))throw new Error('Invalid legacy section target.');
// Only the generated dist directory is replaced; all sources and series projects remain intact.
inside(root,dist);if(fs.existsSync(dist)){if(fs.lstatSync(dist).isSymbolicLink())throw new Error('dist must not be a symlink');fs.rmSync(dist,{recursive:true});}fs.mkdirSync(dist,{recursive:true});
for(const name of ['index.html','lesson.html','path.html'])put(path.join(root,name),path.join(dist,name));fs.cpSync(path.join(root,'assets'),path.join(dist,'assets'),{recursive:true});
fs.writeFileSync(path.join(dist,'.nojekyll'),'');
let ffmpeg=process.env.FFMPEG_PATH;
if(!ffmpeg){const probe=spawnSync('where.exe',['ffmpeg'],{encoding:'utf8'});if(probe.status===0)ffmpeg=probe.stdout.trim().split(/\r?\n/)[0];}
if(!ffmpeg){const cache=path.join(process.env.LOCALAPPDATA||'','npm-cache','_npx');if(fs.existsSync(cache))for(const dir of fs.readdirSync(cache)){const candidate=path.join(cache,dir,'node_modules','ffmpeg-static','ffmpeg.exe');if(fs.existsSync(candidate)){ffmpeg=candidate;break;}}}
const browser={title:catalog.title,description:catalog.description,startLesson:catalog.startLesson||'variables',recommendations:catalog.recommendations,paths:catalog.paths,conceptMap:catalog.conceptMap,comparisons:catalog.comparisons,series:[],lessons:[]};
for(const s of catalog.series){const {siteSource,legacySections,...publicSeries}=s;if(siteSource){const dest=path.join(dist,'series',s.id);fs.cpSync(source(siteSource),dest,{recursive:true});const {legacySeries}=require('./legacy-series.cjs');fs.writeFileSync(path.join(dest,'index.html'),legacySeries(s,catalog.lessons.filter(l=>l.series===s.id&&publishedIds.has(l.id))));fs.writeFileSync(path.join(dest,'README.md'),`# ${s.title} 舊網址相容目錄\n\n正式入口為 ../../path.html?id=${s.id}，各集補充教學均在 ../../lesson.html 的對應課程。index.html 是生成的相容轉接，不作為教學編輯來源。影片、字幕與素材路徑保留，請在網站 source/content/catalog.json 維護 guide、comparisons 及 legacySections。\n`);}browser.series.push(publicSeries);}
for(const lesson of catalog.lessons){if(lesson.status==='draft')continue;const {videoSource,subtitleSource,posterSource,posterTime,siteAnchor,...l}=lesson;const s=browser.series.find(s=>s.id===lesson.series);

if(lesson.status!=='coming-soon'){
const original=source(videoSource),existingSite=catalog.series.find(s=>s.id===lesson.series&&s.siteSource);
if(existingSite&&videoSource.startsWith(catalog.series.find(s=>s.id===lesson.series).siteSource+'/'))l.video=`series/${lesson.series}/${videoSource.slice(catalog.series.find(s=>s.id===lesson.series).siteSource.length+1)}`;
else{l.video=`media/${l.id}.mp4`;put(original,path.join(dist,l.video));}
}
if(subtitleSource){const p=`subtitles/${l.id}.zh-TW.srt`;put(source(subtitleSource),path.join(dist,p));l.subtitleFile=p;}
if(posterSource){l.poster=`posters/${l.id}${path.extname(posterSource)}`;put(source(posterSource),path.join(dist,l.poster));}
else if(videoSource&&lesson.status!=='coming-soon'){
l.poster=`posters/${l.id}.jpg`;const destination=path.join(dist,l.poster);fs.mkdirSync(path.dirname(destination),{recursive:true});
if(!ffmpeg)throw new Error('Set FFMPEG_PATH to create the video cover.');const result=spawnSync(ffmpeg,['-hide_banner','-loglevel','error','-ss',String(posterTime||3),'-i',source(videoSource),'-frames:v','1','-vf','scale=960:-2','-y',destination],{encoding:'utf8'});if(result.status!==0)throw new Error(result.stderr||'Poster extraction failed.');
}else{l.poster='assets/mark.svg';}
browser.lessons.push(l);
}
fs.mkdirSync(path.join(dist,'content'),{recursive:true});fs.writeFileSync(path.join(dist,'content/catalog.js'),'window.ONE_MINUTE_CATALOG = '+JSON.stringify(browser,null,2)+';\n');
console.log(JSON.stringify({output:dist,series:browser.series.length,lessons:browser.lessons.length,offline:true}));
