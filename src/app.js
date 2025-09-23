const express=require('express')
const connectDB=require('./config/database')
const app=express()
const User=require("./models/user")
const bcrypt=require("bcrypt")
const validator=require("validator")
const {validateSignupData}=require("./utils/validation")
app.use(express.json())
app.post("/signup",async(req,res)=>{
        try{
            //validate the data
    validateSignupData(req)
    const {firstName,lastName,email,password}=req.body
    //encrypt the password
    const passwordHash=await bcrypt.hash(password,10)
    const user= new User(
        {firstName,lastName,email,
        password:passwordHash
    }) 
    

    await user.save()
    res.send("user signed up successfully")
    }
    catch(err){
        res.status(400).send({ERROR:err.message})
    }
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
app.post("/login",async(req,res)=>{

    const{email,password}=req.body
try{
if(!validator.isEmail(email)){
    throw new Error("email is not valid :"+email)
}
const user=await User.findOne({email:email})
if(!user){
    throw new Error("Invalid credentials")
}
const isPasswordValid=await bcrypt.compare(password,user.password)
if(isPasswordValid){
    res.send('login successfull')
}
else{
    throw new Error("Invalid credentials")
}
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