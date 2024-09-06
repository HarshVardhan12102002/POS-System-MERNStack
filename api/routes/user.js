const User = require("../models/User");
const router = require("express").Router();

router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      messages: "Users listed successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    res.status(200).json({
      status: "success",
      messages: "User found successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

module.exports = router;
