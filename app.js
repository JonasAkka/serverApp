var express = require('express');
var app = express();
const PORT = process.env.PORT ||3000;


app.get('/about', function (req, res) {
	res.send('Hello Jonas ');
	
});

app.listen(PORT, function () {
	console.log('server listening to Port ' + PORT);

});