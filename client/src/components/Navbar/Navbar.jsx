import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { UserContext } from '../../context/userContext'

const Navbar = () => {
  const {user,setUser} = useContext(UserContext)
  
  const navigate = useNavigate()

  const onClickLogout = () => {
    setUser(null)
    navigate('/',{replace:true})
  }

  

  const userId = user!==null ? user.userInformation.userId : null

  return (
    <div className="desktop-navbar-container">
      <Link className="home-link" to='/'><h1 className="desktop-navbar-logo">Blogger</h1></Link>
      <div className="desktop-tabs-container">
        <Link className="desktop-nav-profile-link desktop-nav-link" to={user!==null ? `/profile/${userId}` : "/login"}>
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
          onClick={onClickLogout}
        >
          Logout
        </button>
      }
      </div>
      
    </div>
  
  )
}

export default Navbar
