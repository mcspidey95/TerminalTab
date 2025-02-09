const express = require('express');
const { exec, spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8008; //change port if you want to
let isSorting = false;

app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

const homeDir = os.homedir();


exec('./status.sh')

function BrowserStats() {
  exec('./scripts/taskManager/usage.sh');
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

        if(usage[4].trim() == 'Downloads: true') {

          setTimeout(() => {
            exec('scripts/sortDownloads/autoSort.sh');
            isSorting = false;
          }, 300000);
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
  
  exec(`HOME=${homeDir} bash "${absolutePath}"`);
});

let progressClients = [];

app.get("/progress", (req, res) => {
  console.log("New SSE client connected.");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  progressClients.push(res); // Store client connection

  req.on("close", () => {
    progressClients = progressClients.filter(client => client !== res);
  });
});

// Helper function to send updates
function sendProgressUpdate(message) {
  progressClients.forEach(client => client.write(`data: ${message}\n\n`));
}

// Download handler
app.post("/download", (req, res) => {
  const { url, type } = req.body;
  const scriptPath = path.join(
    path.resolve("./scripts/youtube/"),
    type === "audio" ? "downloadAudio.py" : "downloadVideo.py"
  );
  const pythonProcess = spawn("python3", ["-u", scriptPath, url]);

  pythonProcess.stdout.on("data", (data) => {
    const message = data.toString().trim();
    console.log(`Python Output: ${message}`);
    
    if (message.startsWith("PROGRESS:")) {
      const progress = message.replace("PROGRESS:", "").trim();
      sendProgressUpdate(progress); 
    }
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
    sendProgressUpdate("Donee");
  });

  res.send("Download started successfully!");
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
  const absolutePath = path.resolve("./scripts/cmd/cmd.sh");
  
  exec(`bash "${absolutePath}"`);
});

app.get('/auto-sort', (req) => {
  const toggle = req.query.toggle;

  fs.writeFile('./scripts/sortDownloads/sort.txt', toggle, (err) => {})
});

app.get('/search', async (req, res) => {
  let input = req.query.q;

  try {
    const response = await fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(input)}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json(input);
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});