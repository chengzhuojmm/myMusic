$(document).ready(function(){
    $('#mymusic').on('tap',function(e){
        $('.main-page').eq(0).addClass('show');
        $('.all-music').eq(0).removeClass('show');
        console.log(1);
    });

    $('#allmusic').on('tap',function(e){
        $('.main-page').eq(0).removeClass('show');
        $('.all-music').eq(0).addClass('show');
        console.log(2);
    });

    $('#currentplay').on('tap',function(){
        $('.player').eq(0).addClass('show');
    });
    $('#back').on('tap',function(){
        $('.player').eq(0).removeClass('show');
    });
});
