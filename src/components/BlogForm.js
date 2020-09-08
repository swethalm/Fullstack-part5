import React, { useState } from 'react'

const BlogForm=({createBlog})=>{

    const [newTitle,setNewTitle] = useState('') 
    const [newAuthor,setNewAuthor] = useState('') 
    const [newUrl,setNewUrl] = useState('')

    //reset state
    const reset=()=>{
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    }
    const addBlog =  (event) => {
        event.preventDefault()
        createBlog({
                    title:newTitle,
                    author:newAuthor,
                    url:newUrl,
                    })
        reset()
                }

    return(
      <form onSubmit={addBlog}>
        <h3>Add new blog</h3> 
        <div>
            Title: <input id='title' value={newTitle} onChange={(event) => setNewTitle(event.target.value)}/>
        </div>
        <div>
            Author: <input id='author' value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)}/>
        </div>
        <div>
            URL: <input id='url' value={newUrl} onChange={(event) => setNewUrl(event.target.value)}/>
        </div>
        <div>
            <button id='add-button' type="submit">Add</button>
        </div>
    </form>
    )
}

export default BlogForm