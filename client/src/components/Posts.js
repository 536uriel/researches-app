import { useEffect, useCallback, useState } from 'react'
import Quill from 'quill'
import ReadPost from './ReadPost'



const Posts = () => {

  const [posts, setPosts] = useState(null)
  const [viewIntro, setViewIntro] = useState([])

  useEffect(() => {
    fetch("http://localhost:1000/researches")
      .then(res => res.json()).then((data) => {
        console.log(data)
        setPosts(data)

        let arr = []
        data.forEach(element => {
          arr.push(true)
        });

        setViewIntro([...arr])

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
            <div>

              {

                viewIntro[index] ? (
                  viewIntro.includes(false) ? ""
                 : (

                  <div className='post-container'>

                    <div className='title'> {post.title} </div>
                    <div className='desc'> {post.desc} </div>
                    <div className='posts-ql-wrapper' id={index} ref={research} ></div>
                    <button onClick={() => {
                      let arr = viewIntro
                     
                      arr[index] = false
                      setViewIntro([...arr])
                    }}>read</button> 
                  </div>

                ) 
                
                ): (
                  <div>
                    <ReadPost index={index} viewIntro={viewIntro} setViewIntro={setViewIntro} 
                     post={posts[index]} />
                  </div>


                )


              }

            </div>
          )

        }) : ""

      }
    </div>
  )
}

export default Posts