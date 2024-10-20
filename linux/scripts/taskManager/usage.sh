#!/bin/bash

# Define input and output file paths
inputFilePath="status.txt"
outputFilePath="./scripts/taskManager/browser_usage.txt"

# Function to get CPU and RAM usage of a process
get_browser_usage() {
    local process_name="$1"
    local cpu_usage=0
    local mem_usage=0
    local mem_usage_percentage=0

    # Get the number of CPU cores
    local cpu_cores=$(nproc)

    # Get the number of processes (tabs) running for the specified browser
    local tab_count=$(pgrep -c "$process_name")

    if [[ $tab_count -gt 0 ]]; then
        # Use 'top' to get real-time CPU usage of the browser process and normalize it by core count
        cpu_usage=$(top -b -n 1 | grep "$process_name" | awk -v cores="$cpu_cores" '{sum+=$9} END {printf "%.2f", sum / cores}')

        # Get total memory usage of the browser in MB
        mem_usage=$(ps -C "$process_name" --no-headers -o rss | awk '{sum+=$1} END {print sum / 1024}')

        # Get the total physical memory of the system in MB
        local total_physical_mem=$(grep MemTotal /proc/meminfo | awk '{print $2 / 1024}')

        # Calculate the memory usage percentage
        mem_usage_percentage=$(awk "BEGIN {printf \"%.2f\", ($mem_usage / $total_physical_mem) * 100}")
    fi

    echo "$cpu_usage" "$mem_usage_percentage"
}

# Read the browser name from the input file
browser_name=$(sed -n '6p' "$inputFilePath" | xargs)

# Map the browser name to its process name in Linux
process_name=""
case "$browser_name" in
    "Brave") process_name="brave" ;;
    "Duck") process_name="duckduckgo" ;;
    "Chrome") process_name="chrome" ;;
    "Firefox") process_name="firefox" ;;
    "Edge") process_name="microsoft-edge" ;;
    "Opera") process_name="opera" ;;
    *) echo "Browser not supported"; exit 1 ;;
esac

# Check if there are any files in the Downloads directory
downloads_path="$HOME/Downloads"
file_exists=false

if [[ $(find "$downloads_path" -type f 2>/dev/null | wc -l) -gt 0 ]]; then
    file_exists=true
fi

# Get the browser's CPU and RAM usage
read cpu_usage ram_usage_percentage < <(get_browser_usage "$process_name")

# Write the results to the output file
output_content="$browser_name
$cpu_usage%
$ram_usage_percentage%

Downloads: $file_exists
"

echo "$output_content" > "$outputFilePath"