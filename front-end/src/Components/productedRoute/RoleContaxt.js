import React, { createContext, useState, useEffect } from 'react';
import Axios from '../axios/Axios';

export const RoleContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');

  console.log(role)
  console.log(userId)

  const login = (user) => {
    console.log(user.id)
    setIsLoggedIn(true);
    setRole(user.role);
    setUserId(user.id)
    
  };

  console.log(userId)


  // const verifyUser = async () => {
  //   try {
  //     const response = await Axios.get('/User/Verify');
  //     console.log('verificetion response:', response.data);
  //     if (response.data.status) {
  //       const { role, id } = response.data.user;
  //       setIsLoggedIn(true);
  //       setRole(role);
  //       setUserId(id);
  //       console.log('Role after verify:', role);
  //       console.log('User ID after verify:', id);
  //     }
  //   } catch (error) {
  //     // console.error('Verification failed:', error.response?.data?.message || error.message);
  //     setIsLoggedIn(false);
  //     setRole('');
  //     setUserId('');
  //   }
  // };


  // useEffect(() => {
  //   verifyUser();
  // });


  // useEffect(() => {
  //   console.log('Updated role:', role);
  //   console.log('Updated user ID:', userId);
  // }, [role, userId]); 

  return (
    <RoleContext.Provider value={{ isLoggedIn, role, userId ,login}}>
      {children}
    </RoleContext.Provider>
  );
};
