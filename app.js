var express = require('express');
var app = express();
const PORT = process.env.PORT ||3000;


app.get('/', function (req, res) {
	res.send('you are in index page');
});

app.get('/about', function (req, res) {
	res.send('Hello Jonas ');
	
});

app.listen(PORT, function () {
	console.log('server is listening to Port ' + PORT);

});