const fs = require('fs');
const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

const CMAP_CONFIG_JS = "cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true";

const helperFunc = `
      const copyToDoc = async (targetDoc, srcDoc, srcPageIndex, originalBytes) => {
        try {
          const [page] = await targetDoc.copyPages(srcDoc, [srcPageIndex]);
          targetDoc.addPage(page);
          return page;
        } catch (e) {
          console.warn("Copying page failed, using image fallback:", e);
          const pdfjsDoc = await window.pdfjsLib.getDocument({ data: originalBytes, ${CMAP_CONFIG_JS} }).promise;
          const page = await pdfjsDoc.getPage(srcPageIndex + 1);
          const viewport = page.getViewport({ scale: 3.0 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width; canvas.height = viewport.height;
          await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
          const img = await targetDoc.embedJpg(canvas.toDataURL('image/jpeg', 0.95));
          const newPage = targetDoc.addPage([viewport.width / 3.0, viewport.height / 3.0]);
          newPage.drawImage(img, { x: 0, y: 0, width: newPage.getWidth(), height: newPage.getHeight() });
          return newPage;
        }
      };
`;

// 1. Inject helper
content = content.replace(/function App\(\) \{/, (match) => match + helperFunc);

// 2. handleOrganize
content = content.replace(/for \(const pageInfo of organizePages\) \{([\s\S]*?)const \[copiedPage\] = await newPdf\.copyPages\(pdf, \[pageInfo\.originalIndex\]\); copiedPage\.setRotation\(window\.PDFLib\.degrees\(pageInfo\.rotation\)\); newPdf\.addPage\(copiedPage\);/,
(match, p1) => {
  return `for (const pageInfo of organizePages) {${p1}
          const copiedPage = await copyToDoc(newPdf, pdf, pageInfo.originalIndex, bytes);
          copiedPage.setRotation(window.PDFLib.degrees(pageInfo.rotation));`;
});

// 3. handleSplit
content = content.replace(/for \(const i of targetIndices\) \{([\s\S]*?)const \[copiedPage\] = await newPdf\.copyPages\(pdf, \[i\]\);([\s\S]*?)newPdf\.addPage\(copiedPage\);/,
(match, p1, p2) => {
  return `for (const i of targetIndices) {${p1}
          await copyToDoc(newPdf, pdf, i, bytes);${p2}`;
});

// 4. handleMerge
content = content.replace(/const copiedPages = await mergedPdf\.copyPages\(pdf, pdf\.getPageIndices\(\)\); copiedPages\.forEach\(page => mergedPdf\.addPage\(page\)\);/,
(match) => {
  return `for (const idx of pdf.getPageIndices()) { await copyToDoc(mergedPdf, pdf, idx, bytes); }`;
});

fs.writeFileSync(path, content, 'utf8');
console.log('Corrected global embedding fallback applied');
