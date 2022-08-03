const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const Comment = sequelize.define("Comment", {
    commentid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
    PostId: {
      type: DataTypes.INTEGER,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Comment;
};
