chrome.runtime.onMessage.addListener(onMsg);

function onMsg(msg, sender, response) {
    if (chrome.runtime.id != sender.id) return;
    switch(msg.method) {
        case 'save':
            var headers = msg.data;

            localStorage.setItem('headers',JSON.stringify(headers));
            response({
                result: !0
            });
        break;
        case 'get': 
            var o = JSON.parse(localStorage.getItem('headers'));
            response({
                result: !0,
                data: o
            });
        case 'clear': 
            localStorage.removeItem('headers')
            response({
                result: !0
            });
        break;
    }

}
// storageEngine = {
//     syncbuff: {},
//     synctimeout: {},
//     synclast: 0,
//     get: function(e) {
//         chrome.storage.local.get(e);
//     },
//     set: function(e) {
//         console.log(e);
//         chrome.storage.local.set(e);

//     },
//     clear: function() {
//         chrome.storage.local.clear();
//         chrome.storage.sync.clear()
//     }
// };




// 配置HTTP请求头
chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
    var headers = JSON.parse(localStorage.getItem('headers'));
    var h = {};
    for(var i=0;i<headers.length;i++) {
        details.requestHeaders.push(headers[i]);
    }
    localStorage.setItem('requestHeaders',JSON.stringify(details));
    return {requestHeaders: details.requestHeaders};
}, {
    urls: ["http://*/*", "https://*/*"]
}, ["requestHeaders", "blocking"]);








// 安装后打开的页面
chrome.runtime.onInstalled.addListener(function(e) {
    e.reason == "install" && window.open("option.html")
});