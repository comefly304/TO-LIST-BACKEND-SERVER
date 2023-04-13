const mongoose=require('mongoose')

const Userschema=new mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
},{
    timestamps:true
})

const User=mongoose.model("Users",Userschema)

module.exports=User