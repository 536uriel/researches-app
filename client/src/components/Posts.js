import { useEffect, useCallback, useState } from 'react'
import Quill from 'quill'



const Posts = () => {

  const [posts, setPosts] = useState(null)

  useEffect(() => {
    fetch("http://localhost:1000/researches")
      .then(res => res.json()).then((data) => {
        console.log(data)
        setPosts(data)
      }).catch(err => console.log(err))
  }, [])

  const research = useCallback((wrapper) => {
    if (!wrapper) return;

    wrapper.innerHTML = ""

    const editor = document.createElement("div")
    wrapper.append(editor)

    const quill = new Quill(editor, {
      modules: {
        toolbar: ''
      },
      readOnly: true,
      theme: 'snow'
    })
    quill.setContents(posts[wrapper.id].body)

  })

  return (
    <div className='posts-container'>
      {
        posts ? posts.map((post, index) => {
          return (
            <div className='post-container'>

              <div className='title'> {post.title} </div>
              <div className='desc'> {post.desc} </div>
              <div className='quill-wrpper' id={index} ref={research} ></div>
            </div>

          )
        }) : ""

      }
    </div>
  )
}

export default Posts