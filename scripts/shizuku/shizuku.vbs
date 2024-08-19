Option Explicit
Dim outputFile, shell, fso, exec, output

Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

shell.CurrentDirectory = "./scripts/shizuku"

Set outputFile = fso.CreateTextFile("../scriptStatus.txt", True)
outputFile.WriteLine("Searching for Device...")
outputFile.WriteLine("0")
outputFile.Close

Set exec = shell.Exec("cmd /c adb devices")
output = exec.StdOut.ReadAll

Set outputFile = fso.CreateTextFile("../scriptStatus.txt", True)

If InStr(output, "unauthorized") > 0 Then  
    outputFile.WriteLine("Device Unauthorized!")
    outputFile.WriteLine("1")
    outputFile.Close
ElseIf InStr(output, "device") > 0 Then

    If UBound(Split(output, vbCrLf)) > 2 Then
        outputFile.WriteLine("Device Connected!")
        outputFile.WriteLine("0")
        outputFile.Close

        shell.Run "cmd /c adb shell sh /storage/emulated/0/Android/data/moe.shizuku.privileged.api/start.sh", 0, True

        WScript.Sleep 3000
        Set outputFile = fso.CreateTextFile("../scriptStatus.txt", True)
        outputFile.WriteLine("Shizuku Enabled!")
        outputFile.WriteLine("1")
        outputFile.Close
    Else
        outputFile.WriteLine("Device Not Found!")
        outputFile.WriteLine("1")
        outputFile.Close
    End If
Else
    outputFile.WriteLine(output)
    outputFile.WriteLine("1")
    outputFile.Close
End If


WScript.Sleep 500
fso.DeleteFile "../scriptStatus.txt", True

Set fso = Nothing
Set shell = Nothing
Set outputFile = Nothing