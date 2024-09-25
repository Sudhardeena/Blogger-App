import React from 'react'
import './Comments.css'
import CommentItem from '../CommentItem/CommentItem'



      
const Comments = (props) => {
    const{commentslist}=props
    

  return (
    
    <ul className='comments-list'>
      {
        commentslist.length>0 ? 
        commentslist.map(each=><CommentItem key={each.commentID}  commentDetails={each}/>)
    : <p className='no-comments-text'>no comments yet</p>}
    </ul>
  )
}

export default Comments
