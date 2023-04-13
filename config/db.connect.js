const mongoose=require('mongoose')

function Connection(){
    try{
    mongoose.connect(process.env.MONGODB_URL)
    console.log('mongodb connected...')
    }catch(err){
        console.log(err)
    }
}

module.exports=Connection