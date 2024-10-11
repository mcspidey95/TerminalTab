Option Explicit

Dim resultsFile, fso, shell, result

Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

Function IsFolderInstalledByRegistry(folderSubstring)
    On Error Resume Next
    Dim objRegistry, arrSubKeys, subkeyName, folderExists
    folderExists = False

    ' Create a WMI object to access the registry
    Set objRegistry = GetObject("winmgmts:\\.\root\default:StdRegProv")

    ' Define the registry hive and the fixed path to search
    Dim hive, path
    hive = &H80000001 ' HKEY_CURRENT_USER
    path = "Software\Classes\Local Settings\Software\Microsoft\Windows\CurrentVersion\AppModel\Repository\Packages\" ' Replace "ExamplePath" with your actual path

    ' Enumerate the subkeys under the specified path
    objRegistry.EnumKey hive, path, arrSubKeys

    ' Check each subkey to see if it matches the folder substring
    If Not IsNull(arrSubKeys) Then
        For Each subkeyName In arrSubKeys
            If InStr(1, subkeyName, folderSubstring, vbTextCompare) > 0 Then
                folderExists = True
                Exit For
            End If
        Next
    End If

    ' Return whether the folder with the substring exists or not
    IsFolderInstalledByRegistry = folderExists

    ' Clean up
    Set objRegistry = Nothing
    On Error GoTo 0
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


Dim whatsappInstalled
whatsappInstalled = IsFolderInstalledByRegistry("WhatsAppDesktop")

Dim teamsInstalled
teamsInstalled = IsFolderInstalledByRegistry("MSTeams")


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