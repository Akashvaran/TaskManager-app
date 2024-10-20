import React, { useContext, useState } from "react";
import './GetAlltask.css';
import { TaskContext } from "../../providercomponent/TaskProvider";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import TaskCreation from "../addtask/TaskCeration";


const GetAllTask = () => {
    const { tasks, deleteTask, addshowModel, setaddshowModel } = useContext(TaskContext);
    const [search, setSearch] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const filteredTasks = tasks.filter(task =>
        task.taskname.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (task) => {
        setSelectedTask(task);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        deleteTask(selectedTask._id);
        setShowDeleteModal(false);
    };

    const cancelDelete = () => {
        setSelectedTask(null);
        setShowDeleteModal(false);
    };

    return (
        <div className="task-list-container">
            <h2>Task List</h2>
            <div className="button-containers">
                <button className="add-task-button" onClick={() => setaddshowModel(true)}>Add Task</button>
                <Link to={'/userDetails'}>
                    <button className="view-users-button">View Users</button>
                </Link>
            </div>
            <div className="task-list-actions">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="task-list">

                {filteredTasks.map(task => (
                    <div key={task._id} className="task-item">
                        <div className="task-content">
                            <p className="task-name">Task Name: {task.taskname}</p>
                            <p className="task-description">Description: {task.description}</p>
                            <p className="task-deadline">Deadline: {task.deadline}</p>
                            <div>
                                <Link to={`/update/${task._id}`}>
                                    <button className="view-button">View</button>
                                </Link>
                                <button className="delete-button" onClick={() => handleDelete(task)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p className="close-modal-button" onClick={cancelDelete}>
                            <IoMdClose />
                        </p>
                        <h3>Are you sure you want to delete this task?</h3>
                        <p>{selectedTask?.taskname}</p>
                        <div>
                            <button className="confirm-button" onClick={confirmDelete}>Yes</button>
                            <button className="cancel-button" onClick={cancelDelete}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {addshowModel && (
                <div className="add-task-modal">
                    <TaskCreation onClose={() => setaddshowModel(false)} />
                </div>
            )}
        </div>
    );
};

export default GetAllTask;

