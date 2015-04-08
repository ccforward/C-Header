chrome.runtime.onMessage.addListener(onMsg);

function onMsg(msg, sender, response) {
    if (chrome.runtime.id != sender.id) return;
    switch(msg.method) {
        case 'save':
            var headers = msg.data;
            // localStorage.setItem('headers',JSON.stringify(headers));
            response({
                result: !0
            });
        break;
        case 'get': 
            // var o = JSON.parse(localStorage.getItem('headers'));
            response({
                result: !0,
                data: o
            });
        break;
        case 'clear': 
            // localStorage.removeItem('headers');
            response({
                result: !0
            });
        break;
        case 'edit':
            // var o = JSON.parse(localStorage.getItem('headers'));
        break;
        case 'delete':
            var name = msg.data,
                // h = JSON.parse(localStorage.getItem('headers'));
            for(var i=0,len=h.length;i<len;i++){
                if(h[i].name == name){
                   h.splice(i,1);
                }
            }
            if(h.length == 0){
                // localStorage.removeItem('headers');
            }else {
                // localStorage.setItem('headers',JSON.stringify(h));
            }
            response({
               result: !0 
            })
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
    // var headers = JSON.parse(localStorage.getItem('headers'));
    var h = {};
    for(var i=0;i<headers.length;i++) {
        details.requestHeaders.push(headers[i]);
    }
    return {requestHeaders: details.requestHeaders};
}, {
    urls: ["http://*/*", "https://*/*"]
}, ["requestHeaders", "blocking"]);








// 安装后打开的页面
chrome.runtime.onInstalled.addListener(function(e) {

    if(e.reason == "install"){
        window.open("option.html")
        var headers = {
            cfg: {
                run: true
            },
            h:[]
        }
        localStorage.setItem('headers',JSON.stringify(headers))
    } 
});