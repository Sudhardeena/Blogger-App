import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BlogList from '../../components/BlogList/BlogList';
import {BsSearch} from 'react-icons/bs'
import { BsThreeDots } from 'react-icons/bs'
import './Home.css'



// src/data/blogList.js

// const blogList = [
//   {
//     blogId: 1,
//     title: "The Wonders of React",
//     desc: "An in-depth look at how React revolutionizes front-end development with its component-based architecture.",
//     blogImg: "https://images.unsplash.com/photo-1506748686214-e9df14c1b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fFJlY3R8ZW58MHx8fDE2NjkwNjg1NDA&ixlib=rb-1.2.1&q=80&w=800",
//     username: "JaneDoe",
//     blogDate: "2024-09-01T14:30:00Z"
//   },
//   {
//     blogId: 2,
//     title: "Understanding JavaScript Closures",
//     desc: "A comprehensive guide to understanding closures in JavaScript and how they can be used to create powerful abstractions.",
//     blogImg: "https://images.unsplash.com/photo-1593642634367-d91d1c7b1c63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fEphdmFzY3JpcHQtQ2xvc3VyZXxlbnwwfHx8fDE2NjkwNjg2MjQ&ixlib=rb-1.2.1&q=80&w=800",
//     username: "JohnSmith",
//     blogDate: "2024-09-03T09:15:00Z"
//   },
//   {
//     blogId: 3,
//     title: "CSS Grid vs Flexbox",
//     desc: "A comparison between CSS Grid and Flexbox layout systems, including use cases, benefits, and trade-offs.",
//     blogImg: "https://images.unsplash.com/photo-1597748345586-827f93a10d52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fENTUy1HcmlkJTIwdi1mYWxsc2V4fGVufDB8fHx8MTY2OTA2ODczNw&ixlib=rb-1.2.1&q=80&w=800",
//     username: "EmilyJohnson",
//     blogDate: "2024-09-05T11:45:00Z"
//   },
//   {
//     blogId: 4,
//     title: "Getting Started with Node.js",
//     desc: "An introductory tutorial on how to get started with Node.js, including setting up your environment and creating your first server.",
//     blogImg: "https://images.unsplash.com/photo-1567306226-7b43878e84a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDkxfHxOb2RlLmpzfGVufDB8fHx8MTY2OTA2ODc1Mg&ixlib=rb-1.2.1&q=80&w=800",
//     username: "AliceBrown",
//     blogDate: "2024-09-07T13:00:00Z"
//   },
//   {
//     blogId: 5,
//     title: "Top 10 VS Code Extensions",
//     desc: "A roundup of the top 10 Visual Studio Code extensions that can improve your development workflow and productivity.",
//     blogImg: "https://images.unsplash.com/photo-1593642532520-164f5eb9b2e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDExfHxWSy1Db2RlJTIwRXh0ZW5zaW9uc3xlbnwwfHx8fDE2NjkwNjg4NTI&ixlib=rb-1.2.1&q=80&w=800",
//     username: "MikeDavis",
//     blogDate: "2024-09-10T10:30:00Z"
//   },
//   {
//     blogId: 6,
//     title: "GraphQL vs REST APIs",
//     desc: "An exploration of the differences between GraphQL and REST APIs, and which might be the better choice for your next project.",
//     blogImg: "https://images.unsplash.com/photo-1600909707401-f1e8dffecb4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fEdyYXBocUUyMHZzUl9BUElzfGVufDB8fHx8MTY2OTA2ODg4OQ&ixlib=rb-1.2.1&q=80&w=800",
//     username: "OliviaWilson",
//     blogDate: "2024-09-12T15:00:00Z"
//   }
// ];

const Home = () => {
  const [blogs,setBlogs] = useState([])
  const [searchInput,setSearchInput] = useState('')
  const [isLoading,setApiStatus] = useState(false)
  
  

  const onChangeSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  const onSearch = () => fetchData()

  // console.log(searchInput)

  const fetchData = async () =>{
    setApiStatus(true)
      const url = `https://blogger-app-backend.vercel.app/api/blogs?search_q=${searchInput}`
      const options = {
          method: 'GET', 
          headers: {
          'Content-Type' : 'application/json',
        },
      }
      const response = await fetch(url,options);
      const data = await response.json()
    if(response.ok) {
      // console.log(data)
      setApiStatus(false)
      setBlogs(data)
    } else{
      // TypeError: Failed to fetch
      console.log(response)
      console.log('There was an error', data);
    }
  }

  useEffect(()=>{fetchData()},[])

  return (
    <div className='home-page-container'>
      <Navbar/>
      {isLoading?
        <BsThreeDots
        className="loader"
        height="120"
        width="120"
        color="#304766"
        radius="9"
        />
      :
      <>
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search for blog title"
          onChange={onChangeSearchInput}
        />
        <BsSearch className="search-icon" onClick={onSearch} />
      </div>
      <BlogList blogList={blogs}/>
      </>
      }
    </div>
  )
}

export default Home
