const express=require('express')
const connectDB=require('./config/database')
const app=express()
const User=require("./models/user")
app.use(express.json())
app.post("/signup",async(req,res)=>{
    //console.log(req.body)
    const user= new User(req.body)
    await user.save()
    res.send("user signed up successfully")
})
app.get("/user",async(req,res)=>{
    const userEmail=req.body.email
    try{
const user=await User.findOne({email:userEmail})
res.send(user)
    }
    catch(err){
        console.log("something went wrong",err.message)
    }
})
app.get("/feed",async(req,res)=>{
    try{
       const users= await User.find()
        res.send(users)
    }
    catch(err){
        console.log("something went wrong",err.message)
        
    }

})
app.delete("/user",async(req,res)=>{
const id=req.body.id
try{
    const user=await User.findByIdAndDelete(id)
    res.send("user deleted successfully")
}
catch(err){
    console.log("something went wrong",err.message)
}
})
app.patch("/user",async(req,res)=>{
    const id=req.body.id
    const updatedData=req.body
    try{
    const ALLOWED_UPDATES=["firstName","lastName","about","skills","age"]
    const isUpdateAllowed=Object.keys(updatedData).every((update)=>{
        ALLOWED_UPDATES.includes(update)
    })
    if(!isUpdateAllowed){
        throw new Error("update not allowed")
    }
    console.log(updatedData)
   
await User.findByIdAndUpdate(id,updatedData)
res.send("user updated successfully")
    }
    catch(err){
res.status(400).send({error:err.message})
    }
})

connectDB()
.then(()=>{
    console.log("Connected to DB successfully")
    app.listen(3000,()=>{
        console.log("Server is listening to port 3000 at http://localhost:3000")
    })
})
.catch((err)=>{
    console.log("Error in connecting to DB",err)
})