let active = true;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
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
async function romanizeStrings() {
  let check = 0;
  let percursion = 0;
  let stringsArray;
  let ArrayCheck;
  let newLetter = true;
  while (true) {
    try {
      while (check === 0 && active) {
        if (newLetter) {
          stringsArray = Array.from(document.querySelectorAll('.music-headline-4'), el => el.textContent);
        }
        await sleep(500);
        if (stringsArray.length > 1 && stringsArray[0] != undefined && active) {
          console.log("Music is find, at valid letter, trying romanization");
          document.querySelectorAll('.music-headline-4').forEach(async (el) => {
            if (hasJapaneseCharacters(stringsArray[percursion])) {
              romanize(stringsArray[percursion])
                .then(res => {
                  el.appendChild(document.createElement('br'));
                  el.append(res+"​");
                })
                .catch(error => {
                  console.error('Error on API, please report', error);
                });
              percursion++;
            }else{
              el.append("​");
              percursion++;
            }
          });
          percursion = 0;
          check = 1;
          newLetter = true;
          console.log("Hey, this transliteration in this music ended!");
        }
      }
      await sleep(1000);
      ArrayCheck = Array.from(document.querySelectorAll('.music-headline-4'), el => el.textContent);
      if (ArrayCheck[0].includes("​")) {
      } else {
        check = 0;
      };
      if (ArrayCheck[0].includes(undefined)) {
        console.error("The transliteration falied, this erros mean that the script don't able a locate string on array");
        check = 0;
        newLetter = false;
      }
    }
    catch (error) {
      console.log("This music don't have letters... or music still loading... waiting...");
    }
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeVariable") {
    active = !active;
  }
});
console.log('Romazition for Amazon Music ver 0.1');
romanizeStrings();
