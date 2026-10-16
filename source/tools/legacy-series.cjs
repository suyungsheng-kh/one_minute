'use strict';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function legacySeries(series,lessons){
  const targets={},course=(l,anchor='')=>`../../lesson.html?id=${encodeURIComponent(l.id)}&path=${encodeURIComponent(series.id)}${anchor?'#'+anchor:''}`;
  for(const l of lessons)for(const key of new Set([l.id,l.siteAnchor].filter(Boolean))){targets[key]=course(l);targets[key+'-title']=course(l,'course-title');targets[key+'-watch']=course(l,'lesson-video');targets[key+'-practice']=course(l,'practice-question');targets['video-'+key]=course(l,'lesson-video');}
  for(const [key,value] of Object.entries(series.legacySections||{}))targets[key]=course(lessons.find(l=>l.id===value.lesson),value.anchor);
  const fallback=`../../path.html?id=${encodeURIComponent(series.id)}`,config=JSON.stringify({targets,fallback}).replace(/</g,'\\u003c');
  return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(series.title)}｜一分鐘認識</title><link rel="icon" href="../../assets/mark.svg"><link rel="stylesheet" href="../../assets/style.css"><script id="legacy-targets" type="application/json">${config}</script><script src="../../assets/legacy-series.js" defer></script></head><body class="legacy-page"><main class="wrap legacy-message"><p class="eyebrow">一分鐘認識</p><h1>${escape(series.title)}教學已整合</h1><p>正在前往新的觀看路線或課程頁。若未自動開啟，可使用下方連結。</p><a class="button primary" href="${escape(fallback)}">前往${escape(series.title)}觀看路線 →</a><ul>${lessons.map(l=>`<li><a href="${escape(course(l))}">${escape(l.title)}</a></li>`).join('')}</ul></main></body></html>`;
}
module.exports={legacySeries};
