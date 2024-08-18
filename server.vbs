Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
scriptPath = FSO.GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = scriptPath
WshShell.Run "cmd /c node server.js", 0, True
Set WshShell = Nothing
Set FSO = Nothing