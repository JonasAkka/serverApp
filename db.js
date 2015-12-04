var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var Sequelize;


if (env === 'production') { //it's true if we are working on herku
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',

	});

} else {
		 sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-todo-api.sqlite'
	});
	
}

var db = {};
db.todo = sequelize.import(__dirname + '/models/todo.js'); //the file called with import must have a specific format
db.user = sequelize.import(__dirname + '/models/user.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;