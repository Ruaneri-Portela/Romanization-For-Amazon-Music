document.addEventListener("DOMContentLoaded", function () {
    var switchRomanization = document.getElementById("switchRomanization");
    var buttonStatus = true;
    switchRomanization.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "changeVariable" });
        buttonStatus = !buttonStatus;
        if (buttonStatus === true){
            switchRomanization.textContent = "Ativado";
        }
        else{
            switchRomanization.textContent = "Desativado";
        }
      });
    });
  });
  