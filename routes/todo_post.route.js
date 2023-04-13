const PostRouter=require('express').Router()
const post=require('../models/post')


PostRouter.post("/create",async (req,res)=>{
    try{
      const{task,desc,completed}=req.body
      const newtask=new post({
        task,
        desc,
        completed
      })
      await newtask.save()
      return res.json({
        msg:'todo posted successfully...',
        data:newtask
      })

    }catch(err){
        return res.status(400).send("something went wrong")
    }
})


//GET
PostRouter.post("/get",async (req,res)=>{
   try{
     const todo=await post.find()
     return res.json({
        data:todo
     })
   }catch(err){
    return res.send(err)
   }
})

//GET COMPLETED DATA
PostRouter.get("/get/completed",async (req,res)=>{
    try{
      const todo=await post.find({completed:true})
      return res.json({
         data:todo
      })
    }catch(err){
     return res.send("not found")
     
    }
 })

module.exports=PostRouter

//how to  create a model for register oin node.js?