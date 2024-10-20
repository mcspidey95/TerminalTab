#!/bin/bash

# Path to the file containing the command
commandFile="./scripts/cmd/command.txt"

# Read the command from the file
cmdCommand=$(cat "$commandFile")

# Function to detect the terminal emulator
open_terminal() {
    if command -v gnome-terminal &> /dev/null; then
        gnome-terminal -- "$@"
    elif command -v xfce4-terminal &> /dev/null; then
        xfce4-terminal -- "$@"
    elif command -v konsole &> /dev/null; then
        konsole -e "$@"
    elif command -v xterm &> /dev/null; then
        xterm -e "$@"
    else
        echo "No supported terminal emulator found!"
        exit 1
    fi
}

# Check if the command is "cmd", otherwise execute the command
if [ "$cmdCommand" == "bash" ]; then
    # Open a new terminal window without executing any command
    open_terminal
else
    # Execute the command in a new terminal and keep it open
    open_terminal bash -c "$cmdCommand; exec bash"
fi
