import React, { useContext, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../../context/userContext';

import './Write.css'
import { useLocation, useNavigate,  Navigate } from 'react-router-dom';

const Write = () => {
  const {user,setUser,backendUrl} = useContext(UserContext)
  const navigate = useNavigate()

  if(user==null){
    return <Navigate to="/login" replace={true}/>
  }


  const state = useLocation().state
  const [title, setTitle] = useState(state?.title || '');
  const [description, setDescription] = useState(state?.description || '');
  const [content, setContent] = useState(state?.blogContent || '');
  const [blogImg, setblogImg] = useState(null);
  // console.log(content)

  
  

  const handleSubmit = async () =>{

    
    if(title!=='' && description!=='' && content!==''){
      if(!state){
        if(blogImg==null){
          return alert("please fill all the fields and upload blog image too..")
        }
      }
      // console.log(title)
        const {userInformation,jwtToken} = user
        const {userId} = userInformation
      

        const formDataToSend = new FormData();
        formDataToSend.append('title', title);
        formDataToSend.append('description', description);
        formDataToSend.append('content', content);
        formDataToSend.append('user_id',userId);
        if (blogImg) {
          formDataToSend.append('blog_img', blogImg);
        }
        // formDataToSend.append('profileImage', inputs.profileImage);

        const url = state ? `${backendUrl}/api/blogs/${state.blogId}` : "http://localhost:8000/api/blogs"
        const options = {
          headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
          method: state ? "PUT" : "POST",
          body: formDataToSend,
        }
        // console.log(options)
        const response = await fetch(url,options)
        const data = await response.json()
        
        if(response.ok){
          // console.log(data)
          navigate(state ? `/blogs/${state.blogId}` : '/',{replace:true})
        }else{
          console.log(`Error: ${data}`)
          if(response.status===401){
            alert("Your session expired please login again to write your Blog")
            setUser(null)
            navigate('/login')
          }
        }
        }else{
          alert("please fill all the fields and upload blog image too..")
        }
  }


  return (
    <div className='write-post-page-container'>
      <Navbar/>
      <div className='write-page-content'>
        <div className='editor-container-content'>
          <input className='title editor-input-elements ' required type='text' placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)}/>
          <textarea  className='description-input editor-input-elements' required placeholder='Description' value={description} onChange={e=>setDescription(e.target.value)}></textarea>
          <div className='editor-container'>
            <ReactQuill className='editor' theme="snow" required value={content} onChange={setContent} />
          </div>
        </div>
        <div className='menu'>
          <div className='menu-item'>
            <h1 className='publish-title'>Publish</h1>
            <span style={{textAlign:'left'}}>
              <b>Status:  </b> Draft
            </span>
            <span style={{textAlign:'left'}}>
              <b>Visibility:  </b> Public
            </span>
            <label className='upload-image-label' htmlFor='blogImgInput'>   Upload Image</label>
            <input className='editor-input-elements' required type='file' name='' id='blogImgInput' onChange={e=>setblogImg(e.target.files[0])}/>
            
            <div className='menu-btns'>
              <button className='each-menu-btn'>Save as a draft</button>
              <button className='each-menu-btn' onClick={handleSubmit}>{state ? 'Update' : "Publish"}</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Write
