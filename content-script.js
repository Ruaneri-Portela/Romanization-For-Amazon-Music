function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function romanize(dataIn) {
  const url = 'http://localhost:5000/convert';
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
  let bool;
  let newLetter = true;
  while (true) {
    try {
      while (check === 0) {
        if (newLetter) {
          stringsArray = Array.from(document.querySelectorAll('.music-headline-4'), el => el.textContent);
        }
        await sleep(1000);
        if (stringsArray.length > 1 && stringsArray[0] != undefined) {
          console.log("Epa! Encontramos uma letra... tentando romanizar");
          console.log(stringsArray);
          document.querySelectorAll('.music-headline-4').forEach(async (el) => {
            romanize(stringsArray[percursion])
              .then(res => {
                el.textContent = res;
                el.appendChild(document.createElement('br'));
              })
              .catch(error => {
                console.error('Erro na solicitação:', error);
              });
            percursion++;
          });
          check = 1;
          newLetter = true;
          console.log("Concluido!");
        }
      }

      await sleep(1000);
      console.log("Checando...");
      ArrayCheck = Array.from(document.querySelectorAll('.music-headline-4'), el => el.textContent);
      bool = ArrayCheck[5].includes(stringsArray[5]);
      console.log(stringsArray);
      console.log(ArrayCheck);
      if (stringsArray.length === ArrayCheck.length) {

      } else {
        check = 0;
      };
      console.log("Checando...2");
      if (ArrayCheck[0].includes(undefined)) {
        console.log("Err");
        check = 0;
        newLetter = false;
      }
    }
    catch (error) {
      console.log("Talvez essa musica não tem letra... ou esta passando de musica!");
    }
  }
}
console.log('Romazition for Amazon Music ver 0.1');
romanizeStrings();
