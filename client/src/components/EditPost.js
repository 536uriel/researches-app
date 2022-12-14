import React, { createElement, useEffect, useState } from 'react'
import Quill from 'quill';
import { useRef, useCallback } from 'react';
import TagsDropDownDiv from './TagsDropDownDiv';

const EditPost = (props) => {

    const title = useRef()
    const tagsInput = useRef()
    const desc = useRef()

    useEffect(() => {
        title.current.value = props.post.title
        tagsInput.current.value = props.post.tags.toString()
        desc.current.value = props.post.desc
    }, [])



    const wrapperRef = useCallback((wrapper) => {
        if (!wrapper) return;

        wrapper.innerHTML = ""

        const editor = document.createElement("div")
        const button = document.createElement("button")
        button.innerHTML = "save changes"
        button.setAttribute("class","btn")
        wrapper.append(editor)
        wrapper.append(button)


        const quill = new Quill(editor, {
            theme: "snow"
        })

        quill.setContents(props.post.body)

        button.addEventListener('click', (e) => {

            const content = quill.getContents()

            fetch('http://localhost:1000/research', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title.current.value, tags: tagsInput.current.value.replace(/\s\s+|,/g, ' ').split(' '), desc: desc.current.value, body: content,
                    postId: props.post._id
                })
            }).then(res => res.json()).then((data) => {
                alert(data.res)
                //todo: render the parent
                props.setRefresh({
                    title: title.current.value, desc: desc.current.value, body: content
                })

            }).catch((err) => {
                console.log(err)
            })
        })
    })

    return (
        <div>
            <input type="text" placeholder='enter title' ref={title} />
            <br />
            <TagsDropDownDiv tagsInput={tagsInput} />
            <br />
            <input type="text" placeholder="enter description" ref={desc} />
            <br />
            <div ref={wrapperRef}></div>
            <br />
            <button className='btn' onClick={() => {
                props.edit[props.index] = false;
                props.setEdit([...props.edit])
            }}>cancel</button>
        </div>
    )
}

export default EditPost