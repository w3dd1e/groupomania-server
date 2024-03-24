const User = require('./user.model');
const Post = require('./post.model');
const sequelize = require('../database/db');
const { Sequelize } = require('sequelize');

Post.belongsTo(User, {
	foreignKey: { name: 'user_id', allowNull: false },
	onDelete: 'CASCADE',
});

User.belongsToMany(Post, {
	through: 'ReadPost',
	foreignKey: 'user_id',
	otherKey: 'post_id',
});

Post.belongsToMany(User, {
	through: 'ReadPost',
	foreignKey: 'post_id',
	otherKey: 'user_id',
});

module.exports = {
	User,
	Post,
};

(async () => {
	await sequelize.sync();
})();
