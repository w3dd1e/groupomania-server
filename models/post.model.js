const sequelize = require("../database/db");
const { Sequelize, DataTypes } = require("sequelize");

const Post = sequelize.define("post", {
    
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  headline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likesCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
},
);

(async () => {
  await User.sync();
})();

console.log(User === sequelize.models.User);

module.exports = User;