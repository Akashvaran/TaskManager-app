import React from 'react';
import { Login } from "../authentication/login/Login";
import { Routes, Route } from 'react-router-dom';
import { Signup } from "../authentication/signup/Signup";
import { Navbar } from '../navbar/Navbar';
import { TaskProvider } from '../providercomponent/TaskProvider'; 
import Addtask from '../taskManager/addtask/Addtask';
import GetAllTask from '../taskManager/getAllTask/GetAllTask';
import { ViewDetails } from '../taskManager/viewPage/Viewdetails';




export const MainRouding = () => {
  return (
    <>
      <TaskProvider> 
      
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} /> 
            <Route path="/signup" element={<Signup />} />
            <Route path="/update/:id" element={<ViewDetails/>}/>           
          </Routes>
        
        <Addtask/>
        <GetAllTask/>
      </TaskProvider>
    </>
  );
};

