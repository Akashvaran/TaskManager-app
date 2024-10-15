import React from 'react';
import { Login } from "../authentication/login/Login";
import { Routes, Route } from 'react-router-dom';
import { Signup } from "../authentication/signup/Signup";
import { Navbar } from '../navbar/Navbar';
import { TaskProvider } from '../providercomponent/TaskProvider';
import { ViewDetails } from '../taskManager/viewPage/Viewdetails';
import GetAllTask from '../taskManager/getAllTask/GetAllTask';
import VerifyRole from '../productedRoute/VerifyRole';
import { UserProvider } from '../productedRoute/RoleContaxt';
import { ErrorPage } from '../ErrorPage';
import  Userdetails  from '../userdetails/Userdetails';

export const MainRouding = () => {
  return (
    <>
      <UserProvider>
        <TaskProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/getAllTask"
              element={
                <VerifyRole allowedRoles={['user', 'admin']}>
                  <GetAllTask />
                </VerifyRole>
              }
            />
            <Route
              path="/update/:id"
              element={
                <VerifyRole allowedRoles={['user', 'admin']}>
                  <ViewDetails />
                </VerifyRole>
              }
            />
            <Route path='/userDetails' element={
              <VerifyRole allowedRoles={['admin']}>
              <Userdetails/>
            </VerifyRole>
            }/>
          
            <Route path='/error' element={<ErrorPage />} />
          </Routes>
        </TaskProvider>
      </UserProvider>
    </>
  );
};

