import { useCallback, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import TagsDropDown from './TagsDropDown'

const Post = () => {

    const title = useRef()
    const desc = useRef()
    const choosenTags = useRef()
    const tagsDropDownRef = useRef()
    const [dropDown, setDropDown] = useState(null)
    const [tags, setTags] = useState(['js', 'react', 'nodejs'])
    const [selectedInput, setSelectedInput] = useState(null)


    function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }


    function appendTags(e) {
        const input = e.target
        tagsDropDownRef.current.style.left = getOffset(input).left + "px"
        tagsDropDownRef.current.style.top = getOffset(input).top + "px"
        setSelectedInput(input)

        setDropDown((<TagsDropDown setDropDown={setDropDown} setSelectedInput={setSelectedInput}
            selectedInput={selectedInput} tags={tags} />))

    }
   

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return
       
        wrapper.innerHTML = ""

        const editor = document.createElement('div')

        const button = document.createElement('button')
        wrapper.append(editor)
        wrapper.append(button)

        const quill = new Quill(editor, {
            theme: "snow"
        })

  

        button.innerHTML = "click"
        button.addEventListener('click', (e) => {
            const content = quill.getContents()
            console.log(title.current.value)
            if (title.current.value.length > 0 && desc.current.value.length > 0 && quill.getLength() > 0) {


                fetch('http://localhost:1000/research', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: title.current.value,tags:choosenTags.current.value.replace(/\s\s+|,/g, ' ').split(' '), desc: desc.current.value, body: content
                    })
                }).then(res => res.json()).then((data) => {
                    alert(data)
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                alert("please fill the fields")
            }
        })

    }, [])

    return (
        <div className='Post-container'>

            <div className='tagsDropDownDiv' ref={tagsDropDownRef}>{dropDown}</div>

            <input type="text" placeholder='enter title' ref={title} ></input>
            <br />
            <input type="text" placeholder='enter description' ref={desc} ></input>
            <br />
            <input type="text" placeholder='enter tags' ref={choosenTags} onChange={appendTags} ></input>
            <br />
            <div id='editor' ref={wrapperRef}>

            </div>
        </div>
    )
}

export default Post