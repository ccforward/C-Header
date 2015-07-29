!(function($){


    var tmpl = '';
    var POP = {
        init: function(){
            this.load();
            this.events();
        },
        load: function(){
            var output = '';
            chrome.runtime.sendMessage({
                method: 'get'
            },function(d){
                if(d.result){
                    var headers = d.data.h,
                        cfg = d.data.cfg;               
                    for(var i=0,len=headers.length;i<len;i++){
                        output += '<li class="h-item"><p class="name">'+headers[i]['name']+'</p>'+
                        '<p class="value" title="' + headers[i]['value'] + '">' + headers[i]['value'] + '</p></li>';
                    }
                    if(cfg.run){
                        $('#J_SwicthBtn').addClass('on');
                    }
                    $('#J_HeaderList').html(output);
                }
                
            })            
        },
        events: function(){
            $('#J_SwicthBtn').click(function(){
                $(this).toggleClass('on');
                if($(this).hasClass('on')){
                    // run
                    chrome.runtime.sendMessage({
                        method: 'switch',
                        data: {mod:'run'}
                    },function(d){});                    
                }else {
                    // stop
                    chrome.runtime.sendMessage({
                        method: 'switch',
                        data: {mod:'stop'}
                    },function(d){});                    
                }
            });
            $('.option-link').on('click',function(e){
                e.preventDefault();
                chrome.tabs.create({url:'option.html'})
            });
            $('.h-item').on('click', function(e){
                var target = e.currentTarget;
                $(this).css({'background':'#9c0'});
            });
        }
    }
    POP.init();
    
}(jQuery))
// var bg = chrome.extension.getBackgroundPage(),info=bg.imgInfoObj;
// console.log('info:',info);
// console.log('data:',bg.infoData);
// console.log(chrome.extension);







