const btn = document.getElementById("btnSwitch");
function getIsActive() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['romanizationIsActive'], function(result) {
            let res = result.romanizationIsActive;
            if (res === null || res === undefined) {
                chrome.storage.local.set({ romanizationIsActive: true }, function() {
                    resolve(true);
                });
            } else {
                resolve(res);
            }
        });
    });
}
function switchIsActive(){
    chrome.storage.local.get(['romanizationIsActive'], function(result) {
        chrome.storage.local.set({romanizationIsActive: !result.romanizationIsActive}, function() {
            updateBtn();
        });
    });
}
async function updateBtn() {
    const res = await getIsActive();
    if (!res) {
        btn.innerHTML = "Enable";
        btn.setAttribute("class", "btn btn-success");
    } else {
        btn.innerHTML = "Disable";
        btn.setAttribute("class", "btn btn-danger");
    }
}
updateBtn();
btn.addEventListener("click", switchIsActive);