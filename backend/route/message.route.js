const router=require('express').Router()
const sendMessageController=require('../controllers/message.controller')
const protectRoute=require('../middleware/protectroute.middleware')

router.post('/send/:id',protectRoute,sendMessageController.sendMessage)




module.exports=router