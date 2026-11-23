const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const errors = [];
let checked = 0;
const pages = fs.readdirSync(root).filter(file => file.endsWith('.html'));
for (const file of pages) {
  const html = fs.readFileSync(path.join(root,file),'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  if (ids.length !== new Set(ids).size) errors.push(`${file}: duplicate IDs`);
  for (const match of html.matchAll(/\b(?:src|href|data-screenshot|data-motion-src|data-still-src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    if (url.startsWith('#')) {
      if (!ids.includes(url.slice(1))) errors.push(`${file}: missing anchor ${url}`);
    } else {
      const [targetWithQuery, fragment] = url.split('#');
      const target = targetWithQuery.split('?')[0];
      const targetPath = path.join(root,target);
      if (!fs.existsSync(targetPath)) errors.push(`${file}: missing asset ${url}`);
      else if (fragment && target.endsWith('.html')) {
        const targetHtml = fs.readFileSync(targetPath,'utf8');
        const targetIds = [...targetHtml.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
        if (!targetIds.includes(fragment)) errors.push(`${file}: missing cross-page anchor ${url}`);
      }
    }
    checked++;
  }
}
for (const match of fs.readFileSync(path.join(root,'styles.css'),'utf8').matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)) {
  if (!fs.existsSync(path.join(root,match[1]))) errors.push(`CSS: missing ${match[1]}`);
  checked++;
}
for (const file of ['index.html','about.html','features.html','guide.html','brand.html','team.html','credits.html','styles.css','pages.css','app.js','robots.txt','sitemap.xml','.nojekyll','assets/social-card.png']) {
  if (!fs.existsSync(path.join(root,file))) errors.push(`Deployment: missing ${file}`);
}
if (errors.length) {console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`PASS: ${pages.length} HTML pages, ${checked} local assets/anchors (including cross-page anchors), unique IDs, CSS fonts, deployment entry files`);
