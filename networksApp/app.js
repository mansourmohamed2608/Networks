var express = require('express');
var path = require('path');
var app = express();
var alert = require('alert');
var fs = require('fs');
var session = require('express-session')
var MongoClient = require('mongodb').MongoClient;
var user1=null


const { Db } = require('mongodb');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('login');
});

app.get('/registration',function(req,res){
  res.render('registration');
});

// app.get('/home',function(req,res){
// res.render('home')
// });
      
app.get('/islands',function(req,res){
  res.render('islands');
    });
app.get('/cities',function(req,res){
  res.render('cities');
    });
app.get('/hiking',function(req,res){
   res.render('hiking');
    })
    app.get('/wanttogo',function(req,res){
      res.render('wanttogo');
    })
      app.get('/wanttogo',function(req,res){
      res.render('wanttogo');
    })
      app.get('/inca',function(req,res){
      res.render('inca');
    })
//LOGIN

app.post('/login',function(req,res){
  var username = req.body.username;
  var pass = req.body.password;
 
  MongoClient.connect("mongodb://127.0.0.1:27017", async function(err, client){
    if(err) throw err;
    var db = client.db('MyDB');
    
    var data= await db.collection('FirstCollection').find().toArray();
  var flag = false;
 for( let i=0 ;i<data.length;i++){
  if(username==data[i].username )
  {
    if(pass == data[i].password)
    flag = true;

    // usercart = username;
  }
  }
  if (flag == false)
  {
    
    alert("Wrong username or password");
   
    res.render('login');
    


  }
  else{
  session["username"]=username;
  alert("Login Successful")
    res.render('home');    }});
});

//REGISTER
 app.post('/registration',function(req,res){
  var username = req.body.username;
  var password = req.body.password;

  
  MongoClient.connect("mongodb://127.0.0.1:27017", async function(err, client){
    if(err) throw err;
    var db = client.db('MyDB');
    
    var data= await db.collection('FirstCollection').find().toArray();
    var flag = true;
    console.log(data)
   for( let i=0 ;i<data.length;i++){
    if(username==data[i].username )
    {
      flag = false;
      break;
    }
    }
    if (flag == true)
    {
      db.collection('FirstCollection').insertOne({"username": username , "password": password});
    session["username"]=username;
    alert("Register Successful")
      res.render('home'); 


    }
    else{
      alert("Username already exists");
      res.render ('registration');
    } 
  });
;
  
 });


 








//MongoConnection

//  var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client){
//   if(err) throw err;
//   var db = client.db('MyDB');
//   db.collection('FirstCollection').insertOne({user1});
//   data=db.collection('FirstCollection').find().toArray();
// });


if(process.env.PORT){
  app.listen(process.env.PORT,function(){console.log('Server started')});
}
else{
  app.listen(3000,function(){console.log('Server started on port 3000')});
}

