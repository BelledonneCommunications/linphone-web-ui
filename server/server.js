var express = require('express');
var commander = require('commander');
var https = require('https');
var http = require('http');
var fs = require('fs');
var crypto = require('crypto');
var app = express();

commander
  .version('0.0.1')
  .option('-d, --debug', 'Debug env')
  .option('-p, --port <n>', 'HTTP port', parseInt)
  .parse(process.argv);

app.set('port', commander.port? commander.port: 8888);
app.set('env', commander.debug? 'debug': 'release');
app.set('tmp', __dirname + '/tmp/');
app.set('public', __dirname + '/../dist/')
app.set('tmp', app.get('public') + '/tmp/');
app.set('expires', (app.get('env') === 'debug')? 0 : 60*60*24*14 * 1000);


app.configure(function(){
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.static(app.get('public'), { maxAge: app.get('expires') }));
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
  console.log('Express server listening on port ' + app.get('port') + ' env ' + app.get('env'));
});

