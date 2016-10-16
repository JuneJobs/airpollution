//Global value
var port = 3000;
var host = 'localhost';
//module load.
var express = require('express');
var test = require('./qi_modules/test');
//make express server.
var app = express();
app.get('/', function(req, res){
    res.send('hello home page');
});
app.listen(port, host,function(){
  console.log('start New webserver');
  console.log(test.add(1, 2));
})
