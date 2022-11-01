const TagsDropDown =  (props) => {


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

    return (
        <div className='tagsDropDown'>
            <ul>
                {
                    props.tags.map(tag => {
                        return (
                            props.selectedInput ? (
                                (checkSubStr(props.selectedInput.value, tag)) ? (<li onClick={(e) => {

                                    props.selectedInput.value = setSubStr(props.selectedInput.value, tag)

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

export default TagsDropDown;
