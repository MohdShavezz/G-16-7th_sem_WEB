import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import morgan from 'morgan';
import multer from 'multer';

// Set up Multer storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

dotenv.config()
const PORT=process.env.PORT

const app=express()
app.use(express.json())
app.use(morgan('dev'))

const dbConn=async()=>{
try {
    await mongoose.connect('mongodb://localhost:27017/g16db')
    console.log('db connected')
} catch (error) {
    console.log(error)
}
}
dbConn()
const userShema = new mongoose.Schema({
    name:String,email:String,password:String,image:String
},{timestamps:true})

const authMiddleware=(req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization?.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
            if(!decoded){
                 res.status(401).json({success:false,message:'token expire'})
            }
            req.id=decoded.id
            next()
        }
        
    } catch (error) {
        console.log('middle ware auth erro',error)
    }
}

const User=mongoose.model('User',userShema)

app.delete('/delete/:id',authMiddleware,async(req,res)=>{
    try {
        console.log(req.params)
        const userId=req.params.id
        await User.findByIdAndDelete(userId)
         res.status(200).json({success:true,message:'user deleted'})
    } catch (error) {
        console.log(error)
    }
})
app.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log(email,password)
        const user=await User.findOne({email})
        console.log(user)
        if(!user){
            res.status(404).json({success:false,message:'user not found'})
        }
        let check=await bcrypt.compare(password,user.password)
        console.log('cehck',check)
        if(!check){
            res.status(401).json({success:false,message:'unauthorised'})
        }
        //jwt
        const token= await jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:30})
         res.status(200).json({success:true,message:'succes login',data:{user,token}})

    } catch (error) {
        console.log(error)
    }
})
app.post('/create',upload.single('image'),async(req,res,next)=>{
    try {
        const {name,email,password}=req.body;
        const image=req.file.filename
        if(!name||!email||!password){
            let err=new Error('All fields required')
            err.statusCode=400
            return next(err)
        }
        const hassPass=await bcrypt.hash(password,10)
        const user= {name,email,password:hassPass,image}
        await User.create(user)
        res.status(201).json({status:true,message:'user created'})
    } catch (error) {
        console.log(error)
    }
})
app.get('/',(req,res)=>{
    // res.send('home route')
    res.status(300).json({success:true,message:'message'})
})

app.use((err,req,res,next)=>{
    // console.log(err.stack)
    let statusCode=err.statusCode||500;
    res.status(statusCode).json({success:false,message:err.message||'inter server errro'})
})

app.listen(PORT,()=>{
    
    console.log('server is running on ',PORT)
})
