import React, { createContext, useState, useEffect } from 'react';
import Axios from '../axios/Axios';

export const RoleContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  const login = (user) => {
    setIsLoggedIn(true);
    setRole(user.role);
    setUserId(user.id);
  };
  const logout = async () => {
    try {
      await Axios.post('/User/logout'); 
      setIsLoggedIn(false); 
      setRole(''); 
      setUserId(''); 
    } catch (error) {
      console.error('Logout error:', error.response ? error.response.data : error.message);
    }
  };

  const verifyUser = async () => {
    try {
      const response = await Axios.get('/User/Verify');
      if (response.data.status) {
        const { role, id } = response.data.user;
        setIsLoggedIn(true);
        setRole(role);
        setUserId(id);
      }
    } catch (error) {
      // console.error('Verification failed:', error.response?.data?.message || error.message);
      setIsLoggedIn(false);
      setRole('');
      setUserId('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <RoleContext.Provider value={{ isLoggedIn, role, userId, loading, login,logout }}>
      {children}
    </RoleContext.Provider>
  );
};
