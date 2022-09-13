import { useCallback, useEffect, useRef, useState } from 'react'
import Quill from 'quill'

const Post = () => {

    const title = useRef()
    const desc = useRef()
    const tagsDropDownRef = useRef()
    const TagsDropDownQuillRef = useRef()
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


    function checkSubStr(str, subStr) {
        str = str.replace(/\n|\r/g, "");
        const subPositionStart = str.indexOf("#");
        let subPositionEnd = 0;
        if (subPositionStart >= 0) {

            for (let i = 0; i < subStr.length; i++) {

                if (str[subPositionStart + 1 + i + 1] == " " || (subPositionStart + 1 + i) == str.length - 1) {
                    subPositionEnd += subPositionStart + 1 + i;

                    break;
                }
            }

            if (subPositionEnd > 0) {
                const subTmp = str.slice(subPositionStart + 1, subPositionEnd + 1)
                return subStr.includes(subTmp)
            }

            return false;

        }
        return false;

    }

    function setSubStr(str, subStr) {
        const subPositionStart = str.indexOf("#");
        let subPositionEnd = 0;
        if (subPositionStart >= 0) {
            for (let i = 0; i < subStr.length; i++) {
                if (str[subPositionStart + 1 + i + 1] == " " || (subPositionStart + 1 + i) == str.length - 1) {
                    subPositionEnd += subPositionStart + 1 + i;
                    break;
                }
            }

            const beforeSub = str.slice(0, subPositionStart)
            const afterSub = str.slice(subPositionEnd + 1, str.length - 1)
            const newStr = beforeSub + subStr + afterSub
            return newStr
        }

        return str
    }


    const TagsDropDown = (props) => {

        return (
            <div className='tagsDropDown'>
                <ul>
                    {
                        props.tags.map(tag => {
                            return (
                                props.selectedInput ? (
                                    (checkSubStr(props.selectedInput.value, tag)) ? (<li onClick={(e) => {

                                        props.selectedInput.value = setSubStr(props.selectedInput.value, tag)
                                        props.setSelectedInput(props.selectedInput)

                                        props.setDropDown((""))
                                    }}>{tag}</li>) : ""
                                ) : ""
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    const TagsDropDownQuill = (props) => {


        return (
            <div className='tagsDropDown'>
                <ul>
                    {
                        props.tags.map(tag => {
                            return (

                                (checkSubStr(props.quillText, tag)) ? (<li onClick={(e) => {
                                    //tofix - set api with text 
                                    props.quill.setText(setSubStr(props.quillText, tag),"api")
                                    props.setDropDown((""))
                                }}>{tag}</li>) : ""

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

        quill.on('text-change', function (delta, oldDelta, source) {
            if (source == 'api') {
                console.log("An API call triggered this change.");
            } else if (source == 'user') {

                let str = quill.getText()

                setDropDown((<TagsDropDownQuill style={{position:"absolut","z-index":1,
                left:getOffset(editor).left + "px",top:getOffset(editor).top + "px"}} quill={quill} setDropDown={setDropDown} tags={tags}
                    quillText={str} />))



            }
        });

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