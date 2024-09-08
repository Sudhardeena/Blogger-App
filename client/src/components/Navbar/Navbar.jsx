import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="desktop-navbar-container">
      <h1 className="desktop-navbar-logo">Blogger</h1>
      <div className="desktop-tabs-container">
        <Link className="desktop-nav-profile-link desktop-nav-link" to="/">
          Profile
        </Link>
        <Link
          className="desktop-nav-write-link desktop-nav-link"
          to="/my-trips"
        >
          Write
        </Link>
      </div>
      <div className='nav-btns-div'>
      <button
        className="nav-btns"
        type="button"
      >
        Login
      </button>
      <button
        className="nav-btns"
        type="button"
      >
        SignUp
      </button>
      <button
        className="nav-btns"
        type="button"
      >
        Logout
      </button>
      </div>
      
    </div>
  
  )
}

export default Navbar
