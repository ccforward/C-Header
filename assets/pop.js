!(function($) {
  var tmpl = '';

  var POP = {
    host: 'https://mp.ucweb.com',
    url: 'https://mp.ucweb.com',
    init: function() {
      this.load();
      this.events();
      this.getHost();
      $('#god_id').focus();
    },
    load: function() {
      var output = '';
      chrome.runtime.sendMessage({
        method: 'get'
      }, function(d) {
        if (d.result) {
          var headers = d.data.h,
            cfg = d.data.cfg;
          for (var i = 0, len = headers.length; i < len; i++) {
            output += '<li class="h-item ' + headers[i]['status'] + '" data-status="' + headers[i]['status'] + '"><p class="name">' + headers[i]['name'] + '</p>' +
              '<p class="value" title="' + headers[i]['value'] + '">' + headers[i]['value'] + '</p></li>';
          }
          if (cfg.run) {
            $('#J_SwicthBtn').addClass('on');
          }
          $('#J_HeaderList').html(output);
        }

      })
    },
    events: function() {
      var _self = this;
      $('#J_SwicthBtn').click(function() {
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
          // run
          chrome.runtime.sendMessage({
            method: 'switch',
            data: { mod: 'run' }
          }, function(d) {
            console.log(d);
          });
        } else {
          // stop
          chrome.runtime.sendMessage({
            method: 'switch',
            data: { mod: 'stop' }
          }, function(d) {});
        }
      });
      $('.option-link').on('click', function(e) {
        e.preventDefault();
        chrome.tabs.create({ url: 'option.html' });
      });
      $('#J_HeaderList').on('click', '.h-item', function(e) {
        var status = $(this).attr('data-status');
        if (status == 'on') {
          // off
          $(this).removeClass('on');
          $(this).attr('data-status', 'off');
          _self._updateStatus();
        } else {
          // on
          $(this).addClass('on');
          $(this).attr('data-status', 'on');
          _self._updateStatus();
        }
      });
      // $('#god_id').on('paste', e => {
      //   const id = e.originalEvent.clipboardData.getData("text/plain")
      //   const url = '/god_login?people_id=' + id;
      //   chrome.tabs.create({url: this.host + url});
      //   setTimeout(_ => {
      //     chrome.tabs.create({url: this.url});
      //   }, 1000)
      // });
    },
    _updateStatus: function() {
      var _self = this,
        h = [];
      $('.h-item').each(function(idx, item) {
        var o = {};
        o.name = $(this).find('.name').html();
        o.value = $(this).find('.value').html();
        o.status = $(this).attr('data-status');
        h.push(o);
      });
      chrome.runtime.sendMessage({
        method: 'save',
        data: h
      }, function() {});
    },
    getHost() {
      const query = {
        active: true,
        currentWindow: true
      };
      chrome.tabs.query(query, (tabs) => {
        $('#god_id').focusin();
        const url = tabs[0].url
        if (url.indexOf('chrome://') == 0) {
          return;
        }
        const link = document.createElement('a')
        link.href = url
        this.url = url
        this.host = link.protocol + '//' + link.host;
      });
    }
  }
  POP.init();

}(jQuery))
// var bg = chrome.extension.getBackgroundPage(),info=bg.imgInfoObj;
// console.log('info:',info);
// console.log('data:',bg.infoData);
// console.log(chrome.extension);
