# PowerShell script to add useScrollToTop hook to all page components

$pagesDir = "src\pages"
$hookImport = "import { useScrollToTop } from '../hooks/useScrollToTop';"
$hookCall = "  useScrollToTop(); // Force scroll to top on mount"

# Pages that already have the hook
$updatedPages = @(
    "Home.jsx",
    "About.jsx",
    "Business.jsx",
    "Internship.jsx",
    "InfraSecurity.jsx",
    "NewEnergy.jsx"
)

# Get all page files
$allPages = Get-ChildItem -Path $pagesDir -Filter "*.jsx"

foreach ($page in $allPages) {
    if ($updatedPages -contains $page.Name) {
        Write-Host "Skipping $($page.Name) - already updated" -ForegroundColor Yellow
        continue
    }
    
    $filePath = $page.FullName
    $content = Get-Content $filePath -Raw
    
    # Check if hook is already imported
    if ($content -match "useScrollToTop") {
        Write-Host "Skipping $($page.Name) - hook already exists" -ForegroundColor Green
        continue
    }
    
    Write-Host "Processing $($page.Name)..." -ForegroundColor Cyan
    
    # Add import after the last import statement
    if ($content -match "(?s)(.*import.*from.*[`"'];)(\r?\n)") {
        $content = $content -replace "(import.*from.*[`"'];)(\r?\n)(?!import)", "`$1`$2$hookImport`$2"
    }
    
    # Find the component function and add the hook call
    # Pattern: const ComponentName = () => {
    $componentName = $page.BaseName
    $pattern = "(const $componentName = \(\) => \{)(\r?\n)"
    if ($content -match $pattern) {
        $content = $content -replace $pattern, "`$1`$2$hookCall`$2"
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "✓ Updated $($page.Name)" -ForegroundColor Green
    } else {
        Write-Host "✗ Could not find component pattern in $($page.Name)" -ForegroundColor Red
    }
}

Write-Host "`nDone!" -ForegroundColor Green
