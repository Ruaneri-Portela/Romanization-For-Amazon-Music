const url = document.getElementById('url');
chrome.storage.local.get(['romanizationURL'], function (result) {
    if (result.romanizationURL) {
        url.placeholder = result.romanizationURL;
    } else {
        url.placeholder = 'https://romanization.hirameki.me/';
    }
});
const btn = document.getElementById('btn-submit');
const btnReset = document.getElementById('btn-reset');
function updateData(value) {
    chrome.storage.local.set({ romanizationURL: value }, function () {
        url.placeholder = value;
        url.value = '';
        console.log('Value is set to ' + value);
    });
}
btn.addEventListener('click', () => {
    updateData(url.value);
});
btnReset.addEventListener('click', () => {
    updateData('https://romanization.hirameki.me/');
});
