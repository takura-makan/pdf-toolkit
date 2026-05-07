import React, { useState, useEffect, useRef, useCallback } from 'react';

const IconBase = ({ children, className = "w-5 h-5", ...props }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        {children}
      </svg>
    );

    const Icons = {
      Menu: (p) => <IconBase {...p}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></IconBase>,
      AlertTriangle: (p) => <IconBase {...p}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></IconBase>,
      Camera: (p) => <IconBase {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></IconBase>,
      Redaction: (p) => <IconBase {...p}><rect width="14" height="14" x="5" y="5" fill="currentColor" rx="1"/></IconBase>,
      Stamp: (p) => <IconBase {...p}><path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"/><path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13"/></IconBase>,
      Upload: (p) => <IconBase {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></IconBase>,
      ZoomIn: (p) => <IconBase {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></IconBase>,
      ZoomOut: (p) => <IconBase {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></IconBase>,
      ChevronLeft: (p) => <IconBase {...p}><polyline points="15 18 9 12 15 6"/></IconBase>,
      ChevronRight: (p) => <IconBase {...p}><polyline points="9 18 15 12 9 6"/></IconBase>,
      PenTool: (p) => <IconBase {...p}><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></IconBase>,
      Layers: (p) => <IconBase {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></IconBase>,
      Scissors: (p) => <IconBase {...p}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></IconBase>,
      LayoutGrid: (p) => <IconBase {...p}><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></IconBase>,
      Columns: (p) => <IconBase {...p}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="3" x2="12" y2="21"/></IconBase>,
      RefreshCw: (p) => <IconBase {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></IconBase>,
      Hash: (p) => <IconBase {...p}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></IconBase>,
      FileText: (p) => <IconBase {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></IconBase>,
      MousePointer2: (p) => <IconBase {...p}><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></IconBase>,
      Highlighter: (p) => <IconBase {...p}><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></IconBase>,
      Shapes: (p) => <IconBase {...p}><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/></IconBase>,
      Grid: (p) => <IconBase {...p}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></IconBase>,
      Type: (p) => <IconBase {...p}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></IconBase>,
      Image: (p) => <IconBase {...p}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></IconBase>,
      Trash2: (p) => <IconBase {...p}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></IconBase>,
      Undo2: (p) => <IconBase {...p}><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></IconBase>,
      Redo2: (p) => <IconBase {...p}><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13"/></IconBase>,
      Square: (p) => <IconBase {...p}><rect width="18" height="18" x="3" y="3" rx="2"/></IconBase>,
      Circle: (p) => <IconBase {...p}><circle cx="12" cy="12" r="10"/></IconBase>,
      Polygon: (p) => <IconBase {...p}><polygon points="12 2 22 8.5 18.2 21 5.8 21 2 8.5"/></IconBase>,
      Minus: (p) => <IconBase {...p}><path d="M5 12h14"/></IconBase>,
      ArrowRight: (p) => <IconBase {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></IconBase>,
      ArrowLeft: (p) => <IconBase {...p}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></IconBase>,
      Download: (p) => <IconBase {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></IconBase>,
      RotateCcw: (p) => <IconBase {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></IconBase>,
      RotateCw: (p) => <IconBase {...p}><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></IconBase>,
      Check: (p) => <IconBase {...p}><polyline points="20 6 9 17 4 12"/></IconBase>,
      X: (p) => <IconBase {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconBase>,
      Eraser: (p) => <IconBase {...p}><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></IconBase>,
      FolderOpen: (p) => <IconBase {...p}><path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.69.9H18a2 2 0 0 1 2 2v2"/></IconBase>,
      Presentation: (p) => <IconBase {...p}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/></IconBase>,
      CChannel: (p)=><IconBase {...p}><path d="M7 3h10v3H10v12h7v3H7z"/></IconBase>,
      LightChannel: (p)=><IconBase {...p}><path d="M7 3h10v2H9v14h8v2H7z"/></IconBase>,
      LipChannel: (p)=><IconBase {...p}><path d="M7 3h10v6h-3V6H10v12h4v-3h3v6H7z"/></IconBase>,
      LightZ: (p)=><IconBase {...p}><path d="M11 4h9v2h-7v12H4v-2h7z"/></IconBase>,
      LipZ: (p)=><IconBase {...p}><path d="M11 4h9v6h-2V6h-5v12H4v-6h2v4h5z"/></IconBase>,
      LAngle: (p)=><IconBase {...p}><path d="M6 3h3v15h9v3H6z"/></IconBase>,
      UnequalAngle: (p)=><IconBase {...p}><path d="M6 3h3v15h6v3H6z"/></IconBase>,
      UnequalThickAngle: (p)=><IconBase {...p}><path d="M6 3h4v13h5v4H6z"/></IconBase>,
      HBeam: (p)=><IconBase {...p}><path d="M4 3h16v3H13v12h7v3H4v-3h7V6H4z"/></IconBase>,
      IBeam: (p)=><IconBase {...p}><path d="M6 3h12v3h-4.5v12H18v3H6v-3h4.5V6H6z"/></IconBase>,
      CTShape: (p)=><IconBase {...p}><path d="M4 3h16v3h-6.5v15h-3V6H4z"/></IconBase>,
      RoundBar: (p)=><IconBase {...p}><circle cx="12" cy="12" r="8" fill="currentColor"/></IconBase>,
      SquareBar: (p)=><IconBase {...p}><rect x="6" y="6" width="12" height="12" fill="currentColor"/></IconBase>,
      FlatBar: (p)=><IconBase {...p}><rect x="4" y="9" width="16" height="6" fill="currentColor"/></IconBase>,
      Pipe: (p)=><IconBase {...p}><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/></IconBase>,
      BoxTube: (p)=><IconBase {...p}><rect x="5" y="5" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"/></IconBase>
    };

    const cn = (...classes) => classes.filter(Boolean).join(' ');

    const hexToRgb = (hex, PDFLib) => {
      if (!hex) return PDFLib.rgb(0, 0, 0);
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return PDFLib.rgb(r, g, b);
    };

    const generateStampImage = (text, color) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const fontSize = 54;
      ctx.font = `bold ${fontSize}px serif`;
      const textMetrics = ctx.measureText(text);
      const width = textMetrics.width + 60;
      const height = fontSize + 40;
      canvas.width = width; canvas.height = height;
      ctx.strokeStyle = color; ctx.lineWidth = 8;
      ctx.strokeRect(10, 10, width - 20, height - 20);
      ctx.lineWidth = 2; ctx.strokeRect(20, 20, width - 40, height - 40);
      ctx.fillStyle = color; ctx.font = `bold ${fontSize}px serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2 + 4);
      return canvas.toDataURL('image/png');
    };

    const generateDateStampImage = (topText, bottomText, dateText, color) => {
      const canvas = document.createElement('canvas');
      const size = 200; canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d');
      const cx = size / 2, cy = size / 2, r = size / 2 - 10;
      ctx.strokeStyle = color; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      const lineY1 = cy - r / 3, lineY2 = cy + r / 3;
      const dx1 = Math.sqrt(r * r - (cy - lineY1) * (cy - lineY1));
      const dx2 = Math.sqrt(r * r - (lineY2 - cy) * (lineY2 - cy));
      ctx.lineWidth = 4; ctx.beginPath();
      ctx.moveTo(cx - dx1, lineY1); ctx.lineTo(cx + dx1, lineY1);
      ctx.moveTo(cx - dx2, lineY2); ctx.lineTo(cx + dx2, lineY2); ctx.stroke();
      ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = `bold 36px serif`;
      if (topText) ctx.fillText(topText, cx, cy - r * 0.6, dx1 * 2 * 0.85);
      if (bottomText) ctx.fillText(bottomText, cx, cy + r * 0.6, dx2 * 2 * 0.85);
      ctx.font = `bold 24px sans-serif`;
      ctx.fillText(dateText, cx, cy, r * 2 * 0.85);
      return canvas.toDataURL('image/png');
    };

    const generateSteelShapeStampImage = (shapeType, color) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 200; canvas.width = size; canvas.height = size;
      
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();
      if (shapeType === 'cChannel') {
        ctx.moveTo(50, 30); ctx.lineTo(50, 170); ctx.lineTo(150, 170); ctx.lineTo(150, 155); 
        ctx.lineTo(75, 145); ctx.lineTo(75, 55); ctx.lineTo(150, 45); ctx.lineTo(150, 30); ctx.closePath();
      } else if (shapeType === 'lightChannel') {
        ctx.moveTo(50, 30); ctx.lineTo(50, 170); ctx.lineTo(150, 170); ctx.lineTo(150, 155);
        ctx.lineTo(65, 155); ctx.lineTo(65, 45); ctx.lineTo(150, 45); ctx.lineTo(150, 30); ctx.closePath();
      } else if (shapeType === 'lipChannel') {
        ctx.moveTo(50, 30); ctx.lineTo(50, 170); ctx.lineTo(150, 170); ctx.lineTo(150, 135);
        ctx.lineTo(135, 135); ctx.lineTo(135, 155); ctx.lineTo(65, 155); ctx.lineTo(65, 45);
        ctx.lineTo(135, 45); ctx.lineTo(135, 65); ctx.lineTo(150, 65); ctx.lineTo(150, 30); ctx.closePath();
      } else if (shapeType === 'lightZ') {
        ctx.moveTo(95, 30); ctx.lineTo(150, 30); ctx.lineTo(150, 45); ctx.lineTo(110, 45);
        ctx.lineTo(110, 170); ctx.lineTo(50, 170); ctx.lineTo(50, 155); ctx.lineTo(95, 155); ctx.closePath();
      } else if (shapeType === 'lipZ') {
        ctx.moveTo(95, 30); ctx.lineTo(150, 30); ctx.lineTo(150, 65); ctx.lineTo(135, 65);
        ctx.lineTo(135, 45); ctx.lineTo(110, 45); ctx.lineTo(110, 170); ctx.lineTo(50, 170);
        ctx.lineTo(50, 135); ctx.lineTo(65, 135); ctx.lineTo(65, 155); ctx.lineTo(95, 155); ctx.closePath();
      } else if (shapeType === 'lAngle') {
        ctx.moveTo(40, 40); ctx.lineTo(40, 160); ctx.lineTo(160, 160); ctx.lineTo(160, 145);
        ctx.lineTo(55, 145); ctx.lineTo(55, 40); ctx.closePath();
      } else if (shapeType === 'unequalAngle') {
        ctx.moveTo(55, 30); ctx.lineTo(55, 170); ctx.lineTo(145, 170); ctx.lineTo(145, 155);
        ctx.lineTo(70, 155); ctx.lineTo(70, 30); ctx.closePath();
      } else if (shapeType === 'unequalThickAngle') {
        ctx.moveTo(55, 30); ctx.lineTo(55, 170); ctx.lineTo(145, 170); ctx.lineTo(145, 145);
        ctx.lineTo(80, 145); ctx.lineTo(80, 30); ctx.closePath();
      } else if (shapeType === 'hBeam') {
        ctx.moveTo(40, 30); ctx.lineTo(160, 30); ctx.lineTo(160, 45); ctx.lineTo(108, 45);
        ctx.lineTo(108, 155); ctx.lineTo(160, 155); ctx.lineTo(160, 170); ctx.lineTo(40, 170);
        ctx.lineTo(40, 155); ctx.lineTo(92, 155); ctx.lineTo(92, 45); ctx.lineTo(40, 45); ctx.closePath();
      } else if (shapeType === 'iBeam') {
        ctx.moveTo(50, 30); ctx.lineTo(150, 30); ctx.lineTo(150, 40); ctx.lineTo(105, 55);
        ctx.lineTo(105, 145); ctx.lineTo(150, 160); ctx.lineTo(150, 170); ctx.lineTo(50, 170);
        ctx.lineTo(50, 160); ctx.lineTo(95, 145); ctx.lineTo(95, 55); ctx.lineTo(50, 40); ctx.closePath();
      } else if (shapeType === 'ctShape') {
        ctx.moveTo(40, 50); ctx.lineTo(160, 50); ctx.lineTo(160, 65); ctx.lineTo(108, 65);
        ctx.lineTo(108, 150); ctx.lineTo(92, 150); ctx.lineTo(92, 65); ctx.lineTo(40, 65); ctx.closePath();
      } else if (shapeType === 'roundBar') {
        ctx.arc(100, 100, 60, 0, Math.PI * 2);
      } else if (shapeType === 'squareBar') {
        ctx.rect(40, 40, 120, 120);
      } else if (shapeType === 'flatBar') {
        ctx.rect(30, 80, 140, 40);
      } else if (shapeType === 'pipe') {
        ctx.arc(100, 100, 60, 0, Math.PI * 2);
        ctx.moveTo(145, 100);
        ctx.arc(100, 100, 45, 0, Math.PI * 2);
      } else if (shapeType === 'boxTube') {
        ctx.rect(40, 40, 120, 120);
        ctx.rect(55, 55, 90, 90);
      }
      
      ctx.globalAlpha = 0.2;
      ctx.fill('evenodd');
      ctx.globalAlpha = 1.0;
      ctx.stroke();

      return canvas.toDataURL('image/png');
    };

    const generateMarkStampImage = (markType, color) => {
  const canvas = document.createElement('canvas');
  const size = 120;
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  if (markType === 'check') {
    ctx.moveTo(25, 60); ctx.lineTo(50, 90); ctx.lineTo(95, 30);
  } else if (markType === 'cross') {
    ctx.moveTo(30, 30); ctx.lineTo(90, 90);
    ctx.moveTo(90, 30); ctx.lineTo(30, 90);
  } else if (markType === 'circle') {
    ctx.arc(60, 60, 40, 0, Math.PI * 2);
  }
  ctx.stroke();
  return canvas.toDataURL('image/png');
};

    const downloadFile = (data, filename, type = "application/pdf") => {
      const blob = data instanceof Blob ? data : new Blob([data], { type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = filename;
      document.body.appendChild(link); link.click();
      document.body.removeChild(link); URL.revokeObjectURL(url);
    };
    
    const RecentFilesGallery = ({ recentFiles, onSelect, accept }) => {
      if (!recentFiles || recentFiles.length === 0) return null;
      const filteredFiles = recentFiles.filter(file => {
        if (!accept) return true;
        if (accept.includes('image/*')) return file.type.startsWith('image/');
        if (accept.includes('application/pdf')) return file.type === 'application/pdf';
        return accept.includes(file.type);
      });
      if (filteredFiles.length === 0) return null;
      return (
        <div className="mb-6 w-full">
          <h3 className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2">
            <Icons.Layers className="w-4 h-4" /> 最近使ったファイルから選択
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {filteredFiles.map((file, i) => (
              <button key={i} onClick={() => onSelect(file)}
                className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all min-w-[120px] max-w-[120px] shrink-0 group shadow-sm">
                {file.type.startsWith('image/') ? (
                  <Icons.Image className="w-8 h-8 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                ) : (
                  <Icons.FileText className="w-8 h-8 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
                )}
                <span className="text-xs font-medium text-slate-700 truncate w-full text-center" title={file.name}>
                  {file.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      );
    };

    const ModeContainer = ({ title, icon: Icon, children }) => (
      <div className="flex-1 bg-slate-50 p-4 lg:p-8 overflow-y-auto w-full">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-4 lg:px-6 py-4 flex items-center gap-3 text-white">
            <Icon className="w-6 h-6 text-indigo-400" />
            <h2 className="text-lg lg:text-xl font-bold">{title}</h2>
          </div>
          <div className="p-4 lg:p-8">{children}</div>
        </div>
      </div>
    );

    const FileUploader = ({ accept, multiple, onChange, files, onRemove, recentFiles, addToRecentFiles }) => {
      const [isDragging, setIsDragging] = useState(false);
      const handleFiles = (newFiles) => {
        const fileArray = Array.from(newFiles);
        addToRecentFiles(fileArray);
        onChange({ target: { files: fileArray } });
      };
      return (
        <div className="mb-8 w-full">
          <RecentFilesGallery recentFiles={recentFiles} onSelect={(file) => handleFiles([file])} accept={accept} />
          <label
            className={cn("flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all group",
              isDragging ? "drag-active" : "border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-indigo-400")}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
            onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files); }}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none text-center px-4">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform mx-auto",
                isDragging ? "bg-indigo-200 text-indigo-700 scale-110" : "bg-indigo-100 text-indigo-600 group-hover:scale-110")}>
                <Icons.Upload className="w-6 h-6" />
              </div>
              <p className="mb-2 text-sm text-slate-600 font-medium">
                <span className="font-bold text-indigo-600">タップして選択</span> またはドラッグ＆ドロップ
              </p>
            </div>
            <input type="file" className="hidden" accept={accept} multiple={multiple} onChange={(e) => handleFiles(e.target.files)} />
          </label>
          {files?.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Icons.FileText className="w-5 h-5 text-indigo-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-700 truncate">{f.name}</span>
                  </div>
                  {onRemove && (
                    <button onClick={() => onRemove(i)} className="text-slate-400 hover:text-red-500 p-1 shrink-0">
                      <Icons.X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    function Header({ appMode, setAppMode, pdfDoc, isExporting, handleFileUpload, handleEditExport, handleExportAsImage, isSidebarOpen, setSidebarOpen }) {
      const modes = [
        { id: 'edit', icon: Icons.PenTool, label: '編集' },
        { id: 'merge', icon: Icons.Layers, label: '結合' },
        { id: 'split', icon: Icons.Scissors, label: '抽出' },
        { id: 'organize', icon: Icons.LayoutGrid, label: '整理' },
        { id: 'nup', icon: Icons.Columns, label: '割付' }, 
        { id: 'convert', icon: Icons.RefreshCw, label: '変換' },
        { id: 'addPageNum', icon: Icons.Hash, label: '番号' },
        { id: 'extractText', icon: Icons.FileText, label: 'テキスト' },
      ];
      return (
        <header className="relative z-[150] bg-slate-950 text-white border-b border-slate-800 shadow-lg shrink-0">
          <div className="max-w-[1920px] mx-auto px-4 lg:px-6 py-3 flex flex-col xl:flex-row items-center justify-between gap-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 w-full xl:w-auto">
              <div className="flex items-center justify-between w-full lg:w-auto overflow-hidden">
                <div className="flex items-center gap-3">
                  {appMode === 'edit' && (
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors">
                      <Icons.Menu className="w-5 h-5" />
                    </button>
                  )}
                  <div onClick={() => setAppMode('edit')}
                    className="font-black text-xl lg:text-2xl tracking-tight flex items-center gap-2 whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
                    title="トップページ（編集）に戻る">
                    
                    <svg viewBox="0 0 32 32" className="w-8 h-8 lg:w-9 lg:h-9 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="bgGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#8b5cf6" />
                          <stop offset="1" stopColor="#5b21b6" />
                        </linearGradient>
                      </defs>
                      <circle cx="16" cy="16" r="16" fill="url(#bgGrad)" />
                      <path d="M10 8C10 6.89543 10.8954 6 12 6H17.5L22 10.5V24C22 25.1046 21.1046 26 20 26H12C10.8954 26 10 25.1046 10 24V8Z" fill="#ffffff" />
                      <path d="M17.5 6V10.5H22L17.5 6Z" fill="#c4b5fd" />
                      <path d="M13 13H19" stroke="#6d28d9" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M13 17H17" stroke="#6d28d9" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M13 21H19" stroke="#6d28d9" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="hidden sm:inline">PDF Toolkit</span>
                  </div>
                </div>
              </div>
              
              <div className="flex overflow-x-auto gap-1 bg-slate-800 p-1.5 rounded-xl w-full lg:w-auto hide-scrollbar">
                {modes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button key={mode.id} onClick={() => setAppMode(mode.id)}
                      className={cn("px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap shrink-0",
                        appMode === mode.id ? "bg-indigo-500 text-white shadow-sm" : "text-slate-300 hover:bg-slate-700 hover:text-white")}>
                      <Icon className="w-4 h-4" />{mode.label}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2 w-full xl:w-auto">
              {appMode === 'edit' && (
                <>
                  <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 transition px-3 py-2 lg:px-4 lg:py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium border border-slate-700 whitespace-nowrap">
                    <Icons.Upload className="w-4 h-4" /> <span className="hidden sm:inline">開く</span>
                    <input type="file" accept="application/pdf,image/png,image/jpeg" className="hidden" onChange={handleFileUpload} />
                  </label>
                  {pdfDoc && (
                    <div className="flex items-center gap-2">
                      <button onClick={handleExportAsImage} disabled={isExporting}
                        className="bg-emerald-500 hover:bg-emerald-600 transition px-3 py-2 lg:px-4 lg:py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-sm disabled:opacity-50 text-white whitespace-nowrap">
                        <Icons.Image className="w-4 h-4" /> <span className="hidden sm:inline">{isExporting ? '生成中...' : '画像で保存'}</span>
                      </button>
                      <button onClick={handleEditExport} disabled={isExporting}
                        className="bg-indigo-500 hover:bg-indigo-600 transition px-3 py-2 lg:px-4 lg:py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-sm disabled:opacity-50 text-white whitespace-nowrap">
                        <Icons.Download className="w-4 h-4" /> <span className="hidden sm:inline">{isExporting ? '生成中...' : 'PDFで保存'}</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </header>
      );
    }

    function Sidebar(props) {
      const COLORS = ['#ef4444','#3b82f6','#22c55e','#eab308','#f97316','#a855f7','#000000','#bfdbfe','#fde047','#fef08a','#ffffff'];
      const isShapeTool = ['rect', 'solidRect', 'circle', 'solidCircle', 'polygon', 'solidPolygon', 'line', 'arrow'].includes(props.tool);
      const selectedAnn = props.selectedId ? props.annotations.find(a => a.id === props.selectedId) : null;

      const ToolBtn = ({ id, icon: Icon, label }) => (
        <button onClick={() => { props.setTool(id); if(window.innerWidth < 1024) props.setIsSidebarOpen(false); }}
          className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
            props.tool === id ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100" : "text-slate-600 hover:bg-slate-50 border border-transparent")}>
          <Icon className="w-4 h-4" /> {label}
        </button>
      );

      return (
        <>
          {props.isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
              onClick={() => props.setIsSidebarOpen(false)}
            />
          )}

          <aside className={cn(
            "fixed lg:relative inset-y-0 left-0 w-64 lg:w-72 bg-white border-r border-slate-200 flex flex-col p-5 z-50 overflow-y-auto shrink-0 shadow-2xl lg:shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out h-full",
            props.isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}>
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">ツールメニュー</h3>
              <button onClick={() => props.setIsSidebarOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 hidden lg:block">ツール</h3>
            <div className="space-y-1.5 mb-8">
              <ToolBtn id="select" icon={Icons.MousePointer2} label="選択 / 移動" />
              <ToolBtn id="text" icon={Icons.Type} label="文字追加" />
              <ToolBtn id="freehand" icon={Icons.PenTool} label="ペン" />
              <ToolBtn id="highlight" icon={Icons.Highlighter} label="ハイライト" />
              <ToolBtn id="eraser" icon={Icons.Eraser} label="消しゴム" />
              
              <ToolBtn id={isShapeTool ? props.tool : 'rect'} icon={Icons.Shapes} label="図形" />
              <label className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-slate-600 hover:bg-slate-50 border border-transparent cursor-pointer">
                <Icons.Image className="w-4 h-4" /> 画像挿入
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { props.handleAddImageAnnotation(e); if(window.innerWidth < 1024) props.setIsSidebarOpen(false); }} />
              </label>
              
              <ToolBtn id="stamp" icon={Icons.Stamp} label="スタンプ" />
              <ToolBtn id="redaction" icon={Icons.Redaction} label="墨塗り" />
              <ToolBtn id="mosaic" icon={Icons.Grid} label="モザイク" />
              <ToolBtn id="snapshot" icon={Icons.Camera} label="スナップショット" />
            </div>

            {props.tool === 'snapshot' && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">オプション</h3>
                <button onClick={() => { props.handleCopyFullPage(); if(window.innerWidth < 1024) props.setIsSidebarOpen(false); }} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-all border border-indigo-100">
                  <Icons.Camera className="w-4 h-4" /> ページ全体をコピー
                </button>
              </div>
            )}

            {props.tool === 'eraser' && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex justify-between">
                  <span>消しゴムの太さ</span>
                  <span className="text-slate-600">{props.eraserSize}px</span>
                </h3>
                <input type="range" min="10" max="100" value={props.eraserSize}
                  onChange={e => props.setEraserSize(parseInt(e.target.value))}
                  className="w-full accent-indigo-600" />
              </div>
            )}

            {isShapeTool && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">図形の種類</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[ {id:'rect', icon:Icons.Square, solid:false}, {id:'solidRect', icon:Icons.Square, solid:true},
                     {id:'circle', icon:Icons.Circle, solid:false}, {id:'solidCircle', icon:Icons.Circle, solid:true},
                     {id:'polygon', icon:Icons.Polygon, solid:false}, {id:'solidPolygon', icon:Icons.Polygon, solid:true},
                     {id:'line', icon:Icons.Minus, solid:false}, {id:'arrow', icon:Icons.ArrowRight, solid:false}
                  ].map(s => {
                    const Icon = s.icon;
                    return (
                      <button key={s.id} onClick={() => props.setTool(s.id)}
                        className={cn("py-2 px-1 border-2 rounded-lg flex justify-center transition-all",
                          props.tool === s.id ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-slate-200 text-slate-500 hover:border-indigo-300")}>
                        <Icon className={cn("w-5 h-5", s.solid && "fill-current")} />
                      </button>
                    );
                  })}
                </div>
                
                {['polygon', 'solidPolygon'].includes(props.tool) && (
                  <div className="mt-3 p-2 bg-indigo-50/50 border border-indigo-100 rounded-lg text-[10px] text-indigo-700 font-medium leading-relaxed">
                    <span className="font-bold">多角形の描き方:</span><br/>
                    ・クリックで頂点を追加<br/>
                    ・<span className="font-bold">始点をクリック</span>、または<span className="font-bold">ダブルクリック</span>、<span className="font-bold">Enterキー</span>で図形を閉じて完了します。<br/>
                    ・Escキーでキャンセルします。
                  </div>
                )}

                <div className="mt-5 relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50/50 border border-indigo-100 shadow-sm">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
                  <div className="p-3 relative z-10">
                    <h4 className="flex items-center gap-1.5 text-[11px] font-black text-indigo-800 uppercase tracking-widest mb-3 px-1">
                      <Icons.Shapes className="w-3.5 h-3.5 text-indigo-500" />
                      ショートカット
                    </h4>
                    <div className="flex flex-col gap-1">
                      <div className="group flex items-start gap-3 p-1.5 rounded-lg hover:bg-white/80 hover:shadow-sm transition-all border border-transparent hover:border-indigo-50/50">
                        <div className="shrink-0 w-[42px]">
                          <kbd className="flex items-center justify-center w-full px-1 py-1 text-[10px] font-bold font-mono text-slate-500 bg-white border border-slate-200 border-b-[3px] rounded shadow-sm group-hover:border-indigo-300 group-hover:text-indigo-600 group-active:border-b transition-all">
                            Shift
                          </kbd>
                        </div>
                        <p className="text-[11px] font-medium text-slate-600 leading-snug pt-0.5">
                          +ドラッグで<span className="text-slate-800 font-bold block mt-0.5">比率・45度単位に固定</span>
                        </p>
                      </div>
                      <div className="group flex items-start gap-3 p-1.5 rounded-lg hover:bg-white/80 hover:shadow-sm transition-all border border-transparent hover:border-indigo-50/50">
                        <div className="shrink-0 w-[42px]">
                          <kbd className="flex items-center justify-center w-full px-1 py-1 text-[10px] font-bold font-mono text-slate-500 bg-white border border-slate-200 border-b-[3px] rounded shadow-sm group-hover:border-indigo-300 group-hover:text-indigo-600 group-active:border-b transition-all">
                            Alt
                          </kbd>
                        </div>
                        <p className="text-[11px] font-medium text-slate-600 leading-snug pt-0.5">
                          +ドラッグで<span className="text-slate-800 font-bold block mt-0.5">他の図形にスナップ</span>
                        </p>
                      </div>
                      <div className="group flex items-start gap-3 p-1.5 rounded-lg hover:bg-white/80 hover:shadow-sm transition-all border border-transparent hover:border-indigo-50/50">
                        <div className="shrink-0 w-[42px]">
                          <kbd className="flex items-center justify-center w-full px-1 py-1 text-[10px] font-bold font-mono text-slate-500 bg-white border border-slate-200 border-b-[3px] rounded shadow-sm group-hover:border-indigo-300 group-hover:text-indigo-600 group-active:border-b transition-all">
                            Space
                          </kbd>
                        </div>
                        <p className="text-[11px] font-medium text-slate-600 leading-snug pt-0.5">
                          +ドラッグで<span className="text-slate-800 font-bold block mt-0.5">画面をパン(移動)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {props.tool === 'stamp' && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">スタンプの種類</h3>
                
                <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
                  <button onClick={() => props.setStampType('text')} className={cn("flex-1 py-1.5 text-xs font-bold rounded-md transition-all", props.stampType === 'text' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500')}>テキスト</button>
                  <button onClick={() => props.setStampType('date')} className={cn("flex-1 py-1.5 text-xs font-bold rounded-md transition-all", props.stampType === 'date' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500')}>日付印</button>
                  <button onClick={() => props.setStampType('steel')} className={cn("flex-1 py-1.5 text-xs font-bold rounded-md transition-all", props.stampType === 'steel' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500')}>形鋼</button>
                  <button onClick={() => props.setStampType('mark')} className={cn("flex-1 py-1.5 text-xs font-bold rounded-md transition-all", props.stampType === 'mark' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500')}>記号</button>
                </div>

                {props.stampType === 'text' && (
                  <div className="grid grid-cols-2 gap-2">
                    {['承認済','社外秘','至急','回覧','確認済','重要'].map(stamp => (
                      <button key={stamp} onClick={() => props.setCurrentStamp(stamp)} className={cn("py-2 px-1 border-2 rounded-lg text-sm font-bold transition-all", props.currentStamp === stamp ? 'border-indigo-500 text-indigo-600 bg-indigo-50' : 'border-slate-200 text-slate-600')}>
                        {stamp}
                      </button>
                    ))}
                  </div>
                )}

                {props.stampType === 'date' && (
                  <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">上段</label>
                        <input type="text" value={props.dateStampTop} onChange={e => props.setDateStampTop(e.target.value)} className="w-full border rounded-md px-2 py-1.5 text-sm" placeholder="例: 山" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">下段</label>
                        <input type="text" value={props.dateStampBottom} onChange={e => props.setDateStampBottom(e.target.value)} className="w-full border rounded-md px-2 py-1.5 text-sm" placeholder="例: 田" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">日付</label>
                      <input type="text" value={props.dateStampDate} onChange={e => props.setDateStampDate(e.target.value)} className="w-full border rounded-md px-2 py-1.5 text-sm" placeholder="例: '26.04.06" />
                    </div>
                  </div>
                )}

                {props.stampType === 'steel' && (
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { id: 'cChannel', icon: Icons.CChannel, label: '溝形' },
                        { id: 'lightChannel', icon: Icons.LightChannel, label: '軽溝形' },
                        { id: 'lipChannel', icon: Icons.LipChannel, label: 'ﾘｯﾌﾟ溝形' },
                        { id: 'hBeam', icon: Icons.HBeam, label: 'H形' },
                        
                        { id: 'lightZ', icon: Icons.LightZ, label: '軽Z形' },
                        { id: 'lipZ', icon: Icons.LipZ, label: 'ﾘｯﾌﾟZ形' },
                        { id: 'iBeam', icon: Icons.IBeam, label: 'I形' },
                        { id: 'ctShape', icon: Icons.CTShape, label: 'CT形' },
                        
                        { id: 'lAngle', icon: Icons.LAngle, label: '等辺山形' },
                        { id: 'unequalAngle', icon: Icons.UnequalAngle, label: '不等辺' },
                        { id: 'unequalThickAngle', icon: Icons.UnequalThickAngle, label: '厚不等辺' },
                        { id: 'flatBar', icon: Icons.FlatBar, label: '平鋼' },

                        { id: 'pipe', icon: Icons.Pipe, label: '鋼管' },
                        { id: 'boxTube', icon: Icons.BoxTube, label: '角鋼管' },
                        { id: 'roundBar', icon: Icons.RoundBar, label: '丸棒' },
                        { id: 'squareBar', icon: Icons.SquareBar, label: '角鋼' }
                      ].map(shape => {
                        const Icon = shape.icon;
                        return (
                          <button key={shape.id} onClick={() => props.setCurrentSteelShape(shape.id)} 
                            className={cn("flex flex-col items-center justify-center py-1.5 px-0.5 border-2 rounded-md transition-all", props.currentSteelShape === shape.id ? 'border-indigo-500 text-indigo-600 bg-indigo-50 shadow-inner' : 'border-slate-200 text-slate-500 hover:border-indigo-300 bg-white')}>
                            <Icon className="w-5 h-5 mb-1" />
                            <span className="text-[8px] font-bold tracking-tighter text-center leading-tight whitespace-nowrap overflow-hidden w-full">{shape.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-slate-500 mt-3 text-center">下の色を選んで画面をタップ</p>
                  </div>
                )}
                {props.stampType === 'mark' && (
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'check', icon: Icons.Check, label: 'チェック' },
                      { id: 'circle', icon: Icons.Circle, label: 'マル' },
                      { id: 'cross', icon: Icons.X, label: 'バツ' }
                    ].map(mark => {
                      const Icon = mark.icon;
                      return (
                        <button key={mark.id} onClick={() => props.setCurrentMark(mark.id)} 
                          className={cn("flex flex-col items-center justify-center py-2 border-2 rounded-lg transition-all", props.currentMark === mark.id ? 'border-indigo-500 text-indigo-600 bg-indigo-50 shadow-inner' : 'border-slate-200 text-slate-500 hover:border-indigo-300 bg-white')}>
                          <Icon className="w-6 h-6 mb-1" />
                          <span className="text-[10px] font-bold">{mark.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {(['rect','solidRect','circle','solidCircle','polygon','solidPolygon','line','arrow','text','freehand','highlight','stamp','steel'].includes(props.tool) || (props.selectedId && ['rect','solidRect','circle','solidCircle','polygon','solidPolygon','line','arrow','text','freehand','highlight','stamp','steel'].includes(props.annotations.find(a=>a.id===props.selectedId)?.type))) && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">色</h3>
                <div className="flex flex-wrap gap-2.5">
                  {COLORS.map(c => (
                    <button key={c} onClick={() => props.handleColorChange(c)}
                      className={cn("w-7 h-7 rounded-full border-2 transition-all hover:scale-110", props.currentColor === c ? 'border-slate-400 scale-110 shadow-sm' : 'border-slate-200')}
                      style={{backgroundColor: c}} />
                  ))}
                  <label className={cn("w-7 h-7 rounded-full border-2 transition-all hover:scale-110 cursor-pointer overflow-hidden relative", !COLORS.includes(props.currentColor) ? 'border-slate-400 scale-110 shadow-sm' : 'border-slate-200')} style={{ background: !COLORS.includes(props.currentColor) ? props.currentColor : 'conic-gradient(red, yellow, lime, cyan, blue, magenta, red)' }}>
                    <input type="color" className="absolute opacity-0 w-full h-full cursor-pointer top-0 left-0" value={COLORS.includes(props.currentColor) ? '#ff0000' : props.currentColor} onChange={(e) => props.handleColorChange(e.target.value)} />
                  </label>
                </div>
              </div>
            )}

            {(props.tool === 'text' || (props.selectedId && props.annotations.find(a=>a.id===props.selectedId)?.type === 'text')) && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">背景色</h3>
                <div className="flex flex-wrap gap-2.5">
                  <button onClick={() => props.handleBgColorChange('transparent')} className={cn("w-7 h-7 rounded-full border-2 transition-all relative hover:scale-110 overflow-hidden", props.currentBgColor === 'transparent' ? 'border-slate-400 scale-110 shadow-sm' : 'border-slate-200')}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNlNWU3ZWIiLz48cmVjdCB4PSI0IiB5PSI0IiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+')]"></div>
                  </button>
                  {COLORS.map(c => (
                    <button key={`bg-${c}`} onClick={() => props.handleBgColorChange(c)} className={cn("w-7 h-7 rounded-full border-2 transition-all hover:scale-110", props.currentBgColor === c ? 'border-slate-400 scale-110 shadow-sm' : 'border-slate-200')} style={{backgroundColor: c}} />
                  ))}
                  <label className={cn("w-7 h-7 rounded-full border-2 transition-all hover:scale-110 cursor-pointer overflow-hidden relative", props.currentBgColor !== 'transparent' && !COLORS.includes(props.currentBgColor) ? 'border-slate-400 scale-110 shadow-sm' : 'border-slate-200')} style={{ background: props.currentBgColor !== 'transparent' && !COLORS.includes(props.currentBgColor) ? props.currentBgColor : 'conic-gradient(red, yellow, lime, cyan, blue, magenta, red)' }}>
                    <input type="color" className="absolute opacity-0 w-full h-full cursor-pointer top-0 left-0" value={props.currentBgColor !== 'transparent' && !COLORS.includes(props.currentBgColor) ? props.currentBgColor : '#ffff00'} onChange={(e) => props.handleBgColorChange(e.target.value)} />
                  </label>
                </div>
              </div>
            )}

            {(['rect','circle','polygon','solidPolygon','line','arrow','freehand','mosaic'].includes(props.tool) || (props.selectedId && ['rect','circle','polygon','solidPolygon','line','arrow','freehand'].includes(props.annotations.find(a=>a.id===props.selectedId)?.type))) && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex justify-between">
                  <span>{props.tool === 'mosaic' ? 'ブラシの太さ' : '線の太さ'}</span>
                  <span className="text-slate-600">{props.currentStrokeWidth}px</span>
                </h3>
                <input type="range" min="1" max="40" value={props.currentStrokeWidth} onChange={props.handleStrokeWidthChange} className="w-full accent-indigo-600" />
              </div>
            )}

            {(props.tool === 'text' || (props.selectedId && props.annotations.find(a => a.id === props.selectedId)?.type === 'text')) && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex justify-between">
                  <span>文字サイズ</span><span className="text-slate-600">{props.currentFontSize}px</span>
                </h3>
                <input type="range" min="6" max="72" value={props.currentFontSize} onChange={props.handleFontSizeChange} className="w-full accent-indigo-600" />
              </div>
            )}

            <div className="space-y-2 mb-8">
              <div className="flex gap-2">
                <button onClick={props.handleUndo} disabled={props.annotations.length === 0} className="flex-1 flex items-center justify-center gap-2 px-2 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 disabled:opacity-50 transition-all">
                  <Icons.Undo2 className="w-4 h-4" /> 戻す
                </button>
                <button onClick={props.handleRedo} disabled={props.redoStack.length === 0} className="flex-1 flex items-center justify-center gap-2 px-2 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 disabled:opacity-50 transition-all">
                  <Icons.Redo2 className="w-4 h-4" /> 進む
                </button>
              </div>
            </div>

            {props.selectedId && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">選択中</h3>
                {props.annotations.find(a => a.id === props.selectedId)?.type === 'text' && (
                  <button onClick={() => { props.handleEditSelectedText(); if(window.innerWidth < 1024) props.setIsSidebarOpen(false); }} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-all mb-2 border border-indigo-100">
                    再編集
                  </button>
                )}
                <button onClick={props.handleDeleteSelected} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all border border-red-100">
                  <Icons.Trash2 className="w-4 h-4" /> 削除
                </button>
              </div>
            )}

            {props.pdfDoc && (
              <div className="mt-auto pt-6 border-t border-slate-200 relative">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">他ツールへ</h3>
                <button onClick={() => props.setShowSendMenu(!props.showSendMenu)} disabled={props.isExporting} className="w-full px-3 py-3 rounded-lg text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 transition-all disabled:opacity-50 shadow-sm">
                  編集内容を適用して送る
                </button>
                {props.showSendMenu && (
                  <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    {[{id:'merge',label:'結合へ'},{id:'split',label:'抽出へ'},{id:'organize',label:'整理へ'},{id:'nup',label:'割付へ'},{id:'convert',label:'変換へ'},{id:'addPageNum',label:'ページ番号へ'},{id:'extractText',label:'テキスト抽出へ'}].map((item, i, arr) => (
                      <button key={item.id} onClick={() => { props.sendToTool(item.id); props.setIsSidebarOpen(false); }} className={cn("w-full text-left px-4 py-3 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-colors", i !== arr.length - 1 && "border-b border-slate-100")}>
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </aside>
        </>
      );
    }

    function EditMode(props) {
      const {
        pdfDoc, scale, setScale, currentPage, setCurrentPage, totalPages, pageDimensions,
        tool, annotations, selectedId, draggingId, currentColor, currentStrokeWidth,
        currentFontSize, currentBgColor, draftRect, draftArrow, draftFreehand, draftPolygon, mousePos,
        textInput, setTextInput, inputRef, handlePointerDown, handlePointerMove,
        handlePointerUp, handleAnnotationPointerDown, handleAnnotationDoubleClick,
        handleResizePointerDown, handleEndpointPointerDown, handleTextSubmit, canvasRef, wrapperRef,
        eraserSize, draftEraser,
      } = props;

      return (
        <div className="flex-1 bg-slate-100 overflow-auto flex flex-col relative w-full">
          <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 p-2 lg:p-2.5 flex flex-wrap items-center justify-center gap-2 lg:gap-6 sticky top-0 z-20 shadow-sm">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button onClick={() => setScale(s => Math.max(0.2, s - 0.2))} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
                <Icons.ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold w-12 lg:w-16 text-center text-slate-700">{Math.round(scale * 100)}%</span>
              <button onClick={() => setScale(s => Math.min(3.0, s + 0.2))} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
                <Icons.ZoomIn className="w-4 h-4" />
              </button>
            </div>
            <div className="w-px h-6 bg-slate-300 hidden lg:block"></div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage <= 1} className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg disabled:opacity-40 transition-colors">
                <Icons.ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-bold text-slate-700 min-w-[3rem] lg:min-w-[4rem] text-center">{currentPage} / {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages} className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg disabled:opacity-40 transition-colors">
                <Icons.ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 lg:p-8 flex justify-center items-start overflow-auto">
            <div ref={wrapperRef}
              className="relative bg-white shadow-2xl border border-slate-200 transition-transform origin-top-left lg:origin-top touch-none select-none"
              style={{
                width: pageDimensions.width * scale,
                height: pageDimensions.height * scale,
                cursor: tool === 'select' ? 'default' : tool === 'text' ? 'text' : tool === 'eraser' ? 'cell' : 'crosshair',
                touchAction: 'none'
              }}
              onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} onPointerCancel={handlePointerUp}>

              <canvas ref={canvasRef} className="absolute top-0 left-0 pointer-events-none" />

              {draftEraser && tool === 'eraser' && (
                <div className="absolute pointer-events-none border-2 border-red-400 rounded-full opacity-50"
                  style={{ width: eraserSize * scale, height: eraserSize * scale, left: draftEraser.x * scale - (eraserSize * scale) / 2, top: draftEraser.y * scale - (eraserSize * scale) / 2 }} />
              )}

              <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 10, pointerEvents: tool === 'select' ? 'auto' : 'none' }}>
                {annotations.filter(a => a.page === currentPage && !(textInput && textInput.id === a.id)).map(ann => {
                  const isSelected = ann.id === selectedId;
                  const itemColor = ann.color || '#ef4444';
                  const itemStroke = ann.strokeWidth || 3;
                  const annFontSize = ann.fontSize || 18;
                  let bx=0, by=0, bw=0, bh=0;
                  if (ann.type === 'text') {
                    const lines = ann.text.split('\n');
                    const maxLen = Math.max(...lines.map(l=>l.length), 1);
                    bx=ann.x; by=ann.y-annFontSize*0.2; bw=maxLen*annFontSize*1.0; bh=lines.length*annFontSize*1.2;
                  } else if (['rect','solidRect','circle','solidCircle','highlight','image'].includes(ann.type)) {
                    bx=ann.x; by=ann.y; bw=ann.width; bh=ann.height;
                  } else if (['arrow','line'].includes(ann.type)) {
                    bx=Math.min(ann.x1,ann.x2); by=Math.min(ann.y1,ann.y2); bw=Math.abs(ann.x1-ann.x2); bh=Math.abs(ann.y1-ann.y2);
                  } else if (['freehand', 'mosaic', 'polygon', 'solidPolygon'].includes(ann.type) && ann.points) {
                    const xs=ann.points.map(p=>p.x); const ys=ann.points.map(p=>p.y);
                    bx=Math.min(...xs); by=Math.min(...ys); bw=Math.max(...xs)-bx; bh=Math.max(...ys)-by;
                  }
                  return (
                    <g key={ann.id} onPointerDown={(e) => handleAnnotationPointerDown(e, ann)} onDoubleClick={(e) => handleAnnotationDoubleClick(e, ann)}
                      style={{ cursor: tool === 'select' ? (draggingId === ann.id ? 'grabbing' : 'grab') : 'default', pointerEvents: tool === 'select' ? 'all' : 'none' }}>
                      {isSelected && (
                        <>
                          {!['line','arrow'].includes(ann.type) && <rect x={bx*scale} y={by*scale} width={bw*scale} height={bh*scale} fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />}
                          {['image','rect','solidRect','circle','solidCircle'].includes(ann.type) && <circle cx={(bx+bw)*scale} cy={(by+bh)*scale} r={6} fill="white" stroke="#6366f1" strokeWidth={2} style={{ cursor: 'nwse-resize', pointerEvents: 'all' }} onPointerDown={(e) => handleResizePointerDown(e, ann)} />}
                          {['line','arrow'].includes(ann.type) && (
                            <>
                              <circle cx={ann.x1 * scale} cy={ann.y1 * scale} r={7} fill="white" stroke="#6366f1" strokeWidth={2.5} style={{ cursor: 'move', pointerEvents: 'all' }} onPointerDown={(e) => { e.stopPropagation(); handleEndpointPointerDown(e, ann, 'start'); }} />
                              <circle cx={ann.x2 * scale} cy={ann.y2 * scale} r={7} fill="#6366f1" stroke="white" strokeWidth={2.5} style={{ cursor: 'move', pointerEvents: 'all' }} onPointerDown={(e) => { e.stopPropagation(); handleEndpointPointerDown(e, ann, 'end'); }} />
                            </>
                          )}
                        </>
                      )}
                      {ann.type==='rect' && <rect x={ann.x*scale} y={ann.y*scale} width={ann.width*scale} height={ann.height*scale} fill="transparent" stroke={itemColor} strokeWidth={itemStroke*scale} />}
                      {ann.type==='solidRect' && <rect x={ann.x*scale} y={ann.y*scale} width={ann.width*scale} height={ann.height*scale} fill={itemColor} />}
                      {ann.type==='circle' && <ellipse cx={(ann.x+ann.width/2)*scale} cy={(ann.y+ann.height/2)*scale} rx={ann.width/2*scale} ry={ann.height/2*scale} fill="transparent" stroke={itemColor} strokeWidth={itemStroke*scale} />}
                      {ann.type==='solidCircle' && <ellipse cx={(ann.x+ann.width/2)*scale} cy={(ann.y+ann.height/2)*scale} rx={ann.width/2*scale} ry={ann.height/2*scale} fill={itemColor} />}
                      {ann.type==='line' && <line x1={ann.x1*scale} y1={ann.y1*scale} x2={ann.x2*scale} y2={ann.y2*scale} stroke={itemColor} strokeWidth={itemStroke*scale} strokeLinecap="round" />}
                      {ann.type==='highlight' && <rect x={ann.x*scale} y={ann.y*scale} width={ann.width*scale} height={ann.height*scale} fill={itemColor} fillOpacity="0.3" />}
                      {ann.type==='image' && <image href={ann.dataUrl} x={ann.x*scale} y={ann.y*scale} width={ann.width*scale} height={ann.height*scale} preserveAspectRatio="none" />}
                      {ann.type==='freehand' && ann.points && <polyline points={ann.points.map(p=>`${p.x*scale},${p.y*scale}`).join(' ')} fill="none" stroke={itemColor} strokeWidth={itemStroke*scale} strokeLinecap="round" strokeLinejoin="round" />}
                      {(ann.type==='polygon' || ann.type==='solidPolygon') && ann.points && (
                        <polygon points={ann.points.map(p=>`${p.x*scale},${p.y*scale}`).join(' ')} fill={ann.type==='solidPolygon' ? itemColor : 'none'} stroke={itemColor} strokeWidth={itemStroke*scale} strokeLinecap="round" strokeLinejoin="round" />
                      )}
                      {ann.type==='arrow' && (() => {
                        const strokeW=itemStroke*scale; const headlen=Math.max(18*scale,strokeW*3); const angle=Math.atan2(ann.y2-ann.y1,ann.x2-ann.x1); const arrowAngle=Math.PI/6;
                        const px1=ann.x2*scale-headlen*Math.cos(angle-arrowAngle); const py1=ann.y2*scale-headlen*Math.sin(angle-arrowAngle);
                        const px2=ann.x2*scale-headlen*Math.cos(angle+arrowAngle); const py2=ann.y2*scale-headlen*Math.sin(angle+arrowAngle);
                        const endX=ann.x2*scale-headlen*0.7*Math.cos(angle); const endY=ann.y2*scale-headlen*0.7*Math.sin(angle);
                        return (
                          <g>
                            <line x1={ann.x1*scale} y1={ann.y1*scale} x2={ann.x2*scale} y2={ann.y2*scale} stroke="transparent" strokeWidth={Math.max(20*scale,strokeW*2)} />
                            <line x1={ann.x1*scale} y1={ann.y1*scale} x2={endX} y2={endY} stroke={itemColor} strokeWidth={strokeW} strokeLinecap="round" />
                            <polygon points={`${ann.x2*scale},${ann.y2*scale} ${px1},${py1} ${px2},${py2}`} fill={itemColor} stroke={itemColor} strokeWidth={1} strokeLinejoin="round" />
                          </g>
                        );
                      })()}
                      {ann.type==='text' && (() => {
                        const lines=ann.text.split('\n'); const maxLen=Math.max(...lines.map(l=>l.length),1); const bgColor=ann.backgroundColor||'transparent';
                        return (
                          <g>
                            <rect x={ann.x*scale} y={(ann.y-annFontSize*0.2)*scale} width={maxLen*annFontSize*1.0*scale} height={lines.length*annFontSize*1.2*scale} fill={bgColor==='transparent'?'rgba(0,0,0,0)':bgColor} style={{pointerEvents:'auto'}} />
                            <text x={ann.x*scale} y={(ann.y*scale)+annFontSize*0.8*scale} fill={itemColor} fontSize={annFontSize*scale} fontFamily="sans-serif" fontWeight="bold" style={{pointerEvents:'none'}}>
                              {lines.map((line,i) => <tspan key={i} x={ann.x*scale} dy={i===0?0:annFontSize*1.2*scale}>{line}</tspan>)}
                            </text>
                          </g>
                        );
                      })()}
                    </g>
                  );
                })}
                {draftRect && tool==='rect' && <rect x={draftRect.x*scale} y={draftRect.y*scale} width={draftRect.width*scale} height={draftRect.height*scale} fill="none" stroke={currentColor} strokeWidth={currentStrokeWidth*scale} strokeDasharray="4 4" />}
                {draftRect && tool==='solidRect' && <rect x={draftRect.x*scale} y={draftRect.y*scale} width={draftRect.width*scale} height={draftRect.height*scale} fill={currentColor} opacity="0.8" />}
                {draftRect && tool==='circle' && <ellipse cx={(draftRect.x+draftRect.width/2)*scale} cy={(draftRect.y+draftRect.height/2)*scale} rx={draftRect.width/2*scale} ry={draftRect.height/2*scale} fill="none" stroke={currentColor} strokeWidth={currentStrokeWidth*scale} strokeDasharray="4 4" />}
                {draftRect && tool==='solidCircle' && <ellipse cx={(draftRect.x+draftRect.width/2)*scale} cy={(draftRect.y+draftRect.height/2)*scale} rx={draftRect.width/2*scale} ry={draftRect.height/2*scale} fill={currentColor} opacity="0.8" />}
                {draftRect && tool==='highlight' && <rect x={draftRect.x*scale} y={draftRect.y*scale} width={draftRect.width*scale} height={draftRect.height*scale} fill={currentColor} fillOpacity="0.3" />}
                {draftRect && tool==='redaction' && <rect x={draftRect.x*scale} y={draftRect.y*scale} width={draftRect.width*scale} height={draftRect.height*scale} fill="#000000" opacity="0.6" />}
                {draftRect && tool==='snapshot' && <rect x={draftRect.x*scale} y={draftRect.y*scale} width={draftRect.width*scale} height={draftRect.height*scale} fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />}
                {draftFreehand && tool==='freehand' && <polyline points={draftFreehand.map(p=>`${p.x*scale},${p.y*scale}`).join(' ')} fill="none" stroke={currentColor} strokeWidth={currentStrokeWidth*scale} strokeLinecap="round" strokeLinejoin="round" />}
                {draftFreehand && tool==='mosaic' && <polyline points={draftFreehand.map(p=>`${p.x*scale},${p.y*scale}`).join(' ')} fill="none" stroke="rgba(150,150,150,0.5)" strokeWidth={currentStrokeWidth*scale} strokeLinecap="round" strokeLinejoin="round" />}
                {draftPolygon && ['polygon', 'solidPolygon'].includes(tool) && (() => {
                  const pts = mousePos ? [...draftPolygon, mousePos] : draftPolygon;
                  return (
                    <g>
                      <polygon points={pts.map(p=>`${p.x*scale},${p.y*scale}`).join(' ')} fill={tool==='solidPolygon'?currentColor:'none'} stroke={currentColor} strokeWidth={currentStrokeWidth*scale} strokeDasharray="4 4" opacity={tool==='solidPolygon'?0.4:1} />
                      <circle cx={draftPolygon[0].x*scale} cy={draftPolygon[0].y*scale} r={6} fill="white" stroke="#6366f1" strokeWidth={2} />
                      {draftPolygon.map((p,i)=> i>0 && <circle key={i} cx={p.x*scale} cy={p.y*scale} r={4} fill={currentColor} />)}
                    </g>
                  );
                })()}
                {draftArrow && tool==='line' && <line x1={draftArrow.x1*scale} y1={draftArrow.y1*scale} x2={draftArrow.x2*scale} y2={draftArrow.y2*scale} stroke={currentColor} strokeWidth={currentStrokeWidth*scale} strokeLinecap="round" />}
                {draftArrow && tool==='arrow' && (() => {
                  const strokeW=currentStrokeWidth*scale; const headlen=Math.max(18*scale,strokeW*3); const angle=Math.atan2(draftArrow.y2-draftArrow.y1,draftArrow.x2-draftArrow.x1); const arrowAngle=Math.PI/6;
                  const px1=draftArrow.x2*scale-headlen*Math.cos(angle-arrowAngle); const py1=draftArrow.y2*scale-headlen*Math.sin(angle-arrowAngle);
                  const px2=draftArrow.x2*scale-headlen*Math.cos(angle+arrowAngle); const py2=draftArrow.y2*scale-headlen*Math.sin(angle+arrowAngle);
                  const endX=draftArrow.x2*scale-headlen*0.7*Math.cos(angle); const endY=draftArrow.y2*scale-headlen*0.7*Math.sin(angle);
                  return (
                    <g>
                      <line x1={draftArrow.x1*scale} y1={draftArrow.y1*scale} x2={endX} y2={endY} stroke={currentColor} strokeWidth={strokeW} strokeLinecap="round" />
                      <polygon points={`${draftArrow.x2*scale},${draftArrow.y2*scale} ${px1},${py1} ${px2},${py2}`} fill={currentColor} stroke={currentColor} strokeWidth={1} strokeLinejoin="round" />
                    </g>
                  );
                })()}
              </svg>

              {textInput && (
                <textarea ref={inputRef} value={textInput.text} onChange={(e) => setTextInput({ ...textInput, text: e.target.value })} onBlur={handleTextSubmit} onPointerDown={(e) => e.stopPropagation()}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleTextSubmit(); } if (e.key === 'Escape') setTextInput(null); }}
                  className="absolute z-20 outline-none resize-none overflow-hidden"
                  style={{ left: textInput.x * scale, top: (textInput.y - currentFontSize * 0.2) * scale, color: currentColor, fontSize: `${currentFontSize * scale}px`, backgroundColor: currentBgColor === 'transparent' ? 'transparent' : currentBgColor, fontFamily: 'sans-serif', fontWeight: 'bold', minWidth: '150px', lineHeight: 1.2, border: '2px dashed #6366f1', padding: '2px' }}
                  rows={textInput.text.split('\n').length || 1} placeholder="Shift+Enterで改行..." />
              )}
            </div>
          </div>
        </div>
      );
    }

    function OtherModes(props) {
      const {
        appMode, isExporting, handleMerge, handleSplit, handleOrganize,
        handleConvertImg2Pdf, handleConvertPdf2Img, handleConvertPdf2Pptx, handleAddPageNum, handleExtractText, handleNUp,
        mergeFiles, setMergeFiles, 
        mergeThumbnails, setMergeThumbnails, isGeneratingMergeThumbnails, setIsGeneratingMergeThumbnails,
        splitFile, setSplitFile, splitMode, setSplitMode,
        splitRange, setSplitRange, 
        splitThumbnails, setSplitThumbnails, isGeneratingSplitThumbnails, setIsGeneratingSplitThumbnails,
        organizeFile, setOrganizeFile, organizePages, setOrganizePages,
        convertFiles, setConvertFiles, convertMode, setConvertMode,
        pageNumFile, setPageNumFile, pageNumFormat, setPageNumFormat,
        pageNumPosition, setPageNumPosition, extractTextFile, setExtractTextFile,
        extractedText, setExtractedText, handleOrganizeMoveUp, handleOrganizeMoveDown,
        handleOrganizeDelete, handleOrganizeRotate, addMergeBookmarks, setAddMergeBookmarks,
        recentFiles, addToRecentFiles,extractMethod, setExtractMethod, extractProgress,
        nUpFile, setNUpFile, nUpType, setNUpType, nUpDirection, setNUpDirection, nUpPreviewUrl
      } = props;

      const [previewOrganizePage, setPreviewOrganizePage] = useState(null);
      const [draggedOrganizeIndex, setDraggedOrganizeIndex] = useState(null);
      const [dragOverOrganizeIndex, setDragOverOrganizeIndex] = useState(null);
      const [isGeneratingThumbnails, setIsGeneratingThumbnails] = useState(false);
      const [draggedMergeIndex, setDraggedMergeIndex] = useState(null);
      const [previewData, setPreviewData] = useState(null);
      
      const hasPrevPreview = previewData ? previewData.currentIndex > 0 : false;
      const hasNextPreview = previewData ? previewData.currentIndex < previewData.images.length - 1 : false;

      const goToPrevPreview = (e) => { e.stopPropagation(); if (hasPrevPreview) setPreviewData(prev => ({...prev, currentIndex: prev.currentIndex - 1})); };
      const goToNextPreview = (e) => { e.stopPropagation(); if (hasNextPreview) setPreviewData(prev => ({...prev, currentIndex: prev.currentIndex + 1})); };

      useEffect(() => {
        const handleKeyDown = (e) => {
          if (previewData) {
            if (e.key === 'ArrowLeft' && hasPrevPreview) goToPrevPreview(e);
            if (e.key === 'ArrowRight' && hasNextPreview) goToNextPreview(e);
            if (e.key === 'Escape') setPreviewData(null);
          }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [previewData, hasPrevPreview, hasNextPreview]);
      const organizeGridRef = useRef(null);

      const currentIndex = previewOrganizePage ? organizePages.findIndex(p => p.id === previewOrganizePage.id) : -1;
      const hasPrev = currentIndex > 0;
      const hasNext = currentIndex < organizePages.length - 1;

      const goToPrev = (e) => { e.stopPropagation(); if (hasPrev) setPreviewOrganizePage(organizePages[currentIndex - 1]); };
      const goToNext = (e) => { e.stopPropagation(); if (hasNext) setPreviewOrganizePage(organizePages[currentIndex + 1]); };

      useEffect(() => {
        const handleKeyDown = (e) => {
          if (previewOrganizePage) {
            if (e.key === 'ArrowLeft' && hasPrev) goToPrev(e);
            if (e.key === 'ArrowRight' && hasNext) goToNext(e);
            if (e.key === 'Escape') setPreviewOrganizePage(null);
          }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [previewOrganizePage, currentIndex, hasPrev, hasNext]);

      const handleMergeDragStart = (e, index) => {
        e.stopPropagation(); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', index.toString());
        setTimeout(() => setDraggedMergeIndex(index), 0);
      };
      const handleMergeDragEnter = (e, index) => {
        e.preventDefault(); e.stopPropagation();
        if (draggedMergeIndex === null || draggedMergeIndex === index) return;
        const newFiles = [...mergeFiles];
        const draggedItem = newFiles[draggedMergeIndex];
        newFiles.splice(draggedMergeIndex, 1);
        newFiles.splice(index, 0, draggedItem);
        setMergeFiles(newFiles);
        setDraggedMergeIndex(index);
      };

      const handleDragStart = (e, index) => {
        e.stopPropagation(); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', index.toString());
        setTimeout(() => setDraggedOrganizeIndex(index), 0);
      };
      const handleDragEnter = (e, index) => { e.preventDefault(); e.stopPropagation(); setDragOverOrganizeIndex(index); };
      const handleDragOver = (e) => {
        e.preventDefault(); e.stopPropagation();
        if (!organizeGridRef.current) return;
        const container = organizeGridRef.current;
        const rect = container.getBoundingClientRect();
        const scrollZone = 60; const scrollSpeed = 8;
        if (e.clientY < rect.top + scrollZone) container.scrollTop -= scrollSpeed;
        else if (e.clientY > rect.bottom - scrollZone) container.scrollTop += scrollSpeed;
      };
      const handleDrop = (e) => {
        e.preventDefault(); e.stopPropagation();
        if (draggedOrganizeIndex !== null && dragOverOrganizeIndex !== null && draggedOrganizeIndex !== dragOverOrganizeIndex) {
          setOrganizePages((prevPages) => {
            const newPages = [...prevPages];
            const draggedItem = newPages[draggedOrganizeIndex];
            newPages.splice(draggedOrganizeIndex, 1);
            newPages.splice(dragOverOrganizeIndex, 0, draggedItem);
            return newPages;
          });
        }
        setDraggedOrganizeIndex(null); setDragOverOrganizeIndex(null);
      };
      const handleDragEnd = (e) => { e.stopPropagation(); setDraggedOrganizeIndex(null); setDragOverOrganizeIndex(null); };

      if (appMode === 'merge') return (
        <>
          <ModeContainer title="PDF結合" icon={Icons.Layers}>
            <p className="text-slate-600 mb-6 text-sm lg:text-base">複数のPDFファイルを1つのファイルに結合します。追加したファイルの中身を確認しながら、ドラッグして順番を入れ替えられます。</p>
            <FileUploader accept="application/pdf" multiple={true} 
              onChange={async (e) => {
                const newFiles = Array.from(e.target.files);
                setMergeFiles([...mergeFiles, ...newFiles]);
                
                setIsGeneratingMergeThumbnails(true);
                const newThumbs = { ...mergeThumbnails };
                for (const file of newFiles) {
                  const key = `${file.name}-${file.size}`;
                  if (!newThumbs[key]) {
                    try {
                      const arrayBuffer = await file.arrayBuffer();
                      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer, cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true });
                      const pdf = await loadingTask.promise;
                      const thumbs = [];
                      for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const viewport = page.getViewport({ scale: 1.5 });
                        const canvas = document.createElement('canvas');
                        canvas.width = viewport.width; canvas.height = viewport.height;
                        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                        thumbs.push(canvas.toDataURL('image/jpeg', 0.8));
                      }
                      newThumbs[key] = thumbs;
                    } catch (err) { console.error('Thumbnail generation failed', err); }
                  }
                }
                setMergeThumbnails(newThumbs);
                setIsGeneratingMergeThumbnails(false);
              }} 
              files={[]} recentFiles={recentFiles} addToRecentFiles={addToRecentFiles} />
              
            {mergeFiles.length > 0 && (
              <div className="mt-6 space-y-3 mb-8">
                <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Icons.LayoutGrid className="w-4 h-4" /> 結合する順番
                  {isGeneratingMergeThumbnails && <span className="text-xs font-normal text-indigo-500 animate-pulse ml-2">プレビューを読み込み中...</span>}
                </h3>
                {mergeFiles.map((file, index) => {
                  const key = `${file.name}-${file.size}`;
                  const thumbs = mergeThumbnails[key] || [];
                  return (
                    <div key={`${file.name}-${index}`} draggable 
                      onDragStart={(e) => { e.stopPropagation(); handleMergeDragStart(e, index); }} 
                      onDragEnter={(e) => { e.stopPropagation(); handleMergeDragEnter(e, index); }} 
                      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }} 
                      onDrop={(e) => { e.stopPropagation(); setDraggedMergeIndex(null); }} 
                      onDragEnd={(e) => { e.stopPropagation(); setDraggedMergeIndex(null); }}
                      className={cn("flex flex-col p-3 lg:p-4 bg-white border-2 rounded-xl transition-all cursor-grab active:cursor-grabbing group gap-3", draggedMergeIndex === index ? "opacity-40 border-indigo-500 border-dashed scale-95" : "border-slate-200 hover:border-indigo-300 shadow-sm")}>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold text-xs shrink-0 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                            {index + 1}
                          </div>
                          <Icons.FileText className="w-5 h-5 text-indigo-500 shrink-0 hidden sm:block" />
                          <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                        </div>
                        <button onClick={() => setMergeFiles(mergeFiles.filter((_, idx) => idx !== index))} className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                          <Icons.X className="w-5 h-5" />
                        </button>
                      </div>

                      {thumbs.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar pl-11">
                          {thumbs.map((t, i) => (
                            <div key={i} className="shrink-0 relative group/thumb cursor-pointer" 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setPreviewData({ images: thumbs, currentIndex: i, getTitle: (idx) => `${file.name} - ${idx+1}ページ目` }); 
                              }}>
                              <img src={t} className="h-16 lg:h-24 w-auto object-contain border border-slate-200 rounded shadow-sm bg-slate-50" />
                              <span className="absolute bottom-0 right-0 bg-slate-900/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-tl">{i+1}</span>
                              <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity rounded">
                                 <Icons.ZoomIn className="w-5 h-5 text-white shadow-sm" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <label className="flex items-start lg:items-center gap-3 mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl cursor-pointer hover:bg-indigo-100 transition-colors">
              <input type="checkbox" checked={addMergeBookmarks} onChange={(e) => setAddMergeBookmarks(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded mt-1 lg:mt-0 shrink-0" />
              <div className="flex flex-col">
                <span className="font-bold text-indigo-900 text-sm">ファイル名をしおりとして追加</span>
                <span className="text-xs text-indigo-700">結合後のPDFに、元のファイル名で目次を作成します。</span>
              </div>
            </label>
            <button onClick={handleMerge} disabled={mergeFiles.length < 2 || isExporting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm transition-all">
              <Icons.Layers className="w-5 h-5" /> {isExporting ? '処理中...' : '結合してダウンロード'}
            </button>
          </ModeContainer>

          {previewData && (
            <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-2 lg:p-4 cursor-pointer" onClick={() => setPreviewData(null)}>
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <button onClick={(e) => { e.stopPropagation(); setPreviewData(null); }} className="absolute top-4 right-4 text-white bg-slate-900/50 hover:bg-red-500 rounded-full p-2 transition z-10 cursor-pointer"><Icons.X className="w-6 h-6 lg:w-8 lg:h-8" /></button>
                {hasPrevPreview && <button onClick={goToPrevPreview} className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-indigo-500 rounded-full p-2 lg:p-4 transition-all z-20 cursor-pointer"><Icons.ChevronLeft className="w-6 h-6 lg:w-10 lg:h-10" /></button>}
                {hasNextPreview && <button onClick={goToNextPreview} className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-indigo-500 rounded-full p-2 lg:p-4 transition-all z-20 cursor-pointer"><Icons.ChevronRight className="w-6 h-6 lg:w-10 lg:h-10" /></button>}
                
                <img src={previewData.images[previewData.currentIndex]} className="max-w-full max-h-[85vh] lg:max-h-[95vh] object-contain shadow-2xl bg-white cursor-default rounded-sm" onClick={(e) => e.stopPropagation()} />
                <div className="absolute bottom-6 text-white font-bold bg-slate-900/80 px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md cursor-default text-xs lg:text-sm" onClick={(e) => e.stopPropagation()}>
                  {previewData.getTitle(previewData.currentIndex)}
                </div>
              </div>
            </div>
          )}
        </>
      );

      if (appMode === 'split') {
        const isPageSelected = (pageNum) => {
          if (splitMode === 'all') return true;
          if (!splitRange.trim()) return false;
          const indices = new Set();
          const total = splitThumbnails.length;
          splitRange.split(',').forEach(part => {
            const range = part.trim().split('-');
            if (range.length === 1) { const n = parseInt(range[0]); if (!isNaN(n) && n>=1 && n<=total) indices.add(n); }
            else if (range.length === 2) { const start=parseInt(range[0]),end=parseInt(range[1]); if(!isNaN(start)&&!isNaN(end)) for(let i=Math.max(1,start);i<=Math.min(total,end);i++) indices.add(i); }
          });
          return indices.has(pageNum);
        };

        const togglePageSelection = (pageNum) => {
          if (!splitMode.startsWith('range')) setSplitMode('range-merge');
          
          let currentSet = new Set();
          const total = splitThumbnails.length;
          if (splitRange.trim()) {
            splitRange.split(',').forEach(part => {
              const range = part.trim().split('-');
              if (range.length === 1) { const n = parseInt(range[0]); if (!isNaN(n) && n>=1 && n<=total) currentSet.add(n); }
              else if (range.length === 2) { const start=parseInt(range[0]),end=parseInt(range[1]); if(!isNaN(start)&&!isNaN(end)) for(let i=Math.max(1,start);i<=Math.min(total,end);i++) currentSet.add(i); }
            });
          }

          if (currentSet.has(pageNum)) { currentSet.delete(pageNum); } 
          else { currentSet.add(pageNum); }

          const arr = Array.from(currentSet).sort((a,b)=>a-b);
          if (arr.length === 0) { setSplitRange(''); return; }
          
          let ranges = [];
          let start = arr[0]; let end = arr[0];
          for(let i = 1; i < arr.length; i++) {
            if(arr[i] === end + 1) { end = arr[i]; }
            else {
              ranges.push(start === end ? `${start}` : `${start}-${end}`);
              start = arr[i]; end = arr[i];
            }
          }
          ranges.push(start === end ? `${start}` : `${start}-${end}`);
          setSplitRange(ranges.join(', '));
        };

        return (
          <>
            <ModeContainer title="PDF抽出" icon={Icons.Scissors}>
              <p className="text-slate-600 mb-6 text-sm lg:text-base">PDFファイルを抽出します。画像をクリックして抽出したいページを選んだり、虫眼鏡ボタンで拡大確認ができます。</p>
              {!splitFile ? (
                <FileUploader accept="application/pdf" multiple={false} 
                  onChange={async (e) => {
                    const file = e.target.files[0]; if (!file) return; 
                    setSplitFile(file);
                    setIsGeneratingSplitThumbnails(true);
                    try {
                      const arrayBuffer = await file.arrayBuffer();
                      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer.slice(0), cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true });
                      const pdf = await loadingTask.promise;
                      const thumbs = [];
                      for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const viewport = page.getViewport({ scale: 1.5 });
                        const canvas = document.createElement('canvas');
                        canvas.width = viewport.width; canvas.height = viewport.height;
                        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                        thumbs.push(canvas.toDataURL('image/jpeg', 0.8));
                      }
                      setSplitThumbnails(thumbs);
                    } catch (err) { console.error(err); } finally { setIsGeneratingSplitThumbnails(false); }
                  }} 
                  files={[]} recentFiles={recentFiles} addToRecentFiles={addToRecentFiles} />
              ) : (
                <div className="mb-8 w-full overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <span className="font-bold text-slate-700 truncate">{splitFile.name}</span>
                    <button onClick={() => { setSplitFile(null); setSplitThumbnails([]); }} className="text-sm text-red-500 hover:text-red-700 font-medium shrink-0">キャンセル</button>
                  </div>

                  <div className="mb-6 space-y-4">
                    <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <input type="radio" name="splitMode" value="all" checked={splitMode==='all'} onChange={() => setSplitMode('all')} className="w-4 h-4 text-indigo-600" />
                      <span className="font-medium text-sm lg:text-base text-slate-700">すべてのページを個別に抽出 (ZIP)</span>
                    </label>

                    <div className={cn("p-4 border border-slate-200 rounded-xl transition-colors", splitMode.startsWith('range') ? "bg-indigo-50/50 border-indigo-200" : "hover:bg-slate-50")}>
                      <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 cursor-pointer mb-3">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <input type="radio" name="splitMode" value="range-merge" checked={splitMode.startsWith('range')} onChange={() => setSplitMode(splitMode.startsWith('range') ? splitMode : 'range-merge')} className="w-4 h-4 text-indigo-600 shrink-0" />
                          <span className="font-medium text-sm lg:text-base text-slate-700 whitespace-nowrap">範囲指定:</span>
                        </div>
                        <input type="text" value={splitRange} onChange={e => { if(!splitMode.startsWith('range')) setSplitMode('range-merge'); setSplitRange(e.target.value); }} placeholder="例: 1-3, 5" disabled={!splitMode.startsWith('range')}
                          className="w-full sm:flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 disabled:bg-slate-100/50" />
                      </label>
                      
                      <div className="pl-7 flex flex-col gap-2.5">
                        <label className="flex items-center gap-2.5 cursor-pointer w-fit">
                          <input type="radio" name="rangeSubMode" value="range-merge" checked={splitMode==='range' || splitMode==='range-merge'} onChange={() => setSplitMode('range-merge')} disabled={!splitMode.startsWith('range')} className="w-4 h-4 text-indigo-600" />
                          <span className={cn("text-sm font-medium", splitMode.startsWith('range') ? "text-slate-700" : "text-slate-400")}>1つのPDFファイルとして抽出する</span>
                        </label>
                        <label className="flex items-center gap-2.5 cursor-pointer w-fit">
                          <input type="radio" name="rangeSubMode" value="range-zip" checked={splitMode==='range-zip'} onChange={() => setSplitMode('range-zip')} disabled={!splitMode.startsWith('range')} className="w-4 h-4 text-indigo-600" />
                          <span className={cn("text-sm font-medium", splitMode.startsWith('range') ? "text-slate-700" : "text-slate-400")}>指定したページを個別に抽出する (ZIP)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-h-[50vh] overflow-y-auto relative">
                    {isGeneratingSplitThumbnails ? (
                      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        <p className="font-medium text-sm">プレビュー画像を生成中...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 gap-3">
                        {splitThumbnails.map((thumb, idx) => {
                          const pageNum = idx + 1;
                          const isSelected = isPageSelected(pageNum);
                          return (
                            <div key={idx} onClick={() => togglePageSelection(pageNum)}
                              className={cn("bg-white border-2 rounded-lg p-2 flex flex-col items-center shadow-sm transition-all cursor-pointer group", isSelected ? 'border-indigo-500 bg-indigo-50 scale-105' : 'border-slate-200 hover:border-indigo-300')}>
                              <div className="w-full aspect-[1/1.4] bg-slate-100 mb-2 flex items-center justify-center rounded border border-slate-200 relative overflow-hidden pointer-events-none group-hover:pointer-events-auto">
                                <img src={thumb} className="max-w-full max-h-full object-contain pointer-events-none" />
                                {isSelected && (
                                  <div className="absolute top-1 right-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-sm pointer-events-none z-10">
                                    <Icons.FileText className="w-3 h-3" />
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                                  <button type="button" 
                                    onClick={(e) => { 
                                      e.stopPropagation(); 
                                      setPreviewData({ images: splitThumbnails, currentIndex: idx, getTitle: (i) => `抽出プレビュー: ${i+1}ページ目` }); 
                                    }} 
                                    className="bg-slate-900/60 p-2 lg:p-3 rounded-full text-white backdrop-blur-sm shadow-lg transform scale-90 group-hover:scale-100 transition-transform pointer-events-auto cursor-pointer hover:bg-slate-900/80" title="拡大プレビュー">
                                    <Icons.ZoomIn className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                              <span className={cn("text-xs font-bold transition-colors", isSelected ? "text-indigo-700" : "text-slate-500 group-hover:text-indigo-500")}>{pageNum}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <button onClick={handleSplit} disabled={!splitFile || isExporting || isGeneratingSplitThumbnails || (splitMode.startsWith('range') && !splitRange.trim())} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm transition-all mt-6">
                <Icons.Scissors className="w-5 h-5" /> {isExporting ? '処理中...' : '抽出してダウンロード'}
              </button>
            </ModeContainer>

            {previewData && (
              <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-2 lg:p-4 cursor-pointer" onClick={() => setPreviewData(null)}>
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <button onClick={(e) => { e.stopPropagation(); setPreviewData(null); }} className="absolute top-4 right-4 text-white bg-slate-900/50 hover:bg-red-500 rounded-full p-2 transition z-10 cursor-pointer"><Icons.X className="w-6 h-6 lg:w-8 lg:h-8" /></button>
                  {hasPrevPreview && <button onClick={goToPrevPreview} className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-indigo-500 rounded-full p-2 lg:p-4 transition-all z-20 cursor-pointer"><Icons.ChevronLeft className="w-6 h-6 lg:w-10 lg:h-10" /></button>}
                  {hasNextPreview && <button onClick={goToNextPreview} className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-indigo-500 rounded-full p-2 lg:p-4 transition-all z-20 cursor-pointer"><Icons.ChevronRight className="w-6 h-6 lg:w-10 lg:h-10" /></button>}
                  
                  <img src={previewData.images[previewData.currentIndex]} className="max-w-full max-h-[85vh] lg:max-h-[95vh] object-contain shadow-2xl bg-white cursor-default rounded-sm" onClick={(e) => e.stopPropagation()} />
                  <div className="absolute bottom-6 text-white font-bold bg-slate-900/80 px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md cursor-default text-xs lg:text-sm" onClick={(e) => e.stopPropagation()}>
                    {previewData.getTitle(previewData.currentIndex)}
                  </div>
                </div>
              </div>
            )}
          </>
        );
      }

      if (appMode === 'organize') return (
        <>
          <ModeContainer title="PDF整理" icon={Icons.LayoutGrid}>
            <p className="text-slate-600 mb-6 text-sm lg:text-base">ページの並び替え、削除、回転を行います。ドラッグ＆ドロップで順番を入れ替えられます。</p>
            {!organizeFile ? (
              <FileUploader accept="application/pdf" multiple={false} recentFiles={recentFiles} addToRecentFiles={addToRecentFiles}
                onChange={async (e) => {
                  const file = e.target.files[0]; if (!file) return; setOrganizeFile(file); setIsGeneratingThumbnails(true);
                  try {
                    const arrayBuffer = await file.arrayBuffer();
                    const pdfDocLib = await window.PDFLib.PDFDocument.load(arrayBuffer.slice(0), { ignoreEncryption: true });
                    const libPages = pdfDocLib.getPages();
                    const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer.slice(0), cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true });
                    const pdfDoc = await loadingTask.promise;
                    const pages = [];
                    for (let i = 1; i <= pdfDoc.numPages; i++) {
                      const page = await pdfDoc.getPage(i);
                      const viewport = page.getViewport({ scale: 1.0 });
                      const canvas = document.createElement('canvas');
                      const context = canvas.getContext('2d');
                      canvas.width = viewport.width; canvas.height = viewport.height;
                      await page.render({ canvasContext: context, viewport: viewport }).promise;
                      pages.push({ id: `page-${i}-${Date.now()}`, originalIndex: i - 1, rotation: libPages[i - 1].getRotation().angle, thumbnail: canvas.toDataURL('image/jpeg', 0.8) });
                    }
                    setOrganizePages(pages);
                  } catch (error) { console.error("サムネイル生成エラー:", error); } finally { setIsGeneratingThumbnails(false); }
                }} />
            ) : (
              <div className="mb-8 w-full overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <span className="font-bold text-slate-700 truncate">{organizeFile.name}</span>
                  <button onClick={() => { setOrganizeFile(null); setOrganizePages([]); }} className="text-sm text-red-500 hover:text-red-700 font-medium shrink-0">キャンセル</button>
                </div>
                <div ref={organizeGridRef} className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 max-h-[50vh] overflow-y-auto relative">
                  {isGeneratingThumbnails ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-500">
                      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                      <p className="font-medium text-sm">プレビュー画像を生成中...</p>
                    </div>
                  ) : (
                    organizePages.map((page, index) => (
                      <div key={page.id} draggable onDragStart={(e) => handleDragStart(e, index)} onDragEnter={(e) => handleDragEnter(e, index)} onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={handleDragEnd}
                        className={cn("bg-white border-2 rounded-lg p-2 flex flex-col items-center shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing", draggedOrganizeIndex === index ? 'opacity-40 border-indigo-500 border-dashed scale-95' : dragOverOrganizeIndex === index ? 'border-indigo-400 bg-indigo-50 scale-105' : 'border-slate-200')}>
                        <div className="w-full aspect-[1/1.4] bg-slate-100 mb-2 flex items-center justify-center rounded border border-slate-200 relative overflow-hidden group cursor-grab">
                          <span className="text-[10px] lg:text-xs font-bold absolute top-1 left-1 z-10 bg-white/90 px-1.5 py-0.5 rounded shadow-sm pointer-events-none">{page.originalIndex + 1}</span>
                          {page.thumbnail ? <img src={page.thumbnail} draggable={false} className="max-w-full max-h-full object-contain pointer-events-none" style={{ transform: `rotate(${page.rotation}deg)` }} /> : <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-300 pointer-events-none" style={{ transform: `rotate(${page.rotation}deg)` }}>{page.originalIndex + 1}</div>}
                          <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                            <button type="button" onClick={(e) => { e.stopPropagation(); setPreviewOrganizePage(page); }} className="bg-slate-900/60 p-2 lg:p-3 rounded-full text-white backdrop-blur-sm shadow-lg transform scale-90 group-hover:scale-100 transition-transform pointer-events-auto hover:bg-slate-900/80 cursor-pointer" title="拡大プレビュー"><Icons.ZoomIn className="w-5 h-5 lg:w-6 lg:h-6" /></button>
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-1 w-full">
                          <button onClick={() => handleOrganizeMoveUp(index)} disabled={index === 0} className="p-1 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30"><Icons.ArrowLeft className="w-3 h-3 lg:w-4 lg:h-4" /></button>
                          <button onClick={() => handleOrganizeRotate(index, -90)} className="p-1 text-slate-500 hover:bg-slate-100 rounded"><Icons.RotateCcw className="w-3 h-3 lg:w-4 lg:h-4" /></button>
                          <button onClick={() => handleOrganizeRotate(index, 90)} className="p-1 text-slate-500 hover:bg-slate-100 rounded"><Icons.RotateCw className="w-3 h-3 lg:w-4 lg:h-4" /></button>
                          <button onClick={() => handleOrganizeDelete(index)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Icons.Trash2 className="w-3 h-3 lg:w-4 lg:h-4" /></button>
                          <button onClick={() => handleOrganizeMoveDown(index)} disabled={index === organizePages.length - 1} className="p-1 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30"><Icons.ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            <button onClick={handleOrganize} disabled={!organizeFile || isExporting || isGeneratingThumbnails} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm">
              <Icons.LayoutGrid className="w-5 h-5" /> {isExporting ? '処理中...' : '適用してダウンロード'}
            </button>
          </ModeContainer>

          {previewOrganizePage && (
            <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-2 lg:p-4 cursor-pointer" onClick={() => setPreviewOrganizePage(null)}>
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <button onClick={(e) => { e.stopPropagation(); setPreviewOrganizePage(null); }} className="absolute top-4 right-4 text-white bg-slate-900/50 hover:bg-red-500 rounded-full p-2 transition z-10 cursor-pointer"><Icons.X className="w-6 h-6 lg:w-8 lg:h-8" /></button>
                {hasPrev && <button onClick={goToPrev} className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-indigo-500 rounded-full p-2 lg:p-4 transition-all z-20 cursor-pointer"><Icons.ChevronLeft className="w-6 h-6 lg:w-10 lg:h-10" /></button>}
                {hasNext && <button onClick={goToNext} className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-indigo-500 rounded-full p-2 lg:p-4 transition-all z-20 cursor-pointer"><Icons.ChevronRight className="w-6 h-6 lg:w-10 lg:h-10" /></button>}
                <img src={previewOrganizePage.thumbnail} className="max-w-full max-h-[85vh] lg:max-h-[95vh] object-contain shadow-2xl bg-white cursor-default rounded-sm" style={{ transform: `rotate(${previewOrganizePage.rotation || 0}deg)` }} onClick={(e) => e.stopPropagation()} />
                <div className="absolute bottom-6 text-white font-bold bg-slate-900/80 px-4 py-1 rounded-full shadow-lg backdrop-blur-md cursor-default text-xs" onClick={(e) => e.stopPropagation()}>元のページ : {previewOrganizePage.originalIndex + 1}</div>
              </div>
            </div>
          )}
        </>
      );

      if (appMode === 'nup') return (
        <ModeContainer title="ページの割り付け (N-up)" icon={Icons.Columns}>
          <p className="text-slate-600 mb-6 text-sm lg:text-base">複数ページを縮小して1枚の用紙に割り付けます（2アップ、4アップ等）。</p>
          <FileUploader accept="application/pdf" multiple={false} onChange={(e) => setNUpFile(e.target.files[0])} files={nUpFile ? [nUpFile] : []} onRemove={() => setNUpFile(null)} recentFiles={recentFiles} addToRecentFiles={addToRecentFiles} />

          {props.nUpPreviewUrl && (
            <div className="mb-6 animate-in fade-in duration-500">
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Icons.Image className="w-4 h-4" /> リアルタイムプレビュー (1枚目)
              </label>
              <div className="bg-slate-200 p-4 rounded-xl flex justify-center border-2 border-slate-300 shadow-inner">
                <img src={props.nUpPreviewUrl} className="max-h-64 shadow-2xl border border-white" />
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">割り付けレイアウト</label>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button onClick={() => setNUpType('2up')} className={cn("flex-1 py-2 text-sm font-bold rounded-md transition-all", nUpType === '2up' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500')}>2アップ (2面)</button>
                <button onClick={() => setNUpType('4up')} className={cn("flex-1 py-2 text-sm font-bold rounded-md transition-all", nUpType === '4up' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500')}>4アップ (4面)</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">配置する順番（方向）</label>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button onClick={() => setNUpDirection('ltr')} className={cn("flex-1 py-2 text-sm font-bold rounded-md transition-all", nUpDirection === 'ltr' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500')}>左から右へ (横書き)</button>
                <button onClick={() => setNUpDirection('rtl')} className={cn("flex-1 py-2 text-sm font-bold rounded-md transition-all", nUpDirection === 'rtl' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500')}>右から左へ (縦書き)</button>
              </div>
            </div>
          </div>

          <button onClick={handleNUp} disabled={!nUpFile || isExporting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm transition-all">
            <Icons.Columns className="w-5 h-5" /> {isExporting ? '処理中...' : '割り付けてダウンロード'}
          </button>
        </ModeContainer>
      );

      if (appMode === 'convert') return (
        <ModeContainer title="PDF変換" icon={Icons.RefreshCw}>
          <div className="flex flex-col sm:flex-row bg-slate-100 p-1 rounded-xl mb-6 lg:mb-8 gap-1">
            <button onClick={() => setConvertMode('img2pdf')} className={cn("flex-1 py-2.5 text-sm font-bold rounded-lg transition-all", convertMode==='img2pdf' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500')}>画像 → PDF</button>
            <button onClick={() => setConvertMode('pdf2img')} className={cn("flex-1 py-2.5 text-sm font-bold rounded-lg transition-all", convertMode==='pdf2img' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500')}>PDF → 画像</button>
            <button onClick={() => setConvertMode('pdf2pptx')} className={cn("flex-1 py-2.5 text-sm font-bold rounded-lg transition-all", convertMode==='pdf2pptx' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500')}>PDF → PPTX</button>
          </div>
          {convertMode==='img2pdf' ? (
            <>
              <FileUploader accept="image/*" multiple={true} onChange={(e) => setConvertFiles([...convertFiles, ...Array.from(e.target.files)])} files={convertFiles} onRemove={(i) => setConvertFiles(convertFiles.filter((_,idx) => idx!==i))} recentFiles={recentFiles} addToRecentFiles={addToRecentFiles} />
              <button onClick={handleConvertImg2Pdf} disabled={convertFiles.length===0||isExporting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm">
                <Icons.RefreshCw className="w-5 h-5" /> {isExporting ? '処理中...' : 'PDFに変換'}
              </button>
            </>
          ) : convertMode==='pdf2img' ? (
            <>
              <FileUploader accept="application/pdf" multiple={false} onChange={(e) => setConvertFiles([e.target.files[0]])} files={convertFiles.length>0?[convertFiles[0]]:[]} onRemove={() => setConvertFiles([])} recentFiles={recentFiles} addToRecentFiles={addToRecentFiles} />
              <button onClick={handleConvertPdf2Img} disabled={convertFiles.length===0||isExporting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm">
                <Icons.RefreshCw className="w-5 h-5" /> {isExporting ? '処理中...' : '画像に変換'}
              </button>
            </>
          ) : (
            <>
              <FileUploader accept="application/pdf" multiple={false} onChange={(e) => setConvertFiles([e.target.files[0]])} files={convertFiles.length>0?[convertFiles[0]]:[]} onRemove={() => setConvertFiles([])} recentFiles={recentFiles} addToRecentFiles={addToRecentFiles} />
              <button onClick={handleConvertPdf2Pptx} disabled={convertFiles.length===0||isExporting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm">
                <Icons.RefreshCw className="w-5 h-5" /> {isExporting ? '処理中...' : 'PPTXに変換'}
              </button>
            </>
          )}
        </ModeContainer>
      );

      if (appMode === 'addPageNum') return (
        <ModeContainer title="ページ番号追加" icon={Icons.Hash}>
          <FileUploader accept="application/pdf" multiple={false} onChange={(e) => setPageNumFile(e.target.files[0])} files={pageNumFile?[pageNumFile]:[]} onRemove={() => setPageNumFile(null)} recentFiles={recentFiles} addToRecentFiles={addToRecentFiles} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">フォーマット</label>
              <select value={pageNumFormat} onChange={e => setPageNumFormat(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 bg-white">
                <option value="{n}">1, 2, 3...</option>
                <option value="- {n} -">- 1 -, - 2 -...</option>
                <option value="{n} / {total}">1 / 10, 2 / 10...</option>
                <option value="Page {n}">Page 1, Page 2...</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">位置</label>
              <select value={pageNumPosition} onChange={e => setPageNumPosition(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 bg-white">
                <option value="bottom-center">下部 中央</option>
                <option value="bottom-right">下部 右</option>
                <option value="bottom-left">下部 左</option>
                <option value="top-center">上部 中央</option>
                <option value="top-right">上部 右</option>
                <option value="top-left">上部 左</option>
              </select>
            </div>
          </div>
          <button onClick={handleAddPageNum} disabled={!pageNumFile||isExporting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm">
            <Icons.Hash className="w-5 h-5" /> {isExporting ? '処理中...' : '追加してダウンロード'}
          </button>
        </ModeContainer>
      );

      if (appMode === 'extractText') return (
        <ModeContainer title="テキスト抽出" icon={Icons.FileText}>
          <FileUploader accept="application/pdf" multiple={false} onChange={(e) => setExtractTextFile(e.target.files[0])} files={extractTextFile?[extractTextFile]:[]} onRemove={() => { setExtractTextFile(null); setExtractedText(''); }} recentFiles={recentFiles} addToRecentFiles={addToRecentFiles} />
          
          <div className="mb-8 space-y-3 lg:space-y-4">
            <label className="flex items-start lg:items-center gap-3 p-3 lg:p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
              <input type="radio" name="extractMethod" value="normal" checked={extractMethod==='normal'} onChange={() => setExtractMethod('normal')} className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-600 mt-1 lg:mt-0 shrink-0" />
              <div className="flex flex-col">
                <span className="font-bold text-sm lg:text-base text-slate-700">通常のテキスト抽出 (高速)</span>
                <span className="text-xs text-slate-500">標準的なPDFからテキストデータをそのまま取り出します。</span>
              </div>
            </label>
            <label className="flex items-start lg:items-center gap-3 p-3 lg:p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
              <input type="radio" name="extractMethod" value="ocr" checked={extractMethod==='ocr'} onChange={() => setExtractMethod('ocr')} className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-600 mt-1 lg:mt-0 shrink-0" />
              <div className="flex flex-col">
                <span className="font-bold text-sm lg:text-base text-slate-700">OCR スキャン抽出 (時間がかかります)</span>
                <span className="text-xs text-slate-500">画像化されたPDFからAIで日本語の文字を読み取ります。※精度は画質に依存します。</span>
              </div>
            </label>
          </div>

          <button onClick={handleExtractText} disabled={!extractTextFile||isExporting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm mb-6 relative overflow-hidden transition-all">
            {isExporting && extractMethod === 'ocr' && <div className="absolute inset-0 bg-indigo-800 animate-pulse opacity-40"></div>}
            <Icons.FileText className="w-5 h-5 relative z-10" /> 
            <span className="relative z-10">{isExporting ? (extractProgress || '抽出中...') : 'テキストを抽出'}</span>
          </button>

          {extractedText && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm lg:text-base text-slate-700">抽出結果</h3>
                <button onClick={() => { navigator.clipboard.writeText(extractedText); alert('コピーしました'); }} className="text-xs lg:text-sm text-indigo-600 hover:text-indigo-800 font-bold bg-indigo-50 px-3 py-1.5 rounded-md transition-colors">コピー</button>
              </div>
              <textarea readOnly value={extractedText} className="w-full h-48 lg:h-64 p-3 lg:p-4 border border-slate-300 rounded-xl bg-slate-50 text-xs lg:text-sm font-mono outline-none resize-y focus:border-indigo-500" />
            </div>
          )}
        </ModeContainer>
      );

      return null;
    }

    function useLocalStorageState(key, defaultValue) {
      const [state, setState] = useState(() => {
        try {
          const item = window.localStorage.getItem(key);
          return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
          console.warn('ローカルストレージの読み込みに失敗しました', error);
          return defaultValue;
        }
      });

      useEffect(() => {
        try {
          window.localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
          console.warn('ローカルストレージの保存に失敗しました', error);
        }
      }, [key, state]);

      return [state, setState];
    }

    function App() {
    　const [currentMark, setCurrentMark] = useLocalStorageState('pdf_currentMark', 'check');
      const [appMode, setAppMode] = useLocalStorageState('pdf_appMode', 'edit');
      const [tool, setTool] = useLocalStorageState('pdf_tool', 'select');
      const [currentColor, setCurrentColor] = useLocalStorageState('pdf_currentColor', '#ef4444');
      const [currentStrokeWidth, setCurrentStrokeWidth] = useLocalStorageState('pdf_currentStrokeWidth', 3);
      const [currentFontSize, setCurrentFontSize] = useLocalStorageState('pdf_currentFontSize', 18);
      const [currentBgColor, setCurrentBgColor] = useLocalStorageState('pdf_currentBgColor', 'transparent');
      const [stampType, setStampType] = useLocalStorageState('pdf_stampType', 'text');
      const [currentStamp, setCurrentStamp] = useLocalStorageState('pdf_currentStamp', '承認済');
      const [currentSteelShape, setCurrentSteelShape] = useLocalStorageState('pdf_currentSteelShape', 'hBeam');
      const [eraserSize, setEraserSize] = useLocalStorageState('pdf_eraserSize', 30);
      const [addMergeBookmarks, setAddMergeBookmarks] = useLocalStorageState('pdf_addMergeBookmarks', true);
      const [splitMode, setSplitMode] = useLocalStorageState('pdf_splitMode', 'all');
      const [convertMode, setConvertMode] = useLocalStorageState('pdf_convertMode', 'img2pdf');
      const [extractMethod, setExtractMethod] = useLocalStorageState('pdf_extractMethod', 'normal');
      const [nUpType, setNUpType] = useLocalStorageState('pdf_nUpType', '2up');
      const [nUpDirection, setNUpDirection] = useLocalStorageState('pdf_nUpDirection', 'ltr');
      const [stampList, setStampList] = useLocalStorageState('pdf_stampList', ['承認済','社外秘','至急','回覧','確認済','重要']);
      const [dateStampTop, setDateStampTop] = useLocalStorageState('pdf_dateStampTop', '');
      const [dateStampBottom, setDateStampBottom] = useLocalStorageState('pdf_dateStampBottom', '');

      const [nUpPreviewUrl, setNUpPreviewUrl] = useState(null);
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const [pdfDoc, setPdfDoc] = useState(null);
      const [pdfBytes, setPdfBytes] = useState(null);
      const [fileName, setFileName] = useState('');
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(0);
      const [scale, setScale] = useState(window.innerWidth < 1024 ? 0.6 : 1.0);
      const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
      const [isExporting, setIsExporting] = useState(false);
      const [toast, setToast] = useState(null);
      const [isLibrariesLoaded, setIsLibrariesLoaded] = useState(false);
      const [annotations, setAnnotations] = useState([]);
      const [redoStack, setRedoStack] = useState([]);
      const [selectedId, setSelectedId] = useState(null);
      const [draggingId, setDraggingId] = useState(null);
      const [resizingId, setResizingId] = useState(null);
      const [dateStampDate, setDateStampDate] = useState(() => {
        const d = new Date();
        return `'${String(d.getFullYear()).slice(2)}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
      });
      const [showSendMenu, setShowSendMenu] = useState(false);
      const [draftRect, setDraftRect] = useState(null);
      const [draftArrow, setDraftArrow] = useState(null);
      const [draftFreehand, setDraftFreehand] = useState(null);
      const [draftPolygon, setDraftPolygon] = useState(null);
      const [mousePos, setMousePos] = useState(null);
      const lastPolygonClickTime = useRef(0);
      const [textInput, setTextInput] = useState(null);
      const isSubmittingText = useRef(false);
      const [mergeFiles, setMergeFiles] = useState([]);
      const [splitFile, setSplitFile] = useState(null);
      const [splitRange, setSplitRange] = useState('');
      const [splitThumbnails, setSplitThumbnails] = useState([]);
      const [mergeThumbnails, setMergeThumbnails] = useState({});
      const [isGeneratingMergeThumbnails, setIsGeneratingMergeThumbnails] = useState(false);
      const [isGeneratingSplitThumbnails, setIsGeneratingSplitThumbnails] = useState(false);
      const [organizeFile, setOrganizeFile] = useState(null);
      const [organizePages, setOrganizePages] = useState([]);
      const [organizeThumbnails, setOrganizeThumbnails] = useState({});
      const [convertFiles, setConvertFiles] = useState([]);
      const [pageNumFile, setPageNumFile] = useState(null);
      const [pageNumFormat, setPageNumFormat] = useState('{n}');
      const [pageNumPosition, setPageNumPosition] = useState('bottom-center');
      const [extractTextFile, setExtractTextFile] = useState(null);
      const [extractedText, setExtractedText] = useState('');
      const [recentFiles, setRecentFiles] = useState([]);
      const [copiedAnnotation, setCopiedAnnotation] = useState(null);
      const [saveDialog, setSaveDialog] = useState(null);
      const [draftEraser, setDraftEraser] = useState(null);
      const [extractProgress, setExtractProgress] = useState('');
      const draggingEndpoint = useRef(null);
      const activePointers = useRef(new Map());
      const isSpacePressed = useRef(false);
      const lastPanPos = useRef(null);
      const pinchStartDistance = useRef(null);
      const pinchStartScale = useRef(null);
      const [nUpFile, setNUpFile] = useState(null);
      const wheelCooldown = useRef(false);

      useEffect(() => {
        const handleResize = () => {
          if (!pdfDoc && window.innerWidth < 1024) setScale(0.6);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [pdfDoc]);

      const addToRecentFiles = useCallback((newFiles) => {
        setRecentFiles(prev => {
          const updated = [...prev];
          newFiles.forEach(file => { if (!updated.some(f => f.name === file.name && f.size === file.size)) updated.unshift(file); });
          return updated.slice(0, 10);
        });
      }, []);

      const canvasRef = useRef(null);
      const wrapperRef = useRef(null);
      const inputRef = useRef(null);
      const dragStartPos = useRef({ x: 0, y: 0 });
      const initialAnnPos = useRef(null);

      useEffect(() => {
        const generateNUpPreview = async () => {
          if (!nUpFile || appMode !== 'nup') { setNUpPreviewUrl(null); return; }
          try {
            const bytes = await nUpFile.arrayBuffer();
            const srcPdf = await window.PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true });
            const previewPdf = await window.PDFLib.PDFDocument.create();
            const srcPages = srcPdf.getPages();
      const pdfjsDoc = await window.pdfjsLib.getDocument({ data: bytes, cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true }).promise;
            const refPage = srcPages[0];
            const { width: sW, height: sH } = refPage.getSize();

            const is2Up = nUpType === '2up';
            const isSrcLandscape = sW > sH; 

            let cols, rows;
            if (is2Up) {
              cols = isSrcLandscape ? 1 : 2;
              rows = isSrcLandscape ? 2 : 1;
            } else {
              cols = 2; rows = 2;
            }

            const outW = sW;
            const outH = sH;
            const outPage = previewPdf.addPage([outW, outH]);
            const cellW = outW / cols;
            const cellH = outH / rows;

            for (let j = 0; j < cols * rows; j++) {
              if (j >= srcPages.length) break;
              const p = srcPages[j];
              
      
      const { width: pW, height: pH } = p.getSize();
      const scale = Math.min(cellW / pW, cellH / pH);
      let col = j % cols;
      let row = Math.floor(j / cols);
      if (nUpDirection === 'rtl' && cols > 1) col = cols - 1 - col;
      const x = col * cellW + (cellW - pW * scale) / 2;
      const y = outH - (row + 1) * cellH + (cellH - pH * scale) / 2;
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
      drawAction(outPage, { x, y, xScale: scale, yScale: scale });
            }

            const pdfBytes = await previewPdf.save({ useObjectStreams: true });
            const loadingTask = window.pdfjsLib.getDocument({ data: pdfBytes, cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true });
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1.0 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width; canvas.height = viewport.height;
            await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
            setNUpPreviewUrl(canvas.toDataURL());
          } catch (e) { console.error(e); }
        };
        generateNUpPreview();
      }, [nUpFile, nUpType, nUpDirection, appMode]);

      useEffect(() => {
        const checkLibs = setInterval(() => {
          if (window.pdfjsLib && window.PDFLib && window.JSZip && window.Tesseract) { setIsLibrariesLoaded(true); clearInterval(checkLibs); }
        }, 100);
        return () => clearInterval(checkLibs);
      }, []);

      useEffect(() => {
        const container = wrapperRef.current?.parentElement;
        if (!container || appMode !== 'edit') return;

        const handleWheel = (e) => {
          if (e.ctrlKey || e.metaKey || isSpacePressed.current) return;

          const { scrollTop, scrollHeight, clientHeight } = container;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
          const isAtTop = scrollTop <= 5;

          if (e.deltaY > 0 && isAtBottom && currentPage < totalPages) {
            e.preventDefault(); 
            if (!wheelCooldown.current) {
              wheelCooldown.current = true;
              setCurrentPage(p => p + 1);
              setTimeout(() => { if (container) container.scrollTop = 0; }, 50);
              setTimeout(() => { wheelCooldown.current = false; }, 600);
            }
          } 
          else if (e.deltaY < 0 && isAtTop && currentPage > 1) {
            e.preventDefault();
            if (!wheelCooldown.current) {
              wheelCooldown.current = true;
              setCurrentPage(p => p - 1);
              setTimeout(() => { if (container) container.scrollTop = 0; }, 50);
              setTimeout(() => { wheelCooldown.current = false; }, 600);
            }
          }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
      }, [currentPage, totalPages, appMode]);

      useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT' || e.target.isContentEditable) return;
          
          if (e.code === 'Space' || e.key === ' ') {
            e.preventDefault(); 
            if (!isSpacePressed.current) {
              isSpacePressed.current = true;
              if (wrapperRef.current) wrapperRef.current.style.cursor = 'grab';
            }
            return;
          }

          if (e.key === 'Enter' && draftPolygon) {
            e.preventDefault();
            if (draftPolygon.length > 2) {
              setAnnotations(prev => [...prev, { id: Date.now().toString(), type: tool, page: currentPage, points: draftPolygon, color: currentColor, strokeWidth: currentStrokeWidth }]);
              saveState();
            }
            setDraftPolygon(null); setMousePos(null);
          }
          if (e.key === 'Escape' && draftPolygon) {
            e.preventDefault();
            setDraftPolygon(null); setMousePos(null);
          }

          if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) { e.preventDefault(); handleDeleteSelected(); }
          if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo(); }
          if ((e.ctrlKey || e.metaKey) && ((e.key === 'z' && e.shiftKey) || e.key === 'y')) { e.preventDefault(); handleRedo(); }
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c' && selectedId) {
            e.preventDefault();
            const targetAnn = annotations.find(a => a.id === selectedId);
            if (targetAnn) { setCopiedAnnotation(targetAnn); showToast('コピーしました', 'success'); }
          }
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v' && copiedAnnotation) {
            e.preventDefault();
            const newId = Date.now().toString(); const offset = 20; 
            let pastedAnn = { ...copiedAnnotation, id: newId, page: currentPage };
            if (['line', 'arrow'].includes(pastedAnn.type)) { pastedAnn.x1 += offset; pastedAnn.y1 += offset; pastedAnn.x2 += offset; pastedAnn.y2 += offset; }
            else if (['freehand', 'mosaic', 'polygon', 'solidPolygon'].includes(pastedAnn.type) && pastedAnn.points) { pastedAnn.points = pastedAnn.points.map(p => ({ x: p.x + offset, y: p.y + offset })); }
            else { pastedAnn.x += offset; pastedAnn.y += offset; }
            setAnnotations(prev => [...prev, pastedAnn]); setSelectedId(newId); setTool('select'); saveState(); showToast('貼り付けました', 'success');
          }
        };

        const handleKeyUp = (e) => {
          if (e.code === 'Space' || e.key === ' ') {
            e.preventDefault();
            isSpacePressed.current = false;
            lastPanPos.current = null;
            if (wrapperRef.current) wrapperRef.current.style.cursor = tool === 'select' ? 'default' : tool === 'text' ? 'text' : tool === 'eraser' ? 'cell' : 'crosshair';
          }
        };

        const handleBlur = () => {
          isSpacePressed.current = false;
          lastPanPos.current = null;
          if (wrapperRef.current) wrapperRef.current.style.cursor = tool === 'select' ? 'default' : tool === 'text' ? 'text' : tool === 'eraser' ? 'cell' : 'crosshair';
        };

        window.addEventListener('keydown', handleKeyDown, { capture: true });
        window.addEventListener('keyup', handleKeyUp, { capture: true });
        window.addEventListener('blur', handleBlur);
        return () => {
          window.removeEventListener('keydown', handleKeyDown, { capture: true });
          window.removeEventListener('keyup', handleKeyUp, { capture: true });
          window.removeEventListener('blur', handleBlur);
        };
      }, [selectedId, annotations, copiedAnnotation, currentPage, tool, draftPolygon, currentColor, currentStrokeWidth]);

      useEffect(() => {
        const handlePaste = async (e) => {
          if (appMode !== 'edit') return;
          const items = e.clipboardData?.items;
          if (!items) return;
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              const file = items[i].getAsFile();
              if (!pdfDoc) { await loadImageAsPdf(file, 'pasted_image.pdf'); }
              else {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const img = new Image();
                  img.onload = () => {
                    const ratio = img.height / img.width; const width = 200; const newId = Date.now().toString();
                    setAnnotations(prev => [...prev, { id: newId, type: 'image', page: currentPage, x: 50, y: 50, width, height: width * ratio, dataUrl: event.target.result }]);
                    saveState(); setTool('select'); setSelectedId(newId);
                  };
                  img.src = event.target.result;
                };
                reader.readAsDataURL(file);
              }
              break;
            }
          }
        };
        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
      }, [appMode, pdfDoc, currentPage]);

      const showToast = (msg, type = 'info') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

      const loadPdf = async (fileOrBytes, name) => {
        try {
          let arrayBuffer;
          if (fileOrBytes instanceof File) { arrayBuffer = await fileOrBytes.arrayBuffer(); }
          else if (fileOrBytes instanceof ArrayBuffer) { arrayBuffer = fileOrBytes; }
          else { arrayBuffer = fileOrBytes.buffer ? fileOrBytes.buffer.slice(fileOrBytes.byteOffset, fileOrBytes.byteOffset + fileOrBytes.byteLength) : fileOrBytes; }
          const bytesCopy = new Uint8Array(arrayBuffer.slice(0));

          const checkSize = Math.min(bytesCopy.length, 100000);
          const headerString = new TextDecoder('utf-8', { fatal: false }).decode(bytesCopy.slice(0, checkSize));
          const tailString = new TextDecoder('utf-8', { fatal: false }).decode(bytesCopy.slice(-checkSize));
          
          const isSigned = headerString.includes('/ByteRange') || tailString.includes('/ByteRange') || headerString.includes('/SigFlags') || tailString.includes('/SigFlags');
          if (isSigned) {
            alert('【エラー】\nこのPDFにはデジタル署名が含まれています。\n本ツールで編集すると署名データが破損するため、読み込みをブロックしました。');
            showToast('署名済みPDFのため読み込みをキャンセルしました', 'error'); return;
          }

          const loadingTask = window.pdfjsLib.getDocument({ data: bytesCopy.slice(0), cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true });
          const pdf = await loadingTask.promise;
          setPdfDoc(pdf); setPdfBytes(bytesCopy); setFileName(name || 'document.pdf');
          setTotalPages(pdf.numPages); setCurrentPage(1); setAnnotations([]); setRedoStack([]); setSelectedId(null);
          showToast('PDFを読み込みました');
        } catch (error) { console.error(error); showToast('PDFの読み込みに失敗しました', 'error'); }
      };

      const loadImageAsPdf = async (fileOrBlob, name = 'image.pdf') => {
        try {
          const arrayBuffer = await fileOrBlob.arrayBuffer();
          const pdfDocLib = await window.PDFLib.PDFDocument.create();
          let image;
          if (fileOrBlob.type === 'image/png') { image = await pdfDocLib.embedPng(arrayBuffer); }
          else if (fileOrBlob.type === 'image/jpeg' || fileOrBlob.type === 'image/jpg') { image = await pdfDocLib.embedJpg(arrayBuffer); }
          else { showToast('PNGまたはJPEG画像のみ対応しています', 'error'); return; }
          const page = pdfDocLib.addPage([image.width, image.height]);
          page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
          const bytes = await pdfDocLib.save({ useObjectStreams: true });
          await loadPdf(bytes, name);
        } catch (error) { console.error(error); showToast('画像の読み込みに失敗しました', 'error'); }
      };

      const handleFileUpload = (e) => {
        const file = e.target.files[0]; if (!file) return;
        addToRecentFiles([file]);
        if (file.type.startsWith('image/')) loadImageAsPdf(file, file.name); else loadPdf(file, file.name);
      };

      const renderPage = async () => {
        if (appMode !== 'edit') return;
        if (!pdfDoc || !canvasRef.current) return;
        try {
          const page = await pdfDoc.getPage(currentPage);
          const viewport = page.getViewport({ scale: 1.0 });
          setPageDimensions({ width: viewport.width, height: viewport.height });
          const canvas = canvasRef.current;
          const renderViewport = page.getViewport({ scale });
          canvas.width = renderViewport.width; canvas.height = renderViewport.height;
          const context = canvas.getContext('2d');
          await page.render({ canvasContext: context, viewport: renderViewport, annotationMode: 2 }).promise;
        } catch (error) { console.error("Render error:", error); }
      };

      useEffect(() => { renderPage(); }, [pdfDoc, currentPage, scale, appMode]);

      const getPointerPos = (e) => {
        if (!wrapperRef.current) return { x: 0, y: 0 };
        const rect = wrapperRef.current.getBoundingClientRect();
        return { x: (e.clientX - rect.left) / scale, y: (e.clientY - rect.top) / scale };
      };
      const saveState = () => { setRedoStack([]); };

      const eraseAtPoint = useCallback((pos) => {
        const r = eraserSize / 2;
        setAnnotations(prev => prev.filter(ann => {
          if (ann.page !== currentPage) return true;
          if (ann.type === 'freehand' && ann.points) { return !ann.points.some(p => Math.hypot(p.x - pos.x, p.y - pos.y) < r); }
          if (ann.type === 'line' || ann.type === 'arrow') {
            const dist = pointToSegmentDist(pos, { x: ann.x1, y: ann.y1 }, { x: ann.x2, y: ann.y2 });
            return dist >= r;
          }
          if (['rect','solidRect','circle','solidCircle','highlight','image','text','polygon','solidPolygon'].includes(ann.type)) {
            let ax = ann.x, ay = ann.y, aw = ann.width, ah = ann.height;
            if (ann.type === 'text') {
              const lines = ann.text.split('\n');
              const maxLen = Math.max(...lines.map(l => l.length), 1);
              const fs = ann.fontSize || 18;
              aw = maxLen * fs * 1.2; // Estimate width
              ah = lines.length * fs * 1.4; // Estimate height
              ay -= fs * 0.2; // Adjust for rendering offset
            }
            if (['polygon', 'solidPolygon'].includes(ann.type) && ann.points) {
              const xs = ann.points.map(p => p.x); const ys = ann.points.map(p => p.y);
              ax = Math.min(...xs); ay = Math.min(...ys); aw = Math.max(...xs) - ax; ah = Math.max(...ys) - ay;
            }
            return !(pos.x > ax - r && pos.x < ax + aw + r && pos.y > ay - r && pos.y < ay + ah + r);
          }
          return true;
        }));
      }, [eraserSize, currentPage]);

      const pointToSegmentDist = (p, a, b) => {
        const dx = b.x - a.x, dy = b.y - a.y;
        const lenSq = dx * dx + dy * dy;
        if (lenSq === 0) return Math.hypot(p.x - a.x, p.y - a.y);
        let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq;
        t = Math.max(0, Math.min(1, t));
        return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
      };

      const getSnapPoint = (pos, isAltPressed) => {
        if (!isAltPressed) return pos; 
        
        let nearest = null;
        let minDist = 20 / scale; 

        annotations.forEach(ann => {
          if (ann.page !== currentPage) return;
          const pts = [];
          if (['rect', 'solidRect', 'image', 'highlight'].includes(ann.type)) {
            pts.push(
              {x: ann.x, y: ann.y}, {x: ann.x + ann.width, y: ann.y},
              {x: ann.x, y: ann.y + ann.height}, {x: ann.x + ann.width, y: ann.y + ann.height}
            );
          } 
          else if (['line', 'arrow'].includes(ann.type)) {
            pts.push({x: ann.x1, y: ann.y1}, {x: ann.x2, y: ann.y2});
          }
          else if (['polygon', 'solidPolygon'].includes(ann.type) && ann.points) {
            ann.points.forEach(p => pts.push({x: p.x, y: p.y}));
          }
          
          pts.forEach(p => {
            const d = Math.hypot(p.x - pos.x, p.y - pos.y);
            if (d < minDist) { minDist = d; nearest = { x: p.x, y: p.y }; }
          });
        });
        return nearest || pos;
      };

      const handlePointerDown = (e) => {
        e.target.setPointerCapture(e.pointerId);
        activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        const isMiddleClick = e.button === 1;
        if (isMiddleClick) e.preventDefault(); 

        if (isSpacePressed.current || isMiddleClick) {
          lastPanPos.current = { x: e.clientX, y: e.clientY };
          if (wrapperRef.current) wrapperRef.current.style.cursor = 'grabbing';
          return; 
        }

        if (e.button !== 0) return; 

        if (activePointers.current.size === 2) {
          const pts = Array.from(activePointers.current.values());
          pinchStartDistance.current = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
          pinchStartScale.current = scale;
          setDraftRect(null); setDraftArrow(null); setDraftFreehand(null); setDraftEraser(null); setDraftPolygon(null); setMousePos(null);
          setDraggingId(null); setResizingId(null); draggingEndpoint.current = null;
          return;
        }
        if (activePointers.current.size > 2) return;

        if (['polygon', 'solidPolygon'].includes(tool)) {
          let pos = getPointerPos(e);
          
          // ▼ Shiftキーで直前の頂点から45度単位に角度を固定
          if (e.shiftKey && draftPolygon && draftPolygon.length > 0) {
            const lastPos = draftPolygon[draftPolygon.length - 1];
            const dx = pos.x - lastPos.x, dy = pos.y - lastPos.y;
            const dist = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx);
            const snapRad = Math.PI / 4; // 45度 = PI/4
            const snappedAngle = Math.round(angle / snapRad) * snapRad;
            pos = { 
              x: lastPos.x + Math.cos(snappedAngle) * dist, 
              y: lastPos.y + Math.sin(snappedAngle) * dist 
            };
          }
          // ▼ Altキーで他の図形にスナップ（Shiftより優先されます）
          pos = getSnapPoint(pos, e.altKey);

          const now = Date.now();
          if (now - lastPolygonClickTime.current < 300 && draftPolygon && draftPolygon.length > 1) {
            if (draftPolygon.length > 2) {
              setAnnotations([...annotations, { id: Date.now().toString(), type: tool, page: currentPage, points: draftPolygon, color: currentColor, strokeWidth: currentStrokeWidth }]);
              saveState();
            }
            setDraftPolygon(null); setMousePos(null); return;
          }
          lastPolygonClickTime.current = now;

          if (!draftPolygon) {
            setDraftPolygon([pos]); setMousePos(pos);
          } else {
            const startPos = draftPolygon[0];
            const dist = Math.hypot(startPos.x - pos.x, startPos.y - pos.y);
            if (dist < 15 / scale) {
              if (draftPolygon.length > 2) {
                setAnnotations([...annotations, { id: Date.now().toString(), type: tool, page: currentPage, points: draftPolygon, color: currentColor, strokeWidth: currentStrokeWidth }]);
                saveState();
              }
              setDraftPolygon(null); setMousePos(null);
            } else {
              setDraftPolygon([...draftPolygon, pos]);
            }
          }
          return;
        }

        if (tool === 'select') { setSelectedId(null); return; }
        if (textInput) { handleTextSubmit(); return; }
        
        let pos = getPointerPos(e);
        pos = getSnapPoint(pos, e.altKey); 
        dragStartPos.current = pos;
        
        if (tool === 'eraser') { setDraftEraser(pos); eraseAtPoint(pos); return; }
        if (['rect','solidRect','circle','solidCircle','highlight','redaction','snapshot'].includes(tool)) { setDraftRect({ x: pos.x, y: pos.y, width: 0, height: 0 }); }
        else if (['line','arrow'].includes(tool)) { setDraftArrow({ x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y }); }
        else if (['freehand','mosaic'].includes(tool)) { setDraftFreehand([pos]); }
        else if (tool === 'text') { setTextInput({ x: pos.x, y: pos.y, text: '' }); setTimeout(() => inputRef.current?.focus(), 50); }
        else if (tool === 'stamp') {
          let stampDataUrl;
          if (stampType === 'text') { stampDataUrl = generateStampImage(currentStamp, currentColor); }
          else if (stampType === 'date') { stampDataUrl = generateDateStampImage(dateStampTop, dateStampBottom, dateStampDate, currentColor); }
          else if (stampType === 'steel') { stampDataUrl = generateSteelShapeStampImage(currentSteelShape, currentColor); }
          else if (stampType === 'mark') { stampDataUrl = generateMarkStampImage(currentMark, currentColor); }

          const img = new Image();
          img.onload = () => {
            const initScale = (stampType === 'date' || stampType === 'steel' || stampType === 'mark') ? 0.4 : 0.5;
            const initWidth = img.width * initScale; 
            const initHeight = img.height * initScale; 
            const newId = Date.now().toString();
            setAnnotations(prev => [...prev, { id: newId, type: 'image', page: currentPage, x: pos.x - initWidth / 2, y: pos.y - initHeight / 2, width: initWidth, height: initHeight, dataUrl: stampDataUrl }]);
            saveState(); setTool('select'); setSelectedId(newId);
          };
          img.src = stampDataUrl;
        }
      };

      const handlePointerMove = (e) => {
        if (activePointers.current.has(e.pointerId)) {
          activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        }

        const isMiddleClickDragging = (e.buttons & 4) !== 0;

        if ((isSpacePressed.current || isMiddleClickDragging) && lastPanPos.current) {
          const dx = lastPanPos.current.x - e.clientX;
          const dy = lastPanPos.current.y - e.clientY;
          if (wrapperRef.current && wrapperRef.current.parentElement) {
            wrapperRef.current.parentElement.scrollLeft += dx;
            wrapperRef.current.parentElement.scrollTop += dy;
          }
          lastPanPos.current = { x: e.clientX, y: e.clientY };
          return;
        }

        if (['polygon', 'solidPolygon'].includes(tool) && draftPolygon) {
          let pos = getPointerPos(e);
          
          // ▼ Shiftキーで直前の頂点から45度単位に角度を固定（プレビュー線用）
          if (e.shiftKey && draftPolygon.length > 0) {
            const lastPos = draftPolygon[draftPolygon.length - 1];
            const dx = pos.x - lastPos.x, dy = pos.y - lastPos.y;
            const dist = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx);
            const snapRad = Math.PI / 4;
            const snappedAngle = Math.round(angle / snapRad) * snapRad;
            pos = { 
              x: lastPos.x + Math.cos(snappedAngle) * dist, 
              y: lastPos.y + Math.sin(snappedAngle) * dist 
            };
          }
          // ▼ Altキーで他の図形にスナップ
          pos = getSnapPoint(pos, e.altKey);

          setMousePos(pos);
          return;
        }

        if (e.buttons !== 0 && (e.buttons & 1) === 0) return; 

        if (activePointers.current.size === 2 && pinchStartDistance.current) {
          const pts = Array.from(activePointers.current.values());
          const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
          const newScale = pinchStartScale.current * (dist / pinchStartDistance.current);
          setScale(Math.min(3.0, Math.max(0.2, newScale)));
          return;
        }
        if (activePointers.current.size > 1) return;

        let pos = getPointerPos(e);
        pos = getSnapPoint(pos, e.altKey);

        if (tool === 'eraser') { setDraftEraser(pos); if ((e.buttons & 1) !== 0) eraseAtPoint(pos); return; }
        if (draggingEndpoint.current) {
          const { annId, endpoint } = draggingEndpoint.current; let x2 = pos.x, y2 = pos.y;
          const ann = annotations.find(a => a.id === annId);
          if (ann && e.shiftKey) { 
            const fixedX = endpoint === 'start' ? ann.x2 : ann.x1; const fixedY = endpoint === 'start' ? ann.y2 : ann.y1;
            const dx = pos.x - fixedX, dy = pos.y - fixedY; const length = Math.sqrt(dx * dx + dy * dy); const angle = Math.atan2(dy, dx);
            const snapRad = (Math.PI / 180) * 45; const snappedAngle = Math.round(angle / snapRad) * snapRad;
            x2 = fixedX + length * Math.cos(snappedAngle); y2 = fixedY + length * Math.sin(snappedAngle);
          }
          setAnnotations(prev => prev.map(a => {
            if (a.id !== annId) return a;
            if (endpoint === 'start') return { ...a, x1: x2, y1: y2 };
            return { ...a, x2: x2, y2: y2 };
          }));
          return;
        }
        if (draggingId) {
          const dx = pos.x - dragStartPos.current.x; const dy = pos.y - dragStartPos.current.y;
          setAnnotations(annotations.map(a => {
            if (a.id !== draggingId) return a;
            if (['line','arrow'].includes(a.type)) return { ...a, x1: initialAnnPos.current.x1+dx, y1: initialAnnPos.current.y1+dy, x2: initialAnnPos.current.x2+dx, y2: initialAnnPos.current.y2+dy };
            else if (['freehand', 'polygon', 'solidPolygon'].includes(a.type)) return { ...a, points: initialAnnPos.current.points.map(p => ({ x: p.x+dx, y: p.y+dy })) };
            else return { ...a, x: initialAnnPos.current.x+dx, y: initialAnnPos.current.y+dy };
          }));
          return;
        }
        if (resizingId) {
          const ann = annotations.find(a => a.id === resizingId);
          if (ann && ['image','rect','solidRect','circle','solidCircle'].includes(ann.type)) {
            const initAnn = initialAnnPos.current; let newWidth = Math.max(10, pos.x - ann.x); let newHeight = Math.max(10, pos.y - ann.y);
            if (ann.type === 'image' || e.shiftKey) { const ratio = initAnn.width / initAnn.height; newHeight = newWidth / ratio; }
            setAnnotations(annotations.map(a => a.id === resizingId ? { ...a, width: newWidth, height: newHeight } : a));
          }
          return;
        }
        if (draftRect) {
          let newW = Math.abs(pos.x - dragStartPos.current.x); let newH = Math.abs(pos.y - dragStartPos.current.y);
          if (e.shiftKey) { const size = Math.max(newW, newH); newW = size; newH = size; }
          setDraftRect({ x: pos.x < dragStartPos.current.x ? dragStartPos.current.x - newW : dragStartPos.current.x, y: pos.y < dragStartPos.current.y ? dragStartPos.current.y - newH : dragStartPos.current.y, width: newW, height: newH });
        } else if (draftArrow) {
          let x2 = pos.x, y2 = pos.y;
          if (e.shiftKey) { 
            const dx = pos.x - draftArrow.x1, dy = pos.y - draftArrow.y1; const length = Math.sqrt(dx * dx + dy * dy); const angle = Math.atan2(dy, dx);
            const snapRad = (Math.PI / 180) * 45; const snappedAngle = Math.round(angle / snapRad) * snapRad;
            x2 = draftArrow.x1 + length * Math.cos(snappedAngle); y2 = draftArrow.y1 + length * Math.sin(snappedAngle);
          }
          setDraftArrow({ ...draftArrow, x2, y2 });
        } else if (draftFreehand) { setDraftFreehand([...draftFreehand, pos]); }
      };

      const handlePointerUp = async (e) => {
        if (e && e.pointerId) {
          activePointers.current.delete(e.pointerId);
        } else {
          activePointers.current.clear();
        }

        const wasMiddleClick = e && e.button === 1;
        if (isSpacePressed.current || wasMiddleClick) {
          if (!isSpacePressed.current) {
            lastPanPos.current = null;
            if (wrapperRef.current) wrapperRef.current.style.cursor = tool === 'select' ? 'default' : tool === 'text' ? 'text' : tool === 'eraser' ? 'cell' : 'crosshair';
          }
          if (wasMiddleClick) return; 
        }

        if (e && typeof e.button === 'number' && e.button !== 0 && e.button !== -1) {
           return; 
        }

        if (activePointers.current.size < 2) {
          pinchStartDistance.current = null;
          pinchStartScale.current = null;
        }
        if (activePointers.current.size > 0) return;

        if (['polygon', 'solidPolygon'].includes(tool)) return;

        if (draggingEndpoint.current) { draggingEndpoint.current = null; saveState(); return; }
        if (tool === 'eraser') { setDraftEraser(null); saveState(); return; }
        if (draggingId || resizingId) { setDraggingId(null); setResizingId(null); saveState(); return; }

        if (draftRect && draftRect.width > 5 && draftRect.height > 5) {
          if (tool === 'snapshot') {
            showToast('コピー中...', 'info');
            try {
              const exportScale = 3.0;
              const page = await pdfDoc.getPage(currentPage);
              const viewport = page.getViewport({ scale: exportScale });
              const offscreenCanvas = document.createElement('canvas');
              offscreenCanvas.width = viewport.width;
              offscreenCanvas.height = viewport.height;
              const offscreenCtx = offscreenCanvas.getContext('2d');
              offscreenCtx.fillStyle = '#ffffff';
              offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
              await page.render({ canvasContext: offscreenCtx, viewport: viewport }).promise;

              const snapCanvas = document.createElement('canvas');
              const sx = draftRect.x * exportScale;
              const sy = draftRect.y * exportScale;
              const sw = draftRect.width * exportScale;
              const sh = draftRect.height * exportScale;
              
              snapCanvas.width = sw;
              snapCanvas.height = sh;

              const snapCtx = snapCanvas.getContext('2d');
              snapCtx.drawImage(offscreenCanvas, sx, sy, sw, sh, 0, 0, sw, sh);

              const blob = await new Promise(resolve => snapCanvas.toBlob(resolve, 'image/png'));
              const data = [new window.ClipboardItem({ [blob.type]: blob })];
              await navigator.clipboard.write(data);
              
              showToast('切り抜いてコピーしました！', 'success');
            } catch (err) {
              console.error(err);
              showToast('コピーに失敗しました。範囲を少し変えて試してください。', 'error');
            }
          } else {
            const isRedaction = tool === 'redaction';
            setAnnotations([...annotations, { ...draftRect, id: Date.now().toString(), type: isRedaction ? 'solidRect' : tool, isRedaction: isRedaction, page: currentPage, color: isRedaction ? '#000000' : currentColor, strokeWidth: currentStrokeWidth }]);
            saveState();
          }
        }
        
        if (draftArrow && (Math.abs(draftArrow.x1-draftArrow.x2)>5 || Math.abs(draftArrow.y1-draftArrow.y2)>5)) {
          setAnnotations([...annotations, { ...draftArrow, id: Date.now().toString(), type: tool, page: currentPage, color: currentColor, strokeWidth: currentStrokeWidth }]);
          saveState();
        }
        if (draftFreehand && draftFreehand.length > 1) {
          if (tool === 'mosaic') {
            const canvas = canvasRef.current;
            if (canvas) {
              const points = draftFreehand; const strokeW = currentStrokeWidth; const scaleW = scale;
              const xs = points.map(p => p.x*scaleW); const ys = points.map(p => p.y*scaleW);
              const minX = Math.max(0, Math.min(...xs)-strokeW*scaleW/2); const minY = Math.max(0, Math.min(...ys)-strokeW*scaleW/2);
              const maxX = Math.min(canvas.width, Math.max(...xs)+strokeW*scaleW/2); const maxY = Math.min(canvas.height, Math.max(...ys)+strokeW*scaleW/2);
              const bw = maxX - minX; const bh = maxY - minY;
              if (bw > 5 && bh > 5) {
                const tempCanvas = document.createElement('canvas'); tempCanvas.width = bw; tempCanvas.height = bh;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.beginPath(); tempCtx.lineCap='round'; tempCtx.lineJoin='round'; tempCtx.lineWidth = strokeW*scaleW; tempCtx.strokeStyle = 'black';
                tempCtx.moveTo(points[0].x*scaleW-minX, points[0].y*scaleW-minY);
                for (let i = 1; i < points.length; i++) tempCtx.lineTo(points[i].x*scaleW-minX, points[i].y*scaleW-minY);
                tempCtx.stroke();
                const srcCanvas = document.createElement('canvas'); srcCanvas.width = bw; srcCanvas.height = bh;
                const srcCtx = srcCanvas.getContext('2d'); srcCtx.drawImage(canvas, minX, minY, bw, bh, 0, 0, bw, bh);
                const mosaicSize = Math.max(4, strokeW/2); const mWidth = Math.max(1, Math.floor(bw/mosaicSize)); const mHeight = Math.max(1, Math.floor(bh/mosaicSize));
                const pixelCanvas = document.createElement('canvas'); pixelCanvas.width = mWidth; pixelCanvas.height = mHeight;
                const pixelCtx = pixelCanvas.getContext('2d'); pixelCtx.drawImage(srcCanvas, 0, 0, mWidth, mHeight);
                const mosaicCanvas = document.createElement('canvas'); mosaicCanvas.width = bw; mosaicCanvas.height = bh;
                const mosaicCtx = mosaicCanvas.getContext('2d'); mosaicCtx.imageSmoothingEnabled = false; mosaicCtx.drawImage(pixelCanvas, 0, 0, mWidth, mHeight, 0, 0, bw, bh);
                tempCtx.globalCompositeOperation = 'source-in'; tempCtx.drawImage(mosaicCanvas, 0, 0);
                setAnnotations([...annotations, { id: Date.now().toString(), type: 'image', page: currentPage, x: minX/scaleW, y: minY/scaleW, width: bw/scaleW, height: bh/scaleW, dataUrl: tempCanvas.toDataURL('image/png') }]);
                saveState();
              }
            }
          } else {
            setAnnotations([...annotations, { id: Date.now().toString(), type: 'freehand', page: currentPage, points: draftFreehand, color: currentColor, strokeWidth: currentStrokeWidth }]);
            saveState();
          }
        }
        setDraftRect(null); setDraftArrow(null); setDraftFreehand(null);
      };

      const handleCopyFullPage = async () => {
        if (!pdfBytes) return;
        showToast('高画質でページ全体をコピー中...', 'info');
        
        try {
          const makeBlob = async () => {
            const pdfDocLib = await window.PDFLib.PDFDocument.load(new Uint8Array(pdfBytes), { ignoreEncryption: true });
            pdfDocLib.registerFontkit(window.fontkit);
            await applyAnnotationsToDoc(pdfDocLib, currentPage);
            const savedPdfBytes = await pdfDocLib.save({ useObjectStreams: true });

            const pdfForRender = await window.pdfjsLib.getDocument({ data: savedPdfBytes, cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true }).promise;
            const renderPage = await pdfForRender.getPage(currentPage);
            const exportScale = 3.0; 
            const viewport = renderPage.getViewport({ scale: exportScale });
            
            const snapCanvas = document.createElement('canvas');
            snapCanvas.width = viewport.width;
            snapCanvas.height = viewport.height;
            const ctx = snapCanvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, viewport.width, viewport.height);
            
            await renderPage.render({ canvasContext: ctx, viewport }).promise;
            return new Promise(resolve => snapCanvas.toBlob(resolve, 'image/png'));
          };

          await navigator.clipboard.write([
            new window.ClipboardItem({ 'image/png': makeBlob() })
          ]);
          showToast('高画質でページ全体をコピーしました！', 'success');
        } catch (err) {
          console.error(err);
          showToast('コピーの生成に失敗しました', 'error');
        }
      };

      const handleAnnotationPointerDown = (e, ann) => {
        if (e.button !== 0) return; 
        if (tool !== 'select') return;
        e.stopPropagation(); setSelectedId(ann.id); setDraggingId(ann.id);
        dragStartPos.current = getPointerPos(e); initialAnnPos.current = JSON.parse(JSON.stringify(ann));
        if (ann.color && !ann.color.startsWith('rgba')) setCurrentColor(ann.color);
        if (ann.strokeWidth) setCurrentStrokeWidth(ann.strokeWidth);
        if (ann.fontSize) setCurrentFontSize(ann.fontSize);
        if (ann.backgroundColor) setCurrentBgColor(ann.backgroundColor);
      };
      
      const handleAnnotationDoubleClick = (e, ann) => { if (tool !== 'select' || ann.type !== 'text') return; e.stopPropagation(); handleEditSelectedText(ann); };
      
      const handleResizePointerDown = (e, ann) => { 
        if (e.button !== 0) return; 
        e.stopPropagation(); setResizingId(ann.id); initialAnnPos.current = JSON.parse(JSON.stringify(ann)); 
      };
      
      const handleEndpointPointerDown = (e, ann, endpoint) => { 
        if (e.button !== 0) return; 
        e.stopPropagation(); setSelectedId(ann.id); draggingEndpoint.current = { annId: ann.id, endpoint }; 
      };
      
      const handleSnapAngle = (ann, angleDeg) => {
        if (!ann) return;
        const rad = (angleDeg * Math.PI) / 180; const dx = ann.x2 - ann.x1, dy = ann.y2 - ann.y1; const length = Math.sqrt(dx * dx + dy * dy);
        setAnnotations(prev => prev.map(a => { if (a.id !== ann.id) return a; return { ...a, x2: a.x1 + length * Math.cos(rad), y2: a.y1 + length * Math.sin(rad) }; }));
        saveState();
      };

      const handleTextSubmit = () => {
        if (isSubmittingText.current) return;
        isSubmittingText.current = true;
        if (textInput && textInput.text.trim()) {
          if (textInput.id) {
            setAnnotations(prev => prev.map(a => a.id === textInput.id ? { ...a, text: textInput.text, color: currentColor, fontSize: currentFontSize, backgroundColor: currentBgColor } : a));
          } else {
            setAnnotations(prev => [...prev, { id: Date.now().toString(), type: 'text', page: currentPage, x: textInput.x, y: textInput.y, text: textInput.text, color: currentColor, fontSize: currentFontSize, backgroundColor: currentBgColor }]);
          }
          saveState();
        }
        setTextInput(null); setTimeout(() => { isSubmittingText.current = false; }, 0);
      };

      const handleEditSelectedText = (ann) => {
        setTextInput({ id: ann.id, x: ann.x, y: ann.y, text: ann.text }); setCurrentColor(ann.color || '#000000'); setCurrentFontSize(ann.fontSize || 18); setCurrentBgColor(ann.backgroundColor || 'transparent');
      };
      const handleDeleteSelected = () => { if (selectedId) { setAnnotations(annotations.filter(a => a.id !== selectedId)); setSelectedId(null); saveState(); } };
      const handleAddImageAnnotation = (e) => {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const ratio = img.height / img.width; const width = 150;
            setAnnotations([...annotations, { id: Date.now().toString(), type: 'image', page: currentPage, x: 50, y: 50, width, height: width*ratio, dataUrl: event.target.result }]);
            saveState(); setTool('select');
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      };
      const handleColorChange = (c) => { setCurrentColor(c); if (selectedId) { setAnnotations(annotations.map(a => a.id === selectedId ? { ...a, color: c } : a)); saveState(); } };
      const handleBgColorChange = (c) => { setCurrentBgColor(c); if (selectedId) { setAnnotations(annotations.map(a => a.id === selectedId ? { ...a, backgroundColor: c } : a)); saveState(); } };
      const handleStrokeWidthChange = (e) => { const w = parseInt(e.target.value); setCurrentStrokeWidth(w); if (selectedId) { setAnnotations(annotations.map(a => a.id === selectedId ? { ...a, strokeWidth: w } : a)); saveState(); } };
      const handleFontSizeChange = (e) => { const s = parseInt(e.target.value); setCurrentFontSize(s); if (selectedId) { setAnnotations(annotations.map(a => a.id === selectedId ? { ...a, fontSize: s } : a)); saveState(); } };
      const handleUndo = () => { if (annotations.length > 0) { setRedoStack([...redoStack, annotations[annotations.length-1]]); setAnnotations(annotations.slice(0,-1)); setSelectedId(null); } };
      const handleRedo = () => { if (redoStack.length > 0) { setAnnotations([...annotations, redoStack[redoStack.length-1]]); setRedoStack(redoStack.slice(0,-1)); } };

      const generateOrganizeThumbnails = async (file) => {
        try {
          const arrayBuffer = await file.arrayBuffer(); const pdf = await window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer), cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true }).promise; const thumbs = {};
          for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1); const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas'); const context = canvas.getContext('2d');
            canvas.width = viewport.width; canvas.height = viewport.height;
            await page.render({ canvasContext: context, viewport }).promise; thumbs[i] = canvas.toDataURL('image/jpeg', 0.95);
          }
          setOrganizeThumbnails(thumbs);
        } catch (e) { console.error('Thumbnail generation error:', e); }
      };

      const applyAnnotationsToDoc = async (pdfDocLib, targetPage = null, textExportMode = 'embed') => {
        let customFont = null;
        
        const hasText = annotations.some(a => a.type === 'text');
        if (textExportMode === 'embed' && hasText) {
          const fontUrl = 'https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf';
          const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
          customFont = await pdfDocLib.embedFont(fontBytes);
        }

        const pages = pdfDocLib.getPages();

        for (const ann of annotations) {
          if (targetPage !== null && ann.page !== targetPage) continue;
          const page = pages[ann.page - 1];
          const box = page.getCropBox() || page.getMediaBox();
          
          const rotation = page.getRotation().angle || 0;

          const w = box.width;
          const h = box.height;
          const offsetX = box.x || 0;
          const offsetY = box.y || 0;

          const isRotated = rotation === 90 || rotation === 270;
          const vW = isRotated ? h : w;
          const vH = isRotated ? w : h;

          const mapPoint = (screenX, screenY) => {
            const vx = screenX;
            const vy = vH - screenY; 
            let px, py;
            
            if (rotation === 90) {
              px = w - vy; py = vx;
            } else if (rotation === 180) {
              px = w - vx; py = h - vy;
            } else if (rotation === 270) {
              px = vy; py = h - vx;
            } else {
              px = vx; py = vy;
            }
            
            return { x: px + offsetX, y: py + offsetY };
          };

          const color = hexToRgb(ann.color, window.PDFLib);
          const drawRotation = window.PDFLib.degrees(rotation); 

          if (ann.type === 'rect' || ann.type === 'solidRect' || ann.type === 'highlight' || ann.type === 'image') {
            const p1 = mapPoint(ann.x, ann.y + ann.height);

            if (ann.type === 'rect') {
              page.drawRectangle({ x: p1.x, y: p1.y, width: ann.width, height: ann.height, borderColor: color, borderWidth: ann.strokeWidth, rotate: drawRotation });
            } else if (ann.type === 'solidRect') {
              page.drawRectangle({ x: p1.x, y: p1.y, width: ann.width, height: ann.height, color, rotate: drawRotation });
            } else if (ann.type === 'highlight') {
              page.drawRectangle({ x: p1.x, y: p1.y, width: ann.width, height: ann.height, color, opacity: 0.3, rotate: drawRotation });
            } else if (ann.type === 'image') {
              const imgBytes = await fetch(ann.dataUrl).then(res => res.arrayBuffer());
              const embeddedImage = ann.dataUrl.includes('image/png') ? await pdfDocLib.embedPng(imgBytes) : await pdfDocLib.embedJpg(imgBytes);
              page.drawImage(embeddedImage, { x: p1.x, y: p1.y, width: ann.width, height: ann.height, rotate: drawRotation });
            }
          }
          else if (ann.type === 'circle' || ann.type === 'solidCircle') {
            const center = mapPoint(ann.x + ann.width / 2, ann.y + ann.height / 2);
            if (ann.type === 'circle') {
              page.drawEllipse({ x: center.x, y: center.y, xScale: ann.width / 2, yScale: ann.height / 2, borderColor: color, borderWidth: ann.strokeWidth, rotate: drawRotation });
            } else {
              page.drawEllipse({ x: center.x, y: center.y, xScale: ann.width / 2, yScale: ann.height / 2, color, rotate: drawRotation });
            }
          }
          else if (ann.type === 'line' || ann.type === 'arrow') {
            const start = mapPoint(ann.x1, ann.y1);
            const end = mapPoint(ann.x2, ann.y2);
            page.drawLine({ start, end, color, thickness: ann.strokeWidth });
            
            if (ann.type === 'arrow') {
              const angle = Math.atan2(end.y - start.y, end.x - start.x);
              const headlen = Math.max(10, ann.strokeWidth * 3);
              page.drawLine({ start: end, end: { x: end.x - headlen * Math.cos(angle - Math.PI / 6), y: end.y - headlen * Math.sin(angle - Math.PI / 6) }, color, thickness: ann.strokeWidth });
              page.drawLine({ start: end, end: { x: end.x - headlen * Math.cos(angle + Math.PI / 6), y: end.y - headlen * Math.sin(angle + Math.PI / 6) }, color, thickness: ann.strokeWidth });
            }
          }
          else if (ann.type === 'freehand' && ann.points) {
            for (let i = 0; i < ann.points.length - 1; i++) {
              const p1 = mapPoint(ann.points[i].x, ann.points[i].y);
              const p2 = mapPoint(ann.points[i+1].x, ann.points[i+1].y);
              page.drawLine({ start: p1, end: p2, color, thickness: ann.strokeWidth });
            }
          }
          else if (ann.type === 'polygon' || ann.type === 'solidPolygon') {
            if (ann.points && ann.points.length > 2) {
              const mappedPoints = ann.points.map(p => mapPoint(p.x, p.y));
              const pathStr = mappedPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${-p.y}`).join(' ') + ' Z';
              page.drawSvgPath(pathStr, {
                x: 0, y: 0,
                color: ann.type === 'solidPolygon' ? color : undefined,
                borderColor: color, borderWidth: ann.strokeWidth
              });
            }
          }
          else if (ann.type === 'text') {
            const lines = ann.text.split('\n');
            const fontSize = ann.fontSize || 18;

            if (textExportMode === 'embed') {
              if (ann.backgroundColor && ann.backgroundColor !== 'transparent') {
                const maxLen = Math.max(...lines.map(l => l.length), 1);
                const bgW = maxLen * fontSize * 1.0;
                const bgH = lines.length * fontSize * 1.2;
                const bgP1 = mapPoint(ann.x, ann.y + bgH - fontSize * 0.2);
                page.drawRectangle({
                  x: bgP1.x, y: bgP1.y, width: bgW, height: bgH,
                  color: hexToRgb(ann.backgroundColor, window.PDFLib),
                  rotate: drawRotation
                });
              }
              lines.forEach((line, i) => {
                const visualBaselineY = ann.y + (fontSize * 0.8) + (i * fontSize * 1.2);
                const textPt = mapPoint(ann.x, visualBaselineY);
                page.drawText(line, {
                  x: textPt.x, y: textPt.y, size: fontSize, font: customFont, color, rotate: drawRotation
                });
              });
            } else {
              const maxLen = Math.max(...lines.map(l => l.length), 1);
              const textW = maxLen * fontSize * 1.0;
              const textH = lines.length * fontSize * 1.2;

              const scale = 3; 
              const canvas = document.createElement('canvas');
              canvas.width = textW * scale;
              canvas.height = textH * scale;
              const ctx = canvas.getContext('2d');
              ctx.scale(scale, scale);

              if (ann.backgroundColor && ann.backgroundColor !== 'transparent') {
                ctx.fillStyle = ann.backgroundColor;
                ctx.fillRect(0, 0, textW, textH);
              }

              ctx.fillStyle = ann.color || '#000000';
              ctx.font = `bold ${fontSize}px sans-serif`;
              ctx.textBaseline = 'top';
              lines.forEach((line, i) => {
                ctx.fillText(line, 0, i * fontSize * 1.2 + fontSize * 0.1);
              });

              const dataUrl = canvas.toDataURL('image/png');
              const imgBytes = await fetch(dataUrl).then(res => res.arrayBuffer());
              const embeddedImage = await pdfDocLib.embedPng(imgBytes);

              const bgP1 = mapPoint(ann.x, ann.y + textH - fontSize * 0.2);
              page.drawImage(embeddedImage, {
                x: bgP1.x, y: bgP1.y, width: textW, height: textH, rotate: drawRotation
              });
            }
          }
        }
      };

      const handleEditExport = async () => {
        if (!pdfBytes) return;
        
        const hasRedaction = annotations.some(ann => ann.isRedaction || (ann.type === 'solidRect' && ann.color === '#000000'));
        const hasTextAnnotation = annotations.some(ann => ann.type === 'text');
        
        const originalBase = fileName.includes('.') ? fileName.substring(0, fileName.lastIndexOf('.')) : fileName;
        
        setSaveDialog({
          type: 'pdf', 
          defaultName: "edited_" + originalBase, 
          originalName: originalBase,
          hasRedaction: hasRedaction,
          isEditExport: true,
          hasTextAnnotation: hasTextAnnotation, 
          onConfirm: async (customName, textExportMode) => {
            setSaveDialog(null); setIsExporting(true);
            try {
              const pdfDocLib = await window.PDFLib.PDFDocument.load(new Uint8Array(pdfBytes), { ignoreEncryption: true }); 
              pdfDocLib.registerFontkit(window.fontkit);
              
              await applyAnnotationsToDoc(pdfDocLib, null, textExportMode); 
              
              downloadFile(await pdfDocLib.save({ useObjectStreams: true }), customName + ".pdf"); 
              showToast('保存しました', 'success');
            } catch (error) { 
              console.error(error); 
              showToast('保存に失敗しました', 'error'); 
            } finally { 
              setIsExporting(false); 
            }
          }
        });
      };

      const handleExportAsImage = async () => {
        if (!pdfBytes) return;
        const originalBase = fileName.includes('.') ? fileName.substring(0, fileName.lastIndexOf('.')) : fileName;
        setSaveDialog({
          type: 'image', defaultName: "edited_" + originalBase, originalName: originalBase,
          onConfirm: async (customName) => {
            setSaveDialog(null); setIsExporting(true);
            try {
              const pdfDocLib = await window.PDFLib.PDFDocument.load(new Uint8Array(pdfBytes), { ignoreEncryption: true }); pdfDocLib.registerFontkit(window.fontkit);
              await applyAnnotationsToDoc(pdfDocLib, currentPage); const savedPdfBytes = await pdfDocLib.save({ useObjectStreams: true });
              const pdfForRender = await window.pdfjsLib.getDocument({ data: savedPdfBytes, cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true }).promise; const renderPage = await pdfForRender.getPage(currentPage);
              const viewport = renderPage.getViewport({ scale: 3.0 }); const canvas = document.createElement('canvas');
              canvas.width = viewport.width; canvas.height = viewport.height; const context = canvas.getContext('2d');
              await renderPage.render({ canvasContext: context, viewport }).promise; const imgDataUrl = canvas.toDataURL('image/png');
              const link = document.createElement("a"); link.href = imgDataUrl; link.download = customName + ".png";
              document.body.appendChild(link); link.click(); document.body.removeChild(link); showToast('画像として保存しました', 'success');
            } catch (error) { console.error(error); showToast('画像の保存に失敗しました', 'error'); } finally { setIsExporting(false); }
          }
        });
      };

      const handleNUp = async () => {
        if (!nUpFile) return;
        const originalBase = nUpFile.name.replace(/\.[^/.]+$/, "");
        setSaveDialog({
          type: 'pdf', defaultName: `nup_${originalBase}`, originalName: originalBase,
          onConfirm: async (customName) => {
            setSaveDialog(null); setIsExporting(true);
            try {
              const bytes = await nUpFile.arrayBuffer(); 
              const srcPdf = await window.PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true }); 
              const newPdf = await window.PDFLib.PDFDocument.create();
              const srcPages = srcPdf.getPages();
      const pdfjsDoc = await window.pdfjsLib.getDocument({ data: bytes, cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true }).promise;
              
              const { width: sW, height: sH } = srcPages[0].getSize();
              const is2Up = nUpType === '2up';
              const isSrcLandscape = sW > sH;

              let cols, rows;
              if (is2Up) {
                cols = isSrcLandscape ? 1 : 2;
                rows = isSrcLandscape ? 2 : 1;
              } else {
                cols = 2; rows = 2;
              }

              const pagesPerSheet = cols * rows;
              const outW = sW;
              const outH = sH;

              for (let i = 0; i < srcPages.length; i += pagesPerSheet) {
                const outPage = newPdf.addPage([outW, outH]);
                const cellW = outW / cols;
                const cellH = outH / rows;
                for (let j = 0; j < pagesPerSheet; j++) {
                  if (i + j >= srcPages.length) break;
                  const p = srcPages[i + j];
                  
      
      const { width: pW, height: pH } = p.getSize();
      const scale = Math.min(cellW / pW, cellH / pH);
      let col = j % cols;
      let row = Math.floor(j / cols);
      if (nUpDirection === 'rtl' && cols > 1) col = cols - 1 - col;
      const x = col * cellW + (cellW - pW * scale) / 2;
      const y = outH - (row + 1) * cellH + (cellH - pH * scale) / 2;
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
      drawAction(outPage, { x, y, xScale: scale, yScale: scale });
                }
              }
              downloadFile(await newPdf.save({ useObjectStreams: true }), customName + '.pdf'); 
              showToast('割り付けを保存しました', 'success');
            } catch (e) { console.error(e); showToast('割り付けに失敗しました', 'error'); } finally { setIsExporting(false); }
          }
        });
      };

      const sendToTool = async (targetMode) => {
        if (!pdfBytes) return; setIsExporting(true);
        try {
          const pdfDocLib = await window.PDFLib.PDFDocument.load(new Uint8Array(pdfBytes), { ignoreEncryption: true }); pdfDocLib.registerFontkit(window.fontkit);
          await applyAnnotationsToDoc(pdfDocLib, null); const mergedBytes = await pdfDocLib.save({ useObjectStreams: true });
          const file = new File([mergedBytes], fileName, { type: 'application/pdf' }); addToRecentFiles([file]);
          if (targetMode==='merge') setMergeFiles([file]); else if (targetMode==='split') setSplitFile(file);
          else if (targetMode==='organize') {
            setOrganizeFile(file); const lib = await window.PDFLib.PDFDocument.load(mergedBytes, { ignoreEncryption: true });
            const pages = lib.getPages().map((p, i) => ({ id: `page-${i}`, originalIndex: i, rotation: p.getRotation().angle }));
            setOrganizePages(pages); generateOrganizeThumbnails(file);
          }
          else if (targetMode==='convert') setConvertFiles([file]); 
          else if (targetMode==='addPageNum') setPageNumFile(file);
          else if (targetMode==='extractText') setExtractTextFile(file);
          else if (targetMode==='nup') setNUpFile(file);
          
          setAppMode(targetMode); setShowSendMenu(false); showToast(`${targetMode}ツールへ転送しました`, 'success');
        } catch (e) { console.error('sendToTool error:', e); showToast(`転送に失敗しました: ${e.message}`, 'error'); } finally { setIsExporting(false); }
      };

      const handleMerge = async () => {
        if (mergeFiles.length < 1) return;
        const originalBase = mergeFiles[0].name.replace(/\.[^/.]+$/, "");
        setSaveDialog({
          type: 'pdf', defaultName: "merged_" + originalBase, originalName: originalBase,
          onConfirm: async (customName) => {
            setSaveDialog(null); setIsExporting(true);
            try {
              const { PDFDocument, PDFName, PDFNumber, PDFHexString } = window.PDFLib; const mergedPdf = await PDFDocument.create();
              const bookmarkData = []; let currentPageOffset = 0;
              for (const file of mergeFiles) {
                const bytes = await file.arrayBuffer(); const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true }); const count = pdf.getPageCount();
                bookmarkData.push({ title: file.name.replace(/\.[^/.]+$/, ""), startIndex: currentPageOffset });
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices()); copiedPages.forEach(page => mergedPdf.addPage(page)); currentPageOffset += count;
              }
              if (addMergeBookmarks && bookmarkData.length > 0) {
                const context = mergedPdf.context; const pages = mergedPdf.getPages(); const outlinesDictRef = context.nextRef();
                const outlineItemRefs = bookmarkData.map(() => context.nextRef());
                for (let i = 0; i < bookmarkData.length; i++) {
                  const { title, startIndex } = bookmarkData[i]; const pageRef = pages[startIndex].ref;
                  const outlineItemDict = context.obj({ Title: PDFHexString.fromText(title), Parent: outlinesDictRef, Dest: [pageRef, PDFName.of('Fit')], Prev: i > 0 ? outlineItemRefs[i-1] : undefined, Next: i < bookmarkData.length-1 ? outlineItemRefs[i+1] : undefined, });
                  context.assign(outlineItemRefs[i], outlineItemDict);
                }
                const outlinesDict = context.obj({ Type: PDFName.of('Outlines'), First: outlineItemRefs[0], Last: outlineItemRefs[outlineItemRefs.length-1], Count: PDFNumber.of(bookmarkData.length), });
                context.assign(outlinesDictRef, outlinesDict); mergedPdf.catalog.set(PDFName.of('Outlines'), outlinesDictRef);
              }
              downloadFile(await mergedPdf.save({ useObjectStreams: true }), customName + ".pdf"); showToast('結合しました', 'success');
            } catch (e) { console.error(e); showToast('結合に失敗しました', 'error'); } finally { setIsExporting(false); }
          }
        });
      };

      const handleSplit = async () => {
        if (!splitFile) return;
        const originalBase = splitFile.name.replace(/\.[^/.]+$/, ""); 
        const isZip = splitMode === 'all' || splitMode === 'range-zip'; 
        
        setSaveDialog({
          type: isZip ? 'zip' : 'pdf', defaultName: "split_" + originalBase, originalName: originalBase,
          onConfirm: async (customName) => {
            setSaveDialog(null); setIsExporting(true);
            try {
              const bytes = await splitFile.arrayBuffer(); 
              const pdf = await window.PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true }); 
              const total = pdf.getPageCount();
              
              let targetIndices = [];
              if (splitMode === 'all') {
                for(let i = 0; i < total; i++) targetIndices.push(i);
              } else {
                const indices = new Set();
                splitRange.split(',').forEach(part => {
                  const range = part.trim().split('-');
                  if (range.length === 1) { const n = parseInt(range[0]); if (!isNaN(n) && n>=1 && n<=total) indices.add(n-1); }
                  else if (range.length === 2) { const start=parseInt(range[0]),end=parseInt(range[1]); if(!isNaN(start)&&!isNaN(end)) for(let i=Math.max(1,start);i<=Math.min(total,end);i++) indices.add(i-1); }
                });
                targetIndices = Array.from(indices).sort((a,b) => a-b);
                if (targetIndices.length === 0) { showToast('有効な範囲がありません', 'error'); setIsExporting(false); return; }
              }

              if (isZip) {
                const zip = new window.JSZip();
                for (const i of targetIndices) {
                  const newPdf = await window.PDFLib.PDFDocument.create(); 
                  const [copiedPage] = await newPdf.copyPages(pdf, [i]);
                  newPdf.addPage(copiedPage); 
                  zip.file(`${customName}_${i+1}.pdf`, await newPdf.save({ useObjectStreams: true }));
                }
                downloadFile(await zip.generateAsync({ type: 'blob' }), customName + '.zip', 'application/zip');
              } else {
                const newPdf = await window.PDFLib.PDFDocument.create(); 
                (await newPdf.copyPages(pdf, targetIndices)).forEach(p => newPdf.addPage(p));
                downloadFile(await newPdf.save({ useObjectStreams: true }), customName + '.pdf');
              }
              showToast('抽出しました', 'success');
            } catch (e) { showToast('抽出に失敗しました', 'error'); } finally { setIsExporting(false); }
          }
        });
      };

      const handleOrganize = async () => {
        if (!organizeFile) return;
        const originalBase = organizeFile.name.replace(/\.[^/.]+$/, "");
        setSaveDialog({
          type: 'pdf', defaultName: "organized_" + originalBase, originalName: originalBase,
          onConfirm: async (customName) => {
            setSaveDialog(null); setIsExporting(true);
            try {
              const bytes = await organizeFile.arrayBuffer(); const pdf = await window.PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true }); const newPdf = await window.PDFLib.PDFDocument.create();
              for (const pageInfo of organizePages) {
                const [copiedPage] = await newPdf.copyPages(pdf, [pageInfo.originalIndex]); copiedPage.setRotation(window.PDFLib.degrees(pageInfo.rotation)); newPdf.addPage(copiedPage);
              }
              downloadFile(await newPdf.save({ useObjectStreams: true }), customName + '.pdf'); showToast('整理して保存しました', 'success');
            } catch (e) { showToast('整理に失敗しました', 'error'); } finally { setIsExporting(false); }
          }
        });
      };

      const handleConvertImg2Pdf = async () => {
        if (convertFiles.length === 0) return;
        const originalBase = convertFiles[0].name.replace(/\.[^/.]+$/, "");
        setSaveDialog({
          type: 'pdf', defaultName: "converted_" + originalBase, originalName: originalBase,
          onConfirm: async (customName) => {
            setSaveDialog(null); setIsExporting(true);
            try {
              const doc = await window.PDFLib.PDFDocument.create();
              for (const file of convertFiles) {
                const bytes = await file.arrayBuffer(); let image;
                if (file.type === 'image/png') image = await doc.embedPng(bytes); else if (file.type === 'image/jpeg') image = await doc.embedJpg(bytes); else continue;
                const page = doc.addPage([image.width, image.height]); page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
              }
              downloadFile(await doc.save({ useObjectStreams: true }), customName + '.pdf'); showToast('変換しました', 'success');
            } catch (e) { showToast('変換に失敗しました', 'error'); } finally { setIsExporting(false); }
          }
        });
      };

      const handleConvertPdf2Img = async () => {
        if (convertFiles.length === 0) return;
        const originalBase = convertFiles[0].name.replace(/\.[^/.]+$/, "");
        setSaveDialog({
          type: 'zip', defaultName: "images_" + originalBase, originalName: originalBase,
          onConfirm: async (customName) => {
            setSaveDialog(null); setIsExporting(true);
            try {
              const file = convertFiles[0]; const ab = await file.arrayBuffer(); const pdf = await window.pdfjsLib.getDocument({ data: ab, cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true }).promise; const zip = new window.JSZip();
              for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i); const viewport = page.getViewport({ scale: 3.0 }); const canvas = document.createElement('canvas');
                canvas.width = viewport.width; canvas.height = viewport.height; await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                zip.file(`page_${i}.png`, canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, ""), { base64: true });
              }
              downloadFile(await zip.generateAsync({ type: 'blob' }), customName + '.zip', 'application/zip'); showToast('変換しました', 'success');
            } catch (e) { showToast('変換に失敗しました', 'error'); } finally { setIsExporting(false); }
          }
        });
      };


      const handleConvertPdf2Pptx = async () => {
        if (convertFiles.length === 0) return;
        const originalBase = convertFiles[0].name.replace(/\.[^/.]+$/, "");
        setSaveDialog({
          type: 'pptx', defaultName: "presentation_" + originalBase, originalName: originalBase,
          onConfirm: async (customName) => {
            setSaveDialog(null); setIsExporting(true);
            try {
              const file = convertFiles[0]; const ab = await file.arrayBuffer(); const pdf = await window.pdfjsLib.getDocument({ data: ab, cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true }).promise;
              const pptx = new PptxGenJS();
              for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i); const viewport = page.getViewport({ scale: 3.0 }); const canvas = document.createElement('canvas');
                canvas.width = viewport.width; canvas.height = viewport.height; await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
                const slide = pptx.addSlide();
                slide.addImage({ data: dataUrl, x: 0, y: 0, w: '100%', h: '100%' });
              }
              const pptxData = await pptx.write({ outputType: 'blob' });
              downloadFile(pptxData, customName + '.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'); showToast('変換しました', 'success');
            } catch (e) { showToast('変換に失敗しました', 'error'); } finally { setIsExporting(false); }
          }
        });
      };

      const handleAddPageNum = async () => {
        if (!pageNumFile) return;
        const originalBase = pageNumFile.name.replace(/\.[^/.]+$/, "");
        setSaveDialog({
          type: 'pdf', defaultName: "numbered_" + originalBase, originalName: originalBase,
          onConfirm: async (customName) => {
            setSaveDialog(null); setIsExporting(true);
            try {
              const bytes = await pageNumFile.arrayBuffer(); const pdf = await window.PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true }); const pages = pdf.getPages(); const total = pages.length;
              pages.forEach((page, idx) => {
                const { width, height } = page.getSize(); const n = idx + 1; let text = pageNumFormat.replace('{n}', n).replace('{total}', total);
                const fontSize = 12; const textWidth = text.length * (fontSize * 0.6); let x, y; const margin = 30;
                if (pageNumPosition.includes('left')) x = margin; else if (pageNumPosition.includes('right')) x = width - textWidth - margin; else x = width / 2 - textWidth / 2;
                if (pageNumPosition.includes('top')) y = height - margin - fontSize; else y = margin;
                page.drawText(text, { x, y, size: fontSize, color: window.PDFLib.rgb(0, 0, 0) });
              });
              downloadFile(await pdf.save({ useObjectStreams: true }), customName + '.pdf'); showToast('ページ番号を追加しました', 'success');
            } catch (e) { showToast('追加に失敗しました', 'error'); } finally { setIsExporting(false); }
          }
        });
      };

      const handleExtractText = async () => {
        setIsExporting(true); setExtractedText(''); setExtractProgress('');
        try {
          const bytes = await extractTextFile.arrayBuffer(); const pdf = await window.pdfjsLib.getDocument({ data: bytes, cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/', cMapPacked: true }).promise; let fullText = '';
          if (extractMethod === 'normal') {
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i); const textContent = await page.getTextContent();
              fullText += `--- Page ${i} ---\n${textContent.items.map(item => item.str).join(' ')}\n\n`;
            }
          } else {
            const worker = await window.Tesseract.createWorker('jpn');
            for (let i = 1; i <= pdf.numPages; i++) {
              setExtractProgress(`OCR処理中... (${i} / ${pdf.numPages} ページ目)`);
              const page = await pdf.getPage(i); const viewport = page.getViewport({ scale: 3.0 }); const canvas = document.createElement('canvas');
              canvas.width = viewport.width; canvas.height = viewport.height; await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
              const { data: { text } } = await worker.recognize(canvas); fullText += `--- Page ${i} (OCR) ---\n${text}\n\n`;
            }
            await worker.terminate();
          }
          setExtractedText(fullText); showToast('抽出完了', 'success');
        } catch (e) { console.error(e); showToast('抽出に失敗しました', 'error'); } finally { setIsExporting(false); setExtractProgress(''); }
      };

      const handleOrganizeMoveUp = (i) => { if(i>0){const p=[...organizePages];[p[i-1],p[i]]=[p[i],p[i-1]];setOrganizePages(p);} };
      const handleOrganizeMoveDown = (i) => { if(i<organizePages.length-1){const p=[...organizePages];[p[i],p[i+1]]=[p[i+1],p[i]];setOrganizePages(p);} };
      const handleOrganizeDelete = (i) => { setOrganizePages(organizePages.filter((_,idx) => idx!==i)); };
      const handleOrganizeRotate = (i, angle) => { const p=[...organizePages]; p[i].rotation=(p[i].rotation+angle)%360; setOrganizePages(p); };

      const [isGlobalDragging, setIsGlobalDragging] = useState(false);
      const handleGlobalDragOver = useCallback((e) => {
        e.preventDefault();
        if (appMode === 'edit') setIsGlobalDragging(true);
      }, [appMode]);
      useEffect(() => { setIsGlobalDragging(false); }, [appMode]);
      const handleGlobalDragLeave = useCallback((e) => { e.preventDefault(); if(e.clientX===0||e.clientY===0) setIsGlobalDragging(false); }, []);
      const handleGlobalDrop = useCallback((e) => {
        e.preventDefault(); setIsGlobalDragging(false);
        if (appMode !== 'edit') return;
        if (e.dataTransfer.files?.length) {
          const file = e.dataTransfer.files[0];
          setRecentFiles(prev => { const updated = [...prev]; if (!updated.some(f => f.name===file.name && f.size===file.size)) updated.unshift(file); return updated.slice(0, 10); });
          if (file.type === 'application/pdf') loadPdf(file, file.name);
          else if (file.type.startsWith('image/')) loadImageAsPdf(file, file.name); else showToast('PDFまたは画像ファイルを選択してください', 'error');
        }
      }, []);

      if (!isLibrariesLoaded) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">ライブラリを読み込み中...</p>
          </div>
        </div>
      );

      const SaveDialog = ({ dialog, onClose }) => {
        const [customName, setCustomName] = useState(dialog.defaultName);
        const [useOriginalName, setUseOriginalName] = useState(false);
        const [textExportMode, setTextExportMode] = useState('embed'); 
        const currentName = useOriginalName ? dialog.originalName : customName;

        return (
          <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 flex items-center gap-3 text-white">
                {dialog.type === 'pdf' ? <Icons.Download className="w-5 h-5 text-indigo-400" /> : dialog.type === 'zip' ? <Icons.Layers className="w-5 h-5 text-amber-400" /> : dialog.type === 'pptx' ? <Icons.Presentation className="w-5 h-5 text-orange-400" /> : <Icons.Image className="w-5 h-5 text-emerald-400" />}
                <h2 className="text-lg font-bold">{dialog.type === 'pdf' ? 'PDFで保存' : dialog.type === 'zip' ? 'ZIPで保存' : dialog.type === 'pptx' ? 'PPTXで保存' : '画像で保存'}</h2>
              </div>
              
              <div className="p-6 pb-2">
                {dialog.hasRedaction && dialog.type === 'pdf' && (
                  <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Icons.AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-bold text-amber-800 mb-1">墨塗りに関する重要なご注意</h3>
                        <p className="text-xs text-amber-700 leading-relaxed mb-2">
                          このままPDFで保存すると、内部に元のテキストデータが残るため、隠したはずの文字がコピペ等で読まれてしまう危険性があります。
                        </p>
                        <p className="text-xs font-bold text-amber-800 bg-amber-100 p-2 rounded">
                          完全に消去したい場合は、キャンセルして【画像で保存】を選んでください。
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <label className="block text-sm font-bold text-slate-700 mb-2">ファイル名</label>
                <div className={cn("flex items-center gap-2 border rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100", useOriginalName ? "bg-slate-100 border-slate-200" : "border-slate-300 bg-white")}>
                  <input type="text" value={currentName} onChange={(e) => setCustomName(e.target.value)} disabled={useOriginalName}
                    onKeyDown={(e) => { if (e.key === 'Enter') dialog.onConfirm(currentName, textExportMode); if (e.key === 'Escape') onClose(); }}
                    className="flex-1 px-4 py-3 text-sm outline-none font-medium bg-transparent disabled:text-slate-500" autoFocus placeholder="ファイル名を入力..." />
                  <span className="pr-4 text-sm text-slate-400 font-medium shrink-0">{dialog.type === 'pdf' ? '.pdf' : dialog.type === 'zip' ? '.zip' : dialog.type === 'pptx' ? '.pptx' : '.png'}</span>
                </div>
                <label className="flex items-center gap-2 mt-4 cursor-pointer w-max mb-4">
                  <input type="checkbox" checked={useOriginalName} onChange={(e) => setUseOriginalName(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer" />
                  <span className="text-sm font-medium text-slate-700">元のファイル名で保存する</span>
                </label>
              </div>

              {dialog.isEditExport && dialog.hasTextAnnotation && (
                <div className="px-6 pb-4">
                  <label className="block text-sm font-bold text-slate-700 mb-2">テキストの保存方法</label>
                  <div className="space-y-2">
                    <label className={cn("flex items-start gap-3 cursor-pointer p-3 border-2 rounded-xl transition-all", textExportMode === 'embed' ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:bg-slate-50")}>
                      <input type="radio" name="textMode" value="embed" checked={textExportMode === 'embed'} onChange={() => setTextExportMode('embed')} className="mt-1 w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="text-sm font-bold text-slate-800">テキストとして保存（推奨）</div>
                        <div className="text-xs text-slate-500 mt-0.5">追加した文字をコピーできます。Acrobat互換性重視（容量約+4MB）</div>
                      </div>
                    </label>
                    <label className={cn("flex items-start gap-3 cursor-pointer p-3 border-2 rounded-xl transition-all", textExportMode === 'image' ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:bg-slate-50")}>
                      <input type="radio" name="textMode" value="image" checked={textExportMode === 'image'} onChange={() => setTextExportMode('image')} className="mt-1 w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="text-sm font-bold text-slate-800">画像化して保存（軽量化）</div>
                        <div className="text-xs text-slate-500 mt-0.5">文字はコピーできなくなりますが、ファイル容量を最小に抑えます</div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              <div className="px-6 pb-6 flex gap-3">
                <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all">キャンセル</button>
                <button onClick={() => dialog.onConfirm(currentName, textExportMode)} className={cn("flex-1 py-3 rounded-xl text-white text-sm font-bold transition-all shadow-sm", dialog.type === 'pdf' ? "bg-indigo-600 hover:bg-indigo-700" : dialog.type === 'zip' ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-500 hover:bg-emerald-600")}>保存してダウンロード</button>
              </div>
            </div>
          </div>
        );
      };

      return (
        <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative w-full"
          onDragOver={handleGlobalDragOver} onDragLeave={handleGlobalDragLeave} onDrop={handleGlobalDrop}>

          {saveDialog && <SaveDialog dialog={saveDialog} onClose={() => setSaveDialog(null)} />}

          {isGlobalDragging && !pdfDoc && appMode === 'edit' && (
            <div className="absolute inset-0 z-50 bg-indigo-500/10 backdrop-blur-sm border-4 border-indigo-500 border-dashed m-4 rounded-3xl flex items-center justify-center pointer-events-none">
              <div className="bg-white px-8 py-6 rounded-2xl shadow-xl flex flex-col items-center text-center">
                <Icons.Upload className="w-12 h-12 text-indigo-600 mb-4 animate-bounce" />
                <h2 className="text-xl lg:text-2xl font-bold text-slate-800">PDFをドロップして開く</h2>
              </div>
            </div>
          )}

          <Header
            appMode={appMode} setAppMode={setAppMode} pdfDoc={pdfDoc} isExporting={isExporting}
            handleFileUpload={handleFileUpload} handleEditExport={handleEditExport} handleExportAsImage={handleExportAsImage}
            isSidebarOpen={isSidebarOpen} setSidebarOpen={setIsSidebarOpen}
          />

          <main className="flex-1 flex overflow-hidden relative w-full">
            {appMode === 'edit' ? (
              <>
                <Sidebar
                  stampList={stampList} setStampList={setStampList}
                  isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}
                  eraserSize={eraserSize} setEraserSize={setEraserSize} handleSnapAngle={handleSnapAngle}
                  tool={tool} setTool={setTool} annotations={annotations} selectedId={selectedId}
                  currentColor={currentColor} handleColorChange={handleColorChange}
                  currentStrokeWidth={currentStrokeWidth} handleStrokeWidthChange={handleStrokeWidthChange}
                  currentFontSize={currentFontSize} handleFontSizeChange={handleFontSizeChange}
                  currentBgColor={currentBgColor} handleBgColorChange={handleBgColorChange}
                  stampType={stampType} setStampType={setStampType} currentStamp={currentStamp} setCurrentStamp={setCurrentStamp} currentSteelShape={currentSteelShape} setCurrentSteelShape={setCurrentSteelShape} dateStampTop={dateStampTop} setDateStampTop={setDateStampTop} dateStampBottom={dateStampBottom} setDateStampBottom={setDateStampBottom} dateStampDate={dateStampDate} setDateStampDate={setDateStampDate}
                  handleUndo={handleUndo} handleRedo={handleRedo} redoStack={redoStack}
                  handleDeleteSelected={handleDeleteSelected} handleEditSelectedText={() => handleEditSelectedText(annotations.find(a => a.id === selectedId))}
                  handleAddImageAnnotation={handleAddImageAnnotation} pdfDoc={pdfDoc}
                  showSendMenu={showSendMenu} setShowSendMenu={setShowSendMenu} sendToTool={sendToTool} isExporting={isExporting}
                  handleCopyFullPage={handleCopyFullPage}
                />
                {pdfDoc ? (
                  <EditMode
                    eraserSize={eraserSize} draftEraser={draftEraser} handleEndpointPointerDown={handleEndpointPointerDown}
                    pdfDoc={pdfDoc} scale={scale} setScale={setScale} currentPage={currentPage} setCurrentPage={setCurrentPage}
                    totalPages={totalPages} pageDimensions={pageDimensions} tool={tool} annotations={annotations}
                    selectedId={selectedId} draggingId={draggingId} currentColor={currentColor} currentStrokeWidth={currentStrokeWidth}
                    currentFontSize={currentFontSize} currentBgColor={currentBgColor} draftRect={draftRect} draftArrow={draftArrow}
                    draftFreehand={draftFreehand} draftPolygon={draftPolygon} mousePos={mousePos} textInput={textInput} setTextInput={setTextInput} inputRef={inputRef}
                    handlePointerDown={handlePointerDown} handlePointerMove={handlePointerMove} handlePointerUp={handlePointerUp}
                    handleAnnotationPointerDown={handleAnnotationPointerDown} handleAnnotationDoubleClick={handleAnnotationDoubleClick}
                    handleResizePointerDown={handleResizePointerDown} handleTextSubmit={handleTextSubmit} canvasRef={canvasRef} wrapperRef={wrapperRef}
                  />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center bg-slate-100/50 p-4 lg:p-8 overflow-y-auto">
                    <div className="max-w-3xl w-full flex flex-col items-center">
                      <RecentFilesGallery
                        recentFiles={recentFiles}
                        onSelect={(file) => { if (file.type.startsWith('image/')) loadImageAsPdf(file, file.name); else loadPdf(file, file.name); }}
                        accept="application/pdf,image/png,image/jpeg"
                      />
                      <label className="flex flex-col items-center justify-center w-full h-48 lg:h-64 border-2 border-slate-300 border-dashed rounded-2xl cursor-pointer bg-white hover:bg-slate-50 hover:border-indigo-400 transition-all group shadow-sm mt-4 text-center px-4">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
                          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-100 transition-all mx-auto">
                            <Icons.Upload className="w-6 h-6 lg:w-8 lg:h-8" />
                          </div>
                          <p className="mb-2 text-base lg:text-lg font-bold text-slate-700">PDFや画像をアップロードして編集</p>
                          <p className="text-xs lg:text-sm text-slate-500">タップ、ドラッグ＆ドロップで追加</p>
                        </div>
                        <input type="file" className="hidden" accept="application/pdf,image/png,image/jpeg" onChange={handleFileUpload} />
                      </label>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <OtherModes
                appMode={appMode} isExporting={isExporting} handleMerge={handleMerge} handleSplit={handleSplit} handleOrganize={handleOrganize} handleConvertImg2Pdf={handleConvertImg2Pdf} handleConvertPdf2Img={handleConvertPdf2Img} handleConvertPdf2Pptx={handleConvertPdf2Pptx} handleAddPageNum={handleAddPageNum} handleExtractText={handleExtractText} handleNUp={handleNUp}
                mergeFiles={mergeFiles} setMergeFiles={setMergeFiles} splitFile={splitFile} setSplitFile={setSplitFile} splitMode={splitMode} setSplitMode={setSplitMode} splitRange={splitRange} setSplitRange={setSplitRange}
                mergeThumbnails={mergeThumbnails} setMergeThumbnails={setMergeThumbnails} isGeneratingMergeThumbnails={isGeneratingMergeThumbnails} setIsGeneratingMergeThumbnails={setIsGeneratingMergeThumbnails}
                splitThumbnails={splitThumbnails} setSplitThumbnails={setSplitThumbnails} isGeneratingSplitThumbnails={isGeneratingSplitThumbnails} setIsGeneratingSplitThumbnails={setIsGeneratingSplitThumbnails}
                organizeFile={organizeFile} setOrganizeFile={setOrganizeFile} organizePages={organizePages} setOrganizePages={setOrganizePages} organizeThumbnails={organizeThumbnails} setOrganizeThumbnails={setOrganizeThumbnails} generateOrganizeThumbnails={generateOrganizeThumbnails}
                convertFiles={convertFiles} setConvertFiles={setConvertFiles} convertMode={convertMode} setConvertMode={setConvertMode} pageNumFile={pageNumFile} setPageNumFile={setPageNumFile} pageNumFormat={pageNumFormat} setPageNumFormat={setPageNumFormat} pageNumPosition={pageNumPosition} setPageNumPosition={setPageNumPosition}
                extractTextFile={extractTextFile} setExtractTextFile={setExtractTextFile} extractedText={extractedText} setExtractedText={setExtractedText} extractMethod={extractMethod} setExtractMethod={setExtractMethod} extractProgress={extractProgress}
                handleOrganizeMoveUp={handleOrganizeMoveUp} handleOrganizeMoveDown={handleOrganizeMoveDown} handleOrganizeDelete={handleOrganizeDelete} handleOrganizeRotate={handleOrganizeRotate} addMergeBookmarks={addMergeBookmarks} setAddMergeBookmarks={setAddMergeBookmarks} recentFiles={recentFiles} addToRecentFiles={addToRecentFiles}
                nUpFile={nUpFile} setNUpFile={setNUpFile} nUpType={nUpType} setNUpType={setNUpType} nUpDirection={nUpDirection} setNUpDirection={setNUpDirection} nUpPreviewUrl={nUpPreviewUrl}
              />
            )}
          </main>

          {toast && (
            <div className="fixed bottom-6 right-6 left-6 lg:left-auto z-50 flex justify-center lg:justify-end">
              <div className={cn("px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 font-medium", toast.type === 'error' ? "bg-red-600 text-white" : "bg-slate-800 text-white")}>
                {toast.type === 'error' ? <Icons.X className="w-5 h-5 shrink-0" /> : <Icons.FileText className="w-5 h-5 text-indigo-400 shrink-0" />}
                <span className="text-sm lg:text-base">{toast.msg}</span>
              </div>
            </div>
          )}
        </div>
      );
    }

export default App;