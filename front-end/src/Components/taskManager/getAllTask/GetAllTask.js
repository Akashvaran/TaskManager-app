import React, { useContext, useState } from "react";
import './GetAlltask.css';
import { TaskContext } from "../../providercomponent/TaskProvider";
import { Link } from "react-router-dom";

const GetAllTask = () => {
  const { tasks } = useContext(TaskContext);
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter(task =>
    task.taskname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tasklist-container">
      <h2>Task List</h2>

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
        {filteredTasks.map(task => (
          <div key={task._id} className="task-item">
            <div className="task-content">
              <p className="task-name">Task Name: {task.taskname}</p>
              <p className="task-description">Description: {task.description}</p>
              <p className="task-deadline">Deadline: {task.deadline}</p>
              <p className="task-status">Status: {task.status}</p>
              <div>
                <Link to={`/update/${task._id}`}>
                  <button>Update</button>
                </Link>
                <button>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllTask;

