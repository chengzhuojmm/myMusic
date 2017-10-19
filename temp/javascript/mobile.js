//$(document).ready(function(){
//    $('#mymusic').on('tap',function(e){
//        $('.main-page').eq(0).addClass('show');
//        $('.all-music').eq(0).removeClass('show');
//        console.log(1);
//    });
//
//    $('#allmusic').on('tap',function(e){
//        $('.main-page').eq(0).removeClass('show');
//        $('.all-music').eq(0).addClass('show');
//        console.log(2);
//    });
//
//    $('#currentplay').on('tap',function(){
//        $('.player').eq(0).addClass('show');
//    });
//    $('#back').on('tap',function(){
//        $('.player').eq(0).removeClass('show');
//    });
//});


$(document).ready(function(){
    $('#back').on('tap',function(){
        $('.main-page').eq(0).removeClass('show');
        $('.all-music').eq(0).addClass('show');
    });

    $('#goMainpage').on('tap',function(){
        $('.all-music').eq(0).removeClass('show');
        $('.main-page').eq(0).addClass('show');
    });

    $('#player_back').on('tap',function(){
        $('.player').eq(0).removeClass('show');
        $('.main-page').eq(0).addClass('show');
        $('.footer').eq(0).css({'display':'block'});
    });

    $('#myAccount').on('tap',function(){
        //console.log(11111111)
        //$('.all-music').eq(0).removeClass('show');
        $('.main-page').eq(0).removeClass('show');
        $('.account').eq(0).addClass('show');
    });

    $('#back2').on('tap',function(){
        $('.account').eq(0).removeClass('show');
        $('.main-page').eq(0).addClass('show');
    });

    $('#goPlayer').on('tap',function(){
        $('.main-page').eq(0).removeClass('show');
        $('.player').eq(0).addClass('show');
        $('.footer').eq(0).css({'display':'none'});
    });
});

var html='';
$.ajax({
    url:'/mobile/allmusic',
    type:'get',
    success:function(data){

       for(var i=0;i<data.length;i++){
           html+='<li class="clear">' +
                   '<div class="musicList_left">' +
                   '<img src='+data[i].musicimg+'>'+
               '</div>'+
                   '<div class="list_content_right" style="width: 73vw;height: 3.5rem;padding: .5rem;">' +
                   '<h2 style="float: left">' +
                   data[i].musicname+
                   '<p>'+data[i].author+'</p>'+
               '</h2>'+
                   '<i class="iconfont list_content_right_icon">&#xe766;</i>'+
               '</div>'+
               '<li>';
       }
        $('#all-music-ul').append($(html));
        $('#listNum').html(data.length);

    },
    error:function(err){
        console.log(err);
    }
});


//添加音乐到收藏
var html1='';
var musicList=[];


var musicId='';
//主页面点击播放
var html2='';
var html3='';
var html4='';
$('#main-page-article-ul').on('tap','li',function(){
    $('.source').eq(0).attr('src',null);
    $('.player').eq(0).addClass('show');
    $('.footer').eq(0).css({'display':'none'});
    var id=$(this).children('.idIndex').html();
    $('#player_title').html('');
    $('.play').eq(0).html('');
    console.log($('#audio').get(0));

    $.ajax({
        url:'/mobile/play',
        type:'get',
        data:{id:id},
        success:function(data){
            musicId=data[0].id;
            console.log(data[0]);
            html2='<h2 style="float: left">' +
                data[0].musicname+
                '<p style="font-size: 1rem;">' +
                '<span>' +
                data[0].author+
                '</span>'+'-'+
                '<span>' +
                data[0].album+
                '</span>'+
                '</p>'+
                '</h2>'+
                '<i class="iconfont list_content_right_icon">' +
                '&#xe7da;'+
                '</i>';
            html3='<div class="player_play clear">' +
                    '<img src="../images/4.png">'+
                '</div>'+
                '<div class="player_img clear">' +
                    '<img src='+data[0].musicimg+'>'+
                '</div>';
            //html4='<source src='+data[0].musicsrc+'>';
            $('#audio').attr('src',data[0].musicsrc);

            $('#player_title').append($(html2));
            $('.play').eq(0).append($(html3));
            $('#audio').append($(html4));
            $('.play').eq(0).children('.player_img').css({'display':'block'});


            $('.player').eq(0).css({"position":"relative"});
            $('.player-background').eq(0).css({
                "content":"''",
                "display":'block',
                "width":"100%",
                "height":"100%",
                "background":'url('+data[0].musicimg+')',
                "background-repeat":'no repeat',
                "background-size":'auto 100%',
                "position":"absolute",
                "z-index":'450',
                "filter":'blur(15px)'
            });



            var playPause=$('#playPause');
            var audio=$('#audio').get(0);
            audio.play();
            $('.player_img').eq(0).removeClass('bbb');
            $('.player_img').eq(0).addClass('aaa');
            $('.player_play').eq(0).removeClass('ddd');
            $('.player_play').eq(0).addClass('ccc');
            playPause.html('&#xe602;');
        },
        error:function(err){
            console.log(err);
        }
    });
});




//发送用户信息
var html5="";

$('#submit').on('tap',function(){
    $('#main-page-article-ul').html('');
    $('.account').eq(0).removeClass('show');
    $('.main-page').eq(0).addClass('show');
   var userInfo={};
    userInfo.username=$('#username').val();
    userInfo.password=$('#password').val();
    $.ajax({
        url:'/mobile/getUser',
        type:'post',
        data:userInfo,
        success:function(data){
            if(data==''){
                musicList=[];
            }else{
                musicList=data.musiclist;
                for(var i=0;i<data.rows.length;i++){
                    var a_index=parseInt(i)+1;
                    html5+= '<li class="clear">' +
                        '<span class="list_left li_index" style="color:#b0b0b1;">'+a_index+'</span>'+
                        '<div class="list_content_right">' +
                        '<h3 style="float: left">'+data.rows[i].musicname+'' +
                        '<p>' +
                        '<span>'+data.rows[i].author+'</span>'+'-'+
                        '<span>' +data.rows[i].album+
                        '</span>'+
                        '</p>'+
                        '</h3>'+
                        '<i class="iconfont list_content_right_icon">&#xe641;</i>'+
                        '</div>'+
                        '<span class="idIndex" style="display: none">'+data.rows[i].id+'</span>'+
                        '</li>';
                }
            }
            console.log(musicList)
            $('#allLove').html(musicList.length);
            $('#main-page-article-ul').append($(html5));
        },
        error:function(err){
            console.log(err);
        }
    });
});


$('#all-music-ul').on('tap','.iconfont',function(){
  var type=true;
    var id=parseInt($(this).parent().parent().index())/2+1;
    console.log(id);
    if(musicList.length==0){

    }else {
      for(var i=0;i<musicList.length;i++){
        if(musicList[i]==id){
          type=false;
          alert("已存在歌单中");
        }
      }
    }
    if(type){
      var b=confirm('确认添加到歌单？');
      if(b==true){
          $.ajax({
              url:'/mobile/addmusic',
              type:'get',
              data:{id:id},
              success:function(data){
                  musicList=data.list;
                  $('#allLove').html(musicList.length);
                  html1='<li class="clear">' +
                      '<span class="list_left li_index" style="color:#b0b0b1;">'+data.list.length+'</span>'+
                      '<div class="list_content_right">' +
                      '<h3 style="float: left">'+data.rows[0].musicname+'' +
                      '<p>' +
                      '<span>'+data.rows[0].author+'</span>'+'-'+
                      '<span>' +data.rows[0].album+
                      '</span>'+
                      '</p>'+
                      '</h3>'+
                      '<i class="iconfont list_content_right_icon">&#xe641;</i>'+
                      '</div>'+
                      '<span class="idIndex" style="display: none">'+data.rows[0].id+'</span>'+
                      '</li>';
                  $('#main-page-article-ul').append($(html1));
                  console.log(musicList)
              },
              error:function(err){
                  console.log(err);
              }
          });
      }
    }
});

var musicIndex=$.inArray(musicId,musicList);

//删除歌曲

$('#main-page-article-ul').on('longTap','li',function(){
    console.log(11111111111)
    var id=$(this).children('.idIndex').html();

    $('.deletePage').eq(0).addClass('show1');
    $('#deleteBtn').on('tap',function(){
        var index= $.inArray(id,musicList);

        html1=''
        console.log(html5)
        $('#main-page-article-ul').html('')
            console.log( $('#main-page-article-ul').html())

            $.ajax({
                url:'/mobile/delete',
                type:'get',
                data:{id:index},
                success:function(data){
                    musicList=data.list;
                    html5='';
                    $('#main-page-article-ul').html('')
                    if(musicIndex > index){
                        musicIndex=musicIndex-1;
                    }
                    console.log(musicList)
                    $('#allLove').html(musicList.length);
                    for(var i=0;i<data.rows.length;i++){
                        var a_index=parseInt(i)+1;
                        html5+= '<li class="clear">' +
                            '<span class="list_left li_index" style="color:#b0b0b1;">'+a_index+'</span>'+
                            '<div class="list_content_right">' +
                            '<h3 style="float: left">'+data.rows[i].musicname+'' +
                            '<p>' +
                            '<span>'+data.rows[i].author+'</span>'+'-'+
                            '<span>' +data.rows[i].album+
                            '</span>'+
                            '</p>'+
                            '</h3>'+
                            '<i class="iconfont list_content_right_icon">&#xe641;</i>'+
                            '</div>'+
                            '<span class="idIndex" style="display: none">'+data.rows[i].id+'</span>'+
                            '</li>';
                    }
                    $('#main-page-article-ul').append($(html5));
                    console.log(musicList)
                },
                error:function(err){
                    console.log(err)
                }
            })
        $('.deletePage').eq(0).removeClass('show1');
    });
    $('#cancel').on('tap',function(){

        $('.deletePage').eq(0).removeClass('show1');
    })



})




var audio=$('#audio')[0];

console.log(musicIndex);
console.log(musicId);




var playType=$('#playType');
$('#playType').on('tap',function () {
  if($(this).hasClass('xunhuang')){
    $(this).removeClass('xunhuang');
    $(this).addClass('suiji')
    $(this).html('&#xe60c;')
  }else {
    $(this).removeClass('suiji');
    $(this).addClass('xunhuang');
    $(this).html('&#xe623;');
  }
})
$(audio).on('ended',function(){
    var id;
    if($(playType).hasClass('xunhuang')){
      if(musicIndex==musicList.length-1){
        musicIndex=-1;
      }
        musicIndex+=1;
        id=musicList[musicIndex];
    }else {
      var random=parseInt(Math.random()*musicList.length);
     id=musicList[random];
    }
    console.log(id);
    $('#player_title').html('');
    $.ajax({
        url:'/mobile/playAnother',
        type:'get',
        data:{id:id},
        success:function(data){
            musicId=data[0].id;
            $('.play').eq(0).html('');
            html2='<h2 style="float: left">' +
                data[0].musicname+
                '<p style="font-size: 1rem;">' +
                '<span>' +
                data[0].author+
                '</span>'+'-'+
                '<span>' +
                data[0].album+
                '</span>'+
                '</p>'+
                '</h2>'+
                '<i class="iconfont list_content_right_icon">' +
                '&#xe7da;'+
                '</i>';
            html3='<div class="player_play clear">' +
                '<img src="../images/4.png">'+
                '</div>'+
                '<div class="player_img clear">' +
                '<img src='+data[0].musicimg+'>'+
                '</div>';
            $('.play').eq(0).append($(html3));
            $('#player_title').append($(html2));
            $('#audio').attr('src',data[0].musicsrc);
            var playPause=$('#playPause');
            var audio=$('#audio').get(0);
            audio.play();
            $('.player_img').eq(0).removeClass('bbb');
            $('.player_img').eq(0).addClass('aaa');
            $('.player_play').eq(0).removeClass('ddd');
            $('.player_play').eq(0).addClass('ccc');
            playPause.html('&#xe602;');

            $('.player').eq(0).css({"position":"relative"});
            $('.player-background').eq(0).css({
                "content":"''",
                "display":'block',
                "width":"100%",
                "height":"100%",
                "background":'url('+data[0].musicimg+')',
                "background-repeat":'no repeat',
                "background-size":'auto 100%',
                "position":"absolute",
                "z-index":'450',
                "filter":'blur(15px)'
            });
        },
        error:function(err){
            console.log(err);
        }

    });
});

$("#playNext").on('tap',function(){
  var id;
    console.log(musicList)
  if($(playType).hasClass('xunhuang')){
    if(musicIndex==musicList.length-1){
      musicIndex = -1;
    }
      musicIndex+=1;
      id=musicList[musicIndex];
  }else {
    var random=parseInt(Math.random()*musicList.length);
   id=musicList[random];
  }
  console.log(id);
  $('#player_title').html('');
    $.ajax({
        url:'/mobile/playAnother',
        type:'get',
        data:{id:id},
        success:function(data){
            musicId=data[0].id;
            $('.play').eq(0).html('');
            html2='<h2 style="float: left">' +
                data[0].musicname+
                '<p style="font-size: 1rem;">' +
                '<span>' +
                data[0].author+
                '</span>'+'-'+
                '<span>' +
                data[0].album+
                '</span>'+
                '</p>'+
                '</h2>'+
                '<i class="iconfont list_content_right_icon">' +
                '&#xe7da;'+
                '</i>';
                html3='<div class="player_play clear">' +
                    '<img src="../images/4.png">'+
                    '</div>'+
                    '<div class="player_img clear">' +
                    '<img src='+data[0].musicimg+'>'+
                    '</div>';
                $('.play').eq(0).append($(html3));
                $('#player_title').append($(html2));
            $('#audio').attr('src',data[0].musicsrc);
            var playPause=$('#playPause');
            var audio=$('#audio').get(0);
            audio.play();
            $('.player_img').eq(0).removeClass('bbb');
            $('.player_img').eq(0).addClass('aaa');
            $('.player_play').eq(0).removeClass('ddd');
            $('.player_play').eq(0).addClass('ccc');
            playPause.html('&#xe602;');

            $('.player').eq(0).css({"position":"relative"});
            $('.player-background').eq(0).css({
                "content":"''",
                "display":'block',
                "width":"100%",
                "height":"100%",
                "background":'url('+data[0].musicimg+')',
                "background-repeat":'no repeat',
                "background-size":'auto 100%',
                "position":"absolute",
                "z-index":'450',
                "filter":'blur(15px)'
            });
        },
        error:function(err){
            console.log(err);
        }

    });
});



$("#playPrev").on('tap',function(){
  var id;
  if($(playType).hasClass('xunhuang')){
    if(musicIndex==0){
      musicIndex=musicList.length;
    }
      musicIndex-=1;
      console.log(musicIndex);
      id=musicList[musicIndex];
  }else {
    var random=parseInt(Math.random()*musicList.length);
   id=musicList[random];
  }
  console.log(id);
  $('#player_title').html('');
    $.ajax({
        url:'/mobile/playAnother',
        type:'get',
        data:{id:id},
        success:function(data){
            musicId=data[0].id;
            $('.play').eq(0).html('');
            html2='<h2 style="float: left">' +
                data[0].musicname+
                '<p style="font-size: 1rem;">' +
                '<span>' +
                data[0].author+
                '</span>'+'-'+
                '<span>' +
                data[0].album+
                '</span>'+
                '</p>'+
                '</h2>'+
                '<i class="iconfont list_content_right_icon">' +
                '&#xe7da;'+
                '</i>';
            html3='<div class="player_play clear">' +
                '<img src="../images/4.png">'+
                '</div>'+
                '<div class="player_img clear">' +
                '<img src='+data[0].musicimg+'>'+
                '</div>';
            $('.play').eq(0).append($(html3));
            $('#player_title').append($(html2));
            $('#audio').attr('src',data[0].musicsrc);
            var playPause=$('#playPause');
            var audio=$('#audio').get(0);
            audio.play();
            $('.player_img').eq(0).removeClass('bbb');
            $('.player_img').eq(0).addClass('aaa');
            $('.player_play').eq(0).removeClass('ddd');
            $('.player_play').eq(0).addClass('ccc');
            playPause.html('&#xe602;');


            $('.player').eq(0).css({"position":"relative"});
            $('.player-background').eq(0).css({
                "content":"''",
                "display":'block',
                "width":"100%",
                "height":"100%",
                "background":'url('+data[0].musicimg+')',
                "background-repeat":'no repeat',
                "background-size":'auto 100%',
                "position":"absolute",
                "z-index":'450',
                "filter":'blur(15px)'
            });
        },
        error:function(err){
            console.log(err);
        }
    });
});



