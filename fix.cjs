const fs = require('fs');
const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// PPTX Quality
content = content.replace(/scale: 2\.0/g, 'scale: 3.0');
content = content.replace(/toDataURL\('image\/jpeg', 0\.9\)/g, "toDataURL('image/jpeg', 0.95)");

// N-up size
content = content.replace(/\.save\(\)/g, '.save({ useObjectStreams: true })');

// Eraser improvement
content = content.replace(/fs \* 0\.8; \/\/ Estimate width/g, 'fs * 1.2; // Estimate width');
content = content.replace(/fs \* 1\.2; \/\/ Estimate height/g, 'fs * 1.4; // Estimate height');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixes applied successfully');
