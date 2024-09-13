import React from 'react'
import './BlogItem.css'
import { Link } from 'react-router-dom'

const BlogItem = (props) => {
    const {blogDetails} = props
    console.log(blogDetails)
    const {blogDate,desc,blogId,blogImg,title,username} = blogDetails
  return (
    <Link to={`/post/${blogId}`}>
        <li className='blog-list-item'>
        <div className='blog-img-div'>
        <img className='blog-image' src="https://images.forbesindia.com/blog/wp-content/uploads/2024/09/C_shutterstock_2358722117_SM.jpg?impolicy=website&width=277&height=208" alt={title}/>
        </div>
        <div className='blog-info-container'>
            <h1 className='blog-title'>{title}</h1>
            <p className='username-and-date'><span className='blog-user-name'>{username}</span>    {blogDate}</p>
            <p className='bolg-desc'>{desc}</p>
        </div>
    </li>
    </Link>
  )
}

export default BlogItem
