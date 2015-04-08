!function($){
    var keyTmpl = $('#J_KeyTmpl').html();
    var Opt = {
        init: function(){
            this.events();
        },
        events: function(){
            $('#J_Add').on('click', function(){
                var key = prompt('请求头的名称');
                if(key){
                    var tpl = keyTmpl.replace(new RegExp('{{key}}', 'g'), key);
                    $('.header-list').append(tpl);
                }
            });

            $('#J_Save').on('click', function(){

            });
        }
    }
    Opt.init();
}(jQuery)