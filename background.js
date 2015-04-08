chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
    details.requestHeaders.push({
        name: 'Host2',
        value: 'test.com'
    });
    localStorage.setItem('requestHeaders',JSON.stringify(details));
    return {requestHeaders: details.requestHeaders};
}, {
    urls: ["http://*/*", "https://*/*"]
}, ["requestHeaders", "blocking"]);

chrome.runtime.onInstalled.addListener(function(e) {
    e.reason == "install" && window.open("option.html")
});


