import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IUser } from '../types/user.type'
import AuthService from '../services/auth.service'
import EventBus from './EventBus'
const Navbar = () => {
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false)
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined)
  
  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"))
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"))
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, [])
  
  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  return (
    <nav className='navbar navbar-expand navbar-dark bg-dark'>
      <div className='container-fluid'>
      <Link to="/" className="navbar-brand">Admin</Link>
      <div className='navbar-nav mr-auto'>
        <li className='nav-item'>
          <Link to="/home" className="nav-link">Home</Link>
        </li>

        {showModeratorBoard && (
          <li className='nav-item'>
            <Link to="/mod" className="nav-link">Moderator Board</Link>
          </li> 
        )}

        {showAdminBoard && (
          <li className='nav-item'>
            <Link to="/admin" className="nav-link">Admin Board</Link>
          </li> 
        )}
        
        {currentUser && (
          <li className='nav-item'>
            <Link to="/user" className="nav-link">User </Link>
          </li> 
        )}
      </div>

      {
        currentUser ? (
          <div className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link to="/profile" className="nav-link">
                {currentUser.username}
              </Link>
            </li> 
            <li className='nav-item'>
              <Link to="/login" className="nav-link" onClick={logOut}>
                LogOut
              </Link>
            </li> 
          </div>
        ) : (
          <div className='navbar-nav ms-auto'>
          <li className='nav-item'>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li> 
          <li className='nav-item'>
            <Link to="/register" className="nav-link" >
              Sign Up
            </Link>
          </li> 
        </div>
            
        )
        }
        </div>
    </nav>
  )
}

export default Navbar
