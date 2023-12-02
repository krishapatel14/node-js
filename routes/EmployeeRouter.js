const express=require("express")
const router=express.Router();
const employeeController = require("../controller/EmployeeController");
const middleware=require("../middleware/demomiddlware")
const authMiddleware=require("../middleware/Authmiddleware")


router.get("/employee",authMiddleware.authUser,employeeController.getAllEmployees)
router.post("/employee",employeeController.addEmployee);
router.delete("/employee/:id",employeeController.deleteEmployee);
router.put("/employee/:id",employeeController.updateEmployee);
router.get("/employee/:id",employeeController.getEmployeeById);
router.get("/employee1/filter",employeeController.filterEmployee);
router.get("/employee/count/:id",middleware.valid,employeeController.employeCount);
router.post("/employee/login",employeeController.loginEmployee);
module.exports = router;