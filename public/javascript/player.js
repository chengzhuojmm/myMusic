var audio=$('#audio')[0];
var playPause=$('#playPause');


playPause.on('tap',function(){

    //console.log(12345);
    if(audio.paused){
        audio.play();
        $('.player_img').eq(0).removeClass('bbb');
        $('.player_img').eq(0).addClass('aaa');
        $('.player_play').eq(0).removeClass('ddd');
        $('.player_play').eq(0).addClass('ccc');
        playPause.html('&#xe602;')
        //$('.player_play').eq(0).css({'transform':'rotate(40deg)'})

    }else{
        audio.pause();
        $('.player_img').eq(0).addClass('bbb');
        $('.player_play').eq(0).removeClass('ccc');
        $('.player_play').eq(0).addClass('ddd');
        playPause.html('&#xe647;')
    }
});



//进度条设置
var press=$('#j-press');
var currentTime=$('#j-currenttime');
var pressBtn=$('.j-planbtn').eq(0);
var obj=this;
var allTime=$('#j-alltime');
var config = {
    timeInterval: null,
    isReay: false,
    duration: 0,   //全部时间
    currentTime: 0,   //当前时间
    gWidth: press.parent().width(),
    gLeft: press.parent().offset().left,
};


//audio.bind('timeupdata',function(){
//    obj.getCurrentTime(audio.currentTime,1);
//});
audio.ontimeupdate=function(){
   getCurrentTime(audio.currentTime,1);
};
audio.ondurationchange=function(){
    config.duration = audio.duration;
    allTime.html(parTime(config.duration));
}
//
//audio.on('durationchange',function(){
//    config.duration = audio.duration;
//    allTime.html(obj.parTime(config.duration));
//});

press.parent().on('touchstart',function(e){
    var x = e.touches[0].pageX - press.offset().left;
    var radio = x / config.gWidth;
    var currentTime = audio.duration * radio;
    audio.currentTime = currentTime;
    //audio.currentTime=currentTime;
    //console.log(e.touches[0].clientX );
    //console.log(e.touches[0].screenX );
    console.log(x);
   getCurrentTime(currentTime);
});

var getCurrentTime = function(Time,transition){
    //设置显示时间
    currentTime.html(parTime(Math.ceil(Time)));

    //设置进度条长度
    var ratio =  (Time /  Math.ceil(audio.duration) * 100).toFixed(2);
    press.css('width', ratio + '%');
};


// 转换时间
var parTime = function(seconds){
    seconds = Math.ceil(seconds);
    var sec = seconds % 60;

    var min = (seconds - sec)/60;
    var hours = '';
    if(min >= 60){
        hours = (min - min % 60 )/60;
        min = min % 60;
    }
    return (hours ? hours + ':' : '') + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
};



// 进度条拖动
var x;
var w;
var currentTime1;
var type;
var addLeft;
var width;
pressBtn.on('touchstart',function(e){
    //var _self = this;
    type=true;
    x = e.touches[0].pageX;
    w = parseInt(press.css('width'));
    currentTime1 = audio.currentTime;
});

pressBtn.on('touchmove',function(e){

    if(type){
        addLeft = e.touches[0].pageX - x;
        width = w + addLeft;
        if(w + addLeft >= config.gWidth){
            width = config.gWidth;
        }
        if(w + addLeft <= 0){
            width = 0;
        }
        var radio = width / config.gWidth;
        currentTime1 = audio.duration * radio;
        getCurrentTime(currentTime1,0);
    }


});

    pressBtn.on('touchend',function(e){
        console.log('end');
        type=false;
        //$(this).off('touchmove').off('touchend');
        console.log(currentTime1);
        audio.currentTime = currentTime1;
        audio.play();
    });

//var drag = function(){
//    //拖动进度条开始
//    pressBtn.on('touchstart',function(e){
//        var _self = this;
//        var x = e.touches[0].pageX;
//        var w = parseInt(press.css('width'));
//        var currentTime = audio.currentTime;
//        audio.pause();
//        $(_self).on('touchmove',function(e){
//            var addLeft = e.pageX - x;
//            var width = w + addLeft;
//            if(w + addLeft >= config.gWidth){
//                width = config.gWidth;
//            }
//            if(w + addLeft <= 0){
//                width = 0;
//            }
//            var radio = width / config.gWidth;
//            currentTime = audio.duration * radio;
//            obj.getCurrentTime(currentTime,0);
//        });
//        $(_self).on('touchend',function(){
//            $(this).off('touchmove').off('touchend');
//            audio.currentTime = currentTime;
//            audio.play();
//        });
//        return false;
//    });
//};
