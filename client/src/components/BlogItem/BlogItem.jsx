import React from 'react'
import './BlogItem.css'
import { Link } from 'react-router-dom'

const BlogItem = (props) => {
    const {blogDetails} = props
    // console.log(blogDetails)
    const {blogDate,desc,blogId,blogImg,title,username} = blogDetails
    // console.log(blogImg)
  return (
    <Link to={`/blogs/${blogId}`}>
        <li className='blog-list-item'>
        <div className='blog-img-div'>
        <img className='blog-image' src={`../uploads/blogs/${blogImg}`} alt={title}/>
        </div>
        <div className='blog-info-container'>
            <h1 className='blog-title'>{title}</h1>
            <p className='username-and-date'><span className='blog-user-name'>{username}</span>    {blogDate}</p>
            <p className='bolg-desc'>{desc.slice(0,100)}....</p>
        </div>
    </li>
    </Link>
  )
}

export default BlogItem
