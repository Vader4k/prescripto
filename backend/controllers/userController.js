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

    //generate token
    const token = jwt.sign({ email, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.status(201).json({
      success: true,
      message: "Registration successfull.",
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
