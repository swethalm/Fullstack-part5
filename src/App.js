import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle,setNewTitle] = useState('') 
  const [newAuthor,setNewAuthor] = useState('') 
  const [newUrl,setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType,setErrorType]=useState('')

  //reset state
  const reset=()=>{
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    }

  //Initial blogs list
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
                        title:newTitle,
                        author:newAuthor,
                        url:newUrl,
                        }
  
    const newlyAddedBlog= await blogService.create(blogObject)
    setBlogs(blogs.concat(newlyAddedBlog))
    setErrorMessage(`Blog '${newTitle}' added`)
    setErrorType('success') 
    reset()
  }

  //loginform
  const loginform = () =>
  (
    <LoginForm user={user} username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}  />
  )
  //blogform
  const blogform = () =>
  (
    <BlogForm newTitle={newTitle} newAuthor={newAuthor} newUrl= {newUrl} setNewTitle={setNewTitle} setNewAuthor={setNewAuthor} setNewUrl={setNewUrl} addBlog={addBlog}/>
  )
  //blogslist
  const blogslist = () =>
  (
    <div>
    <h3>Blogs List</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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