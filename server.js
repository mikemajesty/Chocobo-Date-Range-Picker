var express = require('express');
var app = express();

app.use('/public',  express.static(__dirname + '/demo'));
app.use('/',  express.static(__dirname + '/'));

var PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
  res.sendfile('demo/index.html');
});

app.listen(PORT, () => {
    console.log('Server Running on '+ PORT);
});
