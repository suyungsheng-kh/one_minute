'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
const {root,createServer}=require('./serve.cjs');
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'content/catalog.js'),'utf8'),context);
const lessons=JSON.parse(JSON.stringify(context.window.ONE_MINUTE_CATALOG.lessons)).filter(l=>l.originalVersion);
function puppeteer(){if(process.env.PORTAL_PUPPETEER_MODULE)return require(process.env.PORTAL_PUPPETEER_MODULE);try{return require('puppeteer-core');}catch{}const cache=path.join(process.env.LOCALAPPDATA,'npm-cache/_npx');for(const d of fs.readdirSync(cache)){const p=path.join(cache,d,'node_modules/puppeteer-core');if(fs.existsSync(p))return require(p);}throw Error('Puppeteer unavailable');}
const chrome=[process.env.CHROME_PATH,path.join(process.env.ProgramFiles,'Google/Chrome/Application/chrome.exe'),path.join(process.env['ProgramFiles(x86)'],'Microsoft/Edge/Application/msedge.exe')].find(p=>p&&fs.existsSync(p));
(async()=>{let browser;const server=createServer(),result={ok:false,lessons:[],errors:[]};try{
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));const base=`http://127.0.0.1:${server.address().port}/`;
 browser=await puppeteer().launch({executablePath:chrome,headless:true});const page=await browser.newPage();page.setDefaultTimeout(15000);page.on('pageerror',e=>result.errors.push(e.message));
 assert.equal(lessons.length,3);
 for(const offline of [false,true])for(const lesson of lessons){
  const url=offline?pathToFileURL(path.join(root,'lesson.html')).href:base+'lesson.html';await page.goto(url+'?id='+lesson.id,{waitUntil:'networkidle0'});
  await page.waitForFunction(()=>document.getElementById('lesson-video').readyState>=1);
  assert.equal(await page.$eval('#video-version-control',e=>e.hidden),false);
  const progress=await page.evaluate(()=>localStorage.getItem('one-minute-watched-v1'));
  for(const choice of ['original','narrated']){
   // Exercise the actual accessible select with a keyboard, including reset from a previous position.
   await page.$eval('#lesson-video',v=>{v.pause();v.currentTime=10;v.playbackRate=.75;});
   await page.focus('#video-version');await page.keyboard.press(choice==='original'?'End':'Home');await page.keyboard.press('Enter');
   await page.waitForFunction(c=>{const v=document.getElementById('lesson-video');return v.dataset.version===c&&v.readyState>=1;},{},choice);
   const v=choice==='original'?lesson.originalVersion:{video:lesson.video,seconds:lesson.seconds,cues:lesson.guide.cues};
   const state=await page.$eval('#lesson-video',e=>({duration:e.duration,src:e.getAttribute('src'),paused:e.paused,time:e.currentTime,rate:e.playbackRate}));
   assert.equal(state.duration,v.seconds);assert.equal(state.src,v.video);assert.equal(state.paused,true);assert.equal(state.time,0);assert.equal(state.rate,1);
   assert.equal(await page.$eval('#download-video',e=>e.getAttribute('href')),v.video);
   assert.equal(await page.$eval('#download-subtitle',e=>e.hidden),choice==='original');
   assert.equal(await page.$eval('#video-cue',e=>e.textContent),v.cues[0].text);
   for(const t of [v.seconds-2,12,0]){await page.$eval('#lesson-video',(e,t)=>{e.currentTime=t;},t);await page.waitForFunction(t=>{const v=document.getElementById('lesson-video');return !v.seeking&&Math.abs(v.currentTime-t)<.01;},{},t);assert.equal(await page.$eval('#video-cue',e=>e.textContent),v.cues.filter(c=>c.t<=t+.001).at(-1).text);}
   await page.$eval('#lesson-video',async e=>{e.muted=true;await e.play();});await page.waitForFunction(()=>document.getElementById('lesson-video').currentTime>.15);await page.$eval('#lesson-video',e=>e.pause());
   assert.equal(await page.evaluate(()=>localStorage.getItem('one-minute-watched-v1')),progress);
  }
  for(const width of [1440,390,320]){await page.setViewport({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);}
  if(!offline){await page.setViewport({width:1440,height:1000});await page.$eval('#video-version-control',e=>e.scrollIntoView({block:'start'}));await page.screenshot({path:path.resolve(__dirname,'../review',lesson.id+'-narrated.png')});}
  result.lessons.push({id:lesson.id,offline,primarySeconds:60,originalSeconds:30,keyboardSwitch:true,playAndSeek:true,cues:true,downloads:true,progressUnchanged:true,mobile:true});
 }
 assert.deepEqual(result.errors,[]);result.ok=true;
}finally{if(browser)await browser.close();server.close();fs.mkdirSync(path.resolve(__dirname,'../review'),{recursive:true});fs.writeFileSync(path.resolve(__dirname,'../review/narrated-check.json'),JSON.stringify(result,null,2));}console.log(JSON.stringify(result));})().catch(e=>{console.error(e);process.exitCode=1;});
