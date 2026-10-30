/* Starwatch audio: local PCM score, crossfades, Web Audio effects and ambience. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PaperAudio=api;})(typeof window==='undefined'?globalThis:window,function(){
'use strict';
const TRACKS=['title','village','field-1','field-2','field-3','dungeon','cave','boss','victory','ending'];
const DEFAULTS={sound:true,volume:.5,musicVolume:.65,sfxVolume:1,ambientVolume:.45};
function settings(raw={}){const out={sound:raw.sound!==false};for(const key of ['volume','musicVolume','sfxVolume','ambientVolume'])out[key]=Number.isFinite(raw[key])?Math.max(0,Math.min(1,raw[key])):DEFAULTS[key];return out;}
function sceneFor(R,s,view={}){
 const chapter=R.chapter?.(s)||1,map=R.MAPS[s.map]||{},theme=map.theme||'forest';let track='field-'+chapter,ambient='wind';
 if(view.mode==='title'){track='title';ambient='none';}
 else if(view.page==='ending'){track='ending';ambient='none';}
 else if(view.page==='chapter-ending'){track='ending';ambient='none';}
 else if(theme==='village'||theme==='home'){track='village';ambient=theme==='home'?'indoor':'birds';}
 else if(s.map.startsWith('secret-')){track='cave';ambient='cave';}
 else if(['grove','tide','belfry','ruins','castle'].includes(theme)){track='dungeon';ambient=theme==='tide'?'water':'cave';}
 else if(theme==='river'){ambient='water';}
 else if(theme==='forest'){ambient='birds';}
 const boss=view.mode==='game'&&track!=='ending'&&(view.mobs||[]).some(e=>e.hp>0&&R.ENEMIES[e.type]?.boss&&Math.hypot(e.x-s.x,e.y-s.y)<420);
 // Keep combat state through inventory/dialogue; controller adds a retreat grace period.
 return {track,boss,ambient,chapter,map:s.map,duck:view.reading?.57:view.page?.45:1};
}
function createAudioDirector(host,initial={}){
 let cfg=settings(initial),unlocked=false,visible=true,context=null,ambience=null,ambienceKind='',birdIn=5,dripIn=3,bossHold=0,lastMap='',scene={track:'title',ambient:'none',duck:1},override=null,serial=0,failed=false,disposed=false;
 const slots=[],voices=new Set();let noise=null;
 function safe(p){if(p&&typeof p.catch==='function')p.catch(()=>{});}
 function makeSlot(){try{const el=new host.Audio();el.preload='none';el.volume=0;const slot={el,id:null,level:0,target:0,token:0,blocked:false};el.addEventListener?.('error',()=>{slot.blocked=true;failed=true;});return slot;}catch{return null;}}
 for(let i=0;i<2;i++){const slot=makeSlot();if(slot)slots.push(slot);}
 function ensureContext(){if(context)return context;try{const C=host.AudioContext||host.webkitAudioContext;if(!C)return null;context=new C();}catch{}return context;}
 function play(slot){if(!unlocked||!visible||!cfg.sound||!cfg.musicVolume||!cfg.volume||!slot.id||disposed)return;try{const token=++slot.token,p=slot.el.play();slot.blocked=false;if(p&&typeof p.catch==='function')p.catch(()=>{if(slot.token===token){slot.blocked=true;failed=true;}});}catch{slot.blocked=true;failed=true;}}
 function setTrack(id){if(!slots.length)return;if(!TRACKS.includes(id))id='field-1';let selected=slots.find(x=>x.id===id);if(!selected){selected=slots.find(x=>!x.id)||slots.reduce((a,b)=>a.level<=b.level?a:b);if(!selected)return;selected.el.pause();selected.token++;selected.id=id;selected.level=0;selected.el.volume=0;selected.el.loop=id!=='victory';selected.el.src='assets/audio/'+id+'.wav';try{selected.el.currentTime=0;}catch{}}
  for(const slot of slots)slot.target=slot===selected?1:0;
  if(selected.el.paused&&!selected.blocked)play(selected);
 }
 function silence(){for(const slot of slots){slot.el.volume=0;slot.el.pause();slot.token++;}if(context&&context.state==='running')safe(context.suspend());}
 function configure(raw){cfg=settings(raw);if(!cfg.sound||cfg.volume===0){silence();}else if(unlocked&&visible){if(context?.state==='suspended')safe(context.resume());for(const slot of slots)if(slot.target&&slot.el.paused)play(slot);}applyVolumes();}
 function unlock(){if(disposed)return;unlocked=true;failed=false;if(!visible||!cfg.sound||!cfg.volume)return;const c=ensureContext();if(c?.state==='suspended')safe(c.resume());for(const slot of slots)if(slot.target&&(slot.el.paused||slot.blocked))play(slot);}
 function setVisible(value){visible=!!value;if(!visible){silence();return;}if(unlocked){if(cfg.sound&&cfg.volume&&context?.state==='suspended')safe(context.resume());for(const slot of slots)if(slot.target)play(slot);}}
 function effect(freq=440,length=.08,type='sine',gain=.1){if(disposed||!visible||!cfg.sound||!cfg.volume||!cfg.sfxVolume||!unlocked)return;const c=ensureContext();if(!c||c.state!=='running')return;
  try{const osc=c.createOscillator(),vol=c.createGain();osc.type=type;osc.frequency.setValueAtTime(freq,c.currentTime);vol.gain.setValueAtTime(Math.max(.0001,cfg.volume*cfg.sfxVolume*gain),c.currentTime);vol.gain.exponentialRampToValueAtTime(.0001,c.currentTime+length);osc.connect(vol);vol.connect(c.destination);voices.add(osc);osc.onended=()=>{voices.delete(osc);osc.disconnect();vol.disconnect();};osc.start();osc.stop(c.currentTime+length);}catch{}
 }
 function cue(kind){if(kind==='victory'){override={track:'victory',left:11.88};bossHold=0;setTrack('victory');}else if(kind==='ending'){override=null;bossHold=0;setTrack('ending');}else if(kind==='clear'){override=null;bossHold=0;}else if(kind==='discover'){effect(660,.24,'sine',.12);effect(990,.35,'sine',.06);}}
 function stopAmbience(){if(!ambience)return;try{ambience.source.stop();ambience.source.disconnect();ambience.filter.disconnect();ambience.gain.disconnect();}catch{}ambience=null;}
 function makeAmbience(kind){if(ambienceKind===kind&&ambience)return;stopAmbience();ambienceKind=kind;birdIn=5;dripIn=3;if(kind==='none'||kind==='indoor')return;const c=ensureContext();if(!c||c.state!=='running')return;
  try{if(!noise){noise=c.createBuffer(1,c.sampleRate*2,c.sampleRate);const samples=noise.getChannelData(0);let seed=8172,prev=0;for(let i=0;i<samples.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const white=seed/2147483648-1;prev=(prev+.035*white)/1.035;samples[i]=prev*5;}}
   const source=c.createBufferSource(),filter=c.createBiquadFilter(),gain=c.createGain();source.buffer=noise;source.loop=true;filter.type='lowpass';filter.frequency.value=kind==='water'?1800:kind==='cave'?170:450;gain.gain.value=0;source.connect(filter);filter.connect(gain);gain.connect(c.destination);source.start();ambience={source,filter,gain};
  }catch{stopAmbience();}
 }
 function ambientNote(freq,length,slide){const c=context;if(!c||c.state!=='running'||!visible||!cfg.sound||!cfg.ambientVolume||!unlocked||voices.size>24)return;try{const osc=c.createOscillator(),g=c.createGain();osc.type='sine';osc.frequency.setValueAtTime(freq,c.currentTime);osc.frequency.exponentialRampToValueAtTime(Math.max(20,slide),c.currentTime+length);g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(Math.max(.0001,cfg.volume*cfg.ambientVolume*.03),c.currentTime+.012);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+length);osc.connect(g);g.connect(c.destination);voices.add(osc);osc.onended=()=>{voices.delete(osc);osc.disconnect();g.disconnect();};osc.start();osc.stop(c.currentTime+length);}catch{}}
 function applyVolumes(){const master=unlocked&&visible&&cfg.sound?cfg.volume:0;for(const slot of slots){slot.el.volume=Math.max(0,Math.min(1,master*cfg.musicVolume*slot.level*(scene.duck||1)));if((!master||!cfg.musicVolume)&&!slot.el.paused){slot.el.pause();slot.token++;}}if(ambience){try{ambience.gain.gain.setTargetAtTime(master*cfg.ambientVolume*(scene.ambient==='water'?.13:scene.ambient==='cave'?.032:.07)*(scene.duck||1),context.currentTime,.35);}catch{}}}
 function update(next,dt){if(disposed)return;dt=Number.isFinite(dt)?Math.max(0,Math.min(.25,dt)):0;if(next.map!==lastMap){bossHold=0;if(lastMap)override=null;lastMap=next.map;}
  scene={...next};if(!visible){applyVolumes();return;}if(next.track==='title'||next.track==='ending'){override=null;bossHold=0;}else if(next.boss)bossHold=6;else bossHold=Math.max(0,bossHold-dt);
  if(override){override.left-=dt;if(override.left<=0)override=null;}
  const desired=override?.track||(bossHold>0?'boss':next.track);setTrack(desired);
  for(const slot of slots){slot.level+=Math.max(-dt/.85,Math.min(dt/.85,slot.target-slot.level));if(slot.level<.0001&&!slot.target&&!slot.el.paused){slot.el.pause();slot.token++;}}
  if(unlocked&&cfg.sound&&cfg.volume){makeAmbience(next.ambient||'none');birdIn-=dt;dripIn-=dt;if(next.ambient==='birds'&&birdIn<=0){ambientNote(1800,.13,2600);birdIn=8+(serial++%5);}if((next.ambient==='water'||next.ambient==='cave')&&dripIn<=0){ambientNote(next.ambient==='cave'?1100:1500,.16,500);dripIn=4+(serial++%4);}}
  applyVolumes();
 }
 function stop(){disposed=true;silence();stopAmbience();for(const voice of voices){try{voice.stop();}catch{}}voices.clear();if(context?.close)safe(context.close());for(const slot of slots){slot.el.removeAttribute?.('src');slot.el.load?.();} }
 function snapshot(){return {unlocked,visible,failed,settings:{...cfg},current:slots.find(s=>s.target)?.id||null,ambient:ambienceKind,voices:voices.size,slots:slots.map(s=>({id:s.id,level:s.level,target:s.target,volume:s.el.volume,paused:s.el.paused,blocked:s.blocked}))};}
 return {configure,unlock,setVisible,effect,cue,update,stop,snapshot};
}
return {TRACKS,DEFAULTS,settings,sceneFor,createAudioDirector};
});
