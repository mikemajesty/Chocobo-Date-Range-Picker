var express = require('express');
var favicon = require('serve-favicon');
var app = express();

app.use('/',  express.static(__dirname + '/'));

app.use(favicon(__dirname + '/public/favicon.ico'));

var PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendfile('demo/index.html');
});

app.listen(PORT, () => {
    console.log('Server Running on '+ PORT);
});
