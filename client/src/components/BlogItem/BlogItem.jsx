import React from 'react'
import './BlogItem.css'
import { Link } from 'react-router-dom'
// import moment from 'moment'
import moment from 'moment-timezone';

import { UserContext } from '../../context/userContext'
import { useContext } from 'react'

const BlogItem = (props) => {
    const {backendUrl} = useContext(UserContext)
    const {blogDetails} = props
    // console.log(blogDetails)
    const {blogDate,desc,blogId,blogImg,title,username} = blogDetails
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const blogDateLocal = moment.utc(blogDate).tz(userTimezone).fromNow();
    // console.log(userTimezone,blogDate,blogDateLocal) 

  return (
    <Link to={`/blogs/${blogId}`}>
        <li className='blog-list-item'>
        <div className='blog-img-div'>
        <img className='blog-image' src={`${backendUrl}/uploads/blogs/${blogImg}`} alt={title}/>
        </div>
        <div className='blog-info-container'>
            <h1 className='blog-title'>{title}</h1>
            <p className='username-and-date'><span className='blog-user-name'>{username}</span>    {blogDateLocal}</p>
            <p className='bolg-desc'>{desc.slice(0,100)}....</p>
        </div>
    </li>
    </Link>
  )
}

export default BlogItem
