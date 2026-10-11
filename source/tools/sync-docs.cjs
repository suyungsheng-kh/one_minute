'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),repo=path.dirname(root),dist=path.join(root,'dist'),docs=path.join(repo,'docs');
if(!fs.existsSync(path.join(dist,'index.html')))throw new Error('Build source/dist first.');
const rel=path.relative(repo,docs);if(rel!=='docs'||path.isAbsolute(rel)||fs.lstatSync(docs,{throwIfNoEntry:false})?.isSymbolicLink())throw new Error('Unsafe output directory.');
// All docs inputs have already been copied into source/dist by build.cjs.
if(fs.existsSync(docs))fs.rmSync(docs,{recursive:true});fs.cpSync(dist,docs,{recursive:true});
console.log(JSON.stringify({output:docs,website:true}));
