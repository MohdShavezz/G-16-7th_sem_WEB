import jwt from 'jsonwebtoken'

export const authMiddleware=(req,res,next)=>{
    try {
        // taking token from cookies
        let token;
        if(req.cookies){
            token=req.cookies?.token
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
            if(!decoded){
                 res.status(401).json({success:false,message:'token expire'})
            }
            req.id=decoded.id
            next()
        }

        // taking token from client's headers
        // let token;
        // if(req.headers.authorization?.startsWith('Bearer')){
        //     token=req.headers.authorization.split(' ')[1]
        //     const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        //     if(!decoded){
        //          res.status(401).json({success:false,message:'token expire'})
        //     }
        //     req.id=decoded.id
        //     next()
        // }
        
    } catch (error) {
        console.log('middle ware auth erro',error)
    }
}