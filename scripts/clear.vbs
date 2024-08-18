' Check for administrative privileges
If Not WScript.Arguments.Named.Exists("elevated") Then
    CreateObject("Shell.Application").ShellExecute "wscript.exe", Chr(34) & WScript.ScriptFullName & Chr(34) & " /elevated", "", "runas", 1
    WScript.Quit
End If

' Create FileSystemObject and Shell object
Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objShell = CreateObject("WScript.Shell")

' Get the user profile path
userProfilePath = objShell.ExpandEnvironmentStrings("%USERPROFILE%")

Sub DeleteContentsInFolder(folderPath)
    On Error Resume Next
        
    Set folder = objFSO.GetFolder(folderPath)
        
    ' Delete all files
    For Each file In folder.Files
        objFSO.DeleteFile file.Path, True
    Next
        
    ' Delete all subfolders
    For Each subfolder In folder.Subfolders
        objFSO.DeleteFolder subfolder.Path, True
    Next
    
    On Error GoTo 0
End Sub

' Clear the specified folders
DeleteContentsInFolder("C:\Windows\Temp")
DeleteContentsInFolder(userProfilePath & "\AppData\Local\Temp")
DeleteContentsInFolder("C:\Windows\Prefetch")
DeleteContentsInFolder("C:\Windows\SoftwareDistribution")
DeleteContentsInFolder("C:\Windows\WinSxS\Temp")
DeleteContentsInFolder(userProfilePath & "\AppData\Local\Google\Chrome\User Data\Default\Cache")
DeleteContentsInFolder(userProfilePath & "\AppData\Local\Microsoft\Edge\User Data\Default\Cache")
DeleteContentsInFolder(userProfilePath & "\AppData\Local\Mozilla\Firefox\Profiles")
DeleteContentsInFolder("C:\ProgramData\Microsoft\Windows\WER")
DeleteContentsInFolder(userProfilePath & "\AppData\Local\Microsoft\Windows\WER")

objShell.Run "cmd.exe /c PowerShell.exe -NoProfile -Command ""Clear-RecycleBin -Confirm:$false""", 0, True

'objshell.Run "powershell.exe -ExecutionPolicy Bypass -File ""./scripts/memoryGone.ps1""", 0, True

currentDirectory = objFSO.GetParentFolderName(WScript.ScriptFullName)
psFile = objFSO.BuildPath(currentDirectory, "memoryGone.ps1")
objShell.Run "powershell.exe -ExecutionPolicy Bypass -File """ & psFile & """", 0, True

'WScript.Echo "Cleanup complete!"
