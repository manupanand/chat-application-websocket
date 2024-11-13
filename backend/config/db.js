const mongoose=require('mongoose')
const mongoUrl=process.env.MONGO_URL
const logger = require('../config/logger')

const dbConnection = async ()=>{
    try{
        await mongoose.connect(mongoUrl)
        logger.info("MongoDb connection successful")


    }catch(error){
        logger.error(" Error in connecting to data base: ",error)
    }
        
}
module.exports={dbConnection}