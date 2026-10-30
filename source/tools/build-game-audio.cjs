/** Original Starwatch score. Node only; no downloads or speech services. */
'use strict';
const fs=require('fs'),path=require('path');
const RATE=22050,TAU=Math.PI*2;
const SCORES=[
{id:'title',name:'星燈的約定',bpm:76,key:60,scale:[0,2,4,5,7,9,11],chords:[0,5,3,4],voice:'bell',space:2},
{id:'village',name:'炊煙與風鈴',bpm:92,key:60,scale:[0,2,4,5,7,9,11],chords:[0,3,4,0,5,3,4,0],voice:'pluck',space:1},
{id:'field-1',name:'苔光原野',bpm:88,key:62,scale:[0,2,4,5,7,9,11],chords:[0,3,5,4],voice:'flute',space:2},
{id:'field-2',name:'霧海的回聲',bpm:78,key:57,scale:[0,2,3,5,7,8,10],chords:[0,5,2,6],voice:'bell',space:2},
{id:'field-3',name:'晨風指引歸途',bpm:100,key:65,scale:[0,2,4,5,7,9,11],chords:[0,4,5,3],voice:'flute',space:1},
{id:'dungeon',name:'石壁後的記憶',bpm:66,key:57,scale:[0,2,3,5,7,8,10],chords:[0,5,3,4],voice:'bell',space:3},
{id:'cave',name:'藏在地底的星',bpm:64,key:62,scale:[0,2,3,5,7,9,10],chords:[0,3,0,6],voice:'bell',space:3},
{id:'boss',name:'守燈者的試煉',bpm:132,key:57,scale:[0,2,3,5,7,8,10],chords:[0,5,3,4],voice:'pluck',space:1,drums:true},
{id:'victory',name:'陰影散去之時',bpm:108,key:60,scale:[0,2,4,5,7,9,11],chords:[3,4,0,0],voice:'bell',space:1,bars:4,loop:false},
{id:'ending',name:'每一盞燈都亮了',bpm:74,key:60,scale:[0,2,4,5,7,9,11],chords:[0,5,3,4,0,3,4,0],voice:'bell',space:1}
];
function render(score){
 const beats=(score.bars||16)*4,beat=60/score.bpm,seconds=beats*beat+(score.loop===false?3:0),size=Math.round(seconds*RATE),out=new Float32Array(size*2);let seed=12345+score.key;
 const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const pitch=degree=>score.key+score.scale[((degree%7)+7)%7]+12*Math.floor(degree/7);
 function put(index,l,r){if(score.loop!==false)index=((index%size)+size)%size;if(index>=0&&index<size){out[index*2]+=l;out[index*2+1]+=r;}}
 function note(start,midi,length,gain,voice,pan=0){const freq=440*2**((midi-69)/12),n=Math.floor(length*RATE),offset=Math.round(start*RATE),left=Math.sqrt((1-pan)/2),right=Math.sqrt((1+pan)/2);
  for(let i=0;i<n;i++){const t=i/RATE,p=TAU*freq*t,fade=Math.min(1,t/(voice==='pad'?.3:.012))*Math.min(1,(length-t)/(voice==='pad'?.45:.09));let x;
   if(voice==='pad')x=(Math.sin(p)+.25*Math.sin(p*1.0015)+.15*Math.sin(p*2))*Math.exp(-t*.12)*.65;
   else if(voice==='bell')x=(Math.sin(p+1.7*Math.sin(p*2)*Math.exp(-t*5))+.18*Math.sin(p*3))*Math.exp(-t*2.8)*.8;
   else if(voice==='pluck')x=(Math.sin(p)+.32*Math.sin(2*p)+.12*Math.sin(3*p)+.05*Math.sin(4*p))*Math.exp(-t*3.6)*.8;
   else if(voice==='bass')x=(Math.sin(p)+.15*Math.sin(2*p))*Math.exp(-t*2)*.9;
   else x=(Math.sin(p+.035*Math.sin(TAU*4.6*t))+.1*Math.sin(p*2))*Math.min(1,t/.06)*.9;
   x*=fade*gain;put(offset+i,x*left,x*right);
   // Short, stereo room reflections wrap at the loop boundary.
   if(voice!=='bass'){put(offset+i+Math.round(RATE*.173),x*right*.17,x*left*.13);put(offset+i+Math.round(RATE*.311),x*left*.08,x*right*.12);}
  }
 }
 function drum(at,kind,gain){const n=Math.round(RATE*(kind==='kick'?.18:.1)),offset=Math.round(at*RATE);let phase=0,prev=0;for(let i=0;i<n;i++){const t=i/RATE;let x;if(kind==='kick'){phase+=TAU*(45+85*Math.exp(-t*32))/RATE;x=Math.sin(phase)*Math.exp(-t*25);}else{const white=rand()*2-1;x=(white-prev)*Math.exp(-t*(kind==='hat'?65:28))*.4;prev=white;}put(offset+i,x*gain*.7,x*gain*.7);}}
 const motif=[[7,9,11,9,7,4,5,7],[9,11,12,11,9,7,5,4],[7,4,5,7,9,7,4,2],[5,7,9,7,4,2,1,0]];
 for(let bar=0;bar<beats/4;bar++){
  const root=score.chords[bar%score.chords.length],time=bar*4*beat,space=score.space;
  for(let j=0;j<3;j++)note(time,pitch(root+j*2)-12,beat*4,.065, 'pad',(j-1)*.4);
  for(let j=0;j<4;j++){if(score.id==='cave'&&j%2)continue;note(time+j*beat,pitch(root+(j===2?4:0))-24,beat*.85,.10,'bass',-.1);}
  for(let step=0;step<8;step++){
   if(space>=2&&(step+bar)%space===0)continue;
   const degree=root+[0,2,4,2,0,4,2,4][step];note(time+step*beat/2,pitch(degree),beat*.8,.045,'pluck',step%2?.35:-.35);
  }
  const phrase=motif[Math.floor(bar/4)%4];
  for(let j=0;j<4;j++){if(space>=2&&(bar+j)%3===0)continue;let degree=phrase[(bar%2)*4+j];if(score.id==='boss')degree+=root%3;const dur=(j===3?1.5:.72)*beat;note(time+j*beat,pitch(degree),dur,score.voice==='flute'?.07:.11,score.voice, .12);}
  if(score.drums){for(let j=0;j<8;j++)drum(time+j*beat/2,'hat',.025);drum(time,'kick',.16);drum(time+2*beat,'kick',.13);drum(time+beat,'snare',.075);drum(time+3*beat,'snare',.075);}
  else if(score.id==='village'||score.id==='field-3')for(let j=0;j<4;j++)drum(time+j*beat,'hat',.009);
 }
 let peak=0,sum=0;for(const x of out)peak=Math.max(peak,Math.abs(x));const scale=.76/Math.max(.001,peak),data=Buffer.alloc(size*4+44);data.write('RIFF');data.writeUInt32LE(data.length-8,4);data.write('WAVEfmt ',8);data.writeUInt32LE(16,16);data.writeUInt16LE(1,20);data.writeUInt16LE(2,22);data.writeUInt32LE(RATE,24);data.writeUInt32LE(RATE*4,28);data.writeUInt16LE(4,32);data.writeUInt16LE(16,34);data.write('data',36);data.writeUInt32LE(size*4,40);
 for(let i=0;i<out.length;i++){let x=out[i]*scale;if(score.loop===false){const time=Math.floor(i/2)/RATE;x*=Math.min(1,time/.03,(seconds-time)/1.2);}sum+=x*x;data.writeInt16LE(Math.round(Math.max(-1,Math.min(1,x))*32767),44+i*2);}
 return {data,seconds:size/RATE,rms:Math.sqrt(sum/out.length),peak:.76};
}
function build(dest=path.join(__dirname,'../game/assets/audio')){fs.mkdirSync(dest,{recursive:true});const tracks={};for(const score of SCORES){const r=render(score);fs.writeFileSync(path.join(dest,score.id+'.wav'),r.data);tracks[score.id]={title:score.name,file:score.id+'.wav',seconds:r.seconds,loop:score.loop!==false,bpm:score.bpm,rms:r.rms,peak:r.peak};}const manifest={version:1,credit:'Starwatch original procedural score; generated by tools/build-game-audio.cjs. No third-party recordings.',sampleRate:RATE,tracks};fs.writeFileSync(path.join(dest,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');console.log(JSON.stringify({tracks:Object.keys(tracks).length,seconds:Object.values(tracks).reduce((a,x)=>a+x.seconds,0),dest}));return manifest;}
if(require.main===module)build(process.argv[2]);module.exports={SCORES,render,build};
