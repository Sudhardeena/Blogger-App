import React, { useContext, useState } from 'react'
import './Register.css'
import { json, Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'

const Register = () => {
  const {backendUrl} = useContext(UserContext)
  const [inputs,setInputs] = useState({
    username: '',
    email:'',
    password:'',
    profileImage: null
  })

  const [errorMessage,setErrorMessage] = useState('')

  const handleChange = e => {
      setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleFileChange = (e) => {
    setInputs({ ...inputs, profileImage: e.target.files[0] });
  };

  // console.log(inputs)

  const navigate = useNavigate()

  const handleSubmit = async e =>{
    e.preventDefault()
    const formDataToSend = new FormData();
    formDataToSend.append('username', inputs.username);
    formDataToSend.append('email', inputs.email);
    formDataToSend.append('password', inputs.password);
    if (inputs.profileImage) {
      formDataToSend.append('profileImage', inputs.profileImage);
    }
    // formDataToSend.append('profileImage', inputs.profileImage);

    const url = `${backendUrl}/api/auth/register`
    const options = {
      method: "POST",
      body: formDataToSend,
    }
    // console.log(options)
    const response = await fetch(url,options)
    const data = await response.json()
    console.log(data)
    if(response.ok){
      navigate('/login',{replace:true})
    }else{
      setErrorMessage(data)
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input required type='text' placeholder='username' name='username' onChange={handleChange}/>
        <input required type='email' placeholder='email' name='email' onChange={handleChange}/>
        <input required type='password' placeholder='password' name='password' onChange={handleChange}/>
        <label className='upload-image-label' htmlFor='userProfilePicInput'>   Upload Image</label>
            <input className='editor-input-elements' type='file' name='' id='userProfilePicInput' onChange={handleFileChange}/>
        <button type='submit'>Register</button>
        {errorMessage && <p className='login_error_mssg'>{inputs.errorMessage}</p>}
        <span>Do you have an account? <Link className='register_link' to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register
