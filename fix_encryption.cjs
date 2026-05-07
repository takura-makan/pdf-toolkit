const fs = require('fs');
const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  { old: /\.load\(bytes\)/g, new: '.load(bytes, { ignoreEncryption: true })' },
  { old: /\.load\(arrayBuffer\.slice\(0\)\)/g, new: '.load(arrayBuffer.slice(0), { ignoreEncryption: true })' },
  { old: /\.load\(new Uint8Array\(pdfBytes\)\)/g, new: '.load(new Uint8Array(pdfBytes), { ignoreEncryption: true })' },
  { old: /\.load\(mergedBytes\)/g, new: '.load(mergedBytes, { ignoreEncryption: true })' }
];

replacements.forEach(r => {
  content = content.replace(r.old, r.new);
});

fs.writeFileSync(path, content, 'utf8');
console.log('Specific encryption bypasses applied');
