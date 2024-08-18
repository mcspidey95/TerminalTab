$inputFilePath = "status.txt"
$outputFilePath = "./scripts/taskManager/browser_usage.txt"

# Function to get CPU and RAM usage
function Get-BrowserUsage {
    param (
        [string]$processName
    )

    $cpuUsage = 0
    $memUsage = 0
    $memUsagePercentage = 0
    $tabCount = 0
    $interval = 1


    $processes = Get-Process -Name $processName -ErrorAction SilentlyContinue
    if ($processes) {
        $tabCount = $processes.Count

        # Calculate RAM usage
        $memUsage = ($processes | Measure-Object -Property WorkingSet -Sum).Sum / 1MB

        # Get total physical memory
        $totalMem = (Get-WmiObject Win32_ComputerSystem).TotalPhysicalMemory / 1MB

        # Calculate RAM usage percentage
        $memUsagePercentage = [math]::Round(($memUsage / $totalMem) * 100, 2)

        # Measure CPU usage
        $startTimes = @{}
        foreach ($proc in $processes) {
            $startTimes[$proc.Id] = $proc.TotalProcessorTime
        }

        Start-Sleep -Seconds $interval

        $endTimes = @{}
        foreach ($proc in $processes) {
            $endTimes[$proc.Id] = $proc.TotalProcessorTime
        }

        foreach ($procId in $startTimes.Keys) {
            $cpuTimeDiff = ($endTimes[$procId] - $startTimes[$procId]).TotalSeconds
            $cpuUsage += $cpuTimeDiff
        }

        # Convert CPU usage to percentage
        $cpuUsage = [math]::Round(($cpuUsage / ($interval * $tabCount)) * 100, 2)
    }


    return @{
        CPUUsage = $cpuUsage
        RAMUsagePercentage = $memUsagePercentage
    }
}


$lines = Get-Content $inputFilePath
$browserName = $lines[5].Trim()

# Map browser names to process names
$processName = switch -Wildcard ($browserName) {
    "Brave"        { "brave" }
    "Duck"         { "duckduckgo" }
    "Chrome"       { "chrome" }
    "Firefox"      { "firefox" }
    "Edge"         { "msedge" }
    "Opera"        { "opera" }
    default        { Write-Output "Unsupported browser: $browserName"; exit }
}

# Get browser usage
$usage = Get-BrowserUsage -processName $processName

# Write the results to the output file
$outputContent = @"
Browser: $browserName
CPU: $($usage.CPUUsage)%
RAM: $($usage.RAMUsagePercentage)%
"@

Set-Content -Path $outputFilePath -Value $outputContent

# Write-Output "Browser usage saved to $outputFilePath"