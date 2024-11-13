const mongoose=require('mongoose')

const messageSchema= new mongoose.Schema({
    senderId:{
              type:new mongoose.Schema.Types.ObjectId(),
              required:true,
              ref:"User"
             },
    recieverId:{
                type:new mongoose.Schema.Types.ObjectId(),
                required:true,
                ref:"User"
                },
    message:{
        type:String,
        required:true
    }
        //createdAt,updatedAt
},{timestamps:true})

const Message= mongoose.model("Message",messageSchema)
module.exports=Message