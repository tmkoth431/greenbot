module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		balance: {
			type: DataTypes.INTEGER,
			defaultValue: 10,
			allowNull: false,
		},
		fish_exp: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		biggest_catch: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};