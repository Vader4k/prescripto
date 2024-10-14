import Doctor from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import Appointment from "../models/appointmentModel.js";

dotenv.config();

export const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const doctor = await Doctor.findById(docId);
    if (!doctor)
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    doctor.availability = !doctor.availability;
    await doctor.save();
    res.json({ success: true, message: "Availability changed successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const doctorList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select(["-password", "-email"]);
    if (doctors.length <= 0) {
      return res
        .status(200)
        .json({ success: false, message: "No doctor found" });
    }
    res.status(201).json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

//api for doctor login
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor not found." });
    }

    const checkedPassword = await bcryptjs.compare(password, doctor.password);
    if (!checkedPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password." });
    }

    const docId = doctor._id;

    const token = jwt.sign(
      { role: "doctor", docId, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

//api to fetch doctors appointment
export const getAppointment = async (req, res) => {
  try {
    const { docId } = req.user;
    const appointmentData = await Appointment.find({ docId });

    if (!docId) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor not found" });
    }
    if (!appointmentData) {
      return res
        .status(400)
        .json({ success: false, message: "No appointment found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Appointment fetched successfully",
        data:appointmentData,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};
