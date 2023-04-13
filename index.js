const express=require('express');
const TuserRouter = require('./routes/Tusers');
const PostRouter = require('./routes/todo_post.route');
const Connection = require('./config/db.connect');
const app=express()
require('dotenv').config()


app.use(express.json())
app.use("/user",TuserRouter)
app.use("/post",PostRouter)



const PORT=5050;
app.listen(PORT,async()=>{
    try{
        await Connection()
        console.log(`server is listening in ${PORT}`)
    }catch(err){
        console.log('could not able to connect database')
    }
})