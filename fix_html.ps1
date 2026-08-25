$replacements = @{
    '<svg viewBox="0 21.67 21.67 43.34" fill="none" preserveAspectRatio="xMidYMin meet" data-astro-cid-t4xbvl5o><path d="M0 43.34C0 55.31 9.7 65.01 21.67 65.01V21.67C9.7 21.67 0 31.37 0 43.34Z" fill="currentColor" data-astro-cid-t4xbvl5o></path></svg>' = '<svg viewBox="0 0 18 66" fill="none" preserveAspectRatio="xMidYMin meet" data-astro-cid-t4xbvl5o><path d="M0 0H18V66H0V0Z" fill="currentColor" data-astro-cid-t4xbvl5o></path></svg>'
    '<svg viewBox="24.63 0 21.67 65.01" fill="none" preserveAspectRatio="xMidYMin meet" data-astro-cid-t4xbvl5o><path d="M24.63 21.67V65.01H46.3V0C34.33 0 24.63 9.7 24.63 21.67Z" fill="currentColor" data-astro-cid-t4xbvl5o></path></svg>' = '<svg viewBox="18 0 34 66" fill="none" preserveAspectRatio="xMidYMin meet" data-astro-cid-t4xbvl5o><path d="M18 0H38C46 0 52 6 52 14V19C52 27 46 33 38 33H18V0Z M28 33H52V66H34L28 33Z" fill="currentColor" data-astro-cid-t4xbvl5o></path></svg>'
    '<svg viewBox="49.25 0 21.67 65.01" fill="none" preserveAspectRatio="xMidYMin meet" data-astro-cid-t4xbvl5o><path d="M49.25 21.67V43.34V65.01H70.92V43.34V21.67V0H49.25V21.67Z" fill="currentColor" data-astro-cid-t4xbvl5o></path></svg>' = '<svg viewBox="60 0 18 66" fill="none" preserveAspectRatio="xMidYMin meet" data-astro-cid-t4xbvl5o><path d="M60 0H78V66H60V0Z" fill="currentColor" data-astro-cid-t4xbvl5o></path></svg>'
    '<svg viewBox="73.88 21.67 21.67 43.34" fill="none" preserveAspectRatio="xMidYMin meet" data-astro-cid-t4xbvl5o><path d="M73.88 21.67V65.01H95.55V43.34C95.55 31.37 85.85 21.67 73.88 21.67Z" fill="currentColor" data-astro-cid-t4xbvl5o></path></svg>' = '<svg viewBox="78 0 21 66" fill="none" preserveAspectRatio="xMidYMin meet" data-astro-cid-t4xbvl5o><path d="M78 0H88C94 0 97 3 97 10V14C97 21 94 24 88 24H78V0Z M78 28H90C96 28 99 31 99 38V60C99 64 96 66 90 66H78V28Z" fill="currentColor" data-astro-cid-t4xbvl5o></path></svg>'
}

$files = Get-ChildItem -Recurse -File -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content
    foreach ($key in $replacements.Keys) {
        $newContent = $newContent.Replace($key, $replacements[$key])
    }
    if ($content -ne $newContent) {
        Set-Content $file.FullName $newContent -NoNewline
        Write-Host "Updated $($file.FullName)"
    }
}
