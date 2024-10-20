import express from 'express'
import errorHandler from './middleware/errorHandler.js'
import dotenv from 'dotenv'
import database from './config/database.js'
import { authRouter } from './routes/authRoutes.js'
import cors from 'cors'
import { errorControler } from './middleware/errorControler.js'
import taskRouter from './routes/taskRoute.js'
import cookieParser from 'cookie-parser'

dotenv.config()

database()

const app=express()
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))



app.use('/User',authRouter)
app.use('/Task',taskRouter)
app.use(errorHandler)
app.use('*',errorControler)

app.listen(process.env.PORT,()=>{
    console.log("server is runing port "+process.env.PORT)
})