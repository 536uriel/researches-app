import { useEffect, useCallback, useState } from 'react'
import Quill from 'quill'
import EditPost from './EditPost'



const MyPosts = () => {

    const [posts, setPosts] = useState(null)
    const [edit, setEdit] = useState([false])
    const [refresh,setRefresh] = useState(null)
    


    useEffect(() => {
        console.log("myposts rendered")
        fetch("http://localhost:1000/my-researches")
            .then(res => res.json()).then((data) => {
                console.log(data)
                setPosts(data)
                const arr = []
                for(let i = 0;i < data.length;i++){
                    arr.push(false)
                }
                
                setEdit([...arr])
            }).catch(err => console.log(err))
    }, [refresh])

    const research = useCallback((wrapper) => {
        if (!wrapper) return;

        wrapper.innerHTML = ""

        const editor = document.createElement("div")
        wrapper.append(editor)

        const quill = new Quill(editor, {
            modules: {
                toolbar: ''
            },
            readOnly: true,
            theme: 'snow'
        })
        quill.setContents(posts[wrapper.id].body)

    })

    function deletePost(postId){
        fetch('http://localhost:1000/research', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId
            })}).then(res => {
                alert("post deleted")
                setRefresh(postId)
            })
            .catch(err=>{
                console.log(err)
            })
        }

    return (
        <div className='MyPosts-container'>
            {
                posts ? posts.map((post, index) => {
                    return (
                        <div>

                            {
                                edit[index] == false ? (
                                    <div className='post-container'>
                                        <h2> {post.title} </h2>
                                        <ul className='tags'> {(post.tags.length > 0 && post.tags[0] != '')? post.tags.map(tag=>{
                                            return (<li>#{tag}</li>)
                                        }) :""} </ul>
                                        <h3> {post.desc} </h3>
                                        
                                        <div className='posts-ql-wrapper' id={index} ref={research} ></div>
                                       
                                        <button className='btn' onClick={()=>{
                                            edit[index] = true;
                                            setEdit([...edit])
                                            }}>edit post</button>
                                            <button onClick={()=>{deletePost(post._id)}}>delete</button>
                                    </div>
                                ) : (<EditPost setRefresh={(val)=>setRefresh(val)} post={post} edit={edit} 
                                    setEdit={setEdit} index={index} />)
                            }

                        </div>

                    )
                }) : ""

            }
        </div>
    )
}

export default MyPosts