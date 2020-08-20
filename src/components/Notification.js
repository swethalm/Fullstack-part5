import React from 'react'

const Notification = ({ message,setErrorMessage,errorType,setErrorType }) => {
  if (message === null) {
    return null
  }
    setTimeout(() => {
        setErrorMessage(null)
        setErrorType('')
    }, 5000)   
  return (
    <div className={errorType}>
      {message}
    </div>
  )
}

export default Notification