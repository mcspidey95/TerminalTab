$processes = Get-Process

# Get opened apps
$openedApps = $processes | Where-Object {$_.MainWindowHandle -ne 0}

# Get startup apps
$startupApps = Get-CimInstance Win32_StartupCommand | Select-Object -ExpandProperty Command

$exceptions = @($openedApps.ProcessName) + @($startupApps | ForEach-Object {($_ -split '\\')[-1]})

# Create Exceptions List
$exceptions += "cmd", "powershell"

# Close unnecessary background processes
foreach ($process in $processes) {
    if ($exceptions -notcontains $process.ProcessName -and $process.MainWindowHandle -eq 0) {
        try {
            $process.Kill()
            Write-Host "Closed process: $($process.ProcessName)"
        } catch {
            Write-Host "Failed to close process: $($process.ProcessName)"
        }
    }
}

# Clear cached memory
Clear-ProcessMemory

# Get unused memory
$unusedMemory = (Get-Process -Id $PID).WorkingSet64

# Release unused memory
[Runtime.InteropServices.Marshal]::FreeHGlobal($unusedMemory)

# Reclaim memory
Clear-ProcessMemory

# Clear DNS cache
Clear-DnsClientCache