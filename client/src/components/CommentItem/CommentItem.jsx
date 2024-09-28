import React, { useContext } from 'react'
import './CommentItem.css'
// import moment from 'moment'
import moment from 'moment-timezone';
import { UserContext } from '../../context/userContext'

const CommentItem = (props) => {
  const {backendUrl} = useContext(UserContext)
    const {commentDetails} =props
    const {comment,username,commentDate,profileImg} = commentDetails
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const commentDateLocal = moment.utc(commentDate).tz(userTimezone).fromNow();
    
  return (
    <li className='comment-item'>
      <div className='single-blog-user-info-container'>
          <img className='single-blog-user-img' src={profileImg=='null' ?'../uploads/users/Unknown_person.jpg':`${backendUrl}/uploads/users/${profileImg}`}/>
          <div className='single-blog-user-ingo'>
            <span className='single-blog-user-name'>{username}</span>
            <p className='single-blog-posted-time'>{commentDateLocal}</p>
          </div>
        </div>
        <p className='comment'>{comment}</p>
    </li>
  )
}

export default CommentItem

