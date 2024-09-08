import React from 'react'
import './CommentItem.css'

const CommentItem = (props) => {
    const {commentDetails} =props
    const {comment_id,blog_id,comment,user_name,date} = commentDetails
    
  return (
    <li className='comment-item'>
      <div className='single-blog-user-info-container'>
          <img className='single-blog-user-img' src='https://images.forbesindia.com/blog/wp-content/uploads/2020/10/SM_Ranu-Vohra_IMG_1406.jpg?impolicy=website&width=253&height=169' alt='single-blog-user-img'/>
          <div className='single-blog-user-ingo'>
            <span className='single-blog-user-name'>Jhon</span>
            <p className='single-blog-posted-time'>posted 2 days ago</p>
          </div>
        </div>
        <p className='comment'>{comment}</p>
    </li>
  )
}

export default CommentItem

