const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Post extends Model {}

Post.init({
  //sets up post table
  title: {
    type: DataTypes.STRING,
    allowNull: false},
  content: {
    type: DataTypes.TEXT,
    allowNull: false},
  user_id: {
    type: DataTypes.INTEGER,
    references: {
    model: 'user',
    key: 'id' }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );
  
  module.exports = Post;