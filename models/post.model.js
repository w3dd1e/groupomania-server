const sequelize = require("../database/db");
const { Sequelize, DataTypes, Deferrable, Model } = require("sequelize");
const User = require("./user.model");

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

(async () => {
  await Post.sync();
})();

console.log(Post === sequelize.models.Post);

module.exports = Post;
