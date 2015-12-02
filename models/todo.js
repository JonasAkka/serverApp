module.exports = function(sequelize,DataTypes) { //argument sequelize instance  and datatypes replace Sequelize.TYPE

	return sequelize.define('todo', {
		description: {
			type: DataTypes.STRING,
			allowNull:false,
			validate: {
			len: [1, 250]
		    }
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue:false
		}
	});

};