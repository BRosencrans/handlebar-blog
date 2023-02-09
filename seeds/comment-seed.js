const { Comment } = require('../models');

const commentTest = [
    {
    comment_text: "First!",
    user_id: 2,
    post_id: 1,    
    },
    {
    comment_text: "LasT!",
    user_id: 1,
    post_id: 3,    
    },
    {
    comment_text: "TeSt",
    user_id: 3,
    post_id: 2,   
    },
    {
    comment_text: "LOL",
    user_id: 1,
    post_id: 2,  
    },
    {
    comment_text: "Thrilling",
    user_id: 3,
    post_id: 1,    
    },
    {
    comment_text: "That's a lie",
    user_id: 2,
    post_id: 3,
    },
];

const seedComments = () => Comment.bulkCreate(commentTest);

module.exports = seedComments;