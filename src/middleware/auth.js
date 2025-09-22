 export const adminAuth=(req,res,next)=>{
    console.log("checking admin is authorized or not")
    const token='xyz'
    const adminAuthorized=token==='xyz'
    if(!adminAuthorized){
        return res.status(403).send("user not authorized")
    }
    next()
}