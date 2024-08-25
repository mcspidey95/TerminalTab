Option Explicit

Dim resultsFile, fso, shell, result

Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

Function IsInstalledByPath(exePath)
    If fso.FileExists(exePath) Then
        IsInstalledByPath = True
    Else
        IsInstalledByPath = False
    End If
End Function

Function IsInstalledByRegistry(regPath)
    On Error Resume Next
    Dim installed
    installed = shell.RegRead(regPath)
    If Err.Number = 0 Then
        IsInstalledByRegistry = True
    Else
        IsInstalledByRegistry = False
    End If
    On Error GoTo 0
End Function


Dim whatsappExePath
whatsappExePath = "C:\Program Files\WindowsApps\5319275A.WhatsAppDesktop_2.2433.3.0_x64__cv1g1gvanyjgm\WhatsApp.exe"

Dim whatsappInstalled
whatsappInstalled = IsInstalledByPath(whatsappExePath)


Dim teamsExePath
teamsExePath = "C:\Program Files\WindowsApps\MSTeams_24193.1805.3040.8975_x64__8wekyb3d8bbwe\ms-teams.exe"

Dim teamsInstalled
teamsInstalled = IsInstalledByPath(teamsExePath)


Dim discordRegPath, stremioRegPath

discordRegPath = "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\Discord\DisplayName"
stremioRegPath = "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\Stremio\DisplayName"

Dim discordInstalled, stremioInstalled
discordInstalled = IsInstalledByRegistry(discordRegPath)
stremioInstalled = IsInstalledByRegistry(stremioRegPath)


result = whatsappInstalled & vbCrLf
result = result & discordInstalled & vbCrLf
result = result & teamsInstalled & vbCrLf
result = result & stremioInstalled & vbCrLf


Dim outputFile
Set outputFile = fso.CreateTextFile("status.txt", True)
outputFile.WriteLine(result)
outputFile.WriteLine("")
outputFile.WriteLine("Unkown")
outputFile.Close

' Cleanup
Set fso = Nothing
Set shell = Nothing
Set outputFile = Nothing