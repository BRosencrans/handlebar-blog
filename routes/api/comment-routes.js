const router = require('express').Router();
const {Comment} = require('../../models');
const myAuth = require('../../utilities/authentication.js');

//database routes for the comments
router.get('/', (req, res) => {
    //finds all comments
    Comment.findAll({})
    .then(allComments => res.json(allComments))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
   //finds one comment by its id number
    Comment.findAll({
    where: {id: req.params.id}
    })
    .then(oneComment => res.json(oneComment))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    })
});

router.post('/', myAuth, (req, res) => {
    //creates new comment
    if (req.session) {
    Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    user_id: req.session.user_id,})
    .then(newComment => res.json(newComment))
    .catch(err => {
    console.log(err);
    res.status(400).json(err);
    })
    }
});

router.put('/:id', myAuth, (req, res) => {
   //updates a comment
    Comment.update({
     comment_text: req.body.comment_text},
     {where:{id: req.params.id}
    }).then(updateComment => {
    if (!updateComment) 
    {res.status(404).json({ message: "There is no comment with this id" });
    return;}
    res.json(updateComment);
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.delete('/:id', myAuth, (req, res) => {
   //deletes a comment
    Comment.destroy({
    where: {id: req.params.id}
    }).then(deleteComment => {
    if (!deleteComment) 
    {res.status(404).json({ message: "There is no comment with this id" });
    return;}
    res.json(deleteComment);
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

module.exports = router;