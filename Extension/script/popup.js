document.addEventListener("DOMContentLoaded", function () {
  var switchRomanization = document.getElementById("switchRomanization");
  var buttonStatus = true;
  switchRomanization.addEventListener("click", function () {
    if (buttonStatus === true) {
      switchRomanization.textContent = "Ativado";
    } else {
      switchRomanization.textContent = "Desativado";
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "changeVariable" });
      buttonStatus = !buttonStatus;

      if (buttonStatus === true) {
        switchRomanization.textContent = "Ativado";
        chrome.storage.local.set({ romanizeIsEnable: true }, function () {
          console.log('Valor armazenado');
        });
      } else {
        switchRomanization.textContent = "Desativado";
        chrome.storage.local.set({ romanizeIsEnable: false }, function () {
          console.log('Valor armazenado');
        });
      }
    });
  });
});
