const fs = require('fs');
const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// We need to inject the fallback logic into both generateNUpPreview and handleNUp.
// It's a complex replacement, so I'll be very careful.

const CMAP_CONFIG_JS = "cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true";

// 1. Fix generateNUpPreview (around line 1672)
content = content.replace(/const generateNUpPreview = async \(\) => \{([\s\S]*?)const srcPages = srcPdf\.getPages\(\);([\s\S]*?)for \(let j = 0; j < cols \* rows; j\+\+\) \{([\s\S]*?)const embedded = await previewPdf\.embedPage\(p\);([\s\S]*?)outPage\.drawPage\(embedded, \{ x, y, xScale: scale, yScale: scale \}\);/, 
(match, p1, p2, p3, p4, p5) => {
  return `const generateNUpPreview = async () => {${p1}const srcPages = srcPdf.getPages();
      const pdfjsDoc = await window.pdfjsLib.getDocument({ data: bytes, ${CMAP_CONFIG_JS} }).promise;${p2}for (let j = 0; j < cols * rows; j++) {${p3}
      let drawAction;
      try {
        const embedded = await previewPdf.embedPage(p);
        drawAction = (targetPage, dims) => targetPage.drawPage(embedded, dims);
      } catch (e) {
        console.warn("N-up preview embedding failed, using image fallback", e);
        const page = await pdfjsDoc.getPage(j + 1);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width; canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        const img = await previewPdf.embedJpg(canvas.toDataURL('image/jpeg', 0.8));
        drawAction = (targetPage, dims) => targetPage.drawImage(img, { x: dims.x, y: dims.y, width: pW * dims.xScale, height: pH * dims.yScale });
      }
      drawAction(outPage, { x, y, xScale: scale, yScale: scale });`;
});

// 2. Fix handleNUp (around line 2680)
content = content.replace(/const handleNUp = async \(\) => \{([\s\S]*?)const srcPages = srcPdf\.getPages\(\);([\s\S]*?)for \(let j = 0; j < pagesPerSheet; j\+\+\) \{([\s\S]*?)const embedded = await newPdf\.embedPage\(p\);([\s\S]*?)outPage\.drawPage\(embedded, \{ x, y, xScale: scale, yScale: scale \}\);/,
(match, p1, p2, p3, p4, p5) => {
  return `const handleNUp = async () => {${p1}const srcPages = srcPdf.getPages();
      const pdfjsDoc = await window.pdfjsLib.getDocument({ data: bytes, ${CMAP_CONFIG_JS} }).promise;${p2}for (let j = 0; j < pagesPerSheet; j++) {${p3}
      let drawAction;
      try {
        const embedded = await newPdf.embedPage(p);
        drawAction = (targetPage, dims) => targetPage.drawPage(embedded, dims);
      } catch (e) {
        console.warn("N-up export embedding failed, using image fallback", e);
        const page = await pdfjsDoc.getPage(i + j + 1);
        const viewport = page.getViewport({ scale: 2.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width; canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        const img = await newPdf.embedJpg(canvas.toDataURL('image/jpeg', 0.9));
        drawAction = (targetPage, dims) => targetPage.drawImage(img, { x: dims.x, y: dims.y, width: pW * dims.xScale, height: pH * dims.yScale });
      }
      drawAction(outPage, { x, y, xScale: scale, yScale: scale });`;
});

fs.writeFileSync(path, content, 'utf8');
console.log('N-up fallback applied');
