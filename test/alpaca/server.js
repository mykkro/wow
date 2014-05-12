var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/../../js'));

app.listen(process.env.PORT || 3000);
