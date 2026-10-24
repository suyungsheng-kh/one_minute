'use strict';
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib');
function source(root){return JSON.parse(fs.readFileSync(path.join(root,'content/production.json'),'utf8'));}
function kitRoot(root){return fs.existsSync(path.join(root,'production/skill'))?path.join(root,'production'):path.resolve(root,'../production');}
function prompt(data,a){return data.commonPrompt+a.prompt;}
function markdown(data,a){return `# ${a.title}\n\n${a.summary}\n\n技術文章；不代表新影片。更新：${data.updated}。\n\n`+a.sections.map(s=>`## ${s.title}\n\n${s.body.join('\n\n')}\n${s.code?'\n```text\n'+s.code+'\n```\n':''}`).join('\n')+`\n## 可重複的步驟\n\n${a.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n## 可複用提示詞\n\n\`\`\`text\n${prompt(data,a)}\n\`\`\`\n\n## 驗收\n\n${a.acceptance.map(s=>'- '+s).join('\n')}\n\n常見問題：${a.pitfall}\n\n## 案例與依據\n\n${a.cases.map(c=>`- [${c.lesson}](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=${c.lesson})：${c.reason}`).join('\n')}\n${a.sources.map(s=>`- ${s.label}：\`${s.path}\`（完整動畫工作區相對路徑，非網站下載檔）。`).join('\n')}\n`;}
function workflowMarkdown(w){return `<a id="${w.id}"></a>\n\n## ${w.title}\n\n${w.summary}\n\n### 使用方式\n\n${w.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n### 完整提示詞\n\n\`\`\`text\n${w.prompt}\n\`\`\`\n`;}
function references(data){return {'references/playbook.md':`# 動畫製作技術手冊\n\n依據動畫系列的對話與製作文件整理，現行政策優先於歷史案例。來源更新：${data.updated}。\n\n`+data.articles.map(a=>`<a id="${a.id}"></a>\n\n`+markdown(data,a).replace(/\n## 可複用提示詞[\s\S]*?\n## 驗收/,'\n## 驗收')).join('\n---\n\n'),'references/prompts.md':`# 完整工作流與階段提示詞\n\n${(data.workflowPrompts||[]).length} 組完整工作流、${data.articles.length} 組階段提示詞。替換【變數】與當次授權；完整工作流與單階段範本分開選用，不把範本當作額外的生成或發布授權。\n\n`+(data.workflowPrompts||[]).map(workflowMarkdown).join('\n')+'\n## 依製作階段選用\n\n'+data.articles.map(a=>`## ${a.id}｜${a.title}\n\n\`\`\`text\n${prompt(data,a)}\n\`\`\`\n`).join('\n')};}
function syncSkill(root){const data=source(root),dest=path.join(kitRoot(root),'skill/one-minute-production');for(const [rel,body]of Object.entries(references(data))){fs.mkdirSync(path.dirname(path.join(dest,rel)),{recursive:true});fs.writeFileSync(path.join(dest,rel),body);}return dest;}
function crc32(buffer){let crc=0xffffffff;for(const b of buffer){crc^=b;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;}
function zip(entries,date){const [y,m,d]=date.split('-').map(Number),dos=((y-1980)<<9)|(m<<5)|d,locals=[],central=[];let offset=0;for(const [name,value]of Object.entries(entries)){if(name.startsWith('/')||name.split('/').includes('..'))throw Error('Unsafe ZIP path');const filename=Buffer.from(name),raw=Buffer.from(value),compressed=zlib.deflateRawSync(raw),crc=crc32(raw),header=Buffer.alloc(30);header.writeUInt32LE(0x04034b50);header.writeUInt16LE(20,4);header.writeUInt16LE(0x800,6);header.writeUInt16LE(8,8);header.writeUInt16LE(dos,12);header.writeUInt32LE(crc,14);header.writeUInt32LE(compressed.length,18);header.writeUInt32LE(raw.length,22);header.writeUInt16LE(filename.length,26);locals.push(header,filename,compressed);const c=Buffer.alloc(46);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt16LE(0x800,8);c.writeUInt16LE(8,10);c.writeUInt16LE(dos,14);c.writeUInt32LE(crc,16);c.writeUInt32LE(compressed.length,20);c.writeUInt32LE(raw.length,24);c.writeUInt16LE(filename.length,28);c.writeUInt32LE(offset,42);central.push(c,filename);offset+=header.length+filename.length+compressed.length;}const index=Buffer.concat(central),end=Buffer.alloc(22),count=Object.keys(entries).length;end.writeUInt32LE(0x06054b50);end.writeUInt16LE(count,8);end.writeUInt16LE(count,10);end.writeUInt32LE(index.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...locals,index,end]);}
function buildProduction(root,dist,publishedIds){
 const data=source(root),ids=new Set(),nonempty=s=>typeof s==='string'&&s.trim();
 if(!Array.isArray(data.articles)||!data.articles.length||!nonempty(data.commonPrompt)||!/^\d{4}-\d{2}-\d{2}$/.test(data.updated))throw Error('Invalid technical series');
 for(const a of data.articles){if(!/^[a-z][a-z0-9-]+$/.test(a.id)||ids.has(a.id)||!['title','summary','prompt','pitfall'].every(k=>nonempty(a[k]))||!Array.isArray(a.sections)||a.sections.length<2||a.sections.some(s=>!nonempty(s.title)||!Array.isArray(s.body)||!s.body.length||s.body.some(p=>!nonempty(p)))||!a.acceptance?.length||!a.steps?.length||!a.cases?.length||!a.sources?.length||a.cases.some(c=>!publishedIds.has(c.lesson)))throw Error('Invalid technical article: '+a.id);ids.add(a.id);}
 for(const a of data.articles)if(a.related.some(id=>!ids.has(id)||id===a.id))throw Error('Invalid related article');
 const workflows=data.workflowPrompts||[],workflowIds=new Set();
 if(!Array.isArray(workflows))throw Error('Invalid workflow prompts');
 for(const w of workflows){if(!/^[a-z][a-z0-9-]+$/.test(w.id)||workflowIds.has(w.id)||ids.has(w.id)||!['title','summary','prompt'].every(k=>nonempty(w[k]))||!Array.isArray(w.steps)||!w.steps.length||w.steps.some(s=>!nonempty(s)))throw Error('Invalid workflow prompt: '+w.id);workflowIds.add(w.id);}
 const write=(rel,value)=>{const file=path.join(dist,rel);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,value);};
 for(const a of data.articles)write('downloads/production/'+a.id+'.md',markdown(data,a));
 for(const w of workflows){w.download='downloads/prompts/'+w.id+'.md';write(w.download,'# 完整工作流提示詞\n\n'+workflowMarkdown(w));}
 write('downloads/production-handbook.md',Object.values(references(data))[0]);write('downloads/production-prompts.md',Object.values(references(data))[1]);
 write('downloads/production-usage.md',fs.readFileSync(path.join(root,'content/production-usage.md')));
 const kit=path.join(kitRoot(root),'skill/one-minute-production'),entries={};
 for(const rel of ['SKILL.md','agents/openai.yaml','scripts/inspect-project.mjs'])entries['one-minute-production/'+rel]=fs.readFileSync(path.join(kit,rel));
 for(const [rel,body]of Object.entries(references(data)))entries['one-minute-production/'+rel]=body;
 write('downloads/one-minute-production-skill.zip',zip(entries,data.updated));
 data.downloads={handbook:'downloads/production-handbook.md',prompts:'downloads/production-prompts.md',skill:'downloads/one-minute-production-skill.zip',usage:'downloads/production-usage.md'};
 write('content/production.js','window.ONE_MINUTE_PRODUCTION = '+JSON.stringify(data,null,2)+';\n');
 return {articles:data.articles.length,prompts:data.articles.length+workflows.length,workflowPrompts:workflows.length,skillFiles:Object.keys(entries).length};
}
if(require.main===module&&process.argv.includes('--sync-skill'))console.log(JSON.stringify({skill:syncSkill(path.resolve(__dirname,'..'))}));
module.exports={buildProduction,syncSkill};
