const express=require("express")
const app=express()
app.use("/home",(req,res)=>{
    res.send("Hello from server")
})

app.listen(3000,()=>{
    console.log("server is listening at port 3000")
})