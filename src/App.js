import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType,setErrorType]=useState('')

  //Compare likes- for sorting
  function compareLikes(a,b)
  {
    return b.likes-a.likes
  }

  //Initial blogs list
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(compareLikes))
    )  
  }, [])

  //login
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Handle login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedUser', JSON.stringify(user)
      ) 

    blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Incorrect username/password')
      setErrorType('error')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  //Handle logout
  const handleLogout = async event => {
    event.preventDefault()
      window.localStorage.removeItem('loggedUser')
      setUser(null)
    }

  //Create new blog
  const addBlog1 = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newlyAddedBlog= await blogService.create(blogObject)
    const addedBy = {
      username: JSON.parse(window.localStorage.getItem('loggedUser')).username,
      name: JSON.parse(window.localStorage.getItem('loggedUser')).name
    }

    newlyAddedBlog.user = addedBy
    setBlogs(blogs.concat(newlyAddedBlog))
    setErrorMessage(`Blog added`)
    setErrorType('success') 
  }

  //Add likes
  const addLike = async(event) =>
  {
    const idToUpdate = event.target.value
    const blogToUpdate = blogs.find(b => b.id === idToUpdate)

    const newBlog = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1
        }

    const updatedBlog = await blogService.update(idToUpdate, newBlog)
    setBlogs(blogs.map(blog => blog.id === idToUpdate ? updatedBlog:blog).sort(compareLikes))
    setErrorMessage(`Blog updated`)
    setErrorType('success') 
  }

  //delete blog
  const deleteBlog = async (event) => {
    const idToDelete = event.target.value
    const blogToDelete = blogs.find(b => b.id === idToDelete)
    if (window.confirm(`Delete ${blogToDelete.title} blog from list?`)) 
    {
        await blogService.remove(idToDelete)      
        setBlogs(blogs.filter(blog => blog.id !== idToDelete))
        setErrorMessage(`Deleted blog`)
        setErrorType('success')
    } 
  }
  //loginform
  const loginform = () =>
  (
    <Togglable buttonLabel='Log in'>
    <LoginForm user={user} username={username}
               password={password}
               handleUserChange={({ target }) => setUsername(target.value)} 
               handlePwdChange={({ target }) => setPassword(target.value)} 
               handleLogin={handleLogin}  />
    </Togglable>
  )
  //blogform
  const blogform = () =>
  (
    <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
    <BlogForm createBlog={addBlog1}/>
    </Togglable>
  )
  //blogslist
  const blogslist = () =>
  (
    <div>
    <h3>Blogs List</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user} />
      )}
     </div> 
  )
  return (
    <div>
      <h1>Blogs Application</h1>
      <Notification message={errorMessage} setErrorMessage={setErrorMessage} errorType={errorType} setErrorType={setErrorType}/>
      {user === null ? loginform() : 
        <div>
          <h4>{user.name} has logged in <button onClick={handleLogout}>Logout</button> </h4>          
          {blogform()}{blogslist()}
        </div>
      }
    </div>
  )
}

export default App