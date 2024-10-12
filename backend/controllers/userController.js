import bcryptjs from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";

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
    const token = jwt.sign(
      { role: "user", data, email },
      process.env.JWT_SECRET,
      {
        // Added email to the payload
        expiresIn: "7d",
      }
    );
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

    const token = jwt.sign(
      { role: "user", data, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({ success: true, message: "login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const userData = await User.findById(id).select("-password");

    if (!userData) {
      return res
        .status(400)
        .json({ success: false, message: "user doesn't exist" });
    }

    res.status(201).json({ success: true, data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, phone, address, dob, gender } = req.body;
    const image = req.file;

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!phone) missingFields.push("phone");
    if (!address) missingFields.push("address");
    if (!dob) missingFields.push("date of birth");
    if (!gender) missingFields.push("gender");
    if (!image) missingFields.push("image");

    // Check if at least one field is provided
    if (missingFields.length === 6) {
      // All fields are missing
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for update.",
      });
    }

    let imageUrl = null;

    if (image) {
      console.log("image path:", image.path);
      const uploadResult = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });

      if (uploadResult.secure_url) {
        imageUrl = uploadResult.secure_url;
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image to cloudinary",
        });
      }
    }

    await User.findByIdAndUpdate(id, {
      name,
      phone,
      address,
      dob,
      gender,
      ...(imageUrl && { image: imageUrl }),
    });

    return res.status(200).json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { id } = req.user; // Get the user's ID from the request
    const { docId, slotDate, slotTime } = req.body; // Get doctor ID, date, and time from the request body

    if (!id || !docId || !slotDate || !slotTime) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingAppointment = await Appointment.findOne({
      slotDate,
      slotTime,
      docId,
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "Appointment slot is already booked",
      });
    }

    // Find the doctor and user data from the database
    const doctor = await Doctor.findById(docId).select("-password");
    const user = await User.findById(id).select("-password");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const appointmentData = {
      userId: id,
      docId,
      slotDate,
      slotTime,
      userData: user,
      docData: doctor,
      amount: doctor.fees, // Assuming the doctor has a fees property
      date: Date.now(), // Timestamp of when the appointment was created
    };
    // Create and save the new appointment
    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch {
    return res
      .status(500)
      .json({
        success: false,
        message: "something went wrong",
        error: error.message,
      });
  }
};
