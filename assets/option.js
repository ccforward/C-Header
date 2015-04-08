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
                // var value = prompt('请求头的值')
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
                var h = [];
                $('.h-item').each(function(idx,item){
                    var o = {};
                    o.name = $(this).attr('data-name');
                    o.value = $(this).find('textarea').val();
                    h.push(o);
                });
                chrome.runtime.sendMessage({
                    method: 'save',
                    data: h
                }, _self._onSaveOver);
            });
            $('#J_Clear').on('click', function(){
                if(confirm('Really')){
                    chrome.runtime.sendMessage({
                        method: 'clear'
                    }, _self._onClearOver);
                    
                }
            });

            // Edit one's name
            $('.header-list').delegate('.J_Edit' ,'click', function(e){
                var name = $(e.currentTarget).attr('data-name');
                chrome.runtime.sendMessage({
                    method: 'edit',
                    data: name
                },function(d){
                    d.result && alert('Edit Successfully')
                });
            });

            // Delete One
            $('.header-list').delegate('.J_Delete' ,'click', function(e){
                var _self = this;
                var target = $(e.currentTarget),
                    name = target.attr('data-name'),
                    value = target.parents('.h-item').find('textarea').val();
                chrome.runtime.sendMessage({
                    method: 'delete',
                    data: name
                },function(d){
                    d.result && alert('Delete Successfully');
                    target.parents('.h-item').hide(300).promise().done(function(){
                        target.parents('.h-item').remove();
                        if($('.h-item').length == 0){
                            Util.addNothing();
                        }
                    });
                });
            });



        },
        _onLoadOver: function(d){
            if(d.result){
                if(d.data == null || d.data.length == 0){
                    Util.addNothing();
                }else {
                    var output = '';
                    for(var i=0,len=d.data.length;i<len;i++){
                       output += TemplateEngine(keyTmpl,d.data[i]);
                    }
                    $('.header-list').html(output);
                    
                }
            }
        },
        _onSaveOver: function(d){
            d.result && alert('Save Successfully')
        },
        _onClearOver: function(d){
            if(d.result){
                Util.addNothing();
            }
        },
        

    }
    var Util = {
        addNothing: function(){
            $('.header-list').html('<p class="nothing">添加一条HTTP请求头</p>')
        }        
    }
    Opt.init();
}(jQuery)