'use strict';
module.exports=function solveMechanism(R,s,visit){
 if(s.map==='ashland-2'){
  visit(s,'guardian-console');for(const command of R.GUARDIAN_SOLUTION)R.resolveChoice(s,'guardian-plan',command);R.resolveChoice(s,'guardian-plan','run');
  for(let i=0;i<13;i++)R.stepStoryMechanisms(s,.55);
  return visit(s,'guardian-latch');
 }
 if(s.map==='sanctuary-1'){
  for(const seal of Object.keys(R.PLATE_SEALS))visit(s,'plate-seal-'+seal);
  for(const id of ['plate-outer','plate-outer','plate-middle','plate-middle','plate-inner'])visit(s,id);
  return visit(s,'plate-altar');
 }
 throw Error('Unknown mechanism map '+s.map);
};
