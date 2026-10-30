(function(root){
'use strict';
const R=root.PaperRPG||(typeof require!=='undefined'?require('./onboarding.js'):null);
const RULES=Object.freeze({walkSpeed:145,guardSpeed:75,chargeSpeed:65,dashSpeed:440,dashDuration:.18,dashInvulnerability:.27,guardMultiplier:.35,guardCost:12,perfectWindow:.25,perfectMana:8,chargeTime:.6,chargeCost:18,chargeMultiplier:2.2,chargeRange:30,chargeCooldown:.85,spellGrowth:3,staminaMax:100});
const copy=s=>JSON.parse(JSON.stringify(s));
function manaRecovery(s,combat){const v=copy(s);v.mp=0;v.party=[];R.stepParty(v,combat?[{hp:1,x:v.x,y:v.y}]:[],1);return v.mp;}
function characterStats(s){const v=copy(s),g=R.gearState(v),w=R.weaponProfile(v),charged=R.hasAbility(v,'chargedBlade')&&!w.broken;
 const gear=['weapon','body','charm'].map(slot=>{const id=g.equipped[slot],spec=R.GEAR[id];return {slot,id,name:spec.name,durability:g.durability[id]||0,max:spec.durability||0,broken:id!=='none'&&g.durability[id]===0};});
 return {name:v.name,level:v.level,maxLevel:R.MAX_LEVEL,health:v.hp,maxHealth:v.maxHp,mana:v.mp,maxMana:R.maxMp(v),stamina:v.stamina,maxStamina:RULES.staminaMax,xp:v.xp,nextXp:R.xpToNext(v.level),gold:v.gold,difficulty:v.difficulty,damageTakenPercent:v.difficulty==='story'?50:100,
 attack:R.attackPower(v),attackInterval:w.cooldown,attackRate:1/w.cooldown,attackRange:w.range/48,weaponName:w.name,weaponBroken:!!w.broken,
 defense:1000-R.receivedDamage({...v,difficulty:'normal'},1000),guardReduction:(1-RULES.guardMultiplier)*100,guardCost:RULES.guardCost,perfectGuardEnabled:R.hasAbility(v,'pulseGuard'),perfectGuardWindow:RULES.perfectWindow,perfectGuardMana:RULES.perfectMana,
 movementPercent:100,guardMovementPercent:RULES.guardSpeed/RULES.walkSpeed*100,chargeMovementPercent:RULES.chargeSpeed/RULES.walkSpeed*100,dashPercent:RULES.dashSpeed/RULES.walkSpeed*100,dashDistance:RULES.dashSpeed*RULES.dashDuration/48,dashCost:R.dashCost(v),dashCooldown:R.dashCooldown(v),dashInvulnerability:RULES.dashInvulnerability,
 staminaRecovery:R.staminaRecovery(v,false),guardStaminaRecovery:R.staminaRecovery(v,true),manaRecovery:manaRecovery(v,false),manaCombatRecovery:manaRecovery(v,true),chargeEnabled:charged,chargeLearned:R.hasAbility(v,'chargedBlade'),chargeDamage:Math.round(R.attackPower(v)*RULES.chargeMultiplier),chargeTime:RULES.chargeTime,chargeCost:RULES.chargeCost,chargeCooldown:RULES.chargeCooldown,
 gear,spells:Object.entries(R.SKILLS).map(([id,skill])=>({id,name:skill.name,enabled:R.castAvailable(v,id),power:skill.heal||skill.damage+(v.level-1)*RULES.spellGrowth,heal:!!skill.heal,mp:skill.mp,cooldown:skill.cooldown}))};
}
function comparison(s,id){if(!Object.hasOwn(R.GEAR,id))return null;const v=copy(s),g=R.gearState(v),spec=R.GEAR[id];if(!g.owned.includes(id)||g.equipped[spec.slot]===id||!R.equipGear(v,id).ok)return null;return {id,name:spec.name,current:characterStats(s),after:characterStats(v)};}
const BAR_SCALES=Object.freeze({attack:250,attackRate:3,attackInterval:1,attackRange:3,defense:40,guardReduction:100,guardCost:100,damageTakenPercent:100,movementPercent:400,guardMovementPercent:400,chargeMovementPercent:400,dashPercent:400,dashDistance:3,dashCost:100,dashCooldown:1,dashInvulnerability:1,staminaRecovery:25,guardStaminaRecovery:25,manaRecovery:3,manaCombatRecovery:1,chargeDamage:600,chargeTime:1,chargeCost:100,chargeCooldown:1,perfectGuardWindow:1,perfectGuardMana:20,spellPower:150,spellMp:20,spellCooldown:5});
function abilityBar(key,value,override){if(!Object.hasOwn(BAR_SCALES,key))return null;const max=Number.isFinite(override)&&override>0?override:BAR_SCALES[key];if(!max)return null;const actual=Number.isFinite(value)?Math.max(0,value):0;return {max,value:actual,percent:Math.max(0,Math.min(100,actual/max*100)),overflow:actual>max};}
Object.assign(R,{COMBAT_RULES:RULES,characterStats,compareCharacterStats:comparison,ABILITY_BAR_SCALES:BAR_SCALES,abilityBar});
const priorTaskLedger=R.taskLedger;
R.taskLedger=s=>[...priorTaskLedger(s),...['ina','lumi'].filter(id=>s.flags[id+'Story']||s.party.some(p=>p.id===id)).map(id=>{const ina=id==='ina',joined=s.party.some(p=>p.id===id),ready=R.has(s,ina?'forestShard':'riverShard')&&s.defeated.includes(ina?'moss-guard':'river-guard');return {id:'companion-'+id,title:ina?'森林裡未熄的約定':'讓溪水再次清澈',map:ina?'village':'river',receiver:id,status:joined?'done':ready?'ready':'investigating',hint:joined?'已成為同行夥伴。':ready?'副本已完成，回去交談，聽完回報故事後夥伴才會加入。':ina?'完成根影洞窟、解救巨靈並取回林之星片。':'修橋，完成沉水石窟、擊退濁流之主並取回溪之星片。',reward:R.PARTY[id].name+'成為同行夥伴'};})];
if(typeof module!=='undefined'&&module.exports)module.exports=R;
})(typeof globalThis!=='undefined'?globalThis:this);
