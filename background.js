chrome.runtime.onMessage.addListener(onMsg);

function onMsg(msg, sender, response) {
  if (chrome.runtime.id != sender.id) return;
  switch (msg.method) {
    case 'save':
      var data = msg.data;
      var chs = JSON.parse(localStorage.getItem('chs'));
      chs.h = [];
      for (var i = 0, len = data.length; i < len; i++) {
        var header = data[i];
        chs.h.push({
          name: header['name'],
          value: header['value'],
          status: header['status']
        });
      }
      localStorage.setItem('chs', JSON.stringify(chs));
      response({
        result: !0
      });
      break;
    case 'get':
      var o = JSON.parse(localStorage.getItem('chs'));
      response({
        result: !0,
        data: o
      });
      break;
    case 'clear':
      var chs = JSON.parse(localStorage.getItem('chs'));
      chs.h = [];
      localStorage.setItem('chs', JSON.stringify(chs));
      response({
        result: !0
      });
      break;
    case 'edit':
      var o = JSON.parse(localStorage.getItem('chs'));
      break;
    case 'delete':
      var name = msg.data,
        chs = JSON.parse(localStorage.getItem('chs'));

      for (var i = 0, len = chs.h.length; i < len; i++) {
        if (chs.h[i].name == name) {
          chs.h.splice(i, 1);
        }
      }
      localStorage.setItem('chs', JSON.stringify(chs));
      response({
        result: !0
      });
      break;
    case 'switch':
      var chs = JSON.parse(localStorage.getItem('chs')),
        mod = msg.data.mod;
      if (mod == 'run') {
        chs.cfg.run = true;
      } else {
        chs.cfg.run = false;
      }
      localStorage.setItem('chs', JSON.stringify(chs));
      response({
        result: !0,
        data: chs.cfg.run
      });
      break;
    default:
      response({
        result: !!0
      });
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
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  var chs = JSON.parse(localStorage.getItem('chs'));
  localStorage.setItem('details', JSON.stringify(details));
  if (chs.cfg.run) {
    for (var i = 0, len = chs.h.length; i < len; i++) {
      if (chs.h[i]['status'] == 'on') {
        var h = {
          name: chs.h[i]['name'],
          value: chs.h[i]['value']
        };
        details.requestHeaders.push(h);
      }
    }
  }
  return { requestHeaders: details.requestHeaders };
}, {
  urls: ["http://*/*", "https://*/*"]
}, ["requestHeaders", "blocking"]);


// 改响应头
chrome.webRequest.onHeadersReceived.addListener(details => {
  const { url } = details;
  if (url.indexOf('//cdn.jsdelivr.net/') > 0 && /htm/.test(url.split('/').reverse()[0])) {
    let header = details.responseHeaders.find(e => e.name.toLowerCase() === 'content-type');
    header.value = 'text/html; charset=utf-8';
  }
  return {
    responseHeaders: details.responseHeaders
  };
}, {
  urls: ["http://*/*", "https://*/*"]
}, ['blocking', 'responseHeaders']);

// 安装后打开的页面
chrome.runtime.onInstalled.addListener(function(e) {
  if (e.reason == "install") {
    window.open("option.html");
    var headers = {
      cfg: {
        run: true
      },
      h: []
    };
    localStorage.setItem('chs', JSON.stringify(headers));
  }
});
