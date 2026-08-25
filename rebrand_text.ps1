$replacements = @{
    "Dave Holloway" = "Rishit Bhanvadia"
    "daveholloway.uk" = "rishitbhanvadia.uk"
    "hello@daveholloway.uk" = "patelrishit590@gmail.com"
    "hello@rishitbhanvadia.uk" = "patelrishit590@gmail.com"
    "rishitbhanvadia.com" = "rishitbhanvadia.uk"
    "Leeds, UK" = "Rajkot, India"
    "Leeds (UK)" = "Rajkot (India)"
    "Leeds-based" = "Rajkot-based"
}

$files = Get-ChildItem -Recurse -File -Include *.html,*.css,*.js,*.json,*.md -Exclude .git,node_modules

foreach ($file in $files) {
    Write-Host "Processing $($file.FullName)..."
    $content = Get-Content $file.FullName -Raw
    $newContent = $content
    
    foreach ($old in $replacements.Keys) {
        $new = $replacements[$old]
        $newContent = $newContent -replace [regex]::Escape($old), $new
    }
    
    if ($content -ne $newContent) {
        Set-Content $file.FullName $newContent -NoNewline
        Write-Host "Updated $($file.FullName)" -ForegroundColor Green
    }
}
