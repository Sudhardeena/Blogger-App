import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useParams } from 'react-router-dom'
import './Single.css'
import Comments from '../../components/Comments/Comments'
import moduleName from 'module'
import { UserContext } from '../../context/userContext'

const commentsList = [
  {
    comment_id: 1,
    blog_id: 101,
    comment: "Great article! I found the section on React hooks particularly insightful.",
    user_name: "Alice",
    date: "2024-09-01T10:30:00Z"
  },
  {
    comment_id: 2,
    blog_id: 102,
    comment: "I disagree with the conclusion. I think there's more to consider about state management.",
    user_name: "Bob",
    date: "2024-09-02T12:45:00Z"
  },
  {
    comment_id: 3,
    blog_id: 103,
    comment: "Very informative! The examples were clear and easy to follow.",
    user_name: "Charlie",
    date: "2024-09-03T14:00:00Z"
  },
  {
    comment_id: 4,
    blog_id: 101,
    comment: "Can you provide more details on the performance implications?",
    user_name: "Diana",
    date: "2024-09-04T16:30:00Z"
  },
  {
    comment_id: 5,
    blog_id: 104,
    comment: "I enjoyed reading this. The explanation of closures was particularly well done.",
    user_name: "Eve",
    date: "2024-09-05T09:15:00Z"
  },
  {
    comment_id: 6,
    blog_id: 105,
    comment: "I think there's a typo in the example code. Can you please review it?",
    user_name: "Frank",
    date: "2024-09-06T11:00:00Z"
  }
];




const Single = () => {
  const [blog,setBlog] = useState({})

  const params = useParams()
  const {blogId} = params
  // console.log(blogId)

  const {user} = useContext(UserContext)

  const fetchData = async () =>{
    try {
      const url = `http://localhost:8000/api/blogs/${blogId}`
      const options = {
          method: 'GET',
          headers: {
          'Content-Type' : 'application/json'
        },
      }
      const response = await fetch(url,options);
      const data = await response.json()
      console.log(data)
      // setBlog(data)
    } catch (error) {
      // TypeError: Failed to fetch
      console.log('There was an error', error);
    }
  }

  useEffect(()=>fetchData,[])



  return (
    <div className='single-post-page-container'>
      <Navbar/>
      <div className='blog-content'>
        <img className='single-blog-page-image' src='../uploads/blogs/1726486917173.webp' alt='single-blog-page'/>
        <div className='single-blog-user-info-container'>
          <img className='single-blog-user-img' src='https://images.forbesindia.com/blog/wp-content/uploads/2020/10/SM_Ranu-Vohra_IMG_1406.jpg?impolicy=website&width=253&height=169' alt='single-blog-user-img'/>
          <div className='single-blog-user-ingo'>
            <span className='single-blog-user-name'>Jhon</span>
            <p className='single-blog-posted-time'>posted 2 days ago</p>
          </div>
          {
            user!==null && 
          <div className='edit'>
            <Link to='/write?edit=2' className="edit-delete-link">Edit</Link>
            <Link to='' className='edit-delete-link'>Delete</Link>
          </div>
          }
        </div>
        <h1 className='single-page-blog-title'>My First Blog</h1>
        <p className='single-page-blog-entire-content'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/>
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, nunc eu suscipit cursus, nulla lorem sodales turpis, ac dictum eros dolor et risus.
        </p><br/>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/>
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, nunc eu suscipit cursus, nulla lorem sodales turpis, ac dictum eros dolor et risus.
        </p><br/>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in repLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/>
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, nunc eu rehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/>
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, nunc eu suscipit cursus, nulla lorem sodales turpis, ac dictum eros dolor et risus.
        </p>

        </p>

      </div>
      <h1 className='comments-heading'>Comments</h1>
      <Comments commentslist={commentsList}/>
    </div>
  )
}

export default Single
