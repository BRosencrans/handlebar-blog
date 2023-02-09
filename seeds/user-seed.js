const {User} = require('../models');
//test users
const userTest = [{
    username: "test1",
    password: "password"
    },
    {
    username: "test2",
    password: "password"
    },
    {
    username: "test3",
    password: "password"
    }
];

const seedUsers = () => User.bulkCreate(userTest);

module.exports = seedUsers;