var express = require('express');
//test
var app = express();
app.get('/', function(req, res){
    res.send('hello home page');
});
var port = 3000;
app.listen(port,function(){
  console.log('start New webserver');
})
