const express = require("express");
const router = express.Router();
const {User, Post, Comment} = require("../../models");
const myAuth = require('../../utilities/authentication.js')

// database routes for the posts
router.get("/", (req, res) => {
   //finds all posts and attached comments
    Post.findAll({
    attributes: ['id','title','content'],
    include:[{model: User,
    attributes: ['username']},
    {model: Comment,
    attributes: ['id', 'comment_text', 'post_id', 'user_id',],
    include:{ model: User,
    attributes: ['username']}
    }]
    })
    .then(allPosts => res.json(allPosts))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    //finds one post and attached comments
    Post.findOne({ where: {id: req.params.id },
    attributes: ['id','content','title',],
    include: [{ model: User,
    attributes: ['username']},
    {model: Comment,
    attributes: ['id', 'comment_text', 'post_id', 'user_id',],
    include: {model: User,
     attributes: ['username']}
    }]
    })
    .then(onePost => {
    if (!onePost) {
    res.status(404).json({ message: "There is no post with this id" });
    return;
    }res.json(onePost);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.post('/', myAuth, (req, res) => {
   //creates new post
    Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id})
    .then(newPost => res.json(newPost))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.put('/:id', myAuth, (req, res) => {
    //updates post
    Post.update({
    title: req.body.title,
    content: req.body.content}, 
    {where:{d: req.params.id}
    }).then(updatePost => {
    if (!updatePost) {
    res.status(404).json({ message: "There is no post with this id" });
    return;
    }res.json(updatePost);
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.delete('/:id',myAuth, (req, res) => {
  //deletes a post
    Post.destroy({
    where: {id: req.params.id}
    }).then(deletePost => {
    if (!deletePost) {
    res.status(404).json({ message: "There is no post with this id" });
    return;
    }res.json(deletePost);
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});
  
module.exports = router;