"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class newPost extends Model {
    static associate(models) {
      // define association here
    }
  }
  newPost.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      tag: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.BLOB, allowNull: false }
    },
    {
      sequelize,
      modelName: "newPost"
    }
  );
  return newPost;
};
