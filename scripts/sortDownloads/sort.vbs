Option Explicit

Dim fso, scriptPath, objShell, downloadsFolder, predefinedDir, outputFile, folder
Set fso = CreateObject("Scripting.FileSystemObject")
Set objShell = CreateObject("WScript.Shell")

downloadsFolder = objShell.ExpandEnvironmentStrings("%USERPROFILE%") & "\Downloads"
scriptPath = fso.GetParentFolderName(WScript.ScriptFullName)
predefinedDir = fso.BuildPath(scriptPath, "folders")

Set outputFile = fso.CreateTextFile("./scripts/scriptStatus.txt", True)
outputFile.WriteLine("Sorting...")
outputFile.WriteLine("0")
outputFile.Close

WScript.Sleep 3000

Dim folders
folders = Array("Installers", "Documents", "Archives", "Images", "Media", "Others")

For Each folder In folders
    If Not fso.FolderExists(downloadsFolder & "\" & folder) Then
        ' Copy the folder from the predefined directory to the Downloads folder
        fso.CopyFolder predefinedDir & "\" & folder, downloadsFolder & "\"
        objShell.CurrentDirectory = downloadsFolder
        objShell.Run "cmd /c attrib +s " & folder, 0, True
    End If
Next

' Move files to the appropriate folders
Dim file, ext, targetFile
For Each file In fso.GetFolder(downloadsFolder).Files
    ext = LCase(fso.GetExtensionName(file.Name))
    
    Select Case ext
        Case "exe", "msi", "dmg"
            targetFile = downloadsFolder & "\Installers\" & file.Name
            If fso.FileExists(targetFile) Then fso.DeleteFile targetFile, True
            file.Move downloadsFolder & "\Installers\" & file.Name
        Case "txt", "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"
            targetFile = downloadsFolder & "\Documents\" & file.Name
            If fso.FileExists(targetFile) Then fso.DeleteFile targetFile, True
            file.Move downloadsFolder & "\Documents\" & file.Name
        Case "zip", "rar", "7z", "tar", "gz"
            targetFile = downloadsFolder & "\Archives\" & file.Name
            If fso.FileExists(targetFile) Then fso.DeleteFile targetFile, True
            file.Move downloadsFolder & "\Archives\" & file.Name
        Case "jpg", "jpeg", "png", "gif", "bmp", "tiff", "ico", "webp"
            targetFile = downloadsFolder & "\Images\" & file.Name
            If fso.FileExists(targetFile) Then fso.DeleteFile targetFile, True
            file.Move downloadsFolder & "\Images\" & file.Name
        Case "mp4", "avi", "mkv", "mov", "mp3", "wav", "m4a"
            targetFile = downloadsFolder & "\Media\" & file.Name
            If fso.FileExists(targetFile) Then fso.DeleteFile targetFile, True
            file.Move downloadsFolder & "\Media\" & file.Name
        Case Else
            targetFile = downloadsFolder & "\Others\" & file.Name
            If fso.FileExists(targetFile) Then fso.DeleteFile targetFile, True
            file.Move downloadsFolder & "\Others\" & file.Name
    End Select
Next

Set outputFile = fso.CreateTextFile("./scripts/scriptStatus.txt", True)
outputFile.WriteLine("Downloads Sorted!")
outputFile.WriteLine("1")
outputFile.Close

WScript.Sleep 500
fso.DeleteFile "./scripts/scriptStatus.txt", True

Set fso = Nothing
Set shell = Nothing
Set outputFile = Nothing