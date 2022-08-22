import React from 'react'
import { useEffect,useCallback } from 'react'
import Quill from 'quill'


const ReadPost = (props) => {

    useEffect(() => {
      console.log("render")
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
    quill.setContents(props.post.body)

  })
    

  return (
    <div className='read-post-container'>
        <h1>{props.post.title}</h1>
        <div>
        <div className='read-post-content' ref={research}></div>
        <button onClick={()=>{
          let arr = props.viewIntro
          arr[props.index] = true
          props.setViewIntro([...arr])
        }}>go back</button>
        </div>
       
    </div>
  )
}

export default ReadPost