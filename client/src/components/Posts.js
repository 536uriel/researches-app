import { useEffect, useCallback, useState } from 'react'
import Quill from 'quill'
import ReadPost from './ReadPost'



const Posts = () => {

  const [posts, setPosts] = useState(null)
  const [viewIntro, setViewIntro] = useState([])
  const [searchParam, setSearchParam] = useState(" ")


  function filterItems(items) {
    return items.filter((item) => {
      return searchParam.split(" ").some((newItem) => {
        if (searchParam.length > 0) {
          return (
            item.title
              .toLowerCase()
              .includes(newItem.toLocaleLowerCase())
          );
        }

        return true

      });
    });


  }

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
      <input className='search-input' type="text" placeholder='search a post' onChange={(e) => setSearchParam(e.target.value)} />
      {
        posts ? filterItems(posts).map((post, index) => {
          return (
            <div>

              {

                viewIntro[index] ? (
                  viewIntro.includes(false) ? ""
                    : (

                      <div className='post-container'>

                        <h2 className='title'> {post.title} </h2>
                        <ul> {post.tags ? post.tags.map(tag => {
                          return <li>#{tag}</li>
                        }) : ""} </ul>
                        <h3 className='desc'> {post.desc} </h3>
                        <div className='posts-ql-wrapper' id={index} ref={research} ></div>
                        <button onClick={() => {
                          let arr = viewIntro

                          arr[index] = false
                          setViewIntro([...arr])
                        }}>read</button>
                      </div>

                    )

                ) : (
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