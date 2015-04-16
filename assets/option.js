!function($){
    var keyTmpl = $('#J_KeyTmpl').html();


    var Opt = {
        init: function(){
            this.load();
            this.events();
        },
        load: function(){
            chrome.runtime.sendMessage({
                method: 'get'
            },this._onLoadOver)
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

            // save
            $('#J_Save').on('click', function(){
                var h = [];
                $('.h-item').each(function(idx,item){
                    var o = {};
                    o.name = $(this).find('.key-val').html();
                    o.value = $(this).find('textarea').val();
                    h.push(o);
                });
                chrome.runtime.sendMessage({
                    method: 'save',
                    data: h
                }, this._onSaveOver);
            }.bind(this));

            $('#J_Clear').on('click', function(){
                if(confirm('Really')){
                    chrome.runtime.sendMessage({
                        method: 'clear'
                    }, _self._onClearOver);
                    
                }
            });

            // Edit one's name
            $('.header-list').delegate('.J_Edit' ,'click', function(e){
                var key = $(e.currentTarget).parents('.h-key').find('.key-val'),
                    name = prompt('请求头的名称',key.html());
                if(name){
                    key.html(name);
                    $('#J_Save').addClass('breath');
                }

            });

            // Delete One
            $('.header-list').delegate('.J_Delete' ,'click', function(e){
                if(confirm('Really')){
                    var target = $(e.currentTarget),
                        name = $(e.currentTarget).parents('.h-key').find('.key-val').html();
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
                    
                }
            });
            $('.header-list').delegate('textarea' ,'focus', function(e){
                $('#J_Save').addClass('breath');
            });
        },
        _onLoadOver: function(d){
            if(d.result){
                var headers = d.data.h,
                    cfg = d.data.cfg
                if(headers == null || headers == 0){
                    Util.addNothing();
                }else {
                    var output = '';
                    for(var i=0,len=headers.length;i<len;i++){
                       output += TemplateEngine(keyTmpl,headers[i]);
                    }
                    $('.header-list').html(output);
                    
                }
            }
        },
        _onSaveOver: function(d){
            d && d.result && alert('Save Successfully');
            $('#J_Save').removeClass('breath');
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