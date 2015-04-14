!(function($){


    var tmpl = '';
    var POP = {
        init: function(){
            this.events();
            this.load();
        },
        load: function(){
            var output = '';
            chrome.runtime.sendMessage({
                method: 'get'
            },function(d){
                if(d.result){
                    var headers = d.data.h;                
                    for(var i=0,len=headers.length;i<len;i++){
                        output += '<li class="h-item"><p class="name">'+headers[i]['name']+'</p>'+
                        '<p class="value">'+headers[i]['value']+'</p></li>';
                    }
                    $('#J_HeaderList').html(output);
                }
                
            })            
        },
        events: function(){
            $('#J_SwicthBtn').click(function(){
                $(this).toggleClass('on');
            });
        }
    }
    POP.init();
    $('').on('click',function(e){
        e.preventDefault();
        window.open($(this).attr('href'));
    })
}(jQuery))
// var bg = chrome.extension.getBackgroundPage(),info=bg.imgInfoObj;
// console.log('info:',info);
// console.log('data:',bg.infoData);
// console.log(chrome.extension);







