#!/bin/bash

downloadsFolder="$HOME/Downloads"
predefinedDir="$(pwd)/scripts/sortDownloads/folders"

# Array of folders to create if they don't exist
folders=("Installers" "Documents" "Archives" "Images" "Media" "Others")

# Create the necessary folders if they don't already exist
for folder in "${folders[@]}"; do
    if [ ! -d "$downloadsFolder/$folder" ]; then
        # Copy the predefined folder from the predefinedDir to the Downloads folder
        cp -r "$predefinedDir/$folder" "$downloadsFolder/"
        
        iconPath="$predefinedDir/$folder/.icon.png"
        gio set "$downloadsFolder/$folder" metadata::custom-icon "file://$iconPath"
    fi
done

# Move files to their appropriate folders based on file extensions
for file in "$downloadsFolder"/*; do
    if [ -f "$file" ]; then
        ext="${file##*.}"
        ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')  # Convert extension to lowercase

        case "$ext" in
            exe|deb|pkg)
                targetFolder="Installers"
                ;;
            txt|pdf|doc|docx|xls|xlsx|ppt|pptx|odt|ods|odp|csv|rtf|tex|md)
                targetFolder="Documents"
                ;;
            zip|rar|7z|tar|gz)
                targetFolder="Archives"
                ;;
            jpg|jpeg|png|gif|bmp|tiff|ico|webp|svg)
                targetFolder="Images"
                ;;
            mp4|avi|mkv|mov|mp3|wav|m4a)
                targetFolder="Media"
                ;;
            *)
                targetFolder="Others"
                ;;
        esac

        targetFile="$downloadsFolder/$targetFolder/$(basename "$file")"
        # If the file already exists, remove it to avoid conflicts
        [ -e "$targetFile" ] && rm -f "$targetFile"
        # Move the file to the appropriate folder
        mv "$file" "$downloadsFolder/$targetFolder/"
    fi
done

exit 0