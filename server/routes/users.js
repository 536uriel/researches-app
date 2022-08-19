const router  = require('express').Router();
const User = require('../models/users-schema')
const passport = require('passport')
const checkAuthenticated = require('../helpers/auth')

router.get('/usersIds',async(req,res)=>{
  const users = await User.find({})
  const usersIds = []
  users.forEach(user => {
    usersIds.push(user._id)
  })
  res.send(usersIds)
})

router.post('/register',async (req,res)=>{
    const {username,password} = req.body

    try{
        if(username && password){
            const newUser = new User({
                username,password
            })
    
            await newUser.save()
           return res.sendStatus(201)
    
        }

        res.sendStatus(400)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
    
})

router.post('/login', 
  passport.authenticate('local'),
  function(req, res) {
    res.send(req.user._id);
  });

  router.get('/logout',checkAuthenticated, function(req, res){
    req.logout(function(err) {
      if (err) { return res.send(err) }
      res.redirect('/');
    });
  });


module.exports = router;