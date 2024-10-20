import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css'; 

export const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <h1 className="error-title">404</h1>
      <p className="error-message"> The page you looking for doesn't exist</p>
      <Link to={'/getAllTask'}>
        <button className="back-button">Go Back Task List</button>
      </Link>
    </div>
  );
};
