$assetMap = @{
    "dh-404-4_3.mp4" = "rb-404-4_3.mp4"
    "dh-hero-responsive.riv" = "rb-hero-responsive.riv"
    "dh-logo.svg" = "rb-logo.svg"
    "dh-logo-flipped.png" = "rb-logo-flipped.png"
    "dh-rive-head-3_4.mp4" = "rb-rive-head-3_4.mp4"
    "dh-rosedale-1_1.mp4" = "rb-rosedale-1_1.mp4"
    "dh-tutorful-1_1.mp4" = "rb-tutorful-1_1.mp4"
    "dh-bank-house-4_3.webp" = "rb-bank-house-4_3.webp"
    "dh-beers-4_3.webp" = "rb-beers-4_3.webp"
    "dh-bishopsgate-1_1.webp" = "rb-bishopsgate-1_1.webp"
    "dh-open-blue-1_1.webp" = "rb-open-blue-1_1.webp"
    "dh-website-v1-desktop-4_3.webp" = "rb-website-v1-desktop-4_3.webp"
    "dh-website-v1-mobile-4_3.webp" = "rb-website-v1-mobile-4_3.webp"
}

$rootPath = $PSScriptRoot

# 1. Rename files
foreach ($oldName in $assetMap.Keys) {
    $newName = $assetMap[$oldName]
    $oldFile = Get-ChildItem -Path $rootPath -Recurse -Filter $oldName
    
    foreach ($file in $oldFile) {
        $newFullName = Join-Path $file.DirectoryName $newName
        if ($oldName -eq "dh-logo.svg" -and (Test-Path $newFullName)) {
            Write-Host "rb-logo.svg already exists, deleting dh-logo.svg..." -ForegroundColor Yellow
            Remove-Item $file.FullName -Force
        } elseif (Test-Path $file.FullName) {
            Write-Host "Renaming $($file.FullName) to $newName..." -ForegroundColor Green
            Rename-Item -Path $file.FullName -NewName $newName -ErrorAction SilentlyContinue
        }
    }
}

# 2. Update references in code
$files = Get-ChildItem -Path $rootPath -Recurse -File -Include *.html,*.css,*.js,*.json,*.md -Exclude .git,node_modules

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content
    
    foreach ($oldName in $assetMap.Keys) {
        $newName = $assetMap[$oldName]
        $newContent = $newContent -replace [regex]::Escape($oldName), $newName
    }
    
    if ($content -ne $newContent) {
        Set-Content $file.FullName $newContent -NoNewline
        Write-Host "Updated references in $($file.FullName)" -ForegroundColor Blue
    }
}
