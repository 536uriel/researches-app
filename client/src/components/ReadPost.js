import React from 'react'
import { useEffect } from 'react'

const ReadPost = (props) => {

    useEffect(() => {
      console.log("render")
    }, [])
    

  return (
    <div>
        <div>{props.post.title}</div>
        {/* <div ref={props.research}></div> */}
        <button onClick={()=>{
          let arr = props.viewIntro
          arr[props.index] = true
          props.setViewIntro([...arr])
        }}>go back</button>
       
    </div>
  )
}

export default ReadPost