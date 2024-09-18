import React, { useContext, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../../context/userContext';

import './Write.css'

const Write = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [blogImg, setblogImg] = useState(null);
  // console.log(content)

  const {user} = useContext(UserContext)
  
  

  const handleSubmit = async () =>{
    
    if(title!=='' && description!=='' && content!=='' && blogImg!==null){
      
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

        const url = "http://localhost:8000/api/blogs"
        const options = {
          method: "POST",
          body: formDataToSend,
        }
        // console.log(options)
        const response = await fetch(url,options)
        // const data = await response.json()
        // console.log(data)
        if(response.ok){
          // navigate('/login')
        }else{
          // setErrorMessage(data)
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
            <h1 className='publish-tittle'>Publish</h1>
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
              <button className='each-menu-btn' onClick={handleSubmit}>Publish</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Write
