Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objShell = CreateObject("WScript.Shell")

Set outputFile = objFSO.CreateTextFile("./scripts/scriptStatus.txt", True)
outputFile.WriteLine("Cleaning Cache...")
outputFile.WriteLine("0")
outputFile.Close

WScript.Sleep 3000

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
DeleteContentsInFolder("C:\ProgramData\Microsoft\Windows\WER")
DeleteContentsInFolder(userProfilePath & "\AppData\Local\Microsoft\Windows\WER")

objShell.Run "cmd.exe /c PowerShell.exe -NoProfile -Command ""Clear-RecycleBin -Confirm:$false""", 0, True

Set outputFile = objFSO.CreateTextFile("./scripts/scriptStatus.txt", True)
outputFile.WriteLine("Cleaning Memory...")
outputFile.WriteLine("0")
outputFile.Close

WScript.Sleep 3000

currentDirectory = objFSO.GetParentFolderName(WScript.ScriptFullName)
psFile = objFSO.BuildPath(currentDirectory, "clearmem.ps1")
objShell.Run "powershell.exe -ExecutionPolicy Bypass -File """ & psFile & """", 0, True

Set outputFile = objFSO.CreateTextFile("./scripts/scriptStatus.txt", True)
outputFile.WriteLine("Cleanup complete!")
outputFile.WriteLine("1")
outputFile.Close

WScript.Sleep 500
objFSO.DeleteFile "./scripts/scriptStatus.txt", True

Set objFSO = Nothing
Set objShell = Nothing
Set outputFile = Nothing