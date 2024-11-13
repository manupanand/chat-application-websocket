const mongoose=require('mongoose')

const conversationSchema= new mongoose.Schema({
            participants:[
               { type:new mongoose.Schema.Types.ObjectId(),
                ref:"User",},
            ],
            messages:[
                {
                    type:new mongoose.Schema.Types.ObjectId(),
                    ref:"Message",
                default:[]
            },
            ],


},{timestamps:true})

const Conversation= mongoose.model("Conversation",conversationSchema)

module.exports=Conversation