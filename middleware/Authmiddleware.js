const tokenUtil=require("../util/TokenUtil")

const authUser=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token && token.startsWith("Bearer ")){
        const tokenValue=token.split(" ")[1];
        const isValidate=tokenUtil.validateToken(tokenValue);
        if(isValidate!=null){
            next();
            }else{
                res.status(401).json({
                    message:"unaunthorized"
                    })
    }
    }else{
        res.status(401).json({
            message:"token invalid"
        })
    }
}
module.exports={
    authUser
}