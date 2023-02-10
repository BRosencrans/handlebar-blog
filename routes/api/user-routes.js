const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//database routes for the user table
router.get('/', (req, res) => {
   //gets all users
    User.findAll({
    attributes: { exclude: ['password']}
    })
    .then(allUsers => res.json(allUsers))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.get("/logout",(req,res)=>{
   //route to logout
    req.session.destroy();
    res.send("logged out")
})


router.get('/:id', (req, res) => {
    //gets one user
    User.findOne({attributes: { exclude: ['password'] },
    where: {id: req.params.id},
    include: [{model:Post,
    attributes: ['id','title','content']},
    {model: Comment,
    attributes: ['id','comment_text'],
    include:{model: Post,
    attributes: ['title']}
    }]})
.then(oneUser => {
    if (!oneUser) {
    res.status(404).json({ message:"There is no user with this id." });
    return;
    }
    res.json(oneUser);
    })
    .catch(err => {
    console.log(err);
     res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    //creates a new user
    User.create({
    username: req.body.username,
    password: req.body.password
    })
    .then(newUser => {
    req.session.save(() => {
    req.session.user_id = newUser.id;
    req.session.username = newUser.username;
    req.session.loggedIn = true;
    res.json(newUser);
    });})
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.post("/login",(req,res)=>{
   //route to login
    User.findOne({
    where:{
    username:req.body.username
    }
    }).then(userLogin=>{
    if(!userLogin){
    return res.status(401).json({message:"incorrect username or password"})
    }else{
    if(bcrypt.compareSync(req.body.password,userLogin.password))
    { req.session.userId = userLogin.id;
    req.session.username = userLogin.username;
    req.session.loggedIn = true; 
    return res.json(userLogin)
    }else{
    return res.status(401).json({message:"incorrect username or password"})}
    }}).catch(err=>{
    console.log(err);
    res.status(500).json({message:"something went wrong",err})
    })
 })

 
router.delete('/:id', (req, res) => {
   //deletes a user
    User.destroy({
    where: {
    id: req.params.id
    }
    }).then(deleteUser => 
    {if (!deleteUser) {
    res.status(404).json({ message: "There is no user with this id" }
    );return;}
    res.json(deleteUser);
    }).catch(err => {
    console.log(err);
    res.status(500).json({message:"something went wrong",err});
    });
});

module.exports = router;