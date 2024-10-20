import express from 'express';
import {signup,login,getAllUsers,updateUser,deleteUser, Verify, logout} from '../controller/authentication.js'
import { authoriseRoute, protectRoutes } from '../Utilities/roleVerification.js';



const authRouter=express.Router()

authRouter.post('/signup', signup); 
authRouter.post('/login', login);
authRouter.get('/getuser',getAllUsers)
authRouter.put('/update/:Id',protectRoutes,authoriseRoute('admin'), updateUser);
authRouter.delete('/delete/:id',protectRoutes,authoriseRoute('admin'), deleteUser);
authRouter.get('/Verify',Verify)
authRouter.post('/logout',protectRoutes,logout)
export{authRouter}