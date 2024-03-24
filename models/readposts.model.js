const sequelize = require('../database/db');
const { Sequelize, DataTypes, Deferrable, Model } = require('sequelize');

const ReadPost = sequelize.define('readPost', {
	read_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
	},
	post_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Post,
			key: 'post_id',
			deferrable: Deferrable.INITIALLY_IMMEDIATE,
		},
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'user_id',
			deferrable: Deferrable.INITIALLY_IMMEDIATE,
		},
	},
});
ReadPost.belongsTo(User, {
	foreignKey: { name: 'user_id', allowNull: false },
	onDelete: 'CASCADE',
});

(async () => {
	await ReadPost.sync();
})();

console.log(ReadPost === sequelize.models.ReadPost);

module.exports = ReadPost;
