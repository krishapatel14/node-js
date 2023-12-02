const EmployeeModel = require("../models/EmployeeModel")
const encryptPassword = require("../util/PasswordEncrypt");
const token=require("../util/TokenUtil")

const getAllEmployees = async (req, res) => {
    const employees = await EmployeeModel.find()
    console.log(employees);

    if (employees && employees.length !== 0) {
        res.status(200).json({
            employees: employees,
            message: "success",
        });
    } else {
        res.status(200).json({
            employees: [],
            message: "No employee found",
        });
    }
}
const addEmployee = async (req, res) => {
    console.log("req body", req.body);
    //req.body
    const employee = new EmployeeModel(req.body);
    try {
        const flag = await employee.save();
        if (flag) {
            res.status(200).json({
                employee: employee,
                message: "success",
            });
        } else {
            res.status(200).json({
                employee: {},
                message: "failed",
            });
        }
    } catch (err) {
        res.status(500).json({
            employee: {},
            message: err.message,
        });
    }
}

const deleteEmployee = async (req, res) => {
    const id = req.params.id;
    try {
        const flag = await EmployeeModel.findByIDAndDelete(id)
        console.log(flag);
        if (flag) {
            res.status(204).json({
                message: "success",
            });
        } else {
            res.status(200).json({
                message: "failed",
            });
        }

    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

const updateEmployee = async (req, res) => {
    const id = req.params.id;
    const employeeBody = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
    };

    try {
        const flag = await EmployeeModel.findByIdAndUpdate(id, employeeBody);
        if (flag) {
            res.status(200).json({
                message: "success",
                employee: flag,
            });
        } else {
            res.status(200).json({
                message: "failed",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const flag = await employeeModel.findById(req.params.id);
        if (flag) {
            res.status(200).json({
                message: "success",
                employee: flag,
            });
        } else {
            res.status(404).json({
                message: "record not found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

const filterEmployee = async (req, res) => {
    const query = req.query;
    const data = await employeeModel.find({ ...query })
    if (data) {
        res.status(200).json({
            message: "Success",
            employees: data
        })
    } else {
        res.status(404).json({
            message: "Record Not Found"
        })
    }
}
const employeCount=async(req,res)=>{
    const employees = await EmployeeModel.findById(req.params.id)
    employees.counter+=1
    // if(employees){
    //     res.status(200).json({
    //         employees: employees,
    //         message: "success",
    //     });
    // }
    const employeeBody = {
        name: employees.name,
        email: employees.email,
        age: employees.age,
        password:employees.password,
        counter:employees.counter
    };
    const flag=await EmployeeModel.findByIdAndUpdate(req.params.id,employeeBody);
    if (flag) {
        res.status(200).json({
            message: "success",
            employee: flag,
        });
    } else {
        res.status(200).json({
            message: "failed",
        });
    }

}
const loginEmployee = async (req,res) => {


    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password);

    const employee = await EmployeeModel.find({email:email,password:password});
    console.log("employee",employee);
    const payload={
        name:employee.name,
        email:employee.email,
        age:employee.age,
        password:employee.password
    }
    const tkn=token.generateToken(payload);
    if(employee){
    //   const flag = encryptPassword.comparePassword(password,employee.password);
    //   console.log(flag);
    //   if(flag){
        res.status(200).json({
          message:"Login success",
          token:tkn
        })
    //   }
    //   else{
    //     res.status(404).json({
    //       message:"Login failed",
    //       data:[]
    //     })
    //   }

    }
    else{

      res.status(404).json({
        message:"Register first",
        data:[]
      })

    }



}
module.exports = {
    getAllEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployeeById,
    filterEmployee,
    employeCount,
    loginEmployee
}