import { useCallback, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'


const Post = () => {

    const title = useRef()
    const desc = useRef()

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
                        title: title.current.value, desc: desc.current.value, body: content
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

            <input type="text" placeholder='enter title' ref={title}></input>
            <br />
            <input type="text" placeholder='enter description' ref={desc}></input>

            <div id='editor' ref={wrapperRef}>

            </div>
        </div>
    )
}

export default Post