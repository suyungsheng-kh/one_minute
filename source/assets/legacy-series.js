'use strict';
(() => {
  const config=JSON.parse(document.getElementById('legacy-targets').textContent),params=new URLSearchParams(location.search);
  let key='';try{key=decodeURIComponent(location.hash.slice(1));}catch{}
  if(!config.targets[key])key=params.get('lesson')||params.get('id')||key;
  location.replace(new URL(Object.hasOwn(config.targets,key)?config.targets[key]:config.fallback,location.href).href);
})();
