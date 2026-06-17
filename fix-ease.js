const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/ease: '([a-zA-Z]+)'/g, "ease: '$1' as any");
  newContent = newContent.replace(/ease: "([a-zA-Z]+)"/g, 'ease: "$1" as any');
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Fixed ease string TS error in ' + file);
  }
});
