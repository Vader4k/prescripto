import Doctor from "../models/doctorModel.js";
import bcryptjs from "bcryptjs";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Appointment from '../models/appointmentModel.js'

dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

//api for adding a new doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      about,
      experience,
      fees,
      address,
    } = req.body;
    const image = req.file;

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!speciality) missingFields.push("speciality");
    if (!degree) missingFields.push("degree");
    if (!about) missingFields.push("about");
    if (!experience) missingFields.push("experience");
    if (!fees) missingFields.push("fees");
    if (!address) missingFields.push("address");
    if (!image) missingFields.push("image");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    //validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // check if doctor already exists
    let user = await Doctor.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exists with this email",
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    const imageUrl = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });

    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      image: imageUrl.secure_url,
      speciality,
      degree,
      about,
      experience,
      fees,
      address: JSON.parse(address),
    });
    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add doctor",
      error: error.message,
    });
  }
};

//api for login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ success: true, token });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to login",
        error: error.message,
      });
  }
};


//get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select('-password')
    if(doctors.length <= 0) {
      res.status(200).json({ success: false, message:"No doctor found" });
    }
    res.json({success: true, doctors})
  } catch (error) {
    res.status(500).json({success: false, message: "something went wrong" ,error: error.message});
  }
}

//api to get all appointments
export const getAppointments = async (req, res) => {
  try {
    const data = await Appointment.find({})
    if(!data){
      return res.status(400).json({success: false, message: "No Appointment booked yet"})
    }
    res.status(200).json({success: true, data})
  } catch (error) {
    res.status(500).json({success: false, message: "something went wrong", error: error.message})
  }
}