import React, { useContext, useState } from "react";
import './GetAlltask.css';
import { TaskContext } from "../../providercomponent/TaskProvider";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import TaskModal from '../addtask/Addtask';

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
        <div className="tasklist-container">
            <h2>Task List</h2>
            <button onClick={() => setaddshowModel(true)}>Add Task</button>

            <div className="tasklist-actions">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="task-list">
               <Link to={'/userDetails'}><button>viewUsers</button></Link> 
                {filteredTasks.map(task => (
                    <div key={task._id} className="task-item">
                        <div className="task-content">
                            <p className="task-name">Task Name: {task.taskname}</p>
                            <p className="task-description">Description: {task.description}</p>
                            <p className="task-deadline">Deadline: {task.deadline}</p>
                            <div>
                                <Link to={`/update/${task._id}`}>
                                    <button>View</button>
                                </Link>
                                <button onClick={() => handleDelete(task)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showDeleteModal && (
                <div className="modal-view">
                    <div className="modal-content">
                        <p className="Deletemodelclose" onClick={cancelDelete}>
                            <IoMdClose />
                        </p>
                        <h3>Are you sure you want to delete this task?</h3>
                        <p>{selectedTask?.taskname}</p>
                        <div>
                            <button onClick={confirmDelete}>Yes</button>
                            <button onClick={cancelDelete}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {addshowModel && (
               <div className="Addtask-model-view">
                <TaskModal onClose={() => setaddshowModel(false)} />
                </div>
            )}
        </div>
    );
};

export default GetAllTask;

