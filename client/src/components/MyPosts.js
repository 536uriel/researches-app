import { useEffect, useCallback, useState } from 'react'
import Quill from 'quill'
import EditPost from './EditPost'



const MyPosts = () => {

    const [posts, setPosts] = useState(null)
    const [edit, setEdit] = useState([false])


    useEffect(() => {
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
    }, [])

    const research = useCallback((wrapper) => {
        if (!wrapper) return;

        const quill = new Quill(wrapper, {
            debug: 'info',
            modules: {
                toolbar: ''
            },
            readOnly: true,
            theme: 'snow'
        })
        console.log(wrapper.id)
        quill.setContents(posts[wrapper.id].body)

    })

    return (
        <div className='MyPosts-container'>
            {
                posts ? posts.map((post, index) => {
                    return (
                        <div>

                            {
                                edit[index] == false ? (
                                    <div>
                                        <div> {post.title} </div>
                                        <div> {post.desc} </div>
                                        <div id={index} ref={research} ></div>
                                        <button onClick={()=>{
                                            edit[index] = true;
                                            setEdit([...edit])
                                            }}>edit post</button>
                                    </div>
                                ) : (<EditPost posts={posts} setPosts={setPosts} post={post}
                                     edit={edit} setEdit={setEdit} index={index} />)
                            }

                        </div>

                    )
                }) : ""

            }
        </div>
    )
}

export default MyPosts