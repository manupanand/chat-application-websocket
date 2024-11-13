const app=require('express')()
const express = require('express')
const logger=require('./config/logger')
const dotenv=require('dotenv').config()
const mainRouter=require('./route/auth.route')
const {dbConnection}=require('./config/db')
const morgan_log=require('./middleware/logger.middleware')
const User=require('./model/user.model')
const messageRouter=require('./route/message.route')
const cookieParser=require('cookie-parser')



//database connection
dbConnection()
// dotenv.config()

//main middleware
app.use(cookieParser())
app.use(morgan_log)
app.use(express.json())//to parse req.body middleware

//routes
app.use('/api/auth',mainRouter)
app.use('/api/message',messageRouter)


app.listen(5000,()=>{
    try{logger.info("Server started succesfully on port :5000")}catch(error){
        logger.error("Error in starting server: ",error)
    }
})