const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = __dirname;
const hashes = Object.fromEntries(['app.js','styles.css','pages.css','flow.css','product.css','assets/social-card.png'].map(file => [file, crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex').slice(0,12)]));
for (const file of fs.readdirSync(root).filter(file => file.endsWith('.html'))) {
  const filePath = path.join(root,file);
  const html = fs.readFileSync(filePath,'utf8');
  const versioned = html.replace(/(app\.js|styles\.css|pages\.css|flow\.css|product\.css|assets\/social-card\.png)(?:\?v=[a-f\d]+)?(?=")/g, (_,asset) => `${asset}?v=${hashes[asset]}`);
  if (versioned !== html) fs.writeFileSync(filePath,versioned);
}
console.log('Versioned JS, stylesheets, and social card by content hash');
