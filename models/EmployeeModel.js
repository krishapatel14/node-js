const e = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
    },
    password:{
        type:String,
        required:true

    },
    counter:{
        type:Number,
        default:0
    }

})
//model creation...

// mongoose.model("employee",employeeSchema)
// module.exports = employeeSchema

module.exports = mongoose.model("employee",employeeSchema)