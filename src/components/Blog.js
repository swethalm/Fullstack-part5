import PropTypes from 'prop-types'
import React,{useState} from 'react'
const Blog = ({ blog, addLike, deleteBlog, user}) => {

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
      <div className='initalDetails'>
        <p>{blog.title}</p> <p>by {blog.author}</p>
        <button id='togglable-button' onClick={toggleBlogVisible}>{label}</button>
      </div>
      <div style={blogVisibleStyle} className='togglableDetails'>
        <p><b>URL:</b> <a href={blog.url}>{blog.url}</a></p>
        <p><b>Likes:</b> {blog.likes} &nbsp;
        <button id='like-button' onClick={addLike} value={ blog.id } > Like</button>
        </p>
      
         {user.username===blog.user.username? 
              <div> 
                <button id='del-button' value={ blog.id } onClick={ deleteBlog}>
                  Delete
                </button>
              </div>
           : null}
      </div>
    </div>
)
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}
export default Blog
