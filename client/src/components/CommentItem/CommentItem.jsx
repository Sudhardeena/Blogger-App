import React from 'react'
import './CommentItem.css'
import moment from 'moment'

const CommentItem = (props) => {
    const {commentDetails} =props
    const {comment,username,commentDate,profileImg} = commentDetails
    
  return (
    <li className='comment-item'>
      <div className='single-blog-user-info-container'>
          <img className='single-blog-user-img' src={`../uploads/users/${profileImg}`}/>
          <div className='single-blog-user-ingo'>
            <span className='single-blog-user-name'>{username}</span>
            <p className='single-blog-posted-time'>{moment(commentDate).fromNow()}</p>
          </div>
        </div>
        <p className='comment'>{comment}</p>
    </li>
  )
}

export default CommentItem

