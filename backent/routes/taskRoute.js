import express from 'express';
import {getAllTasks,addTask,getTaskById,updateTaskStatus,deleteTask} from '../controller/taskControler.js';
import { protectRoutes,authoriseRoute } from '../Utilities/roleVerification.js';
const taskRouter = express.Router();


taskRouter.get('/', getAllTasks); 
taskRouter.post('/',protectRoutes,authoriseRoute('user', 'admin'), addTask);
taskRouter.get('/:id',protectRoutes,authoriseRoute('user', 'admin'), getTaskById);
taskRouter.patch('/:id/',protectRoutes,authoriseRoute('user', 'admin'), updateTaskStatus);
taskRouter.delete('/:id',protectRoutes,authoriseRoute('user', 'admin'), deleteTask);

export default taskRouter;
