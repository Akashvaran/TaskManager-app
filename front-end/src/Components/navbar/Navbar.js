import React, { useContext } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import './Navbar.css';
import { RoleContext } from '../productedRoute/RoleContaxt';

export const Navbar = () => {
  const { isLoggedIn,logout}=useContext(RoleContext)
  const navigate=useNavigate();
  const handleLogout = async () => {
    await logout(); 
    navigate('/'); 
  };

  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR498Z9GbtjqcS2EYiH3uh3TJs_MnHJ7NKorg&s"
          alt="logo"
        />
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to={'/'}>
              <button className="btn">Login</button>
            </Link>
            <Link to={'/signup'}>
              <button className="btn">Signup</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

