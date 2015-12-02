var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var _ = require('underscore');

var app = express();
var todos = [];
var todoNextId = 1;
const PORT = process.env.PORT ||3000;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todos API Root');
});

//GET /todos?completed=true/false&q=subString
app.get('/todos', function (req, res) {
	var query = req.query;
	var where = {};

	if(query.hasOwnProperty('completed') && query.completed === 'true') {
		where.completed = true;
	} else if (query.hasOwnProperty('completed') && query.completed === 'false') {
		where.completed = false;
	}


	if(query.hasOwnProperty('q') && query.q.trim().length > 0) {
		where.description = { 
			$like: '%' + query.q + '%' 
		};
	} 
		db.todo.findAll({where: where}).then(function (todos) {
			res.json(todos);
		}, function (e) {
			res.status(500).send();

		});
	// var filtredTodos = todos;
	// if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
	// 	filtredTodos = _.where(filtredTodos, {completed: true});

	// } else if (queryParams.hasOwnProperty('completed')  && queryParams.completed === 'false') {
	// 	filtredTodos = _.where(filtredTodos, {completed: false});
	// }
	// if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
	// 	filtredTodos = _.filter(filtredTodos, function (todo) {
	// 		return todo.description.indexOf(queryParams.q) > -1;
							
	// 	});
	// }

	// res.json(filtredTodos);
	
});

//GET todos/:id
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	db.todo.findById(todoId).then(function(todo) {
		res.send(todo);
	}, function (e) {
		res.status(404).send(); //error on heroku ==>200ok
	});
	// var matchTodo = _.findWhere(todos, {id: todoId});
	// if (matchTodo) {
	// 	res.json(matchTodo);

	// } else {
	// 	res.status(404).send("unable to have this model from localhost");
	// }
});

// POST /todos
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	db.todo.create(body).then(function (todo) {
		res.json(todo.toJSON());
	}, function (e) {
		res.status(400).json(e);
	});

	// if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
	// 	return res.status(400).send();
	// }
	// body = _.pick(body, 'description', 'completed');
	// body.description = body.description.trim();
	// body.id = todoNextId++;
	// todos.push(body);
	// res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	
	db.todo.destroy({
		where: {
		id: todoId
	}
	}).then(function (rows) {
		if (rows === 0) {
			res.send(deleted);
		} else {
			res.status(204).send();
		}
	}, function (error) {
		res.status(500).send(error);
	});


	// var todoToDelete = _.findWhere(todos, {id: todoId});
	// if (!todoToDelete) {
	// 	res.status(404).send('no item to delete');
	// } else {	
	// todos = _.without(todos, todoToDelete);
	// }
});

//PUT /todos/:id
app.put('/todos/:id', function (req, res) {
	var body = _.pick(req.body, 'completed', 'description');
	var todoId = parseInt(req.params.id, 10);
	var validAttributes = {};
	var todoToUpdate = _.findWhere(todos, {id: todoId});

	if (!todoToUpadate) { 
		return res.status(404).send();
	}

	if (body.hasOwnProprety('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProprety('completed')) {
		return res.status(400).send();
	} 

	if (body.hasOwnProprety('description')  && _isString(body.description) && body.description.trim().length !== 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProprety('description')) {
		return res.status(400).send();
	} 
	 _.extend(todoToUpadate, validAttributes);
	 res.json(todoToUpadate);


});

db.sequelize.sync().then(function () {
	app.listen(PORT, function () {
	console.log('server is listening to Port ' + PORT);
	});

});
