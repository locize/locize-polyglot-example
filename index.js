var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var lngs = ['en', 'de'];
var locals = {};


function load(lng, callback) {
  var url = 'https://api.locize.io/897381a6-125c-40b8-9b28-2f80ae9a3612/latest/{{lng}}/translation'.replace('{{lng}}', lng);
  request(url, function(err, res, body) {
    callback(err, lng, body);
  });
}

app.get('/', function(req, res) {
  var lng = req.query.lng ||  'en';

  fs.readFile(__dirname + '/index.html', (err, data) => {
    if (err) console.log(err);

    data = data.toString().replace('###locals###', JSON.stringify(locals[lng])).replace('###lng###', lng);
    res.set('content-type','text/html');
    res.send(data);
  });
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/style.css');
});

var todo = lngs.length;
function done(err, lng, body) {
  if (err) console.log(err);
  if (!err) {
    locals[lng] = body;
  }

  todo--;

  if (!todo) {
    app.listen(8080);
    console.log('started server on http://localhost:8080');
  }
}

lngs.forEach(function(lng) {
  load(lng, done)
});
