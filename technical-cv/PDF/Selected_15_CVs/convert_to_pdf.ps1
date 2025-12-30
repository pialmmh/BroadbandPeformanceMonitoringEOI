$htmlDir = "E:\BroadbandPeformanceMonitoringEOI\worktrees\wt-technical-cv\technical-cv\PDF\Selected_15_CVs\HTML_CVs"
$pdfDir = "E:\BroadbandPeformanceMonitoringEOI\worktrees\wt-technical-cv\technical-cv\PDF\Selected_15_CVs\PDF_CVs"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# Create PDF directory if not exists
if (-not (Test-Path $pdfDir)) {
    New-Item -ItemType Directory -Path $pdfDir
}

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $htmlDir -Filter "*.html"

foreach ($file in $htmlFiles) {
    $htmlPath = $file.FullName
    $pdfName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name) + ".pdf"
    $pdfPath = Join-Path $pdfDir $pdfName

    Write-Host "Converting: $($file.Name) -> $pdfName"

    # Convert to file:// URI format
    $fileUri = "file:///" + $htmlPath.Replace("\", "/").Replace(" ", "%20")

    # Run Edge headless to generate PDF
    $process = Start-Process -FilePath $edgePath -ArgumentList "--headless", "--disable-gpu", "--run-all-compositor-stages-before-draw", "--print-to-pdf=`"$pdfPath`"", "`"$fileUri`"" -Wait -PassThru -NoNewWindow

    if (Test-Path $pdfPath) {
        Write-Host "  SUCCESS: $pdfName created" -ForegroundColor Green
    } else {
        Write-Host "  FAILED: $pdfName not created" -ForegroundColor Red
    }
}

Write-Host "`nConversion complete!"
Write-Host "PDF files saved to: $pdfDir"
