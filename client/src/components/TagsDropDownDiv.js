import { useCallback, useEffect, useRef, useState } from 'react'
import TagsDropDown from './TagsDropDown'


const TagsDropDownDiv = (props) => {



  const tagsDropDownRef = useRef()
  const [dropDown, setDropDown] = useState(null)
  const [tags, setTags] = useState(['js', 'react', 'nodejs'])


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

    setDropDown((<TagsDropDown setDropDown={setDropDown} 
        selectedInput={input} tags={tags} />))

}

  return (
    <div>
    <div className='tagsDropDownDiv' ref={tagsDropDownRef}>{dropDown}</div>
    <input type="text" ref={props.tagsInput} placeholder='set tags' onChange={appendTags} />
    </div>
  )
}

export default TagsDropDownDiv