import React, { useState } from 'react'
import './Register.css'
import { json, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [inputs,setInputs] = useState({
    username: '',
    email:'',
    password:'',
    errorMessage:''
  })

  const handleChange = e => {
      setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const navigate = useNavigate()

  const handleSubmit = async e =>{
    e.preventDefault()
    const url = "http://localhost:8000/api/auth/register"
    const options = {
      method: "POST",
      headers: {
    'Content-Type': 'application/json'
  },
      body: JSON.stringify(inputs),
    }
    // console.log(options)
    const response = await fetch(url,options)
    const data = await response.json()
    if(response.ok){
      navigate('/login')
    }else{
      setInputs(prev=>({...prev,errorMessage:data}))
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input required type='text' placeholder='username' name='username' onChange={handleChange}/>
        <input required type='email' placeholder='email' name='email' onChange={handleChange}/>
        <input required type='password' placeholder='password' name='password' onChange={handleChange}/>
        <label className='upload-image-label' htmlFor='userProfilePic'>   Upload Image</label>
            <input className='editor-input-elements' type='file' name='' id='userProfilePic'/>
        <button type='submit'>Register</button>
        {inputs.errorMessage && <p className='login_error_mssg'>{inputs.errorMessage}</p>}
        <span>Do you have an account? <Link className='register_link' to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register
