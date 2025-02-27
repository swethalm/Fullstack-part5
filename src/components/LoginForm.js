import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({  username, password, handleUserChange,handlePwdChange,handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <h3>Please log in to access</h3>
      <div>
        Username
        <input id='username' value={username} onChange={handleUserChange} />
      </div>
      <div>
        Password
        <input id='password' type='password' value={password} onChange={handlePwdChange} />
      </div>
      <div>
        <button id='login-button' type='submit'>Login</button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleUserChange: PropTypes.func.isRequired,
  handlePwdChange: PropTypes.func.isRequired
}

export default LoginForm