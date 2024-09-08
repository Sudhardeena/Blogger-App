import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { UserContext } from '../../context/userContext'

const Navbar = () => {
  const user = useContext(UserContext)
  return (
    <div className="desktop-navbar-container">
      <Link className="home-link" to='/'><h1 className="desktop-navbar-logo">Blogger</h1></Link>
      <div className="desktop-tabs-container">
        <Link className="desktop-nav-profile-link desktop-nav-link" to="/profile/2">
          Profile
        </Link>
        <Link
          className="desktop-nav-write-link desktop-nav-link"
          to="/write"
        >
          Write
        </Link>
      </div>
      <div className='nav-btns-div'>
      {user==null &&
      <>
        <Link className="desktop-nav-profile-link desktop-nav-link" to="/login">
          Login
        </Link>
        <Link
          className="desktop-nav-write-link desktop-nav-link"
          to="/register"
        >
          SingUp
        </Link>
        </>
      }
      {user!==null && 
        <button
          className="nav-btns"
          type="button"
        >
          Logout
        </button>
      }
      </div>
      
    </div>
  
  )
}

export default Navbar
