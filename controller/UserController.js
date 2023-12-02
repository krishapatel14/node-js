const userModel = require("../models/UserModel");

const adduser = async (req, res) => {
  try {
    const user = new userModel(req.body);
    const savedusers = await user.save();
    if (savedusers) {
      res.status(200).json({
        message: "user added successfully",
        data: savedusers,
      });
    } else {
      res.status(400).json({
        message: "user not added",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error",
      error: err,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .populate("department")
      .populate("userRoles");
    if (users) {
      res.status(200).json({
        message: "users fetched successfully",
        data: users,
      });
    } else {
      res.status(400).json({
        message: "users not fetched",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error",
      error: err,
    });
  }
};

const addRoleToUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);  

  console.log(req.body);
  try {
    const savedUser = await userModel.findByIdAndUpdate(
      userId,
      { $push: { userRoles: req.body.roleId } },
    //   { $pull: { userRoles: req.body.roleId } },
      { new: true }
    );
    if (savedUser) {
      res.status(200).json({
        message: "role added successfully",
        data: savedUser,
      });
    } else {
      res.status(400).json({
        message: "role not added",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error",
      error: err,
    });
  }
};

module.exports = {
  adduser,
  getAllUsers,
  addRoleToUser,
};