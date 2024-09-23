import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BlogList from '../../components/BlogList/BlogList'
import './Profile.css'
import { UserContext } from '../../context/userContext'
import { Navigate, useNavigate } from 'react-router-dom'

const blogList = [
    {
      id: 1,
      title: "The Wonders of React",
      desc: "An in-depth look at how React revolutionizes front-end development with its component-based architecture.",
      img: "https://images.unsplash.com/photo-1506748686214-e9df14c1b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fFJlY3R8ZW58MHx8fDE2NjkwNjg1NDA&ixlib=rb-1.2.1&q=80&w=800",
      username: "JaneDoe",
      date: "2024-09-01T14:30:00Z"
    },
    {
      id: 2,
      title: "Understanding JavaScript Closures",
      desc: "A comprehensive guide to understanding closures in JavaScript and how they can be used to create powerful abstractions.",
      img: "https://images.unsplash.com/photo-1593642634367-d91d1c7b1c63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fEphdmFzY3JpcHQtQ2xvc3VyZXxlbnwwfHx8fDE2NjkwNjg2MjQ&ixlib=rb-1.2.1&q=80&w=800",
      username: "JohnSmith",
      date: "2024-09-03T09:15:00Z"
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox",
      desc: "A comparison between CSS Grid and Flexbox layout systems, including use cases, benefits, and trade-offs.",
      img: "https://images.unsplash.com/photo-1597748345586-827f93a10d52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fENTUy1HcmlkJTIwdi1mYWxsc2V4fGVufDB8fHx8MTY2OTA2ODczNw&ixlib=rb-1.2.1&q=80&w=800",
      username: "EmilyJohnson",
      date: "2024-09-05T11:45:00Z"
    },
    {
      id: 4,
      title: "Getting Started with Node.js",
      desc: "An introductory tutorial on how to get started with Node.js, including setting up your environment and creating your first server.",
      img: "https://images.unsplash.com/photo-1567306226-7b43878e84a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDkxfHxOb2RlLmpzfGVufDB8fHx8MTY2OTA2ODc1Mg&ixlib=rb-1.2.1&q=80&w=800",
      username: "AliceBrown",
      date: "2024-09-07T13:00:00Z"
    },
    {
      id: 5,
      title: "Top 10 VS Code Extensions",
      desc: "A roundup of the top 10 Visual Studio Code extensions that can improve your development workflow and productivity.",
      img: "https://images.unsplash.com/photo-1593642532520-164f5eb9b2e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDExfHxWSy1Db2RlJTIwRXh0ZW5zaW9uc3xlbnwwfHx8fDE2NjkwNjg4NTI&ixlib=rb-1.2.1&q=80&w=800",
      username: "MikeDavis",
      date: "2024-09-10T10:30:00Z"
    },
    {
      id: 6,
      title: "GraphQL vs REST APIs",
      desc: "An exploration of the differences between GraphQL and REST APIs, and which might be the better choice for your next project.",
      img: "https://images.unsplash.com/photo-1600909707401-f1e8dffecb4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fEdyYXBocUUyMHZzUl9BUElzfGVufDB8fHx8MTY2OTA2ODg4OQ&ixlib=rb-1.2.1&q=80&w=800",
      username: "OliviaWilson",
      date: "2024-09-12T15:00:00Z"
    }
  ];

const Profile = () => {
  const {user} = useContext(UserContext)
  if(user==null){
    return <Navigate to="/login" replace={true} />
  }


  return (
    <div className='profile-page-container'>
      <Navbar/>
      <div className='profile-page-content'>
        
        <div className='user-profile-details-section'>
        <div className='single-blog-user-info-container'>
          <img className='single-blog-user-img' src='https://images.forbesindia.com/blog/wp-content/uploads/2020/10/SM_Ranu-Vohra_IMG_1406.jpg?impolicy=website&width=253&height=169' alt='single-blog-user-img'/>
          <div className='single-blog-user-ingo'>
            <span className='profile-user-name'>Jhon</span>
            
          </div>
        </div>
        </div>
        <BlogList className="profile-blog-list" blogList={blogList}/>
      </div>
    </div>
  )
}

export default Profile
