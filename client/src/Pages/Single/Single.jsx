import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Single.css'
import Comments from '../../components/Comments/Comments'
import moduleName from 'module'
import { UserContext } from '../../context/userContext'
import DOMPurify from "dompurify";
import moment from 'moment'
import { BsThreeDots } from 'react-icons/bs'

// const commentsList = [
//   {
//     comment_id: 1,
//     blog_id: 101,
//     comment: "Great article! I found the section on React hooks particularly insightful.",
//     user_name: "Alice",
//     date: "2024-09-01T10:30:00Z"
//   },
//   {
//     comment_id: 2,
//     blog_id: 102,
//     comment: "I disagree with the conclusion. I think there's more to consider about state management.",
//     user_name: "Bob",
//     date: "2024-09-02T12:45:00Z"
//   },
//   {
//     comment_id: 3,
//     blog_id: 103,
//     comment: "Very informative! The examples were clear and easy to follow.",
//     user_name: "Charlie",
//     date: "2024-09-03T14:00:00Z"
//   },
//   {
//     comment_id: 4,
//     blog_id: 101,
//     comment: "Can you provide more details on the performance implications?",
//     user_name: "Diana",
//     date: "2024-09-04T16:30:00Z"
//   },
//   {
//     comment_id: 5,
//     blog_id: 104,
//     comment: "I enjoyed reading this. The explanation of closures was particularly well done.",
//     user_name: "Eve",
//     date: "2024-09-05T09:15:00Z"
//   },
//   {
//     comment_id: 6,
//     blog_id: 105,
//     comment: "I think there's a typo in the example code. Can you please review it?",
//     user_name: "Frank",
//     date: "2024-09-06T11:00:00Z"
//   }
// ];




const Single = () => {
  const [blog,setBlog] = useState({})
  const [commentInput,setCommentInput] = useState('')
  const [isLoading,setApiStatus] = useState(false)

  const params = useParams()
  const {blogId} = params
  // console.log(blogId)

  // console.log(blog)

  const {user,setUser} = useContext(UserContext)
  
  const navigate = useNavigate()

  const fetchData = async () =>{
    setApiStatus(true)
    const url = `http://localhost:8000/api/blogs/${blogId}`
      const options = {
          method: 'GET',
          headers: {
          'Content-Type' : 'application/json'
        },
      }
      const response = await fetch(url,options);
      const data = await response.json()
      // console.log(data)
    if(response.ok) { 
      setBlog(data)
      setApiStatus(false)
    } else{
      // TypeError: Failed to fetch
      console.log('There was an error', data);
    }
  }

  useEffect(()=>{fetchData()},[])

  const onDeleteBlog = async () =>{
    const {userInformation,jwtToken} = user
    const {userId} = userInformation
    
    const url = `http://localhost:8000/api/blogs/${blogId}`
      const options = {
          method: 'DELETE',
          headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type' : 'application/json'
        },
      }
      const response = await fetch(url,options);
      const data = await response.json()
      // console.log(data)
      if (response.ok){
        navigate(`/profile/${userId}`)
      }else{
        console.log(`Error: ${data}`)
        if(response.status===401){
          alert("Your session has expired please login again to delete your Blog")
          setUser(null)
        }
      }
      
    
  }

  // const getText = (html) =>{
  //   const doc = new DOMParser().parseFromString(html, "text/html")
  //   return doc.body.textContent
  // }

  const onAddComment = async () =>{
    if(commentInput.length==0){
      return alert("add some text")
    }
    const {userInformation,jwtToken} = user
    const {userId} = userInformation
    const addCommentDetails = {
      comment: commentInput,
      user_id: userId,
      blog_id: blogId
    }
    
      const url = "http://localhost:8000/api/blogs/comments"
      const options = {
        method : "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(addCommentDetails)
      }
      const response = await fetch(url,options)
      const data = await response.json()
      if(response.ok){
        setBlog(prevBlogDetails=>({...prevBlogDetails,commentsList:data}))
        setCommentInput('')
      }else{
        console.log(`Error: ${data}`)
        if(response.status===401){
          alert("Your session has expired please login again to add your Comment")
          setUser(null)
        }
      }
    
          
    
  }



  return (
    <div className='single-post-page-container'>
      <Navbar/>
      {isLoading ?
        <BsThreeDots
        className="loader"
        height="120"
        width="120"
        color="#304766"
        radius="9"
        />
        :
        <>
        <div className='blog-content'>
        <img className='single-blog-page-image' src={`../uploads/blogs/${blog.blogImg}`} alt='single-blog-page'/>
        <div className='single-blog-user-info-container'>
          <Link className='single-user-info-profile-info-link' to={`/profile/${blog.authorId}`}>
            <img className='single-blog-user-img' src={blog.authorImg=='null' ? '../uploads/users/Unknown_person.jpg':`../uploads/users/${blog.authorImg}`} alt='single-blog-user-img'/>
            <div className='single-blog-user-ingo'>
              <span className='single-blog-user-name'>{blog.authorname}</span>
              <p className='single-blog-posted-time'>{moment(blog.blogDate).fromNow()}</p>
            </div>
          </Link>
          {
            (user!==null && user.userInformation.userId==blog.authorId) && 
          <div className='edit'>
            <Link to={`/write?edit=${blog.blogId}`} state={blog} className="edit-delete-link">Edit</Link>
            <button type='button' className='edit-delete-link' onClick={onDeleteBlog}>Delete</button>
          </div>
          }
        </div>
        <h1 className='single-page-blog-title'>{blog.title}</h1>
        <div className='single-blog-content'
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.blogContent) }}
        >
        </div>

      </div>
      <h1 className='comments-heading'>Comments</h1>
      {blog.commentsList && <Comments commentslist={blog.commentsList}/>}
      {user && 
        <>
          <textarea 
            className='add-comment-textarea' 
            placeholder='add comments' 
            value={commentInput} 
            onChange={e=>setCommentInput(e.target.value)}
          />
          <button 
            type='button' 
            className='add-comments-btn'
            onClick={onAddComment}
            >Add</button>
        </>
      }
        </>
      }
      
    </div>
  )
}

export default Single
