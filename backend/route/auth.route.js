const router=require('express').Router()
const authRouter=require('../controllers/auth.controller')


router.post('/login',authRouter.loginUser)

router.post('/logout',authRouter.logoutUser)

router.post('/signup',authRouter.signUpUser)



module.exports=router