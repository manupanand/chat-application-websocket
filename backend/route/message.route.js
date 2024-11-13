const router=require('express').Router()
const sendMessageController=require('../controllers/message.controller')

router.post('/send/:id',sendMessageController.sendMessage)




module.exports=router