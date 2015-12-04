var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect':'sqlite',
	'storage':__dirname + '/database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type:Sequelize.STRING,
		allowNull:false,
		validate:{
			len:[1, 250]
		}
	},
	completed: {
		type:Sequelize.BOOLEAN,
		allowNull:true,
		defaultValue: false
	}
});

User.sync().then(function() {
		console.log('start');
		Todo.create({
			description:'it comes',
			completed:true
	}).then(function (todo) {
		Todo.create({
			description:'at Least'
		}).then(function (todo) {
			// body...
		});
	});


});