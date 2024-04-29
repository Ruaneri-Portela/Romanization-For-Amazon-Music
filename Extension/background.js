let url = '';
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function createID() {
    let id = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    return id;
}
function reportUser(text, id) {
    const data = {
        text: text,
        id: id
    };
    let newUrl = url + 'reportUser';
    return fetch(newUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    }).then(response => response.text()).then(data => {
        return data;
    }).catch(error => {
        throw error;
    });
}
async function service() {
    let id = '';
    chrome.storage.local.get(['romanizationURL'], function (result) {
        if (result.romanizationURL) {
            url = result.romanizationURL;
            
        } else {
            url = 'https://romanization.hirameki.me/';
        }
    });
    chrome.storage.local.get(['romanizationID'], function (result) {
        if (!result.romanizationID) {
            id = createID();
            chrome.storage.local.set({ romanizationID: id }, function () {
                console.log('Using as romanization service, as user ' + id);
            });
        } else {
            id = result.romanizationID;
            console.log('Using as romanization service, as user ' + result.romanizationID);
        }
    });
    while (true) {
        await sleep(1000);
        if (url && id) {
            console.log('Service using this url ' + url);
            break;
        }
    }
    while (true) {
        console.log('Knocking to server');
        reportUser('Hi i am alive', id).then(res => {
            console.log(res);
        })
        await sleep(100000);
    }
}
service();