import { useCallback, useRef } from 'react'
import Quill from 'quill'


const Post = () => {

    const title = useRef()
    const desc = useRef()

    /*
** Returns the caret (cursor) position of the specified text field (oField).
** Return value range is 0-oField.value.length.
*/
// function doGetCaretPosition (oField) {

//     // Initialize
//     var iCaretPos = 0;
  
//     // IE Support
//     if (document.selection) {
  
//       // Set focus on the element
//       oField.focus();
  
//       // To get cursor position, get empty selection range
//       var oSel = document.selection.createRange();
  
//       // Move selection start to 0 position
//       oSel.moveStart('character', -oField.value.length);
  
//       // The caret position is selection length
//       iCaretPos = oSel.text.length;
//     }
  
//     // Firefox support
//     else if (oField.selectionStart || oField.selectionStart == '0')
//       iCaretPos = oField.selectionDirection=='backward' ? oField.selectionStart : oField.selectionEnd;
  
//     // Return results
//     return iCaretPos;
//   }
  

    function tags(e){
        console.log(e)
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

            <input type="text" placeholder='enter title' ref={title} onChange={tags}></input>
            <br />
            <input type="text" placeholder='enter description' ref={desc}></input>

            <div id='editor' ref={wrapperRef}> 

            </div>
        </div>
    )
}

export default Post