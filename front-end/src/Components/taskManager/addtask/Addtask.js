import React, { useContext, useState } from 'react';
import './Addtask.css';
import { TaskContext } from '../../providercomponent/TaskProvider';
import { IoMdClose } from "react-icons/io";

const Addtask = () => {
    const { addTask, setaddshowModel } = useContext(TaskContext);
    const [taskname, setTaskname] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        addTask(taskname, description, deadline);
        setTaskname('');
        setDescription('');
        setDeadline('');
        setaddshowModel(false);
    };

    return (
        <div className="add-task-container">
            <div className='header-container'>
                <h1>Add New Task</h1>
                <p className='close-button' onClick={() => setaddshowModel(false)}>
                    <IoMdClose />
                </p>
            </div>

            <form className="add-task-form" onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskname}
                    onChange={(e) => setTaskname(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default Addtask;
