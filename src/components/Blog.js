import React,{useState} from 'react'
const Blog = ({ blog, addLike, deleteBlog, user}) => {

  console.log('user:',user, 'bloguser',blog.user)
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleBlogVisible = () => setBlogVisible(!blogVisible)

  const blogVisibleStyle ={ display:blogVisible ? '':'none'}
  const label = blogVisible ? 'Hide':'View'

  return(
    <div style={blogStyle}>
      <div>
        {blog.title}&nbsp;
        <button onClick={toggleBlogVisible}>{label}</button>
      </div>
      <div style={blogVisibleStyle}>
        <p><b>URL:</b> <a href={blog.url}>{blog.url}</a></p>
        <p><b>Likes:</b> {blog.likes} &nbsp;
        <button onClick={addLike} value={ blog.id } > Like</button>
        </p>
        <p><b>Author:</b> {blog.author}</p>
         {user.username===blog.user.username? 
              <div> 
                <button value={ blog.id } onClick={ deleteBlog}>
                  Delete
                </button>
              </div>
           : null}
      </div>
    </div>
)
  }
export default Blog
