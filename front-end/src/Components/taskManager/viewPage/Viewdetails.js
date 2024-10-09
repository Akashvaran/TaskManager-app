import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../../axios/Axios';

export const ViewDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        console.log(id);
        const response = await Axios.get(`/Task/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);

 
  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      <p><strong>Task Name:</strong> {task.taskname}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Deadline:</strong> {task.deadline}</p>
      <p><strong>Status:</strong> {task.status}</p>
    </div>
  );
};
