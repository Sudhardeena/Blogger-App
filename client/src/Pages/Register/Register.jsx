import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input required type='text' placeholder='username'/>
        <input required type='email' placeholder='email'/>
        <input required type='password' placeholder='password'/>
        <label className='upload-image-label' htmlFor='userProfilePic'>   Upload Image</label>
            <input className='editor-input-elements' type='file' name='' id='userProfilePic'/>
        <button>Register</button>
        <p className='login_error_mssg'>this is a error</p>
        <span>Do you have an account? <Link className='register_link' to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register
