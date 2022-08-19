const router = require('express').Router();
const Post = require('../models/posts-schema')
const checkAuthenticated = require('../helpers/auth')

router.get('/researches', async (req, res) => {
   const posts = await Post.find({})
   res.send(posts)
})

//todo: add checkAuthenticated
router.get('/my-researches', async (req, res) => {
   //todo: need to change to req.user._id
   const posts = await Post.find({ userId: "62fca5bb7f62e8e08d4d8bd5" })
   res.send(posts)
})

//todo: add checkAuthenticated
router.post('/research', async (req, res) => {

   const { title, desc, body, postId } = req.body
   try {
      console.log(title)
      if (postId && title && desc && body) {
         const post = await Post.findOne({ _id: postId })
         //todo: need to change to req.user._id
         if (post.userId == "62fca5bb7f62e8e08d4d8bd5") {
            //have permittion to edit
         await Post.findByIdAndUpdate(postId, {
               $set: {
                  title,desc,body
               }
            })
           return res.send({res:"posted"})
     
         }

         res.send({res:"you dont have permition to post"})

      }  else {
         if (title && desc && body) {
            const post = new Post({
               //todo: need to change to req.user._id
               title, desc, body, userId: "62fca5bb7f62e8e08d4d8bd5"
            })

            await post.save()
            return res.send({ res: "created" })
         } else {
            res.send({res:"bad request"})
         }
      }


   }catch (error) {
      console.log(error)
      res.sendStatus(500)
   }
})


module.exports = router;