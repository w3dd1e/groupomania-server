const sequelize = require("../database/db");
const User = require("./user.model");

const { Sequelize, DataTypes, Deferrable, Model } = require("sequelize");

const Profile = sequelize.define("profile", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: User,
      key: "user_id",
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: "email",
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: "username",
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

(async () => {
  await Profile.sync();
})();

console.log(Profile === sequelize.models.Profile);

module.exports = Profile;
