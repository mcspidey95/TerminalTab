const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8008; //change port if you want to
let isSorting = false;

app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));


exec(`cscript //nologo "${"status.vbs"}"`)

function BrowserStats() {
  exec('powershell.exe -ExecutionPolicy Bypass -File "./scripts/taskManager/usage.ps1"');
}
setInterval(BrowserStats, 2177);

function autoSort() {
  if(isSorting) return;
  isSorting = true;

  fs.readFile('./scripts/sortDownloads/sort.txt', 'utf8', (err, data) => {
    const toggle = data;

    if(toggle === 'on') {
      fs.readFile('./scripts/taskManager/browser_usage.txt', 'utf8', (err, data1) => {
        if(!data1.trim()) return;
        const usage = data1.split('\n');

        if(usage[4].trim() == 'Downloads: True') {

          setTimeout(() => {
            exec(`cscript //nologo "${"scripts/sortDownloads/autoSort.vbs"}"`);
            isSorting = false;
          }, 50000);
        }
        else {
          isSorting = false;
        }
      });
    }
  });
}
setInterval(() => {
  if(!isSorting) autoSort();
}, 10000);


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

  fs.writeFile('./scripts/cmd/command.txt', command, (err) => {})
  const absolutePath = path.resolve("./scripts/cmd/cmd.vbs");
  
  exec(`cscript //nologo "${absolutePath}"`);
});

app.get('/auto-sort', (req) => {
  const toggle = req.query.toggle;

  fs.writeFile('./scripts/sortDownloads/sort.txt', toggle, (err) => {})
});

app.get('/search', async (req, res) => {
  let input = req.query.q;

  const response = await fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(input)}`);
  const data = await response.json();

  res.json(data);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});