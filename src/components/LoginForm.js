import React from 'react'

const LoginForm = ({  username, password, handleUserChange,handlePwdChange,handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <h3>Please log in to access</h3>
      <div>
        Username
        <input value={username} onChange={handleUserChange} />
      </div>
      <div>
        Password
        <input type='password' value={password} onChange={handlePwdChange} />
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  )
}

export default LoginForm