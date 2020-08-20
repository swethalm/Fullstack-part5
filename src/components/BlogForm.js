import React from 'react'

const PersonForm=({newTitle,newAuthor,newUrl,setNewTitle, setNewAuthor,setNewUrl,addBlog})=>{

    return(
      <form onSubmit={addBlog}>
        <h3>Add new blog</h3> 
        <div>
            Title: <input value={newTitle} onChange={(event) => setNewTitle(event.target.value)}/>
        </div>
        <div>
            Author: <input value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)}/>
        </div>
        <div>
            URL: <input value={newUrl} onChange={(event) => setNewUrl(event.target.value)}/>
        </div>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
    )
}

export default PersonForm