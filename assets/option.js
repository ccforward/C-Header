!function($){
    var keyTmpl = $('#J_KeyTmpl').html();

    // http://blog.jobbole.com/56689/
    var TemplateEngine = function(html, options) {
        var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
        var add = function(line, js) {
            js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }
        while(match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    }


    var Opt = {
        init: function(){
            this.load();
            this.events();
        },
        load: function(){
            var _self = this;
            chrome.runtime.sendMessage({
                method: 'get'
            },_self._onLoadOver)
        },

        events: function(){
            var _self = this;
            $('#J_Add').on('click', function(){
                var key = prompt('请求头的名称');
                if(key){
                    var o = {
                        name: key,
                        value: ''
                    }
                    var tpl = TemplateEngine(keyTmpl,o)
                    $('.header-list').append(tpl);
                }
            });

            $('#J_Save').on('click', function(){
                var h = [{
                    'name': 'referer',
                    'value': 'www.baidu.com'
                },{
                    'name': 'test2',
                    'value': 'test222'
                }];
                chrome.runtime.sendMessage({
                    method: 'save',
                    data: h
                }, _self._onSaveOver);
            });
            $('#J_Clear').on('click', function(){
                chrome.runtime.sendMessage({
                    method: 'clear'
                }, _self._onClearOver);
            });            

        },
        _onLoadOver: function(d){
            if(d.result){
                var output = '';
                for(var i=0,len=d.data.length;i<len;i++){
                   output += TemplateEngine(keyTmpl,d.data[i]);
                }
                $('.header-list').html(output);
            }
        },
        _onSaveOver: function(d){
            console.log(d);
        },
        _onClearOver: function(d){
            if(d.result){
                $('.header-list').html('')
            }
        }
    }
    Opt.init();
}(jQuery)