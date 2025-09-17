const express=require("express")
const connectDB=require("./config/database")
const app=express()
const User=require("./models/user")
app.use(express.json())
app.post("/signup",async (req,res)=>{
    const user=new User(req.body)
    try{
await user.save();
    res.send("User added successfully")
    
    }
    catch(err){
        res.status(400).send("error in adding user")
    }
    
})


connectDB().then(()=>{
    console.log("database connected successfully")
    app.listen(7777,()=>{
    console.log("server is listening at port 7777")
})
})
.catch((err)=>{
    console.log("database connection failed",err)
})

