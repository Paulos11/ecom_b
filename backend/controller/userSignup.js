const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

const userSignUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide Email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide password" });
    }
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide name" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const userData = await User.create({ name, email, password: hash });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userData.name,
    });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyValue) {
      // Duplicate key error
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    }
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "An internal server error occurred" });
  }
};

module.exports = userSignUpController;
