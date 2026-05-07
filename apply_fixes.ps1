$path = "src/App.jsx"
$content = Get-Content $path -Raw

# 1. PPTX Quality (scale 2.0 -> 3.0, quality 0.9 -> 0.95)
$content = $content -replace 'scale: 2\.0', 'scale: 3.0'
$content = $content -replace 'toDataURL\(''image/jpeg'', 0\.9\)', 'toDataURL(''image/jpeg'', 0.95)'

# 2. N-up size (Object streams)
$content = $content -replace '\.save\(\)', '.save({ useObjectStreams: true })'

# 3. Eraser Text estimation improvement
$content = $content -replace 'fs \* 0\.8; // Estimate width', 'fs * 1.2; // Estimate width (more generous)'
$content = $content -replace 'fs \* 1\.2; // Estimate height', 'fs * 1.4; // Estimate height (more generous)'

Set-Content $path $content -Encoding UTF8
