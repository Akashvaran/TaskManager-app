import express from 'express';
import {signup,login} from '../controller/authentication.js'

const authRouter=express.Router()

authRouter.post('/signup', signup); 
authRouter.post('/login', login); 

export{authRouter}