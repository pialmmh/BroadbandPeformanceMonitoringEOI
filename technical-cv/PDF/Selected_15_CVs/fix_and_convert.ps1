$htmlDir = "E:\BroadbandPeformanceMonitoringEOI\worktrees\wt-technical-cv\technical-cv\PDF\Selected_15_CVs\HTML_CVs"
$pdfDir = "E:\BroadbandPeformanceMonitoringEOI\worktrees\wt-technical-cv\technical-cv\PDF\Selected_15_CVs\PDF_CVs"
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# Print CSS to add
$printCSS = @"

        /* Print Styles */
        @media print {
            @page {
                size: A4;
                margin: 10mm 12mm 10mm 12mm;
            }
            body {
                margin: 0 !important;
                padding: 0 !important;
                font-size: 9pt !important;
                line-height: 1.3 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .header h2 {
                font-size: 14pt !important;
                margin-bottom: 10px !important;
            }
            .main-table td {
                padding: 5px !important;
                font-size: 9pt !important;
            }
            .section-title {
                padding: 5px 8px !important;
                margin-top: 8px !important;
                font-size: 10pt !important;
                page-break-after: avoid !important;
            }
            .section-content {
                padding: 8px !important;
                page-break-inside: avoid !important;
            }
            .employment-table td {
                padding: 5px !important;
            }
            .certification {
                margin-top: 15px !important;
                padding: 10px !important;
                page-break-inside: avoid !important;
            }
            pre {
                font-size: 9pt !important;
                line-height: 1.3 !important;
            }
            ul {
                margin: 3px 0 !important;
                padding-left: 20px !important;
            }
            li {
                margin-bottom: 2px !important;
                font-size: 9pt !important;
            }
            table {
                page-break-inside: avoid !important;
            }
            .lang-table th, .lang-table td {
                padding: 3px 8px !important;
                font-size: 9pt !important;
            }
        }
"@

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $htmlDir -Filter "*.html"

Write-Host "Step 1: Adding print styles to HTML files..." -ForegroundColor Cyan

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    # Check if print styles already exist
    if ($content -notmatch '@media print') {
        # Insert print CSS before </style>
        $content = $content -replace '</style>', "$printCSS`n    </style>"
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "  Updated: $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "  Skipped (already has print styles): $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "`nStep 2: Converting HTML to PDF..." -ForegroundColor Cyan

# Clear old PDFs
Remove-Item "$pdfDir\*.pdf" -Force -ErrorAction SilentlyContinue

foreach ($file in $htmlFiles) {
    $htmlPath = $file.FullName
    $pdfName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name) + ".pdf"
    $pdfPath = Join-Path $pdfDir $pdfName

    Write-Host "  Converting: $($file.Name)"

    # Convert to file:// URI format
    $fileUri = "file:///" + $htmlPath.Replace("\", "/").Replace(" ", "%20")

    # Run Edge headless with no headers/footers
    $process = Start-Process -FilePath $edgePath -ArgumentList `
        "--headless", `
        "--disable-gpu", `
        "--no-pdf-header-footer", `
        "--run-all-compositor-stages-before-draw", `
        "--print-to-pdf=`"$pdfPath`"", `
        "`"$fileUri`"" `
        -Wait -PassThru -NoNewWindow -RedirectStandardError "NUL"

    Start-Sleep -Milliseconds 500

    if (Test-Path $pdfPath) {
        $size = [math]::Round((Get-Item $pdfPath).Length / 1KB)
        Write-Host "    SUCCESS: $pdfName ($size KB)" -ForegroundColor Green
    } else {
        Write-Host "    FAILED: $pdfName" -ForegroundColor Red
    }
}

Write-Host "`nConversion complete!" -ForegroundColor Cyan
Write-Host "PDF files saved to: $pdfDir" -ForegroundColor White
