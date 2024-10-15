import React, { createContext, useState } from 'react';

export const RoleContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const login = (user) => {
    setIsLoggedIn(true);
    setRole(user.role);
  };


  return (
    <RoleContext.Provider value={{ isLoggedIn, role, login}}>
      {children}
    </RoleContext.Provider>
  );
};
