const mongoose=require('mongoose')

const postschema=new mongoose.Schema({
    task:{type:String,require:true},
    desc:{type:String},
    completed:{type:Boolean,require:true}
},{
    timestamps:true
})

const post=mongoose.model("posts",postschema)

module.exports=post