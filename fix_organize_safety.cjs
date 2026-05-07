const fs = require('fs');
const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove pdfDocLib from Organize mode onChange handler to avoid encryption errors during thumbnail gen
content = content.replace(/const pdfDocLib = await window\.PDFLib\.PDFDocument\.load\(arrayBuffer\.slice\(0\), \{ ignoreEncryption: true \}\);\s+const libPages = pdfDocLib\.getPages\(\);/, '');

// 2. Use pdf.js rotation instead of pdf-lib rotation in thumbnails
content = content.replace(/rotation: libPages\[i - 1\]\.getRotation\(\)\.angle/, 'rotation: page.rotate || 0');

// 3. Fix handleSaveAndReturn to also be safer with rotation
content = content.replace(/const lib = await window\.PDFLib\.PDFDocument\.load\(mergedBytes, \{ ignoreEncryption: true \}\);\s+const pages = lib\.getPages\(\)\.map\(\(p, i\) => \(\{ id: `page-\$\{i\}`, originalIndex: i, rotation: p\.getRotation\(\)\.angle \}\)\);/,
(match) => {
  return `const pdfjsDoc = await window.pdfjsLib.getDocument({ data: mergedBytes, cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true }).promise;
            const pages = [];
            for (let i = 0; i < pdfjsDoc.numPages; i++) {
              const p = await pdfjsDoc.getPage(i + 1);
              pages.push({ id: \`page-\${i}\`, originalIndex: i, rotation: p.rotate || 0 });
            }`;
});

fs.writeFileSync(path, content, 'utf8');
console.log('Organize metadata logic switched to pdf.js for safety');
