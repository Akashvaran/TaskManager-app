import React, { createContext, useState, useEffect } from 'react';

import Axios from '../axios/Axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await Axios.get('/Task');
            console.log(response.data)
            setTasks(response.data);
            
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async (taskname, description, deadline) => {
        try {
            const response = await Axios.post('/Task', { taskname, description, deadline });
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };


    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, addTask}}>
            {children}
        </TaskContext.Provider>
    );
};
