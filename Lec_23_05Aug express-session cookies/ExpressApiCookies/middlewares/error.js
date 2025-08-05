export const errorMiddleware=(err,req,res,next)=>{
    // console.log(err.stack)
    let statusCode=err.statusCode||500;
    res.status(statusCode).json({success:false,message:err.message||'inter server errro'})
}