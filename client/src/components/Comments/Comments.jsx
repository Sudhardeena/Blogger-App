import React from 'react'
import './Comments.css'
import CommentItem from '../CommentItem/CommentItem'



      
const Comments = (props) => {
    const{commentslist}=props
    

  return (
    <ul className='comments-list'>
      {commentslist.map(each=><CommentItem key={each.comment_id}  commentDetails={each}/>)}
    </ul>
  )
}

export default Comments
