import React, { createContext, useState, useEffect } from 'react';
import Axios from '../axios/Axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [addshowModel, setaddshowModel] = useState(false);

    const fetchTasks = async () => {
        try {
            const response = await Axios.get('/Task');
            console.log(response.data);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async (taskname, description, deadline) => {
        try {
            const response = await Axios.post('/Task', { taskname, description, deadline });
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
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, setaddshowModel, addshowModel }}>
            {children}
        </TaskContext.Provider>
    );
};
