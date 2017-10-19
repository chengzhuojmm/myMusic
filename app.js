var express = require('express');
var app = express();
var mysql=require('mysql');
var logger = require('morgan');
var fs=require('fs');

var useragent = require('express-useragent');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path=require('path');


//链接数据库
var connection = mysql.createConnection({
	host:'127.0.0.1',
	port:'7000',
	user:'chengzhuo',
	password:'cczjmm921012',
	database:'163music'
})


//开启设备检测的中间件
app.use(logger('dev'));
app.use(useragent.express());

//设置静态目录
 app.use(express.static(path.join(__dirname,'public')));

//设置网站favicon，将图标放置在目录中后解除注释，否则会报错导致退出
// app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));

//设置网页渲染引擎,本次不使用任何引擎
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

//为了解析req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//打开主页的请求，判断用户的客户端是什么？
app.get('/',function(req,res){
	// 客户端是桌面版，引导向index.html页面
	if(req.useragent.isDesktop){
		res.redirect('/desktop.html');
	}else if(req.useragent.isMobile){
	// 客户端是移动设备，应该引导向手机主页
		res.redirect('/mobile.html');
	}
});




app.get('/houtai',function(req,res){
	res.redirect('houtai.html');
});


//获取音乐数据，将音乐数据传入数据库中
app.post('/houtai/getmusic',function(req,res){
	var music={};
	//console.log(req.body);

	music.musicname=req.body.musicname;
	music.author=req.body.author;
	music.album=req.body.album;
	music.musicimg=req.body.musicimg;
	music.musicsrc=req.body.musicsrc;

	connection.query("INSERT INTO `music` SET?",music,function(err,result){
		if(err){
			console.log(err);
			res.send('失败');
		}else{
			res.send('成功');
		}
	})
});






//点击主页面的列表歌曲，将该歌曲数据传入播放界面；
app.get('/mobile/play',function(req,res){
	var id=req.query.id;
	connection.query('SELECT * FROM `music` WHERE id='+id,function(err,rows,result){
		if(err){
			console.log(err);
		}else{
			res.send(rows);
			console.log(rows);
		}
	})
});





//获取用户信息

var userInfo={};
app.post('/mobile/getUser',function(req,res){
	//判断用户是否存在

	var userData={};

	userInfo.username=req.body.username;
	userInfo.password=req.body.password;
	userInfo.playlist='./playlist/'+req.body.username+'.json';
	data.musiclist=[];
	//data.username=userInfo.username;

	connection.query("SELECT * FROM `user`",function(err,rows,result){
		var jmm=true;
		if(err){
			console.log(err);
		}else{
			for(var i=0;i<rows.length;i++){
				if(rows[i].username==userInfo.username ){
				//	获取用户播放列表地址
					jmm=false;
					var playerlist=rows[i].playlist;
				//	读取这个列表
					var userFile=fs.readFileSync(playerlist,'utf-8');
					userData=JSON.parse(userFile);
					console.log(userData.musiclist);


					connection.query("SELECT * FROM `music` WHERE id IN ("+userData.musiclist+")",function(err,rows,result){
						if(err){
							console.log(err);
						}else{
							res.send({rows:rows,musiclist:userData.musiclist});

						}
					})
				};
			}
			console.log(jmm)
			if(jmm){
				var data={};
				data.username=userInfo.username;
				data.musiclist=[];

				fs.writeFile(userInfo.playlist,JSON.stringify(data),'utf-8');
				console.log(userInfo);
				connection.query("INSERT INTO `user` SET?",userInfo,function(err,rows,result){
					if(err){
						console.log(err);
					}else{
						console.log(12309);
						res.send('');
					}
				})
			}
		}
	})





	//data={};
	//userInfo.username=req.body.username;
	//userInfo.password=req.body.password;
	//userInfo.playlist='./playlist/'+req.body.username+'.json';
	////data.username=userInfo.username;
	//data.musiclist=[];
	//fs.writeFile(userInfo.playlist,JSON.stringify(data),'utf-8');
	//connection.query("INSERT INTO `user` SET?",userInfo,function(err,rows,result){
	//	if(err){
	//		console.log(err)
	//		res.send("用户插入失败");
	//	}else{
	//		res.send('用户插入成功');
	//	}
	//})
});




//将数据库中所有音乐传入到前台all music中
app.get('/mobile/allmusic',function(req,res){
	connection.query('SELECT * FROM `music`',function(err,rows,result){
		if(err){
			console.log(err);
			res.send(err);
		}else{
			res.send(rows);
		}
	})
});


//将allmusic中的新闻添加到主页当中去
var data={};
app.get('/mobile/addmusic',function(req,res){
	var id=req.query.id;

	console.log(id)
	var oldFile=fs.readFileSync(userInfo.playlist,'utf-8');//sync同步
	if(oldFile==""){
		data={};

	}else{
		data=JSON.parse(oldFile);
		//data.musiclist=[];
	}
	//data.push(id);

	data.musiclist.push(id);
	console.log(data.musiclist);
	//data[data.length-1].musiclist=data[data.length-1].id.split('');
	//data[data.length-1].content=data[data.length-1].content.split('\r\n');
	fs.writeFile(userInfo.playlist,JSON.stringify(data),'utf-8');



	connection.query('SELECT * FROM `music` WHERE id='+id,function(err,rows,result){
		if(err){
			console.log(err);
		}else{
			res.send({
				rows:rows,
				list:data.musiclist
			});
			console.log(rows)
		}
	});

});


app.get('/mobile/delete',function(req,res){
	var id=req.query.id;

	var oldFile=fs.readFileSync(userInfo.playlist,'utf-8');
	var data1=JSON.parse(oldFile);

	data1.musiclist.splice(id,1);
	fs.writeFile(userInfo.playlist,JSON.stringify(data1),'utf-8');

	connection.query("SELECT * FROM `music` WHERE id IN ("+data1.musiclist+")",function(err,rows,result){
		if(err){
			console.log(err);
		}else{
			res.send({
				rows:rows,
				list:data1.musiclist
			});
			console.log(rows)
		}
	});

})



app.get('/mobile/playAnother',function(req,res){
	var id=req.query.id;
	connection.query('SELECT * FROM `music` WHERE id='+id,function(err,rows){
		console.log(rows);
		res.send(rows);
	})
});









app.listen(9000,function(){
    console.log('server is running at 6000 port');
});
