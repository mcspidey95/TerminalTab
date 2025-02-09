Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
scriptPath = FSO.GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = scriptPath

logFile = scriptPath & "\server.log"
WshShell.Run "cmd /c node server.js > """ & logFile & """ 2>&1", 0, True

Set WshShell = Nothing
Set FSO = Nothing