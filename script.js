let updatedSVGDataUrl = '';
let user = '';
let themeName = '';
let color1 = '';
let color2 = '';
let color3 = '';
let colorSearch = '';
let engine = '';
let engineUrl = '';
let searchLength = 0;
let searchValue = '';
let isSidebarOpen = false;
let count = 0;
let splitCount = 0;
let getSuggestions = true;
let remainingText = '';
let historyCounter = 0;
let timeout;
let downloadformat = 'video';
let is100 = false;
let shuffle;

document.addEventListener('DOMContentLoaded', () => {
  
  var search = document.getElementById('search');
  var search2 = document.getElementById('search2');
  const cursor = document.getElementById('cursor')
  const numberOfIcons = 200; // Adjust the number of icons
  const iconSpacing = 50;
  const iconGrids = document.querySelectorAll('.icon-grid');
  const wrapper = document.querySelector('.icon-grid-wrapper');
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const container = document.getElementById('container');
  const katze = document.getElementById('katze');
  const form = document.querySelector('form');
  const formusername = document.getElementById('username');
  const formtheme = document.getElementById('theme');
  const formengine = document.getElementById('searchengine');
  const formfield1name = document.getElementById('field1name');
  const formfield1link = document.getElementById('field1link');
  const formfield2name = document.getElementById('field2name');
  const formfield2link = document.getElementById('field2link');
  const formfield3name = document.getElementById('field3name');
  const formfield3link = document.getElementById('field3link');
  const formfield4name = document.getElementById('field4name');
  const formfield4link = document.getElementById('field4link');
  const formbutton = document.getElementById('save');
  const formicon = document.getElementById('menu-toggle');
  const forminput = document.querySelectorAll('.form-group input');
  const link1 = document.getElementById('filecr');
  const link2 = document.getElementById('fitgirl');
  const link3 = document.getElementById('mom');
  const link4 = document.getElementById('dad');
  const mp3 = document.getElementById('mp3Icon');
  const mp4 = document.getElementById('mp4Icon');
  const dropdownBtn = document.querySelector('.dropdown-btn');
  let progressContainer = document.getElementById("progress-container");
  let progressBar = document.getElementById("progress-bar");
  let progressName = document.getElementById("download-name");
  let progressSpeed = document.getElementById("download-speed");

  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  historyCounter = searchHistory.length;

  const dropdownItems = document.querySelectorAll('.dropdown-content ul li');

  dropdownItems.forEach(item => {
    item.addEventListener('click', function () {
      let selectedValue = this.getAttribute('data-value');
      let theme = themes[selectedValue];
      shuffle = false;

      fetchSvgDataUrl('./icons/shuffle.svg', '#c5c8c6').then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        document.querySelector(".shuffle-icon").src = updatedSVGDataUrl;
      });
  
      // Update the dropdown button text and color preview
      dropdownBtn.innerHTML = `<span class="color-preview" style="background: ${theme.color1};"></span> ${theme.name} <img src="/icons/shuffle.svg" alt="shuffle" class="shuffle-icon">`;
      dropdownBtn.setAttribute('data-value', selectedValue);

      color1 = theme.color1;
      color2 = theme.color2;
      color3 = theme.color3;
      colorSearch = theme.colorSearch

    
      const cat1 = document.getElementById('cat1');
      cat1.style.color = color1;
      const cat2 = document.getElementById('cat2');
      cat2.style.color = color2;
      const cat3 = document.getElementById('cat3');
      cat3.style.color = color3;
      const cat4 = document.getElementById('cat4');
      cat4.style.color = color3;
      const cat5 = document.getElementById('cat5');
      cat5.style.color = color1;
      const cat6 = document.getElementById('cat6');
      cat6.style.color = color2;

      username_.style.color = colorSearch;
      username__.style.color = colorSearch;
      search.style.color = colorSearch;
      search2.style.color = colorSearch;
      cursor.style.color = colorSearch;
      cursor.style.backgroundColor = colorSearch;

      var menu1 = document.getElementsByClassName('google');
      Array.from(menu1).forEach((item) => {
        item.style.setProperty('--menu1', color1);
      });
      var menu2 = document.getElementsByClassName('stream');
      Array.from(menu2).forEach((item) => {
        item.style.setProperty('--menu2', color2);
      });
      var menu3 = document.getElementsByClassName('work');
      Array.from(menu3).forEach((item) => {
        item.style.setProperty('--menu3', color3);
      });
      var menu4 = document.getElementsByClassName('media');
      Array.from(menu4).forEach((item) => {
        item.style.setProperty('--menu4', color3);
      });
      var menu5 = document.getElementsByClassName('user');
      Array.from(menu5).forEach((item) => {
        item.style.setProperty('--menu5', color1);
      });
      var menu6 = document.getElementsByClassName('tools');
      Array.from(menu6).forEach((item) => {
        item.style.setProperty('--menu6', color2);
      });
    });
  });
  

  let themes = [
    {
        name: 'Sunset',
        color1: '#ff746c',
        color2: '#ffc067',
        color3: '#ffee8c',
        colorSearch: '#b5bd68'
    },
    {
        name: 'Forest',
        color1: '#52D681',
        color2: '#B5FF7D',
        color3: '#E6FF94',
        colorSearch: '#00AD7C'
    },
    {
        name: 'Tropical',
        color1: '#FD9B63',
        color2: '#E7D37F',
        color3: '#81A263',
        colorSearch: '#497f44'
    },
    {
        name: 'Galaxy',
        color1: '#aa83ff',
        color2: '#c081d5',
        color3: '#b0fbe7',
        colorSearch: '#fecece'
    },
    {
        name: 'Coffee',
        color1: '#753d29',
        color2: '#b0814f',
        color3: '#f0e2c5',
        colorSearch: '#dab49d'
    },
    {
        name: 'Dusk',
        color1: '#A0B4FF',
        color2: '#D0E3FA',
        color3: '#E0F0FF',
        colorSearch: '#8098D9'
    },
    {
        name: 'Citrus',
        color1: '#FFA500',
        color2: '#FFD86B',
        color3: '#FFE5B4',
        colorSearch: '#CC8400'
    },
    {
        name: 'Berry',
        color1: '#EE82EE',
        color2: '#F0A0FF',
        color3: '#F8C8FF',
        colorSearch: '#BB66CC'
    },
    {
        name: 'Glacier',
        color1: '#ADD8E6',
        color2: '#87CEEB',
        color3: '#4682B4',
        colorSearch: '#2E5A88'
    },
    {
        name: 'Honeycomb',
        color1: '#FFD700',
        color2: '#FFFFE0',
        color3: '#EEE8AA',
        colorSearch: '#CCAA00'
    },
    {
        name: 'Among Us',
        color1: '#E63946',
        color2: '#2A9D8F',
        color3: '#F4A261',
        colorSearch: '#C02026'
    },
    {
        name: 'Oshi no Ko',
        color1: '#f8d3e3',
        color2: '#f3dda4',
        color3: '#42bbc2',
        colorSearch: '#da3b71'
    },
    {
        name: 'Demon Slayer',
        color1: '#7c3b43',
        color2: '#58c29e',
        color3: '#fad4af',
        colorSearch: '#593535'
    },
    {
        name: 'Cyberpunk',
        color1: '#40E0D0',
        color2: '#FF69B4',
        color3: '#FFD700',
        colorSearch: '#20A0A0'
    },
    {
        name: 'Arcane',
        color1: '#ae5df1',
        color2: '#ff02fd',
        color3: '#05fbd4',
        colorSearch: '#D0A0E2'
    },
    {
        name: 'Barbie',
        color1: '#ff579f',
        color2: '#FC819E',
        color3: '#E3A5C7',
        colorSearch: '#FFF3C7'
    },
    {
        name: 'Deadpool & Wolvie',
        color1: '#ba4a47',
        color2: '#cca836',
        color3: '#788aa0',
        colorSearch: '#c4ccd6'
    },
    {
        name: "The Hulk",
        color1: '#50B498',
        color2: '#9CDBA6',
        color3: '#DEF9C4',
        colorSearch: '#468585'
    },
    {
        name: 'Stranger Things',
        color1: '#DC143C',
        color2: '#FF6347',
        color3: '#FFA07A',
        colorSearch: '#AA0D28'
    },
];
  
  if(localStorage.getItem('settings') === null) {
    localStorage.setItem('settings', JSON.stringify({
      username: 'user',
      theme: 1,
      searchengine: 'google',
      field1name: 'filecr',
      field1link: 'https://filecr.com/',
      field2name: 'fitgirl',
      field2link: 'https://fitgirl-repacks.site/',
      field3name: 'your mom',
      field3link: 'https://youtu.be/sxXs0Yy5-0Y?si=jWbL3JAXe33qxExh',
      field4name: '',
      field4link: '',
    }));
  }

  var json = localStorage.getItem('settings');
  var obj = JSON.parse(json);
  console.log(obj);
  shuffle = obj.shuffle || false;

    for(key in obj) {
      if(key === 'username') {
        user = obj[key];

        formusername.value = obj[key];
      }
      if(key === 'theme') {
        //formtheme.value = obj[key];
        index = shuffle ? shuffledTheme() : parseInt(obj[key]);
        let theme = themes[index];
        themeName = theme.name;
        color1 = theme.color1;
        color2 = theme.color2;
        color3 = theme.color3;
        colorSearch = theme.colorSearch

        dropdownBtn.innerHTML = `<span class="color-preview" style="background: ${color1};"></span> ${themeName} <img src="/icons/shuffle.svg" alt="shuffle" class="shuffle-icon">`;
        dropdownBtn.setAttribute('data-value', obj[key]); // Store selected value
      }
      
      if(key === 'searchengine') {
        engine = obj[key];
        if(engine === 'google') {
          engineUrl = 'https://google.com/search?q=';
        }
        if(engine === 'bing') {
          engineUrl = 'https://www.bing.com/search?q=';
        }
        if(engine === 'ecosia') {
          engineUrl = 'https://www.ecosia.org/search?q=';
        }
        if(engine === 'yahoo') {
          engineUrl = 'https://search.yahoo.com/search?p=';
        }
        if(engine === 'yandex') {
          engineUrl = 'https://yandex.ru/search/?text=';
        }
        if(engine === 'duckduckgo') {
          engineUrl = 'https://duckduckgo.com/?q=';
        }
        if(engine === 'internet archive') {
          engineUrl = 'https://archive.org/search.php?q=';
        }
        if(engine === 'brave') {
          engineUrl = 'https://search.brave.com/search?q=';
        }

        formengine.value = obj[key];
      }
      if(key === 'field1name') {
        link1.innerHTML = obj[key];
        formfield1name.value = obj[key];
      }
      if(key === 'field1link') {
        link1.href = obj[key];
        formfield1link.value = obj[key];
      }
      if(key === 'field2name') {
        link2.innerHTML = obj[key];
        formfield2name.value = obj[key];
      }
      if(key === 'field2link') {
        link2.href = obj[key];
        formfield2link.value = obj[key];
      }
      if(key === 'field3name') {
        link3.innerHTML = obj[key];
        formfield3name.value = obj[key];
      }
      if(key === 'field3link') {
        link3.href = obj[key];
        formfield3link.value = obj[key];
      }
      if(key === 'field4name') {
        link4.innerHTML = obj[key];
        formfield4name.value = obj[key];
      }
      if(key === 'field4link') {
        link4.href = obj[key];
        formfield4link.value = obj[key];
      }
    }


  function getBrowser() {
    const userAgent = navigator.userAgent;

    if (navigator.brave !== undefined) {
        return "Brave";
    } else if (userAgent.indexOf("DuckDuckGo") > -1) {
        return "Duck";
    } else if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Edg") == -1 && userAgent.indexOf("OPR") == -1) {
        return "Chrome";
    } else if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
    } else if (userAgent.indexOf("Edg") > -1) {
        return "Edge";
    } else if (userAgent.indexOf("OPR") > -1 || userAgent.indexOf("Opera") > -1) {
        return "Opera";
    } else {
        return "Unknown";
    }
  }
  fetch(`/browser-info?browser=${getBrowser()}`)

  menuToggle.addEventListener('click', () => {
    
    count++;

    if(count%2 === 0) {
      isSidebarOpen = false;

      const fd = new FormData(form);
      let obj = Object.fromEntries(fd);

      obj["theme"] = dropdownBtn.getAttribute("data-value");
      obj["shuffle"] = shuffle;
      
      const json = JSON.stringify(obj);
      

      if(localStorage.getItem('settings') != json){
        localStorage.setItem('settings', json);

        setTimeout(() => {
          location.reload(true);
        }, 500);
      }
    }
    else {
      isSidebarOpen = true;

      async function getStats(){
        while(isSidebarOpen){
          const getUsage = await fetch('./scripts/taskManager/browser_usage.txt');
          
          const usageFile = await getUsage.text();
          if(!usageFile.trim()) continue;
          const usage = usageFile.split('\n');

          document.getElementById('CPU').innerHTML = usage[1];
          document.getElementById('RAM').innerHTML = usage[2];

          setTimeout(1543);
        }
      }

      getStats();
    }

    sidebar.classList.toggle('open');
    container.classList.toggle('move');
    katze.classList.toggle('move');
  });

  katze.addEventListener('click', () => {
    window.location = 'https://www.nyan.cat/index.php?cat=gb';
  });

  menuToggle.addEventListener('mouseenter', () => {
    fetch(`/browser-info?browser=${getBrowser()}`)
  });

  document.querySelector(".shuffle-icon").addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent dropdown from toggling

    if(shuffle){
      shuffle = false;

      fetchSvgDataUrl('./icons/shuffle.svg', '#c5c8c6').then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        document.querySelector(".shuffle-icon").src = updatedSVGDataUrl;
      });
    }else{
      shuffle = true;

      fetchSvgDataUrl('./icons/shuffle.svg', color2).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        document.querySelector(".shuffle-icon").src = updatedSVGDataUrl;
      });
    }
  });





  window.addEventListener('offline', () => {
    fetchSvgDataUrl('./icons/no-wifi.svg', color2).then(dataUrl => {
      updatedSVGDataUrl = dataUrl;
      formicon.style.background = `url("${updatedSVGDataUrl}")`;
    });
  });
  window.addEventListener('online', () => {
    fetchSvgDataUrl('./icons/wifi.svg', color2).then(dataUrl => {
      updatedSVGDataUrl = dataUrl;
      formicon.style.background = `url("${updatedSVGDataUrl}")`;
    });
  });


  const username_ = document.getElementById('user_');
  username_.innerHTML = user + '@home &gt;';

  const username__ = document.getElementById('user__');
  username__.innerHTML = user + '@home &gt;';

  const title = document.getElementById('title')
  title.innerHTML = user + '@home > newtab';

  const cat1 = document.getElementById('cat1');
  cat1.style.color = color1;
  const cat2 = document.getElementById('cat2');
  cat2.style.color = color2;
  const cat3 = document.getElementById('cat3');
  cat3.style.color = color3;
  const cat4 = document.getElementById('cat4');
  cat4.style.color = color3;
  const cat5 = document.getElementById('cat5');
  cat5.style.color = color1;
  const cat6 = document.getElementById('cat6');
  cat6.style.color = color2;
  

  var menu1 = document.getElementsByClassName('google');
  Array.from(menu1).forEach((item) => {
    item.style.setProperty('--menu1', color1);
  });
  var menu2 = document.getElementsByClassName('stream');
  Array.from(menu2).forEach((item) => {
    item.style.setProperty('--menu2', color2);
  });
  var menu3 = document.getElementsByClassName('work');
  Array.from(menu3).forEach((item) => {
    item.style.setProperty('--menu3', color3);
  });
  var menu4 = document.getElementsByClassName('media');
  Array.from(menu4).forEach((item) => {
    item.style.setProperty('--menu4', color3);
  });
  var menu5 = document.getElementsByClassName('user');
  Array.from(menu5).forEach((item) => {
    item.style.setProperty('--menu5', color1);
  });
  var menu6 = document.getElementsByClassName('tools');
  Array.from(menu6).forEach((item) => {
    item.style.setProperty('--menu6', color2);
  });

  forminput.forEach(input => {
    input.style.setProperty('--color', color2);
  });
  
  username_.style.color = colorSearch;
  username__.style.color = colorSearch;
  search.style.color = colorSearch;
  search2.style.color = colorSearch;
  cursor.style.color = colorSearch;
  cursor.style.backgroundColor = colorSearch;

  document.documentElement.style.setProperty('--mouseHighlight', color3);
  document.getElementById('system-stats').style.setProperty('--stats', color1);
  document.getElementById('system-stats').style.setProperty('--stats-hover', color3);
  document.getElementById('CPU').style.setProperty('--cpu', color2);
  document.getElementById('RAM').style.setProperty('--ram', color2);
  document.getElementById('progress-bar').style.setProperty('--progress', color3);
  document.getElementById('download-speed').style.setProperty('--progress', color3);

  document.querySelectorAll('li > a').forEach(a => {
    a.addEventListener('mouseover', function() {
        const randomTilt = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3); // Random tilt 
        this.parentElement.style.rotate = `${randomTilt}deg`;
    });
    a.addEventListener('mouseout', function() {
      this.parentElement.style.rotate = '0deg';
    });
  });

  const fetchSvgDataUrl = (iconUrl, color) => {
    return fetch(iconUrl)
      .then(response => response.text())
      .then(svgText => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        
        // Set the fill color to yellow
        svgElement.setAttribute('fill', color);
        
        // Serialize the modified SVG back to a string
        const serializer = new XMLSerializer();
        const updatedSVGString = serializer.serializeToString(svgElement);
        return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(updatedSVGString);
      });
  };

  const populateIcons = (iconGrid, iconUrl, size, rotate, size2) => {
    iconGrid.innerHTML = ''; // Clear existing icons
    iconGrid.style.gridGap = `${iconSpacing}px`;

      for (let i = 0; i < numberOfIcons; i++) {
        const icon = document.createElement('div');
        icon.classList.add('icon');
        icon.style.background = `url("${iconUrl}")`; // Set the new icon'
        icon.style.backgroundSize = 'cover';
        icon.style.width = size2 || size;
        icon.style.height = size;
        icon.style.rotate = rotate;
        icon.style.animationDelay = `${Math.random() * 2}s`; // Stagger animation start times
        iconGrid.appendChild(icon);
      }
  };

  if (shuffle) {
    fetchSvgDataUrl('./icons/shuffle.svg', color2).then(dataUrl => {
      updatedSVGDataUrl = dataUrl;
      document.querySelector(".shuffle-icon").src = updatedSVGDataUrl;
    });
  } else {
    fetchSvgDataUrl('./icons/shuffle.svg', '#c5c8c6').then(dataUrl => {
      updatedSVGDataUrl = dataUrl;
      document.querySelector(".shuffle-icon").src = updatedSVGDataUrl;
    });
  }

  if (navigator.onLine) {
    fetchSvgDataUrl('./icons/wifi.svg', color2).then(dataUrl => {
      updatedSVGDataUrl = dataUrl;
      formicon.style.background = `url("${updatedSVGDataUrl}")`;
    });
  } else {
    fetchSvgDataUrl('./icons/no-wifi.svg', color2).then(dataUrl => {
      updatedSVGDataUrl = dataUrl;
      formicon.style.background = `url("${updatedSVGDataUrl}")`;
    });
  }

  function showNotification(message, timeOut) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    notification.classList.remove('hide');

    notification.style.color = color3;

    setTimeout(() => {
      notification.classList.add('hide');
      notification.classList.remove('show');
    }, timeOut);
  }

  async function checkForUpdates() {
    const newFile = await fetch('https://raw.githubusercontent.com/mcspidey95/TerminalTab/main/updater.txt');
    const currentFile = await fetch('updater.txt');
    
    const newText = await newFile.text();
    const newVer = newText.split('\n');

    const oldText = await currentFile.text();
    const oldVer = oldText.split('\n');

    if(newVer[0] !== oldVer[0]){
      showNotification('New version available!', 5000);

      notification.style.cursor = "pointer";

      notification.addEventListener("click", () => {
        window.location = 'https://github.com/mcspidey95/TerminalTab/releases/latest';
      });

      notification.addEventListener("mouseenter", () => {
        notification.style.scale = "1.05";
      });
      notification.addEventListener("mouseleave", () => {
        notification.style.scale = "1";
      });
    }
  }
  checkForUpdates();

  function updateProgressBar(data) {

    if (data.includes("Donee")) {
      progressBar.style.width = "100%";
      showNotification("Downloaded! ( ദ്ദി ˙ᗜ˙ )", 2000);
      setTimeout(() => {
        progressContainer.style.display = "none";
        progressBar.style.width = "0%";
      }, 3000);
      progressName.innerText = "Download Complete!";
      progressSpeed.innerText = '';
      setTimeout(() => {
        progressName.innerText = '';
      }, 5000);
    } else {
      let progressMatch = data.match(/(\d+(\.\d+)?)%/);
      let filenameMatch = data.match(/File: (.*?) \|/);
      let sizeMatch = data.match(/Size: ([\d.]+ MB)/);
      let speedMatch = data.match(/Speed: ([\d.]+\w*\/s)/);
      let etaMatch = data.match(/ETA: ([\d.]+)s/);
        
      if (progressMatch && !is100) {
        let percentage = progressMatch[1];

        if(percentage.includes('100')) is100 = true;
        if(sizeMatch){
          progressContainer.style.display = "block";
          progressBar.style.width = percentage + "%";

          //console.log(percentage)
        }
      }
        
      let filename = filenameMatch ? filenameMatch[1].trim() : "??";
      filename = filename.length <= 25 ? filename : filename.substring(0, 25) + "...";
      
      let size = sizeMatch ? sizeMatch[1] : "??";
      let speed = speedMatch ? speedMatch[1].trim() : "∞ MiB/s";
      let eta = etaMatch ? Math.floor(parseFloat(etaMatch[1])) + "s" : "∞";      

      //console.log(filename, size, speed, eta)
        
      let downloadNameInfo = `File: ${filename} (${size})`;
      let downloadSpeedInfo = `${speed}  |  ETA: ${eta}`;
            
      progressName.innerText = downloadNameInfo;
      progressSpeed.innerText = downloadSpeedInfo;       
    }
  }

  function shuffledTheme() {
    //random number from 0 to 18
    return Math.floor(Math.random() * 19);
  }
  



  document.getElementById('googleSearch').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/google.svg';

      fetchSvgDataUrl(iconUrl, color1).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('googleSearch').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('gmail').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/gmail.svg';

      fetchSvgDataUrl(iconUrl, color1).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('gmail').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('drive').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/drive.svg';

      fetchSvgDataUrl(iconUrl, color1).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('drive').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('photos').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/photos.svg';

      fetchSvgDataUrl(iconUrl, color1).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '50px');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('photos').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('youtube').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/youtube.svg';

      fetchSvgDataUrl(iconUrl, color1).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('youtube').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('prime').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/prime.svg';

      fetchSvgDataUrl(iconUrl, color2).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '45px');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('prime').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('netflix').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/netflix.svg';

      fetchSvgDataUrl(iconUrl, color2).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('netflix').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('hotstar').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/disney.svg';

      fetchSvgDataUrl(iconUrl, color2).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '70px');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('hotstar').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('stremio').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/stremio.svg';

      fetchSvgDataUrl(iconUrl, color2).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '55px');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('stremio').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('chatgpt').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/chatgpt.svg';

      fetchSvgDataUrl(iconUrl, color3).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('chatgpt').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('docs').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/docs.svg';

      fetchSvgDataUrl(iconUrl, color3).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '50px');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('docs').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('slides').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/slides.svg';

      fetchSvgDataUrl(iconUrl, color3).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '50px');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('slides').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('sheets').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/sheets.svg';

      fetchSvgDataUrl(iconUrl, color3).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '50px');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('sheets').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('teams').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/teams.svg';

      fetchSvgDataUrl(iconUrl, color3).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '45px');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('teams').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('discord').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/discord.svg';

      fetchSvgDataUrl(iconUrl, color3).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('discord').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('whatsapp').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/whatsapp.svg';

      fetchSvgDataUrl(iconUrl, color3).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '40px','-15deg');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('whatsapp').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('insta').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/insta.svg';

      fetchSvgDataUrl(iconUrl, color3).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('insta').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('filecr').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/user1.svg';

      fetchSvgDataUrl(iconUrl, color1).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('filecr').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('fitgirl').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/user2.svg';

      fetchSvgDataUrl(iconUrl, color1).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '50px');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('fitgirl').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('mom').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/user3.svg';

      fetchSvgDataUrl(iconUrl, color1).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '40px', '-35deg', '50px');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('mom').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('dad').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/user4.svg';

      fetchSvgDataUrl(iconUrl, color1).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '45px');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('dad').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('pdf').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/pdf.svg';

      fetchSvgDataUrl(iconUrl, color2).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('pdf').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('img').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/img.svg';

      fetchSvgDataUrl(iconUrl, color2).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('img').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('keep').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/keep.svg';

      fetchSvgDataUrl(iconUrl, color2).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('keep').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  document.getElementById('canva').addEventListener('mouseenter', () => {
    iconGrids.forEach(iconGrid => {
      let iconUrl = './icons/canva.svg';

      fetchSvgDataUrl(iconUrl, color2).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl);
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('canva').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });


  fetchSvgDataUrl('./icons/mp3.svg', '#fff').then(dataUrl => {
    updatedSVGDataUrl = dataUrl;
    mp3.src = updatedSVGDataUrl;
  });
  document.getElementById('mp3Icon').addEventListener('mouseenter', () => {
    mp3.style.border = `2px solid ${colorSearch}`;
  });
  document.getElementById('mp3Icon').addEventListener('mouseleave', () => {
    mp3.style.border = 'none';
  });
  document.getElementById('mp3Icon').addEventListener('click', () => {
    fetchSvgDataUrl('./icons/mp3.svg', colorSearch).then(dataUrl => {
      updatedSVGDataUrl = dataUrl;
      mp3.src = updatedSVGDataUrl;
    });
    fetchSvgDataUrl('./icons/mp4.svg', '#fff').then(dataUrl => {
      updatedSVGDataUrl = dataUrl;
      mp4.src = updatedSVGDataUrl;
    });

    downloadformat = 'audio';
  });

  fetchSvgDataUrl('./icons/mp4.svg', colorSearch).then(dataUrl => {
    updatedSVGDataUrl = dataUrl;
    mp4.src = updatedSVGDataUrl;
  });
  document.getElementById('mp4Icon').addEventListener('mouseenter', () => {
    mp4.style.border = `2px solid ${colorSearch}`;
  });
  document.getElementById('mp4Icon').addEventListener('mouseleave', () => {
    mp4.style.border = 'none';
  });
  document.getElementById('mp4Icon').addEventListener('click', () => {
    fetchSvgDataUrl('./icons/mp3.svg', '#fff').then(dataUrl => {
      updatedSVGDataUrl = dataUrl;
      mp3.src = updatedSVGDataUrl;
    });
    fetchSvgDataUrl('./icons/mp4.svg', colorSearch).then(dataUrl => {
      updatedSVGDataUrl = dataUrl;
      mp4.src = updatedSVGDataUrl;
    });

    downloadformat = 'video';
  });



  document.getElementById('cursor').addEventListener('mouseenter', () => {
    let randomUrl = Math.random() < 0.5 ? './icons/icecream.svg' : './icons/pizza.svg';
    iconGrids.forEach(iconGrid => {

      let iconUrl = randomUrl;

      fetchSvgDataUrl(iconUrl, colorSearch).then(dataUrl => {
        updatedSVGDataUrl = dataUrl;
        populateIcons(iconGrid, updatedSVGDataUrl, '55px');
      });
    });
    wrapper.style.opacity = 1;
  });
  document.getElementById('cursor').addEventListener('mouseleave', () => {
    wrapper.style.opacity = 0;
  });

  


  document.getElementById("whatsapp").addEventListener("click", async function(event) {
    event.preventDefault();

    const getStatus = await fetch('status.txt');
    
    const statusFile = await getStatus.text();
    const status =statusFile.split('\n');

    if(status[0].substring(0,4) === 'True') {
      window.location = 'whatsapp://';
      location.reload(true);
    }
    else {
      window.location.href = event.target.href;
    }
  });


  document.getElementById("discord").addEventListener("click", async function(event) {
    event.preventDefault();

    const getStatus = await fetch('status.txt');
    
    const statusFile = await getStatus.text();
    const status =statusFile.split('\n');

    if(status[1].substring(0,4) === 'True') {
      window.location = 'discord://';
      location.reload(true);
    }
    else {
      window.location.href = event.target.href;
    }
  });


  document.getElementById("teams").addEventListener("click", async function(event) {
    event.preventDefault();

    const getStatus = await fetch('status.txt');
    
    const statusFile = await getStatus.text();
    const status =statusFile.split('\n');

    if(status[2].substring(0,4) === 'True') {
      window.location = 'msteams://';
      location.reload(true);
    }
    else {
      window.location.href = event.target.href;
    }
  });


  document.getElementById("stremio").addEventListener("click", async function(event) {
    event.preventDefault();

    const getStatus = await fetch('status.txt');
    
    const statusFile = await getStatus.text();
    const status =statusFile.split('\n');

    if(status[3].substring(0,4) === 'True') {
      window.location = 'stremio:///board';
      location.reload(true);
    }
    else {
      window.location.href = event.target.href;
    }
  });



  

  document.getElementById('quick_search').addEventListener('mouseenter', () => {
    if(document.getElementById('quick_search').innerHTML === ' newtab') {
      document.getElementById('quick_search').innerHTML = ' youtube?';
    }
    else if(document.getElementById('quick_search').innerHTML === ' youtube ( 𖦹〰𖦹)⊹') {
      document.getElementById('quick_search').innerHTML = ' newtab?';
    }
  });
  document.getElementById('quick_search').addEventListener('mouseleave', () => {
    if(document.getElementById('quick_search').innerHTML === ' youtube?') {
      document.getElementById('quick_search').innerHTML = ' newtab';
    }
    else if(document.getElementById('quick_search').innerHTML === ' newtab?') {
      document.getElementById('quick_search').innerHTML = ' youtube ( 𖦹〰𖦹)⊹';
    }
  });
  document.getElementById('quick_search').addEventListener('click', () => {
    if(document.getElementById('quick_search').innerHTML === ' youtube?') {
      document.getElementById('quick_search').innerHTML = ' youtube ( 𖦹〰𖦹)⊹';
      username__.innerHTML = user + '@yt &gt;';
      mp3.style.opacity = 1;
      mp4.style.opacity = 1;
    }
    else if(document.getElementById('quick_search').innerHTML === ' newtab?') {
      document.getElementById('quick_search').innerHTML = ' newtab';
      username__.innerHTML = user + '@home &gt;';
      mp3.style.opacity = 0;
      mp4.style.opacity = 0;
    }
  });

  async function executeScript(command, vbscriptPath, flag) {
    fetch(command, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ vbscriptPath: vbscriptPath }) })
    let exitStatus = '0';
    let message = '';
    searchValue = '';

    if(flag) {
      while(exitStatus != '1') {
        const getStatus = await fetch('./scripts/scriptStatus.txt');
  
        const statusFile = await getStatus.text();
        const status = statusFile.split('\n');
        
        exitStatus = status[1].substring(0,1);
  
        if(message != status[0]) {
          message = status[0];
          showNotification(message, 2000);
        }
      }
    }
  }

  document.getElementById('system-stats').addEventListener("click", () => {
    executeScript('/scripts', './scripts/taskManager/manager.sh', false);
  });



  let tempFlag = true;
  let tempSearch = '';
  document.addEventListener('keydown', (e) => {

    if(e.key === '/'){
      e.preventDefault();
    }

    if(e.key === 'Tab'){
      e.preventDefault();
      searchValue += remainingText;
      updateSearch(e);
    }

    if(e.key === 'ArrowUp'){
      e.preventDefault();
      if(tempFlag){
        tempFlag = false;
        tempSearch = searchValue;
      }

      if(historyCounter > 0) {
        historyCounter--;
        searchValue = searchHistory[historyCounter];
      }
      updateSearch(e);
    }

    if(e.key === 'ArrowDown'){
      e.preventDefault();
      if(historyCounter == searchHistory.length-1) {
        tempFlag = true;
        searchValue = tempSearch;
      }

      if(historyCounter < searchHistory.length-1) {
        historyCounter++;
        searchValue = searchHistory[historyCounter];
      }
      updateSearch(e);
    }

    if (e.key === 'Enter' && !isSidebarOpen) {
      e.preventDefault();

      if(searchHistory.length >= 69)
      {
        searchHistory.shift();  
      }
      if(searchValue != "")
      {
        searchHistory.push(searchValue);
        historyCounter = searchHistory.length;
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      }

      if(searchValue == ""){
        showNotification("Type something re", 2000);
      } else if (searchValue.includes('https://') && document.getElementById('quick_search').innerHTML === ' youtube ( 𖦹〰𖦹)⊹'){
          is100 = false;

          fetch("/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: searchValue, type: downloadformat })
        }).then(() => {
            console.log("Converting...");
            showNotification("Converting... 𖦹ࡇ𖦹", 2000);

            searchValue = '';
            updateSearch(e);
            progressName.innerText = "Converting Link...";
        
            // Now, start listening for progress updates
            const eventSource = new EventSource("/progress");
        
            eventSource.onmessage = (event) => {
                console.log("Progress Update:", event.data);
                updateProgressBar(event.data);
            };
        
            eventSource.onerror = (error) => {
                console.error("SSE Error:", error);
                eventSource.close();
            };
        });
      } else if (searchValue.includes('https://')) {
        window.location.href = searchValue;
      } else if (searchValue.includes('.') && !searchValue.includes(' .') && !searchValue.includes('. ') && !searchValue.includes(' ')) {
        window.location.href = 'https://' + searchValue;
      } else if(searchValue === '/shizuku') {
          searchValue = '';
          setTimeout(() => {
            executeScript('/scripts', './scripts/shizuku/shizuku.sh', true);
        }, 500);
      } else if(searchValue.startsWith('/t')) {
        let command = 't';

        if(searchValue.length > 2){
          command = searchValue.substring(3);
        }

        fetch(`/cmd?command=${command}`)
        setTimeout(() => {
          executeScript('/scripts', './scripts/cmd.sh', false);
          setTimeout(() => {
            location.reload();
          }, 500);
        }, 500);
      } else if(searchValue.startsWith('/sudo')) {
        let command = searchValue.substring(1);

        fetch(`/cmd?command=${encodeURIComponent(command)}`)
        setTimeout(() => {
          executeScript('/scripts', './scripts/sudo.sh', false);
          setTimeout(() => {
            location.reload();
          }, 500);
        }, 500);
      } else if(searchValue === '/sort') {
        executeScript('/scripts', './scripts/sortDownloads/sort.sh', true);
      } else if(searchValue === '/autosort-off') {
        let autosort = 'off';
        fetch(`/auto-sort?toggle=${autosort}`)
        searchValue = '';
        showNotification('Autosort Disabled!', 2000);
      } else if(searchValue === '/autosort-on') {
        let autosort = 'on';
        fetch(`/auto-sort?toggle=${autosort}`)
        searchValue = '';
        showNotification('Autosort Enabled!', 2000);
      } else if(searchValue === '/reload') {
        executeScript('/scripts', './scripts/reload.sh', false);
      } else if(searchValue === '/clean') {
        searchValue = '';
        setTimeout(() => {
          executeScript('/scripts', './scripts/cleaning/clear.sh', true);
        }, 500);
      } else if(searchValue === '/noZuckerberg') {
        searchValue = '';
        localStorage.clear();
        showNotification('ദ്ദി(*꒦ິ꒳꒦ີ)', 2000);
        setTimeout(() => {
          location.reload();
        }, 2500);
      } else if(document.getElementById('quick_search').innerHTML === ' youtube ( 𖦹〰𖦹)⊹'){
        searchValue.replace('+', '%2b');
        window.location.href = 'https://www.youtube.com/results?search_query=' + searchValue.split(' ').join('+');
      } else {
        searchValue = searchValue.replace(/\+/g, '%2b');
        window.location.href = engineUrl + searchValue.split(' ').join('+');
      }
    } else if (getComputedStyle(search).getPropertyValue('--highlight') === color3 && e.key === 'Backspace' && !isSidebarOpen) {
      searchValue = '';
    } else if (e.key === 'Backspace' && !isSidebarOpen) {
      e.preventDefault();
      searchValue = searchValue.slice(0, searchValue.length - splitCount).slice(0, -1) + searchValue.slice(searchValue.length - splitCount);
    } else if (e.shiftKey && e.key.length === 1 && !isSidebarOpen) {
      searchValue = searchValue.slice(0, searchValue.length - splitCount) + e.key.toUpperCase() + searchValue.slice(searchValue.length - splitCount);
    } else if (e.ctrlKey && e.key === 'a' && !isSidebarOpen){
      e.preventDefault();
      search.style.setProperty('--highlight', color3);
      search2.style.setProperty('--highlight', color3);
      searchLength = searchValue.length;
      updateSearch(e);
    } else if (e.ctrlKey && e.key === 'c' && getComputedStyle(search).getPropertyValue('--highlight') === color3 && !isSidebarOpen){
      e.preventDefault();
      navigator.clipboard.writeText(searchValue);
      showNotification('Copied to clipboard!', 3000);
    } else if (e.ctrlKey && e.key === 'c' && !isSidebarOpen){
      showNotification('Nothing to Copy!', 3000);
    } else if ((e.ctrlKey || e.altKey || e.metaKey) && !isSidebarOpen) {

    } else if (e.key.length === 1 && !isSidebarOpen) {
      searchValue = searchValue.slice(0, searchValue.length - splitCount) + e.key + searchValue.slice(searchValue.length - splitCount);
    }

    if(searchLength != searchValue.length && getComputedStyle(search).getPropertyValue('--highlight') === color3 && !isSidebarOpen)
    {
      search.style.removeProperty('--highlight');
      search2.style.removeProperty('--highlight');
      searchValue = '';
      splitCount = 0;
      if (e.key.length === 1 && !isSidebarOpen) {
        searchValue += e.key;
      }
    }

    if(e.key === 'ArrowLeft' && !isSidebarOpen) {
      e.preventDefault();
      if(splitCount < searchValue.length)
      {
        splitCount++;
      }
    } else if (e.key === 'ArrowRight' && !isSidebarOpen) {
      if(splitCount > 0)
      {
         splitCount--;
      }
    }

    if(splitCount != 0 || getComputedStyle(search).getPropertyValue('--highlight') === color3){
      getSuggestions = false;
      search.innerHTML = searchValue;
    }
    else getSuggestions = true;

    updateSearch(e);
    
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if(getSuggestions && !searchValue.startsWith('/')){
        autocomplete(getSuggestions);
      }
    }, 300);
  });

  document.addEventListener('click', (e) => {
    search.style.removeProperty('--highlight');
    search2.style.removeProperty('--highlight');

    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && isSidebarOpen) {
      sidebar.classList.remove('open');
      container.classList.remove('move');

      const fd = new FormData(form);
      let obj = Object.fromEntries(fd);

      obj["theme"] = dropdownBtn.getAttribute("data-value"); 
      obj["shuffle"] = shuffle;
  
      const json = JSON.stringify(obj);
      localStorage.setItem('settings', json);

      setTimeout(() => {
        location.reload(true);
      }, 300);
    }
  });

  document.addEventListener('paste', function(e) {
    if(!isSidebarOpen) {
      e.preventDefault();
      navigator.clipboard.readText().then(function(paste) {
        if(getComputedStyle(search).getPropertyValue('--highlight') === color3)
        {
          searchValue = paste;
          updateSearch(e);
          search.style.removeProperty('--highlight');
          search2.style.removeProperty('--highlight');
        } else{
          searchValue = searchValue.slice(0, searchValue.length - splitCount) + paste + searchValue.slice(searchValue.length - splitCount);
          updateSearch(e);
        }
      updateSearch(e);
      }).catch(function(error) {
        searchValue += "";
        updateSearch(e);
      });
    }
  });

  //function searchHistory(searchQuery) {
    //searchHistory.push(searchQuery);
    //localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  //}

  async function autocomplete() {
    if (searchValue.length && navigator.onLine) {
      await fetch(`/search?q=${encodeURIComponent(searchValue)}`)
          .then(response => response.json())
          .then(data => {
            let suggestion = data[0] ? data[0].phrase : '';
            remainingText = suggestion.substring(searchValue.length);

            search.innerHTML = `<span style="opacity: 1;">${searchValue}</span><span style="opacity: 0.5;">${remainingText}</span>`;
          });
    } 
  }

  function updateSearch(e) {
    if(searchValue.length <= 52 && !e.ctrlKey)
    {
      search.innerHTML = searchValue.slice(0, searchValue.length - splitCount);
      search2.innerHTML = searchValue.slice(searchValue.length - splitCount);
    } else if(searchValue.length > 52 && !e.ctrlKey) {
      if(search.innerHTML.length < 52){
        search.innerHTML = searchValue.slice(0, searchValue.length - splitCount);
        search2.innerHTML = searchValue.slice(searchValue.length - splitCount).slice(0, 52 - search.innerHTML.length);
        getSuggestions = false;
      }
      else{
        search.innerHTML = searchValue.slice(0, searchValue.length - splitCount).slice(-52);
        search2.innerHTML = searchValue.slice(searchValue.length - splitCount).slice(0, 52 - search.innerHTML.length);
        getSuggestions = false;
      }
    }
  }
});