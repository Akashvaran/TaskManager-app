import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { RoleContext } from '../productedRoute/RoleContaxt';
import { IoMdClose } from 'react-icons/io'; 

export const Navbar = () => {
  const { isLoggedIn, logout } = useContext(RoleContext);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowLogoutModal(false); 
    navigate('/');
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
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
              <button className="btn" onClick={openLogoutModal}>Logout</button>
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

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="close-modal-button" onClick={closeLogoutModal}>
              <IoMdClose />
            </p>
            <h3>Are you sure you want to logout?</h3>
            <div className="modal-actions">
              <button className="confirm-button" onClick={handleLogout}>Yes</button>
              <button className="cancel-button" onClick={closeLogoutModal}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
