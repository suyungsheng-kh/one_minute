'use strict';
const fs=require('node:fs'),path=require('node:path');

// Keep a complete homepage when GitHub Pages publishes main from the repository root.
// Course pages and media stay in docs; the same export also supports Pages publishing /docs.
function writeEntry(repo){
  const source=path.join(repo,'docs/index.html');
  let html=fs.readFileSync(source,'utf8');
  if(!html.includes('<head>')||/<base\b/i.test(html))throw new Error('Expected a homepage without a base element.');
  html=html.replace('<head>','<head>\n  <base href="./docs/">');
  // Fragment navigation must stay on this homepage rather than open docs/index.html.
  html=html.replace(/href="#/g,'href="../#');
  fs.writeFileSync(path.join(repo,'index.html'),html);
}
module.exports={writeEntry};
