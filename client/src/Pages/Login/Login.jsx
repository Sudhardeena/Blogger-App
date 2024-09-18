import React, { useState } from 'react'
import './Login.css'
import {  Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import { useContext } from 'react'


const Login = () => {
  const [inputs,setInputs] = useState({
    username: '',
    password:'',
  })

  const [errorMessage,setErrorMessage] = useState('')

  const handleChange = e => {
      setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }


  // console.log(inputs)

  const navigate = useNavigate()

  const {setUser} = useContext(UserContext)

  const handleSubmit = async e =>{
    e.preventDefault()
    
    

    const url = "http://localhost:8000/api/auth/login"
    const options = {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(inputs),
    }
    // console.log(options)
    const response = await fetch(url,options)
    const data = await response.json()
    // console.log(data)
    if(response.ok){
      // const {jwtToken,userInformation} = data
      setUser(data)
      navigate('/') 
      console.log(data)
    }else{
      setErrorMessage(data)
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input required type='text' placeholder='username' name='username' onChange={handleChange}/>
        
        <input required type='password' placeholder='password' name='password' onChange={handleChange}/>
        
        <button type='submit'>Login</button>
        {errorMessage && <p className='login_error_mssg'>{errorMessage}</p>}
        <span>Don't you have an account? <Link className='register_link' to='/register'>Register</Link></span>
      </form>
    </div>
  )
}



export default Login
