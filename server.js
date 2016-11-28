var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
  res.sendfile('timePicker.html');
});

app.listen(PORT, () => {
    console.log('Server Running on '+ PORT);
});
