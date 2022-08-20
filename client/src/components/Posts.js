import { useEffect,useCallback, useState } from 'react'
import Quill from 'quill'



const Posts = () => {

  const [posts,setPosts] = useState(null)

useEffect(()=>{
  fetch("http://localhost:1000/researches")
  .then(res => res.json()).then((data)=> {
    console.log(data)
    setPosts(data)
  }).catch(err => console.log(err))
},[])

const research = useCallback((wrapper)=>{
  if(!wrapper) return;

  const quill = new Quill(wrapper,{
    modules: {
        toolbar: ''
    },
    readOnly: true,
    theme: 'snow'
})
console.log(wrapper.id)
quill.setContents(posts[wrapper.id].body)

})

  return (
    <div className='posts-container'>
     {
      posts ? posts.map((post,index)=>{
       return (
        <div>

        <div> {post.title} </div>
        <div> {post.desc} </div>
        <div id={index}  ref={research} ></div>
        </div>

       )
      }) : ""
      
     }
    </div>
  )
}

export default Posts