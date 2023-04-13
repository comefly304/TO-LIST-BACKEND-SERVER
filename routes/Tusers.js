const TuserRouter=require('express').Router()
const User=require('../models/tusers')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const post=require('../models/post')


//REGISTER
TuserRouter.post("/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const alreadyexisting = await User.findOne({ email });
      const hash = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hash,
      });
      if (alreadyexisting) {
        return res.json({
          msg: "user already exist",
        });
      }
      await user.save();
      return res.json({
        msg: "registered successfully...",
        data: user,
      });
    } catch (err) {
      return res.send(err);
    }
  });

//login
TuserRouter.post("/login",async (req,res)=>{
    try{
        const {email,password}=req.body
    const user=await User.findOne({email:email})
   await bcrypt.compare(password,user.password,function(err,result){
    if(err){
        return res.send(err)
    }if(result){
   const token=jwt.sign({userId:user._id},process.env.JWT_SECRET)
   return res.json({
    msg:"login successful...",
    data:user,
    token:token
   })
      }
   })
    }catch(err){
        return res.status(400).send("something went wrong")
    }
})

//get 
TuserRouter.get("/get",async (req,res)=>{
    try{
       const user=await User.find()
       return res.json({
        data:user
       })
    } catch(err){
        return res.send(err)
    }
})


// TuserRouter.get("/token",verifytoken,async(req,res)=>{
   
// })


function verifytoken(req,res){
    const token=req.query.token || req.headers["authorization"] || req.body.token
    if(!token){
        return res.send("ivalid token")
    }else{
        const user=jwt.verify(token,process.env.JWT_SECRET)
        return res.json({
            msg:"user accessed...",
            data:user,
            
        })
    }
 
}

//get task of a user
//push task to particular user 
// ADD TASK
TuserRouter.post("/tasks", verifytoken, async (req, res) => {
    try {
      const { title, description } = req.body;
      const task = new post({
        title,
        description,
        owner: req.user._id
      });
      await task.save();
      const user = await User.findById(req.user._id);
      user.tasks.push(task._id);
      await user.save();
      return res.json({
        msg: "task added successfully",
        data: task,
      });
    } catch (err) {
      return res.send(err);
    }
  });



module.exports=TuserRouter