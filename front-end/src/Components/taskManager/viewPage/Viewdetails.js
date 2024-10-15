import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../../axios/Axios';
import './Viewdetails.css';
import { TaskContext } from '../../providercomponent/TaskProvider';

export const ViewDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const { updateTask } = useContext(TaskContext);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await Axios.get(`/Task/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);

  const markAsDone = async () => {
    try {
      const response = await Axios.patch(`/Task/${id}`, { status: 'completed' });
      setTask({ ...task, status: 'completed' });
      updateTask(response.data);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="task-details-container">
      <div className="task-info">
        <h2 className="task-title">Task Details</h2>
        <p><strong>Task Name:</strong> {task.taskname}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Deadline:</strong> {task.deadline}</p>
        <p><strong>Status:</strong> {task.status}</p>
      </div>

      <div className="complete-button">
        <button onClick={markAsDone} disabled={task?.status === 'completed'}>
          {task?.status === 'completed' ? 'Task Completed' : 'Mark as Done'}
        </button>
      </div>
    </div>
  );
};
