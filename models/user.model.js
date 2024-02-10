const sequelize = require("../database/db");
const { Sequelize, DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

(async () => {
  await User.sync();
})();

console.log(User === sequelize.models.User);

module.exports = User;
