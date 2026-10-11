'use strict';
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),seriesRoot=path.dirname(root),dist=path.join(root,'dist');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'content/catalog.json'),'utf8'));
const safeId=/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function inside(base,target){const rel=path.relative(base,target);if(!rel||rel.startsWith('..')||path.isAbsolute(rel))throw new Error(`Unsafe path: ${target}`);return target;}
function source(value){if(typeof value!=='string'||path.isAbsolute(value))throw new Error('Source must be relative to one_minute.');const p=inside(seriesRoot,path.resolve(seriesRoot,value));if(!fs.existsSync(p))throw new Error(`Missing source: ${value}`);return p;}
function put(src,dest){fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(src,dest);}
const ids=new Set(),sids=new Set();
for(const s of catalog.series){if(!safeId.test(s.id)||sids.has(s.id))throw new Error('Invalid/duplicate series id.');sids.add(s.id);if(!['green','coral','blue'].includes(s.color))throw new Error('Invalid series color.');if(s.siteSource)source(s.siteSource);}
for(const l of catalog.lessons){if(!safeId.test(l.id)||ids.has(l.id)||!sids.has(l.series))throw new Error(`Invalid lesson: ${l.id}`);ids.add(l.id);if(l.status==='draft')continue;if(!['coming-soon',undefined,'published'].includes(l.status))throw new Error('Invalid lesson status.');if(l.status!=='coming-soon'){if(!Number.isInteger(l.seconds)||l.seconds<=0)throw new Error('Invalid duration.');source(l.videoSource);}if(l.posterSource)source(l.posterSource);if(l.subtitleSource)source(l.subtitleSource);}
// Only the generated dist directory is replaced; all sources and series projects remain intact.
inside(root,dist);if(fs.existsSync(dist)){if(fs.lstatSync(dist).isSymbolicLink())throw new Error('dist must not be a symlink');fs.rmSync(dist,{recursive:true});}fs.mkdirSync(dist,{recursive:true});
put(path.join(root,'index.html'),path.join(dist,'index.html'));fs.cpSync(path.join(root,'assets'),path.join(dist,'assets'),{recursive:true});
fs.writeFileSync(path.join(dist,'.nojekyll'),'');
let ffmpeg=process.env.FFMPEG_PATH;
if(!ffmpeg){const probe=spawnSync('where.exe',['ffmpeg'],{encoding:'utf8'});if(probe.status===0)ffmpeg=probe.stdout.trim().split(/\r?\n/)[0];}
if(!ffmpeg){const cache=path.join(process.env.LOCALAPPDATA||'','npm-cache','_npx');if(fs.existsSync(cache))for(const dir of fs.readdirSync(cache)){const candidate=path.join(cache,dir,'node_modules','ffmpeg-static','ffmpeg.exe');if(fs.existsSync(candidate)){ffmpeg=candidate;break;}}}
const browser={title:catalog.title,description:catalog.description,startLesson:catalog.startLesson||'variables',series:[],lessons:[]};
for(const s of catalog.series){const {siteSource,...publicSeries}=s;if(siteSource){const dest=path.join(dist,'series',s.id);fs.cpSync(source(siteSource),dest,{recursive:true});publicSeries.site=`series/${s.id}/index.html`;
const entry=path.join(dest,'index.html');let html=fs.readFileSync(entry,'utf8');const returnLink='<a href="../../index.html" style="position:fixed;right:16px;bottom:16px;z-index:10000;background:#f8f6ef;color:#24382f;border:1px solid #c7d2bc;border-radius:8px;padding:10px 16px;font:700 13px/1.5 system-ui,sans-serif;text-decoration:none;box-shadow:0 4px 15px #0002" aria-label="回到一分鐘認識入口">← 回到一分鐘認識</a>';if(!html.includes('aria-label="回到一分鐘認識入口"'))html=html.replace('</body>',`${returnLink}</body>`);fs.writeFileSync(entry,html);
}browser.series.push(publicSeries);}
for(const lesson of catalog.lessons){if(lesson.status==='draft')continue;const {videoSource,subtitleSource,posterSource,posterTime,siteAnchor,...l}=lesson;const s=browser.series.find(s=>s.id===lesson.series);
if(s.site)l.site=s.site+(siteAnchor?`#${encodeURIComponent(siteAnchor)}`:'');
if(lesson.status!=='coming-soon'){
const original=source(videoSource),existingSite=browser.series.find(s=>s.id===lesson.series&&s.site);
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
