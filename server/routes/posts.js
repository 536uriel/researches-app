const router = require('express').Router();
const Post = require('../models/posts-schema')
const checkAuthenticated = require('../helpers/auth')

router.get('/researches', async (req, res) => {
   const posts = await Post.find({})
   res.send(posts)
})

router.get('/my-researches', checkAuthenticated, async (req, res) => {
   const posts = await Post.find({ _id: req.user._id })
   res.send(posts)
})

//todo: add checkAuthenticated
router.post('/research', async (req, res) => {

   const { title, desc, body } = req.body
   try {
      if (title && desc && body) {
         const post = new Post({
            //todo: need to change to req.user._id
            title, desc, body, userId: "62fca5bb7f62e8e08d4d8bd5"
         })

         await post.save()
         return res.send({res:"posted"})
      } else {
         res.sendStatus(400)
      }
   } catch (error) {
      console.log(error)
      res.sendStatus(500)
   }


})

module.exports = router;