const fs = require('fs');
const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

const CMAP_CONFIG_JS = "cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true";

// Update handleMerge to be more robust if PDFDocument.load or getPageCount fails
content = content.replace(/const pdf = await PDFDocument\.load\(bytes, \{ ignoreEncryption: true \}\); const count = pdf\.getPageCount\(\);([\s\S]*?)for \(const idx of pdf\.getPageIndices\(\)\) \{ await copyToDoc\(mergedPdf, pdf, idx, bytes\); \}/,
(match, p1) => {
  return `let pdf, count;
                try {
                  pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
                  count = pdf.getPageCount();
                  ${p1}
                  for (const idx of pdf.getPageIndices()) { await copyToDoc(mergedPdf, pdf, idx, bytes); }
                } catch (e) {
                  console.warn("Merge loading failed, falling back to pdf.js for count:", e);
                  const pdfjsDoc = await window.pdfjsLib.getDocument({ data: bytes, ${CMAP_CONFIG_JS} }).promise;
                  count = pdfjsDoc.numPages;
                  ${p1}
                  for (let idx = 0; idx < count; idx++) { await copyToDoc(mergedPdf, null, idx, bytes); }
                }`;
});

// Update copyToDoc to handle srcDoc being null
content = content.replace(/const copyToDoc = async \(targetDoc, srcDoc, srcPageIndex, originalBytes\) => \{([\s\S]*?)try \{([\s\S]*?)const \[page\] = await targetDoc\.copyPages\(srcDoc, \[srcPageIndex\]\);/,
(match, p1, p2) => {
  return `const copyToDoc = async (targetDoc, srcDoc, srcPageIndex, originalBytes) => {${p1}try {
          if (!srcDoc) throw new Error("No srcDoc provided");
          const [page] = await targetDoc.copyPages(srcDoc, [srcPageIndex]);`;
});

fs.writeFileSync(path, content, 'utf8');
console.log('Merge safety and copyToDoc robustness applied');
