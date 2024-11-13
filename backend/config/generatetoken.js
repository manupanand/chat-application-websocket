const jsonwebtoken = require("jsonwebtoken");
const secretKey=process.env.JWT_KEY


const generateTokenCookie=(userId,res)=>{
    const token =jsonwebtoken.sign({userId},secretKey,{
        expiresIn:'15d'
    })
    res.cookie('jwt',token,{
        maxAge:15*24*60*60*1000 ,//milli seconds format
        httpOnly:true,// to prevent xss attack
        sameSite:"strict", //CSRF attacks cross-site requet forgery attack,
        secure: process.env.NODE_ENV != "development",// either true or false can make it dynamic if not in development to true
    })
}

module.export=generateTokenCookie


