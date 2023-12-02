const multer=require("multer")
const googleController=require("./GoogleController")

const storage=multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({
    storage:storage,
    limits:{fileSize:1000000},
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=="image/png"||file.mimetype=="image/jpg"||file.mimetype=="image/jpeg"){
            // if(file.size<=1000000){
            //     cb(null,true);
            // }
            // else{
            //     cb(null,false);
            //     return cb(new Error("Image size should be less than 1MB"));
            // }
            cb(null,true);
        }
        else{
            cb(null,false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
}).single("file")

const uploadFile=async(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
             res.status(400).json({
                error:err.message
            })
        }
        else{
            googleController.uploadFile(req.file.path)
            res.status(200).json({
                message:"success",
                file:req.file
            })
        }
    })
}
module.exports={
    uploadFile
}