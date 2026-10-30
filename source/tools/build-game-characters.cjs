'use strict';
// Friendly actors reuse the hero's paper-cut silhouette and 300 x 400 frame.
const fs=require('node:fs'),path=require('node:path');
const assets=path.resolve(__dirname,'../game/assets');
const profiles={
  elder:{coat:'#87936b',cape:'#797e61',hat:'#b6b595',hair:'#dce0c4',beard:true},
  merchant:{coat:'#93725e',cape:'#78635c',hat:'#baa17a',hair:'#60422e',bag:true},
  ranger:{coat:'#66836b',cape:'#566d54',hat:'#76916b',hair:'#604b36'},
  villager:{coat:'#7e9973',cape:'#829477',hat:'#a79870',hair:'#69543c',bag:true},
  artisan:{coat:'#a58a65',cape:'#786650',hat:'#5d6d56',hair:'#5d4936',hammer:true},
  traveler:{coat:'#8e9c72',cape:'#777e62',hat:'#a6a07b',hair:'#71513b',bag:true},
  ina:{coat:'#8390af',cape:'#6c7895',hat:'#8899bc',hair:'#63546a',staff:'#bdc5e2'},
  lumi:{coat:'#8eaa77',cape:'#718767',hat:'#a3b98a',hair:'#876444',staff:'#d9e2b8'}
};
function build(){
  const hero=fs.readFileSync(path.join(assets,'hero.svg'),'utf8');
  for(const [id,p]of Object.entries(profiles)){
    let svg=hero.replace(/<path d="m220 163[\s\S]*?(?=<\/svg>)/,'');
    for(const [from,to]of Object.entries({'#935845':p.cape,'#51724f':p.coat,'#376449':p.hat,'#8ea777':p.coat,'#60422e':p.hair}))svg=svg.split(from).join(to);
    // Headwear changes by role; the head and body proportions stay identical.
    if(id!=='ranger'){
      svg=svg.replace(/<path d="m173 35[^>]+\/>/,'');
      svg=svg.replace(/<path d="m95 41[^>]+\/>/,'');
      const hats={
        elder:'M67 84 96 53 184 46 219 85Z',
        merchant:'M83 80Q77 25 154 30Q208 28 211 83Z',
        artisan:'M88 85 92 39 196 39 212 85Z',
        ina:'M70 84 147 3 211 84Z',
        lumi:'M80 83 100 48 185 42 216 83Z',
        traveler:'M68 84 99 39 185 35 219 84Z'
      };
      svg=svg.replace(/<path d="m65 73[^>]+\/>/,hats[id]?'<path d="'+hats[id]+'" fill="'+p.hat+'"/>':'');
    }
    // Keep the hero's head, hands, legs, eye placement and paper edges.
    const extra=(p.beard?'<path d="m119 139 33 25 30-27-13 49-20 13-23-22Z" fill="#dce0c4"/>':'')+
      (p.bag?'<path d="m186 192 18 5 11 87-53 3 5-72Z" fill="#b69a69"/><path d="m175 216 28-14" stroke="#72573d" stroke-width="7"/>':'')+
      (p.hammer?'<path d="m227 225 4 113" stroke="#766346" stroke-width="12"/><path d="m206 218 48 1v23h-48Z" fill="#9ba693"/>':'')+
      (p.staff?'<path d="m230 140 3 221" stroke="#8c7857" stroke-width="9"/><path d="m230 109 17 25-17 25-16-25Z" fill="'+p.staff+'"/>':'');
    fs.writeFileSync(path.join(assets,'person-'+id+'.svg'),svg.replace('</svg>',extra+'</svg>'));
  }
  return Object.keys(profiles);
}
if(require.main===module)console.log(JSON.stringify({characters:build()}));
module.exports={build,profiles};
