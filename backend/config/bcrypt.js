const bcrypt=require("bcryptjs")
const logger= require('./logger')

const encrypt= async(password)=>{
    try{

        const salt= await bcrypt.genSalt(10)
        const   hashedPassword= await bcrypt.hash(password,salt)
        logger.info("Password encryped successfully")
        return hashedPassword
    }catch(error){
        logger.error("Error in encrypting the password",error)
        return null
    }
    

}

const decrypt= async(inputPassword,dbPassword)=>{
    try{

        const   decryptPassword= await bcrypt.compare(inputPassword,dbPassword)
        logger.info("Password decrypted succesfully")
        return decryptPassword
    }catch(error){
        logger.error("Error in decrypting the password",error)
        return null
    }
    

}



module.exports={encrypt,decrypt}