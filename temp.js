var mysql = require('mysql');
//Connect with mysql
var pool = mysql.createPool({
  connectionLimit : 1000,
  host : 'localhost',
  user : 'root',
  password : 'skskzja',
  database : 'airpollution',
  debug : false
});
//server
var test = function(aa, bb, cc, dd, callback){
  console.log('call the database');

  pool.getConnection(function(err, conn) {
    if(err) {
      conn.release();
      return;
    }
    console.log('Database connected thread id : ' + conn.threadId);

    //make data base connect object
    var data = {aa: aa, bb: bb, cc: cc, dd: dd};

    var exec = conn.query('insert into test set ?', data, function(err, result){
      conn.release();
      console.log('run sql : ' + exec.sql);

      if(err) {
        console.log('err');
        console.dir(err);

        callback(err, null);

        reurn;
      }
      callback(null, result);
    });
  });
};

//cient code
app.post('/test', function(req, res) {
  console.log('test call');

  var aa = req.paramId = req.param('aa');
  var bb = req.param('bb');
  var cc = req.param('cc');
  var dd = req.param('dd');

  if(pool){
    addUser(aa, bb, cc, dd, function(err, result) {
      if(err) {throw err;}
      if(result){
        console.dir(result);

        console.log('inserted' + result.affecteRows + 'rows');
        var aa = result.aa;
        console.log('add record id : ' + aa);

        res.writeHead('200', {'content-Type' : 'text/html;cahrset=utf8'});
        res.write('<h2>aa added</h2>');
        res.end();
      } else {
        res.writeHead('200', {'content-Type' : 'text/html;cahrset=utf8'});
        res.write('<h2>aa added denied</h2>');
        res.end();
      }
    })
  } else {
    res.writeHead('200', {'content-Type' : 'text/html;cahrset=utf8'});
    res.write('<h2>db con err</h2>');
    res.end();
  }
});
