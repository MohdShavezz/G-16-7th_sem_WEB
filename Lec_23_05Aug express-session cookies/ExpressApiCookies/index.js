import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { dbConn } from './config/dbConn.js';
import { errorMiddleware } from './middlewares/error.js';
import router from './routes/userRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config()
const PORT=process.env.PORT

const app=express()
app.use(express.json())
app.use(morgan('dev'))
app.use('/uploads',express.static(path.join(path.resolve(), 'uploads')))
app.use(cookieParser())

dbConn()

app.use('/',router)

app.get('/',(req,res)=>{
    // res.send('home route')
    res.status(300).json({success:true,message:'message'})
})

app.use(errorMiddleware)

app.listen(PORT,()=>{
    
    console.log('server is running on ',PORT)
})
