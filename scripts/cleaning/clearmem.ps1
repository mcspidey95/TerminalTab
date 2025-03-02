# Get all running processes
$processes = Get-Process

# Get opened apps (apps with a visible window)
$openedApps = $processes | Where-Object { $_.MainWindowHandle -ne 0 }

# Get startup apps
$startupApps = Get-CimInstance Win32_StartupCommand | Select-Object -ExpandProperty Command

# Extract process names from startup app paths
$startupProcessNames = $startupApps | ForEach-Object { ($_ -split '\\')[-1] -replace '\.exe$', '' }

# Define exceptions (apps to keep running)
$exceptions = @($openedApps.ProcessName) + $startupProcessNames + "cmd", "powershell", "explorer", "svchost", "winlogon", "lsass"

# Close unnecessary background processes
foreach ($process in $processes) {
    if ($exceptions -notcontains $process.ProcessName -and $process.MainWindowHandle -eq 0) {
        try {
            $process.Kill()
            Write-Host "Closed process: $($process.ProcessName)"
        } catch {
            Write-Host "Failed to close process: $($process.ProcessName) - $($_.Exception.Message)"
        }
    }
}

# Optimize memory usage safely
[System.GC]::Collect()
[System.GC]::WaitForPendingFinalizers()
[System.Diagnostics.Process]::GetCurrentProcess().MinWorkingSet = 0
Write-Host "Memory optimized."