const logger=require('../config/logger')


const sendMessage=(req,res)=>{
  try{
    const {message}=req.body
    const {id}=req.params
    const senderId=req.// get it from middleware

    res.json({
        message:"message send",
        id:id,
    })

  }catch(error){
    logger.error("Internal server error",error)
    res.status(500).json({
        message:" Internal server error",
        error:error.message
    })
  }
}


module.exports=sendMessage