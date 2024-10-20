import React, { createContext, useState, useEffect, useContext } from 'react';
import Axios from '../axios/Axios';
import { RoleContext } from '../productedRoute/RoleContaxt';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const {userId}=useContext(RoleContext)
    const [tasks, setTasks] = useState([]);
    const [addshowModel, setaddshowModel] = useState(false);

    const fetchTasks = async () => {
        try {
            const response = await Axios.get(`/Task`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };


    const addTask = async (taskname, description, deadline) => {
   
        try {
            const response = await Axios.post('/Task', {
                taskname,
                description,
                deadline,
                createdUser: userId 
            });
            setTasks((prevTasks) => [...prevTasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );
    };

    const deleteTask = async (taskId) => {
        try {
            await Axios.delete(`/Task/${taskId}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [userId]);

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, setaddshowModel, addshowModel }}>
            {children}
        </TaskContext.Provider>
    );
};
