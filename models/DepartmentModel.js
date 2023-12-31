const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const departmentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    }
},
{
    timestamps: true
})

module.exports=mongoose.model("department",departmentSchema)