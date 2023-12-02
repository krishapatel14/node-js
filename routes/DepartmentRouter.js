const router=require('express').Router()
const departmentController=require("../controller/DepartmentController")
router.post('/dept',departmentController.addDepartment)
router.get('/dept', departmentController.getAllDepartments);
module.exports=router