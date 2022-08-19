import React, { createElement, useEffect } from 'react'
import Quill from 'quill';
import { useRef, useCallback } from 'react';

const EditPost = (props) => {

    const title = useRef()
    const desc = useRef()

    useEffect(()=>{
        title.current.value = props.post.title
        desc.current.value = props.post.desc
    },[])



    const wrapperRef = useCallback((wrapper)=>{
        if(!wrapper) return;

        wrapper.innerHTML = ""

        const editor = document.createElement("div")
        const button = document.createElement("button")
        button.innerHTML ="save changes"
        wrapper.append(editor)
        wrapper.append(button)


        const quill = new Quill(editor,{
            theme:"snow"
        })

        quill.setContents(props.post.body)

        button.addEventListener('click',(e)=>{

           const content = quill.getContents()
           console.log(props.post._id)

            fetch('http://localhost:1000/research', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title.current.value, desc: desc.current.value, body:content,
                    postId:props.post._id
                })
            }).then(res => res.json()).then((data) => {
                alert(data.res)
                //todo: render the parent
                //this cousing an error
                // const posts = props.posts[0]
                // posts[props.index].title = title;
                // posts[props.index].desc = desc;
                // posts[props.index].body = content;

                // console.log(posts)
                // props.setPosts([...posts])

            }).catch((err) => {
                console.log(err)
            })
        })
    })

    return (
        <div>
            <input type="text" placeholder='enter title' ref={title} />
            <br />
            <input type="text" placeholder="enter description" ref={desc} />
            <br />
            <div ref={wrapperRef}></div>
            <br />
            <button onClick={() => {
                props.edit[props.index] = false;
                props.setEdit([...props.edit])
            }}>cancel</button>
        </div>
    )
}

export default EditPost