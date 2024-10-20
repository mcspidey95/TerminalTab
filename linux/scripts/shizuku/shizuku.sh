#!/bin/bash

# Change to the specified directory
cd "./scripts/shizuku" || exit

# Create and write initial status to the file
outputFile="../scriptStatus.txt"
echo "Searching for Device..." > "$outputFile"
echo "0" >> "$outputFile"

# Run the adb command to check connected devices
output=$(adb devices)

# Check if the output contains "unauthorized" or "device"
if [[ "$output" == *"unauthorized"* ]]; then
    echo "Device Unauthorized!" > "$outputFile"
    echo "1" >> "$outputFile"
elif [[ "$output" == *"device"* ]]; then
    # Count the number of lines in the adb devices output
    deviceCount=$(echo "$output" | grep -c "device")

    if (( deviceCount > 1 )); then
        echo "Device Connected!" > "$outputFile"
        echo "0" >> "$outputFile"

        # Run the shell script on the connected device
        adb shell sh /storage/emulated/0/Android/data/moe.shizuku.privileged.api/start.sh

        sleep 3
        echo "Shizuku Enabled!" > "$outputFile"
        echo "1" >> "$outputFile"
    else
        echo "Device Not Found!" > "$outputFile"
        echo "1" >> "$outputFile"
    fi
else
    # Write the raw adb output if no device or unauthorized message is found
    echo "$output" > "$outputFile"
    echo "1" >> "$outputFile"
fi

# Wait for a short duration before cleaning up
sleep 1

# Clean up the status file
rm -f "../scriptStatus.txt"