const router = require("express").Router();
const userController = require("../controller/UserController");

router.post("/user", userController.adduser);
router.get("/user", userController.getAllUsers)
router.put("/user/addrole/:id", userController.addRoleToUser)
module.exports = router;