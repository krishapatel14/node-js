// console.log("Hello World")
// const users=require("./users")
// console.log(users)


// create server using HTTP module

// const http = require('http') // import the node package for creating a webserver
// var server=http.createServer((req,res)=>{
//     console.log("Server is created");
// })
// server.listen(8000,()=>{
//     console.log("Server is running");
// })


// create server using express module

const express=require('express')
const app=express();  // create an instance of express application object and assign it to variable 'app'
const mongoose=require('mongoose')
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const employeeModel = require("./models/EmployeeModel");

// app.get("/employee", async (req, res) => {
//     ////db.employees.f
//     const employees = await employeeModel.find();
//     console.log(employees);
  
//     if (employees && employees.length !== 0) {
//       res.status(200).json({
//         employees: employees,
//         message: "success",
//       });
//     } else {
//       res.status(200).json({
//         employees: [],
//         message: "No employee found",
//       });
//     }
// })

// app.get("/employee/:id", async (req, res) => {
//     const id = req.params.id;
//     console.log(id);
  
//     try {
//       const employee = await employeeModel.findById(id);
//       if ((employee && employee != null) || employee != undefined) {
//         res.status(200).json({
//           employee: employee,
//           message: "success",
//         });
//       } else {
//         res.status(200).json({
//           employee: {},
//           message: "No employee found",
//         });
//       }
//     } catch (err) {
//       res.status(500).json({
//         message: err.message,
//       });
//     }
//   });
  

// var user = {
//     id:1,
//     name:"raj"
// }


// var users =[
//     {
//         name:"raj"
//     },
//     {
//         name:"pankaj"
//     },
//     {
//         name:'sachin',
//     },
//     {
//         name:'parth'
//     }
// ]

// app.get('/users',(req,res)=>{
//     console.log("user api is called..");
//     // res.send("user api called")
//     res.status(200).json({
//         message:"user api called",
//         user:users
//     })
// })

// app.get("/user/:id",(req,res)=>{

//     const id = req.params.id;
//     const query = req.query;
//     console.log(query);
//     console.log("user api called");
//     res.json({
//         message:"user api called",
//         user:users,
//         id:id
//     })

// })

// app.get("/users/:name",(req,res)=>{
//     const name=req.params.name;
//     // const query=req.query;     -- gives values from postman
//     // console.log(query);
//     res.json({
//         user:users,
//         name:users.filter(user=>name!=user.name)  // gives users object where the given name in params are not there in object..
//     })
// })

const employeeRoutes=require("./routes/EmployeeRouter")
const departmentRoutes=require("./routes/DepartmentRouter")
const userRoutes=require("./routes/UserRouter")
const roleRoutes=require("./routes/RoleRouter")
const fileUploadRoutes=require("./routes/FileUploadRoutes")


app.use("/api",employeeRoutes)
app.use("/api",departmentRoutes)
app.use("/api",userRoutes)
app.use("/api",roleRoutes)
app.use("/api",fileUploadRoutes)


const db=mongoose.connect("mongodb://127.0.0.1:27017/club5-node",{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

db.then(()=>{
    console.log("connected to db..");
}).catch((err)=>{
    console.log(err);
})



const PORT=3001
app.listen(PORT,()=>{
    console.log("Server is running");
})