import bcryptjs from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    //validating email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format." });
    }
    //checks if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();

    //fetch user id to use to get user data in frontend
    const data = newUser._id;

    //generate token
    const token = jwt.sign({ email, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.status(201).json({
      success: true,
      message: "Registration successfull.",
      token,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" }); // Added return
    }

    const checkedPassword = await bcryptjs.compare(
      password,
      existingUser.password
    );

    if (!checkedPassword) {
      return res
        .status(400)
        .json({ success: false, message: "password don't match" }); // Added return
    }

    //fetch user id to use to get user data in frontend
    const data = existingUser._id; // Changed from newUser to existingUser

    const token = jwt.sign({ email, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res
      .status(200)
      .json({ success: true, message: "login successful", token, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};
