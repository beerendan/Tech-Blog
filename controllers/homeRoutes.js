const router= require('express').Router();
const {Post,User}= require('../models');
const withAuth= require('../utils/auth');

router.get('/', async(req,res)=>{
    try {
        const postData= await Post.findAll({
            include: [
                {
                    model: User,
                    attributes:['username'],
                },
            ],
        });
        
        const posts=postData.map((post)=> post.get({plain:true}));

        res.render('homepage',{
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch(err){
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async(req,res)=>{
    try{
        const postData= await Post.findByPk(req.params.id, {
            include:[
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const post=postData.get({plain:true});
        res.render('post',{
            ...post,
            loggedIn: req.session.loggedIn
        });
    } catch (err){
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async(req,res)=>{
    try{
        const userData= await User.findByPk(req.session.user_id, {
            attributes:{exclude:['password']},
            include:[{model: Post}],
        });
        const user=userData.get({plain:true});
        
        res.render('dashboard',{
            ...user,
            loggedIn:true
        });
    } catch(err){
        res.status(500).json(err);
    }
});

router.get('/login',(req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

module.exports=router;