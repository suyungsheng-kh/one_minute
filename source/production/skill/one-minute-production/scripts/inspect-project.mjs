import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

// Read-only: do not run project scripts, inspect credentials, synthesize or render.
const args=process.argv.slice(2),position=args.indexOf('--project');
if(position<0||!args[position+1]){console.error('Usage: node inspect-project.mjs --project <project-directory>');process.exit(2);}
const root=path.resolve(args[position+1]);
if(!fs.existsSync(root)||!fs.statSync(root).isDirectory()){console.error('Project directory not found.');process.exit(2);}
const packageFile=path.join(root,'package.json'),pkg=fs.existsSync(packageFile)?JSON.parse(fs.readFileSync(packageFile,'utf8')):{};
const scriptNames=Object.keys(pkg.scripts||{}),versions=new Set();
for(const value of Object.values(pkg.scripts||{})){for(const m of String(value).matchAll(/hyperframes@([\d.]+)/g))versions.add(m[1]);}
function version(command){const r=spawnSync(command,['-version'],{encoding:'utf8',windowsHide:true,timeout:5000});return r.status===0?(r.stdout||r.stderr).split(/\r?\n/)[0]:'unavailable';}
const files=['AGENTS.md','README.md','BRIEF.md','STORYBOARD.md','SCRIPT.md','build.mjs','verify.mjs','animation-trace.json','narration-final.json','SOURCES.md'];
const available=files.filter(f=>fs.existsSync(path.join(root,f)));
const releases=fs.existsSync(path.join(root,'renders'))?fs.readdirSync(path.join(root,'renders')).filter(f=>/\.(mp4|srt)$/i.test(f)):[];
console.log(JSON.stringify({project:path.basename(root),node:process.version,ffmpeg:version('ffmpeg'),ffprobe:version('ffprobe'),scriptNames,hyperframesVersions:[...versions],availableDocuments:available,renderFiles:releases,mode:'read-only',credentialsRead:false,projectScriptsRun:false,networkRequests:false},null,2));
