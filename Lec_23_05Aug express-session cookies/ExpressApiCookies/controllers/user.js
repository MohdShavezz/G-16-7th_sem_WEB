import { User } from "../models/user.js"
import bcrypt from "bcryptjs";

import jwt from 'jsonwebtoken'

export const deleteAction=async(req,res)=>{
    try {
        console.log(req.params)
        const userId=req.params.id
        await User.findByIdAndDelete(userId)
         res.status(200).json({success:true,message:'user deleted'})
    } catch (error) {
        console.log(error)
    }
}

export const loginAction=async(req,res)=>{
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
        const token= await jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:5*60})
        //  res.status(200).json({success:true,message:'succes login',data:{user,token}})

        // storing token in cookies
        res
        .cookie('token', token, { maxAge: 3600000, httpOnly: true })
        .status(200).json({success:true,message:'succes login'})

    } catch (error) {
        console.log(error)
    }
}

export const createAction=async(req,res,next)=>{
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
}

export const updateAction=async(req,res)=>{
    try {
        const userId=req.params.id
        const {name}=req.body;
        const image=req.file.filename
        let updatedData={}
        if(name){
            updatedData.name=name
        }
        if(image){
            updatedData.image=image
        }

        let resp=await User.findByIdAndUpdate(userId,updatedData,{new:true})
         res.status(200).json({success:true,message:'user update',data:resp})
    } catch (error) {
        console.log(error)
    }
}