const fs = require('fs');
const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

const cmapParams = "cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true";

// Update getDocument calls that only have { data: ... }
// We match { data: something } and replace with { data: something, cMapUrl: ..., cMapPacked: true }
// Avoiding those that already have it.

content = content.replace(/window\.pdfjsLib\.getDocument\(\{ data: ([^,}]*) \}\)/g, (match, data) => {
  return `window.pdfjsLib.getDocument({ data: ${data}, ${cmapParams} })`;
});

// Also handle cases where it might have a trailing space or something
content = content.replace(/window\.pdfjsLib\.getDocument\(\{ data: ([^,}]*)\.slice\(0\)\s*\}\)/g, (match, data) => {
  return `window.pdfjsLib.getDocument({ data: ${data}.slice(0), ${cmapParams} })`;
});

// Specific fix for generateOrganizeThumbnails which has { data: new Uint8Array(arrayBuffer) }
content = content.replace(/window\.pdfjsLib\.getDocument\(\{\s*data:\s*new Uint8Array\(arrayBuffer\)\s*\}\)/g, (match) => {
  return `window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer), ${cmapParams} })`;
});

fs.writeFileSync(path, content, 'utf8');
console.log('CMap fixes applied');
