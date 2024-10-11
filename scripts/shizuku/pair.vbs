Option Explicit
Dim fso, shell, outputFile, devicesExec, devicesOutput, deviceLines, lastLine, i

Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

shell.CurrentDirectory = "./scripts/shizuku"

Set outputFile = fso.CreateTextFile("../scriptStatus.txt", True)
outputFile.WriteLine("Searching for Device...")
outputFile.WriteLine("0")
outputFile.Close

' Run the adb devices command and capture the output
Set devicesExec = shell.Exec("cmd /c adb devices")
Do While devicesExec.Status = 0
    WScript.Sleep 100
Loop
devicesOutput = devicesExec.StdOut.ReadAll()

deviceLines = Split(devicesOutput, vbCrLf)

' Get the last non-empty line of the output
lastLine = ""
For i = UBound(deviceLines) To 0 Step -1
    If Trim(deviceLines(i)) <> "" Then
        lastLine = deviceLines(i)
        Exit For
    End If
Next

Set outputFile = fso.CreateTextFile("../scriptStatus.txt", True)

If LCase(Left(lastLine, 3)) = "adb" And _
   LCase(Right(lastLine, 6)) = "device" Then
    outputFile.WriteLine("Paired successfully")
    outputFile.WriteLine("1")
Else
    outputFile.WriteLine("Device Not Found")
    outputFile.WriteLine("1")
End If

outputFile.Close

shell.Exec("cmd /c adb tcpip 5555")

WScript.Sleep 500
fso.DeleteFile "../scriptStatus.txt", True