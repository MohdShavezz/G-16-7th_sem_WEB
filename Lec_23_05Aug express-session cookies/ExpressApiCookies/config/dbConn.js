import mongoose from "mongoose"

export const dbConn=async()=>{
try {
    await mongoose.connect('mongodb://localhost:27017/g16db')
    console.log('db connected')
} catch (error) {
    console.log(error)
}
}