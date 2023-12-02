const EmployeeModel = require("../models/EmployeeModel");

const valid = async (req, res, next) => {
    const id = req.params.id;
    const employees = await EmployeeModel.findById(id);
    if (employees) {
        if (employees.counter <= 5) {
            next();
        }
        else {
            res.status(403).json({
                message: "payment required"
            })
        }
    }
}
module.exports = {
    valid
}