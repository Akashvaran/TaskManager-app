import express from 'express';
import {getAllTasks,addTask,getTaskById,updateTaskStatus,deleteTask} from '../controller/taskControler.js';

const taskRouter = express.Router();

taskRouter.get('/', getAllTasks); 
taskRouter.post('/', addTask);
taskRouter.get('/:id', getTaskById);
taskRouter.patch('/:id/status', updateTaskStatus);
taskRouter.delete('/:id', deleteTask);

export default taskRouter;
