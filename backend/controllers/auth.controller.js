const bcrypt = require("bcryptjs/dist/bcrypt")
const logger=require("../config/logger")
const User=require('../model/user.model')
const{encrypt,decrypt}=require('../config/bcrypt')
const generateToken =require('../config/generatetoken')

const loginUser=async(req,res)=>{
   try{
        const {username,password}=req.body
        const user=await User.findOne({username})
        try{//validate password
            const ispasswordCorrect= await decrypt(password,user?.password || "")//if password user doesnt exist null should not throw error
            if(!user ||!ispasswordCorrect){
                return res.status(400).json({error: "Invalid username or password"})
            }
            generateToken(user._id,res)
            res.status(200).json({
                _id:user._id,
                fullname:user.fullname,
                username:user.username,
                profilePic:user.profilePic,
            })
            logger.info("User validated successfully")

        }catch(error){
            logger.error("Error in validaing password/incorrect username or password: ",error)
            res.status(500).json({
                message:" Username /password incorrect"
            })
        }

   }catch(error){
        logger.error("Error in  User / Signin controller: ",error)
        res.status(500).json({
            error:"Error in  User / Signin controller"
        })
    }
}
const logoutUser= (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({
            message:"User logged out successfully"
        })
    }catch(error){
        logger.error("Error in  logout controller: ",error)
        res.status(500).json({
            error:"Internal server Error/logout controller"
        })
    }
}
const signUpUser= async (req,res)=>{
    const {firstName,lastName,password,confirmPassword,gender}=req.body
    try{
        if(password!=conformPassword){
            logger.error("Passwords dont match ")
            return res.status(400).json({
                error:"Passwords don't match"
            })
        }
        const user= await User.findOne({username})
        if(user){
            return res.status(400).json({
                error:"Username already exists "
            })
        }
        // encryp password
        const encryptPassword= await encrypt(password)
        //avatar place holder 
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`
        const newUser= await User.create({
            fullName,
            username,
            password:encryptPassword,
            gender,
            profilePic: gender==="male" ? boyProfilePic: girlProfilePic
        })
        //generate token
        try{
            if(newUser){
                generateToken(newUser._id,res)
                logger.info("Token generated succesfully")
            }
        }catch(error){
                logger.error("Error in generating token /generatetoken :",error)
        }
       
        logger.info("User created successfully")
        res.status(201).json({
            message:"User created",
            _id:newUser._id,
            username:newUser.username,
            profilePic:newUser.profilePic

        })


    }catch(error){
        logger.error("Error in  creating User / Signup controller: ",error)
        res.status(500).json({
            error:"Internal server Error"
        })
    }
  
}
module.exports={loginUser,logoutUser,signUpUser}