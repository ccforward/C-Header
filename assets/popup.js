!(function($){
        $('a').on('click',function(e){
            e.preventDefault();
            window.open($(this).attr('href'));
        })
    }(jQuery))
// var bg = chrome.extension.getBackgroundPage(),info=bg.imgInfoObj;
// console.log('info:',info);
// console.log('data:',bg.infoData);
// console.log(chrome.extension);







