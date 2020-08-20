import React from 'react'

const LoginForm = ({  username, password, setUsername,setPassword,handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <h3>Please log in to access</h3>
      <div>
        Username
        <input value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div>
        Password
        <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  )
}

export default LoginForm