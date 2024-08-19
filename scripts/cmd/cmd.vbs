Dim fso, file, cmdCommand, shell


Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("./scripts/cmd/command.txt", 1)

cmdCommand = file.ReadAll
file.Close

Set shell = CreateObject("WScript.Shell")

If cmdCommand = "cmd" Then
    shell.Run "cmd.exe", 1, False
Else
    shell.Run "cmd.exe /k " & cmdCommand, 1, True
End If