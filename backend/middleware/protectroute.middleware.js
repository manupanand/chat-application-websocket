const {generateTokenCookie,verifyToken}=require('../config/generatetoken');
const User = require('../model/user.model');
const logger=require('./logger.middleware')
const User=require('../model/user.model')


const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            logger.error("Error -unauthorised token")
            return res.status(401).json({ error:"Unauthorised -no token provided"})
        }
        const decoded=verifyToken(token)
        if(!decoded){
            logeger.error("Unauthorised -Invalid token provided")
            return res.status(401).json({ error:"Unauthorised -Invalid token provided"})

        }
        const user= await User.findById(decoded.userId).select("-password")//remove password
        if(!user){
            logger.error("User not found")
            return res.status(404).json({error:"User not found"})
        }
        req.user=user
        next()

    }catch(error){
        logger.error("Error in authenticating token user/protect-route middleware",error)
        res.status(500).json({
            message:"Error in verifying user /protect-middleware"
        })
    }
    module.exports=protectRoute
}