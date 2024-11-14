const logger=require('../config/logger')
const Conversation=require('../model/conversation.model')
const Message=require('../model/message.model')


const sendMessage=async (req,res)=>{
  try{
    const {message}=req.body
    const {id}=req.params
    const senderId=req.user._id// get it from middleware
    let conversation=await Conversation.findOne({
        participants:{$all:[senderId, id]},
    })
    //if new conversation
    if(!conversation){//check whether they have previous conversation
        conversation=await Conversation.create({
            participants:[senderId,id],
        })
    }
    //create messsage
    const newMessage=  new Message({
        senderId,
        recieverId,
        message
    })
    await newMessage.save()
    if(newMessage){
        await conversation.messages.push(newMessage._id)
    }
    
    await conversation.save()
    logger.info("message send successful")
    res.status(200).json({
        message:newMessage,

        
    })

  }catch(error){
    logger.error("Internal server error",error)
    res.status(500).json({
        message:" Internal server error",
        error:error.message
    })
  }
}


module.exports={sendMessage}