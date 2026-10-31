'use strict';
// Reusable cut-paper renditions; original actor proportions and source artwork stay authoritative.
const fs=require('node:fs'),path=require('node:path');
const assets=path.resolve(__dirname,'../game/assets'),folder=path.join(assets,'paper');
const actors=['hero',...['elder','merchant','ranger','villager','artisan','traveler','ina','lumi'].map(n=>'person-'+n)];
function build(){
 fs.mkdirSync(folder,{recursive:true});const files=[];
 for(const file of fs.readdirSync(assets).filter(n=>n.endsWith('.svg')&&n!=='mark.svg')){
  const source=fs.readFileSync(path.join(assets,file),'utf8'),view=source.match(/viewBox="([^"]+)"/);if(!view)throw Error('Missing SVG viewBox: '+file);
  const [x,y,w,h]=view[1].split(/\s+/).map(Number),unit=Math.min(w,h)/300,pad=24*unit,body=source.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,''),name=file.slice(0,-4);
  const wrap=inside=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x-pad} ${y-pad} ${w+pad*2} ${h+pad*2}" aria-hidden="true">${inside}</svg>`;
  const front=wrap(`<defs><filter id="cut-paper" x="-30%" y="-25%" width="160%" height="155%" color-interpolation-filters="sRGB"><feMorphology in="SourceAlpha" operator="dilate" radius="${17*unit}" result="rim"/><feFlood flood-color="#fff8df"/><feComposite in2="rim" operator="in" result="cut"/><feMorphology in="SourceAlpha" operator="dilate" radius="${7*unit}" result="ink"/><feFlood flood-color="#263e33"/><feComposite in2="ink" operator="in" result="line"/><feMerge><feMergeNode in="cut"/><feMergeNode in="line"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#cut-paper)">${body}</g>`);
  fs.writeFileSync(path.join(folder,file),front);files.push(file);
  if(actors.includes(name))for(const [suffix,color]of [['edge','#a38a61'],['flash','#fff6d3']]){
   const svg=wrap(`<defs><filter id="paper-tone" x="-15%" y="-15%" width="130%" height="130%"><feFlood flood-color="${color}"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs><g filter="url(#paper-tone)">${body}</g>`),target=name+'-'+suffix+'.svg';
   fs.writeFileSync(path.join(folder,target),svg);files.push(target);
  }
 }
 const manifest={style:'cut-paper-origami',version:1,actorFrame:[300,400],actors,files,generatedFrom:'original game/assets SVGs',colors:{ink:'#263e33',rim:'#fff8df',edge:'#a38a61'}};
 fs.writeFileSync(path.join(folder,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');return manifest;
}
module.exports={build,actors};if(require.main===module)console.log(JSON.stringify(build()));
