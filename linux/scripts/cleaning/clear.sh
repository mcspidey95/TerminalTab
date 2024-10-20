#!/bin/bash

# Define the output file for status updates
outputFile="./scripts/scriptStatus.txt"

{
    echo "Linux isn't stupid "
    echo "0"
} > "$outputFile"

sleep 3

{
    echo "unlike windows （。々°）"
    echo "1"
} > "$outputFile"

sleep 1
rm -f "$outputFile"