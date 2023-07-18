var active = true;
var percursion = 0;
var stringsArray = [];
var ArrayCheck = [];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeVariable") {
    active = !active;
  }
});

function hasJapaneseCharacters(str) {
  var regex = /[\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\u4E00-\u9FFF]/;
  return regex.test(str);
}

function romanize(dataIn) {
  const url = 'https://romanization.hirameki.me/';
  const inputData = 'input=' + dataIn;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: inputData
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
            if (hasJapaneseCharacters(stringsArray[percursion])) {
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
  var elements;
  while (true) {
    await sleep(1000);
    try {
      while (active) {
        elements = document.querySelectorAll('[data-testid="fullscreen-lyric"]');
        ArrayCheck = [];
        elements.forEach(elemento => {
          ArrayCheck.push(elemento.textContent);
        });
        if (!ArrayCheck[0].includes("​")) {
          stringsArray = ArrayCheck;
          elements.forEach(element => {
            if (hasJapaneseCharacters(stringsArray[percursion])) {
              romanize(stringsArray[percursion])
                .then(res => {
                  element.appendChild(document.createElement('br'));
                  element.append(res + "​");
                  element.appendChild(document.createElement('br'));
                  element.appendChild(document.createElement('br'));
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
        await sleep(1000);
      }
    }
    catch (error) {
      console.log("This music don't have letters... or music still loading... waiting...");
    }
  }
}
function init() {
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

