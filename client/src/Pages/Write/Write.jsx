import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './Write.css'

const Write = () => {
  const [value, setValue] = useState('');
  console.log(value)
  return (
    <div className='write-post-page-container'>
      <Navbar/>
      <div className='write-page-content'>
        <div className='editor-container-content'>
          <input className='editor-input-elements title' type='text' placeholder='Title'/>
          <div className='editor-container'>
            <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
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
            <label className='upload-image-label' htmlFor='file'>   Upload Image</label>
            <input className='editor-input-elements' type='file' name='' id='file'/>
            
            <div className='menu-btns'>
              <button className='each-menu-btn'>Save as a draft</button>
              <button className='each-menu-btn'>Update</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Write
