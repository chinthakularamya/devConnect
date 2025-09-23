const mongoose=require("mongoose")
const validator=require("validator")
const userSchema=new mongoose.Schema(
    {
    firstName:{
    type:String,
    required:true
},
lastName:{
    type:String
},
email:{type:String,
    required:true,
    unique:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("email is not valid :" +value)
        }
    }

},
password:{type:String,
required:true

},
age:{type:Number},
gender:{
    type:String,
    validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("gender is not valid ")
        }
    }
},
about:{
type:String,
default: "hey there! I am using devTinder"},
skills:{
    type:[String]
}

},
{timestamps:true}
)
const User=mongoose.model("User",userSchema)
module.exports=User