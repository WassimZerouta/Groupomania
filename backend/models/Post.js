const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const Post = sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Post;
};
