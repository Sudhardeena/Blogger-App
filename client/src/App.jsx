import React from 'react'

// importing BrowserRouter
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login';
import Single from './Pages/Single/Single';
import Home from './Pages/Home/Home';
import Write from './Pages/Write/Write';
import './App.css'
import Profile from './Pages/Profile/Profile';



// creating our Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/post/:id",
    element: <Single/>,
  },
  {
    path: "/write",
    element: <Write/>,
  },
  {
    path: "/profile/:id",
    element: <Profile/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  
]);

function App() {
  return (
    <div className='app'>  
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
