'use strict';
(() => {
  const catalog = window.ONE_MINUTE_CATALOG;
  if (!catalog) return;
  const $ = id => document.getElementById(id);
  const series = new Map(catalog.series.map(s => [s.id, s]));
  const lessons = catalog.lessons.filter(l => l.status !== 'draft');
  let activeSeries = 'all', currentLesson = null, opener = null;
  let completed = [];
  try { const saved = JSON.parse(localStorage.getItem('one-minute-watched-v1') || '[]'); if (Array.isArray(saved)) completed = saved.filter(x => typeof x === 'string'); } catch {}
  const icons = {
    steps: '<path d="M5 9h6v6H5zM21 9h6v6h-6zM13 22h6v6h-6zM11 12h10M24 15v5H16v2"/>',
    code: '<path d="m11 10-6 6 6 6m10-12 6 6-6 6m-3-15-4 22"/>',
    bars: '<path d="M5 28V18h5v10M14 28V11h5v17M23 28V4h5v24M3 28h27"/>'
  };
  function el(tag, className, value) { const node = document.createElement(tag); if (className) node.className = className; if (value !== undefined) node.textContent = value; return node; }
  function duration(seconds) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; }
  function tone(s) { return `tone-${s.color || 'green'}`; }
  function count(id) { return lessons.filter(l => l.series === id && l.status !== 'coming-soon').length; }
  $('series-count').textContent = catalog.series.length;
  $('lesson-count').textContent = lessons.filter(l => l.status !== 'coming-soon').length;
  for (const s of catalog.series) {
    const card = el('button', `series-card ${tone(s)}`); card.type = 'button';
    card.setAttribute('aria-label', `探索${s.title}系列，${count(s.id)} 支動畫`);
    const icon = el('span', 'series-icon'); icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = `<svg viewBox="0 0 32 32">${icons[s.icon] || icons.steps}</svg>`;
    const title = el('div'); title.append(el('h3', '', s.title), el('small', '', `${count(s.id)} 支動畫 · ${s.id === 'sorting' ? '實作動畫' : '概念與練習'}`));
    const bottom = el('span', 'series-bottom'); bottom.append(el('span', '', '探索這個系列'), el('span', 'arrow', '↗'));
    card.append(icon, title, el('p', '', s.subtitle), bottom);
    card.addEventListener('click', () => { $('search').value = ''; filter(s.id); $('lessons').scrollIntoView(); });
    $('series-grid').append(card);
  }
  for (const s of [{id:'all',title:'全部課程'}, ...catalog.series]) {
    const button = el('button', 'filter-button', s.title); button.type = 'button'; button.dataset.series = s.id;
    button.append(el('span', '', s.id === 'all' ? lessons.length : lessons.filter(l => l.series === s.id).length));
    button.setAttribute('aria-pressed', String(s.id === 'all')); button.addEventListener('click', () => filter(s.id)); $('filters').append(button);
  }
  function filter(id) { activeSeries = id; document.querySelectorAll('.filter-button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.series === id))); render(); }
  function render() {
    const term = $('search').value.trim().toLocaleLowerCase();
    const shown = lessons.filter(l => (activeSeries === 'all' || l.series === activeSeries) && [l.title,l.subtitle,l.summary,series.get(l.series).title,...(l.tags || [])].join(' ').toLocaleLowerCase().includes(term));
    $('lesson-grid').replaceChildren(); $('empty-state').hidden = shown.length > 0; $('results-count').textContent = `${shown.length} 個概念`;
    for (const lesson of shown) {
      const s = series.get(lesson.series), pending = lesson.status === 'coming-soon';
      const card = el('article', `lesson-card ${tone(s)}`); card.dataset.lesson = lesson.id;
      const cover = el('button', 'lesson-cover'); cover.type = 'button'; cover.setAttribute('aria-label', `觀看${lesson.title}`); cover.disabled = pending;
      const img = el('img'); img.src = lesson.poster; img.alt = `${lesson.title}動畫畫面`; img.loading = 'lazy'; img.width = 640; img.height = 360;
      cover.append(img, el('span', 'play-icon'), el('span', 'duration', pending ? '準備中' : duration(lesson.seconds)));
      const body = el('div', 'lesson-body'), category = el('div', 'lesson-category', `${s.title} / ${lesson.type}`);
      if (completed.includes(lesson.id)) category.append(el('span', 'completed', '✓ 已看過'));
      const h3 = el('h3'), titleButton = el('button', '', lesson.title); titleButton.type = 'button'; titleButton.disabled = pending; h3.append(titleButton);
      const bottom = el('div', 'lesson-bottom'); const open = el('button', '', pending ? '即將推出' : '看動畫 ↗'); open.type = 'button'; open.disabled = pending;
      bottom.append(el('span', '', pending ? '新的探索正在準備' : `${lesson.seconds} 秒 · ${lesson.type === '實作動畫' ? '有聲動畫' : '中文旁白'}`), open);
      body.append(category,h3,el('p','lesson-subtitle',lesson.subtitle),el('p','lesson-summary',lesson.summary),bottom);card.append(cover,body);$('lesson-grid').append(card);
      for (const button of [cover,titleButton,open]) button.addEventListener('click', () => showLesson(lesson.id, button));
    }
  }
  function setCompleted() {
    if (!currentLesson) return;
    if (!completed.includes(currentLesson.id)) completed.push(currentLesson.id);
    try { localStorage.setItem('one-minute-watched-v1', JSON.stringify(completed)); } catch {}
    $('mark-complete').textContent = '已看過 ✓'; render();
  }
  function showLesson(id, trigger) {
    const lesson = lessons.find(l => l.id === id && l.status !== 'coming-soon'); if (!lesson) return;
    if (!$('lesson-dialog').open) opener = trigger || document.activeElement;
    currentLesson = lesson; const s = series.get(lesson.series);
    $('dialog-series').textContent = `一分鐘認識 / ${s.title}`;
    $('dialog-title').textContent = lesson.title;
    $('dialog-meta').textContent = `${lesson.seconds} 秒 · ${lesson.type}`;
    $('dialog-summary').textContent = lesson.summary;
    $('practice-question').textContent = lesson.question || '這段動畫裡，哪個概念讓你印象最深？';
    $('practice-answer').textContent = lesson.answer || '試著用自己的話，把你看到的變化說一次。';
    $('practice-challenge').textContent = lesson.challenge || '找一個生活中的例子，試試看剛學到的概念。';
    $('lesson-dialog').querySelector('details').open = false;
    $('full-lesson').hidden = !lesson.site; if (lesson.site) $('full-lesson').href = lesson.site;
    $('download-subtitle').hidden = !lesson.subtitleFile; if (lesson.subtitleFile) $('download-subtitle').href = lesson.subtitleFile;
    $('mark-complete').textContent = completed.includes(id) ? '已看過 ✓' : '標示已看過 ✓';
    $('video-error').hidden = true; const video = $('lesson-video'); video.pause(); video.src = lesson.video;video.poster = lesson.poster;video.setAttribute('aria-label', `${lesson.title}教學影片`);video.load();
    if (!$('lesson-dialog').open) $('lesson-dialog').showModal();document.body.classList.add('modal-open');
    $('lesson-dialog').querySelector('.dialog-scroll').scrollTop = 0;
    history.replaceState(null, '', `#lesson/${encodeURIComponent(id)}`);
  }
  function closeLesson() {
    const video = $('lesson-video');video.pause(); video.removeAttribute('src');video.load(); document.body.classList.remove('modal-open');currentLesson = null;
    if (location.hash.startsWith('#lesson/')) history.replaceState(null,'','#lessons');
    if (opener && opener.isConnected) opener.focus();else $('search').focus();
  }
  $('search').addEventListener('input', render);
  $('reset-search').addEventListener('click', () => { $('search').value = '';filter('all');$('search').focus(); });
  $('start-first').addEventListener('click', e => showLesson(catalog.startLesson || 'variables', e.currentTarget));
  $('close-dialog').addEventListener('click', () => $('lesson-dialog').close());
  $('lesson-dialog').addEventListener('close', closeLesson);
  $('lesson-dialog').addEventListener('click', e => { if (e.target === $('lesson-dialog')) { const b=e.target.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)e.target.close(); } });
  $('lesson-video').addEventListener('ended', setCompleted);
  $('lesson-video').addEventListener('error', () => { if (currentLesson) $('video-error').hidden=false; });
  $('mark-complete').addEventListener('click', setCompleted);
  function route() { if (location.hash.startsWith('#lesson/')) { try { showLesson(decodeURIComponent(location.hash.slice(8))); } catch {} } else if ($('lesson-dialog').open) $('lesson-dialog').close(); }
  window.addEventListener('hashchange', route);render();route();
})();
