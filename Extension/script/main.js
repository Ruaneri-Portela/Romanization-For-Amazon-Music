let active = true;
let percursion = 0;
let stringsArray = [];
let ArrayCheck = [];
let language = 'auto';
function trasliterable(str) {
  let regex = /[\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\u4E00-\u9FFF]/;
  let regexCoreano = /[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]/;
  let jp = regex.test(str), kr = regexCoreano.test(str);
  if(jp && kr){
    language = 'auto';
    return true;
  }
  else if(jp){
    language = 'jp';
    return true;
  }
  else if(kr){
    language = 'kr';
    return true;
  } 
  else {
    return false;
  }
}

function romanize(dataIn) {
  const url = 'https://romanization.hirameki.me/';
  const data = {
    input: dataIn,
    lang: language
  }
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(data)
  })
    .then(response => response.text())
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function amazonMusic() {
  while (true) {
    try {
      await sleep(1000);
      while (active) {
        ArrayCheck = Array.from(document.querySelectorAll('.music-headline-4'), el => el.textContent);
        if (!ArrayCheck[0].includes("​")) {
          stringsArray = ArrayCheck;
          console.log("Music is find, at valid letter, trying romanization");
          document.querySelectorAll('.music-headline-4').forEach(async (el) => {
            if (trasliterable(stringsArray[percursion])) {
              romanize(stringsArray[percursion])
                .then(res => {
                  el.appendChild(document.createElement('br'));
                  el.append(res + "​");
                })
                .catch(error => {
                  console.error('Error on Put text, please report', error);
                });
              percursion++;
            } else {
              el.append("​");
              percursion++;
            }
          });
          percursion = 0;
          console.log("Hey, this transliteration in this music ended!");
        }
        await sleep(1000);
      }
    }
    catch (error) {
      console.log("This music don't have letters... or music still loading... waiting...");
    }
  }
}
async function spotify() {
  while (true) {
    await sleep(1000);
    try {
      while (active) {
        let elements = document.querySelectorAll('[data-testid="fullscreen-lyric"]');
        let elementsFullScreen = document.querySelectorAll('[data-lyrics-line="true"]');
        spotifyProcess(elements, 1);
        spotifyProcess(elementsFullScreen, 2);
        await sleep(1000);
      }
    }
    catch (error) {
      console.log("This music don't have letters... or music still loading... waiting...");
    }
  }
}
function spotifyProcess(elements, mode) {
  ArrayCheck = [];
  elements.forEach(elemento => {
    ArrayCheck.push(elemento.textContent);
  });
  if (!ArrayCheck[0].includes("​")) {
    stringsArray = ArrayCheck;
    elements.forEach(element => {
      if (trasliterable(stringsArray[percursion])) {
        romanize(stringsArray[percursion])
          .then(res => {
            if (mode == 1) {
              let fistElement = element.querySelector('div');
              let paragraphElement = document.createElement('p');
              paragraphElement.style.fontSize = '60%';
              let textNode = document.createTextNode(res + "​");
              paragraphElement.appendChild(textNode);
              fistElement.appendChild(paragraphElement);
            } else {
              element.appendChild(document.createElement('br'));
              element.append(res + "​");
              element.appendChild(document.createElement('br'));
            }
          })
          .catch(error => {
            console.error('Error on Put text, please report', error);
          });
        percursion++;
      } else {
        element.append("​");
        element.appendChild(document.createElement('br'));
        element.appendChild(document.createElement('br'));
        percursion++;
      }
    });
    percursion = 0;
  }
}
async function activeModule(){
  while(true){
    chrome.storage.local.get(['romanizationIsActive'], function(result) {
      active = result.romanizationIsActive;
    });
    await sleep(1000);
  }
}
function init() {
  activeModule();
  console.log('Romazition for Streaming Music Service ver 0.1... Detection Service...');
  var url = window.location.href;
  if (url.includes("amazon")) {
    console.log('Amazon Music Detected, starting romanization service on atrack in ', url);
    amazonMusic();
  } else if (url.includes("spotify")) {
    console.log('Spotify deceted, starting romanization service on atrack in ', url);
    spotify();
  }
}
init();

