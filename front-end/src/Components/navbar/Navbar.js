import React from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR498Z9GbtjqcS2EYiH3uh3TJs_MnHJ7NKorg&s"
          alt="logo"
        />
      </div>
      <div className="navbar-links">
       <Link to={'/'} ><button className="btn">Login</button></Link>
       <Link to={'/signup'}><button className="btn">Signup</button></Link>
      </div>
    </nav>
  );
};

