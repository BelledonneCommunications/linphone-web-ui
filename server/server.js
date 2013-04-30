var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var crypto = require('crypto');
var app = express();

app.set('port', process.env.PORT || 8888);
app.set('tmp', __dirname + '/tmp/');
app.set('public', __dirname + '/../dist/')
app.set('tmp', app.get('public') + '/tmp/');


app.configure(function(){
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.static(app.get('public')));
});

fs.mkdir(app.get('tmp'), 0777, function (err) {
});

function my_random() {
	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();
	return crypto.createHash('sha1').update(current_date + random).digest('hex');
}

app.post('/upload', function(req, res, next) {
    data = req.body.data.replace(/ /g, '+'); 
    filename = app.get('tmp') + "/" + my_random(); 
    console.log("Upload(" + req.body.filename + ", " + data.length + "): " + filename);
    fs.writeFile(filename, data, 'base64', function(err) {
      if(err) {
    	res.writeHead(500, {'Content-Type': 'text/plain' });
    	res.end('Forbidden \n');
        console.log(err);
      } else {
        res.writeHead(200, {'Content-Type': 'text/plain' });
        res.end('Ok \n');
        console.log("The file \"" + filename + "\" was saved!");
      }
    }); 
});



module.exports = app.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

