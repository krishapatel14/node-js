const jwt= require("jsonwebtoken")
const secret="secretkey"


const generateToken = (employee) =>{
    const tokenn=jwt.sign(employee,secret,{
        expiresIn: "1h",
        algorithm:"HS512"
    })
    return tokenn
}
const validateToken = (token)=>{
    try{
        const user=jwt.verify(token,secret)
        return user
    }
    catch(err){
        console.log(err)
        return null
    }
}
// var x=generateToken({name:"amit",age:30})
// console.log(x);
module.exports={
    generateToken,
    validateToken
}