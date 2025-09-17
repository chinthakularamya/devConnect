const mongoose=require('mongoose')
const connectDB=async()=>{
    try{
await mongoose.connect(
    "mongodb+srv://ramya:12345@cluster0.cjiqutv.mongodb.net/devTinder"
)
    }
    catch(err){
        console.log(err)
    }
}
module.exports=connectDB