'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),builder=require('./build-adventure.cjs');
const root=path.resolve(__dirname,'..'),out=builder.produce(),built=path.join(root,'dist'),html=fs.readFileSync(path.join(built,'adventure.html'),'utf8'),checks=[];
const test=(name,fn)=>{fn();checks.push(name);};
const home=fs.readFileSync(path.join(built,'index.html'),'utf8'),catalog=JSON.parse(fs.readFileSync(path.join(root,'content/catalog.json'),'utf8'));
function nav(markup,label){const found=[...markup.matchAll(/<nav\b[^>]*>[\s\S]*?<\/nav>/g)].find(m=>m[0].includes('aria-label="'+label+'"'));assert.ok(found,label);return found[0];}
test('one series entry groups game, guide and comparison using the reviewed common version',()=>{
 assert.equal(html,out.html);assert.equal(fs.readFileSync(path.join(root,'adventure.html'),'utf8'),html);assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root,'content/adventure-manifest.json'),'utf8')),out.meta);
 const guide=JSON.parse(fs.readFileSync(path.join(built,'game/guide/manifest.json'),'utf8')),mapping=JSON.parse(fs.readFileSync(path.join(root,'content/game-concepts-manifest.json'),'utf8'));
 assert.equal(guide.version,out.meta.version);assert.equal(mapping.gameVersion,out.meta.version);assert.ok(html.includes('BUILD '+out.meta.version));
 for(const [href]of out.meta.entries)assert.ok(html.includes('href="'+href+'"'));assert.ok(html.includes('開始／繼續冒險'));assert.ok(html.includes('冒險指南'));assert.ok(html.includes('冒險中的概念'));
});
test('homepage keeps its old game fragment and places the series after routes and before production',()=>{
 const route=home.indexOf('id="paths"'),entry=home.indexOf('id="rpg-game"'),courses=home.indexOf('id="lessons"'),production=home.indexOf('id="production"');assert.ok(route>=0&&route<entry&&entry<courses&&courses<production);assert.equal((home.match(/id="rpg-game"/g)||[]).length,1);assert.ok(home.includes('href="adventure.html"'));assert.ok(home.includes('href="game/index.html"'));
});
test('every portal template offers the same four destinations with a visible mobile adventure link',()=>{
 for(const name of ['index.html','lesson.html','path.html','production.html','article.html','adventure.html']){const text=fs.readFileSync(path.join(built,name),'utf8'),top=nav(text,'主要導覽');for(const label of ['概念關聯圖','觀看路線','全部課程','互動冒險'])assert.ok(top.includes('>'+label+'</a>'),name+':'+label);assert.ok(top.includes('href="adventure.html"'));}
 const css=fs.readFileSync(path.join(root,'assets/style.css'),'utf8');assert.ok(css.includes('grid-template-columns:repeat(2,max-content)'));assert.ok(css.includes('.topbar nav[aria-label="主要導覽"] a{display:block!important'));
});
test('game title, handbook, comparison and series have reciprocal navigation and one current-page marker',()=>{
 const pages=[['adventure.html','adventure.html'],['game/index.html','game/index.html'],['game/guide/index.html','game/guide/index.html'],['game-concepts.html','game-concepts.html']];
 for(const [name,current]of pages){const text=fs.readFileSync(path.join(built,name),'utf8'),series=nav(text,'紙境冒險系列');assert.equal((series.match(/aria-current="page"/g)||[]).length,1,name);for(const label of ['系列首頁','進入遊戲','官方攻略','概念對照'])assert.ok(series.includes(label),name+':'+label);
  for(const [,href]of series.matchAll(/href="([^"]+)"/g)){const resolved=path.relative(built,path.resolve(built,path.dirname(name),href)).split(path.sep).join('/');assert.ok(out.meta.entries.some(([target])=>target===resolved),name+':'+href);assert.ok(fs.existsSync(path.join(built,resolved)));}
 }
});
test('standalone series images and styles are embedded, all offline links and guide anchors resolve',()=>{
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 const images=[...html.matchAll(/<img[^>]+src="data:image\/svg\+xml;base64,([^"]+)" data-source="([^"]+)"/g)];assert.equal(images.length,7);assert.equal((html.match(/<img /g)||[]).length,7);
 for(const [,encoded,ref]of images)assert.deepEqual(Buffer.from(encoded,'base64'),fs.readFileSync(path.join(root,ref)),ref);
 for(const ref of ['assets/style.css','assets/adventure.css'])assert.ok(html.includes('<style data-source="'+ref+'">'+fs.readFileSync(path.join(root,ref),'utf8')+'</style>'));
 for(const [,ref]of html.matchAll(/\b(?:src|href)="([^"]+)"/g)){if(ref.startsWith('data:'))continue;assert.ok(!/^https?:|^\/\//.test(ref));const [file,anchor]=ref.split('#');if(!file)assert.ok(ids.includes(anchor));else{assert.ok(fs.existsSync(path.join(built,file)),ref);if(anchor)assert.ok(fs.readFileSync(path.join(built,file),'utf8').includes('id="'+anchor+'"'),ref);}}
 assert.ok(!/<script\b|<link rel="stylesheet"/i.test(html));
});
test('the interactive series preserves animation counts, course routes and all independent progress stores',()=>{
 assert.equal(catalog.series.length,8);assert.equal(catalog.lessons.filter(l=>!['draft','coming-soon'].includes(l.status)).length,24);assert.ok(!catalog.series.some(s=>s.id==='adventure'));
 const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(built,'content/catalog.js'),'utf8'),sandbox);assert.equal(sandbox.window.ONE_MINUTE_CATALOG.series.length,8);assert.equal(sandbox.window.ONE_MINUTE_CATALOG.lessons.length,24);
 assert.ok(!/localStorage|sessionStorage|paper-rpg-starwatch-v2|one-minute-watched-v1/.test(html));assert.ok(fs.readFileSync(path.join(root,'AGENTS.md'),'utf8').includes('rpg-series-policy:start'));
});
test('normal and root GitHub Pages homepages both resolve the new series destination',()=>{
 const entry=require('./github-entry.cjs'),folder=path.join(root,'review/adventure-root-fixture');fs.mkdirSync(path.join(folder,'docs'),{recursive:true});fs.writeFileSync(path.join(folder,'docs/index.html'),home);entry.writeEntry(folder);const exported=fs.readFileSync(path.join(folder,'index.html'),'utf8');assert.ok(exported.includes('<base href="./docs/">'));assert.ok(exported.includes('href="adventure.html"'));assert.ok(exported.includes('href="../#paths"'));assert.ok(exported.includes('id="rpg-game"'));
});
const report={ok:true,version:out.meta.version,checks,count:checks.length,animationSeries:8,animationLessons:24,embeddedImages:7,limitation:'Source, generated HTML, offline navigation and version checks; browser visual verification pending.'};fs.mkdirSync(path.join(root,'review'),{recursive:true});fs.writeFileSync(path.join(root,'review/adventure-qa.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
