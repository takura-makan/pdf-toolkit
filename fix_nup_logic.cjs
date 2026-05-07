const fs = require('fs');
const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix generateNUpPreview loop
const genPreviewRegex = /for \(let j = 0; j < cols \* rows; j\+\+\) \{([\s\S]*?)let drawAction;/;
content = content.replace(genPreviewRegex, (match, p1) => {
  return `for (let j = 0; j < cols * rows; j++) {${p1}
      const { width: pW, height: pH } = p.getSize();
      const scale = Math.min(cellW / pW, cellH / pH);
      let col = j % cols;
      let row = Math.floor(j / cols);
      if (nUpDirection === 'rtl' && cols > 1) col = cols - 1 - col;
      const x = col * cellW + (cellW - pW * scale) / 2;
      const y = outH - (row + 1) * cellH + (cellH - pH * scale) / 2;
      let drawAction;`;
});

// 2. Fix handleNUp loop
const handleNupRegex = /for \(let j = 0; j < pagesPerSheet; j\+\+\) \{([\s\S]*?)let drawAction;/;
content = content.replace(handleNupRegex, (match, p1) => {
  return `for (let j = 0; j < pagesPerSheet; j++) {${p1}
      const { width: pW, height: pH } = p.getSize();
      const scale = Math.min(cellW / pW, cellH / pH);
      let col = j % cols;
      let row = Math.floor(j / cols);
      if (nUpDirection === 'rtl' && cols > 1) col = cols - 1 - col;
      const x = col * cellW + (cellW - pW * scale) / 2;
      const y = outH - (row + 1) * cellH + (cellH - pH * scale) / 2;
      let drawAction;`;
});

fs.writeFileSync(path, content, 'utf8');
console.log('N-up logic restored');
