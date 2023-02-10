const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")
const { Model, DataTypes } = require('sequelize');

class User extends Model {}
//sets up the user table
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            len: [3]
         }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len: [5]
        }
    }
},{
    hooks:{
    beforeCreate:newUser=>{
        newUser.password = bcrypt.hashSync(newUser.password,4);
        return newUser;
        }
    },
    sequelize,   
    freezeTableName: true,
});

module.exports= User;