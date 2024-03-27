const sequelize = require("../database/db");
const { Sequelize, DataTypes, Deferrable } = require("sequelize");

//Definem users table
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

  profileImage: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "/images/newUserIcon.png",
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
  },

  department: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "",
  },
});
//Define posts table
const Post = sequelize.define("post", {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
  },

  headline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

//Define readPosts table
const ReadPost = sequelize.define("readPost", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

//Define table relationships
User.hasMany(Post);

Post.belongsTo(User, {
  foreignKey: { name: "user_id", allowNull: false },
  onDelete: "CASCADE",
});

User.belongsToMany(Post, { through: { model: ReadPost, unique: false } });
Post.belongsToMany(User, { through: { model: ReadPost, unique: false } });

sequelize.sync({ alter: true });

console.log(Post === sequelize.models.Post);
console.log(User === sequelize.models.User);
console.log(ReadPost === sequelize.model.ReadPost);

module.exports = { User, Post, ReadPost };
