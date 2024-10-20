#!/bin/bash

# Function to check if an application is installed as a Flatpak or through other means
function is_installed {
    local app_name=$1

    # Check if the app is installed as a Flatpak
    if flatpak list | grep -iq "$app_name"; then
        echo "True"
    # Check if the app is installed manually (not as Flatpak) using 'which'
    elif which "$app_name" > /dev/null 2>&1; then
        echo "True"
    else
        echo "False"
    fi
}

# Check the installation status of WhatsApp, Discord, Teams, and Stremio
whatsapp_installed=$(is_installed "whatsie")
discord_installed=$(is_installed "discord")
teams_installed=$(is_installed "portal for teams")
stremio_installed=$(is_installed "stremio")

# Write the results to a status file
{
    echo "$whatsapp_installed"
    echo "$discord_installed"
    echo "$teams_installed"
    echo "$stremio_installed"
    echo ""
    echo "undefined"
} > status.txt

