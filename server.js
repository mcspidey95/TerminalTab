const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8008; //change port if you want to

app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));


exec(`cscript //nologo "${"status.vbs"}"`)

function BrowserStats() {
  exec('powershell.exe -ExecutionPolicy Bypass -File "./scripts/taskManager/usage.ps1"');
}
setInterval(BrowserStats, 2000);


app.post('/scripts', (req) => {

  const vbscriptPath = req.body.vbscriptPath;
  const absolutePath = path.resolve(vbscriptPath);
  
  exec(`cscript //nologo "${absolutePath}"`);
});


app.get('/browser-info', (req) => {
  const browser = req.query.browser;

  fs.readFile('status.txt', 'utf8', (err, data) => {

    const lines = data.split('\n');
    lines[5] = browser;

    fs.writeFile('status.txt', lines.join('\n'), (err) => {})
  });
});

app.get('/cmd', (req) => {
  const command = req.query.command;

  fs.readFile('./scripts/command.txt', 'utf8', (err, data) => {

    fs.writeFile('status.txt', command, (err) => {})
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});