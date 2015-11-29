var express = require('express');
var app = express();
const PORT = process.env.PORT ||3000;
var todos = [{
	id: 1,
	description: "Meet mom for lunch",
	completed: false
}, {
	id: 2,
	description: "Go to Market",
	completed: false
}, {
	id: 3,
	description: "be riche",
	completed: true
}];


app.get('/', function (req, res) {
	res.send('Todos API Root');
});

//GET /todos
app.get('/todos', function (req, res) {
	res.json(todos);
	
});

//GET todos/:id
app.get('/todos/:id', function (req, res) {
	var todoId;
	todos.forEach(function(value) {
		if(value.id === parseInt(req.params.id, 10)) {
			todoId = (value);
		} 
	});
	if (todoId) {
		res.json(todoId);
	} else {
		res.status(404).send("unable to have this model");
	}
});

app.listen(PORT, function () {
	console.log('server is listening to Port ' + PORT);

});