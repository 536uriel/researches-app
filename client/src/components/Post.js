import { useCallback, useEffect, useRef, useState } from 'react'
import Quill from 'quill'

const Post = () => {

    const title = useRef()
    const desc = useRef()
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

    const getCursorPosition = function (input) {
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    }


    function appendTags(e) {
        const input = e.target
        tagsDropDownRef.current.style.left = getOffset(input).left + "px"
        tagsDropDownRef.current.style.top = getOffset(input).top + "px"
        setDropDown((<TagsDropDown tagsDropDownRef={tagsDropDownRef} setSelectedInput={setSelectedInput}
            selectedInput={selectedInput} tags={tags} />))


        if (input.value[getCursorPosition(input) - 2] == "#" && tags.some(val => { return input.value[getCursorPosition(input) - 1] == val[0] })) {
            setSelectedInput(input)
            tagsDropDownRef.current.style.visibility = "visible"


        } else {
            tagsDropDownRef.current.style.visibility = "hidden"

        }

    }

    const TagsDropDown = (props) => {

        return (
            <div className='tagsDropDown'>
                <ul>
                    {
                        props.tags.map(tag => {
                            return (
                                //tofix
                                props.selectedInput ? (
                                    (props.selectedInput.value[getCursorPosition(props.selectedInput) - 1] == tag[0]) ? (<li onClick={(e) => {

                                        props.selectedInput.value += tag
                                        props.setSelectedInput(props.selectedInput)

                                        props.tagsDropDownRef.current.style.visibility = "hidden"
                                    }}>{tag}</li>) : ""
                                ) : ""
                            )
                        })
                    }
                </ul>
            </div>
        )
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

            <div className='tagsDropDownDiv' ref={tagsDropDownRef}>{dropDown}</div>

            <input type="text" placeholder='enter title' ref={title} onChange={appendTags} ></input>
            <br />
            <input type="text" placeholder='enter description' ref={desc} onChange={appendTags} ></input>

            <div id='editor' ref={wrapperRef}>

            </div>
        </div>
    )
}

export default Post