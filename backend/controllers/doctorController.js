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
        .json({ success: false, message: "Not Authorized" });
    }
    if (!appointmentData) {
      return res
        .status(400)
        .json({ success: false, message: "No Appointment Found" });
    }

    res.status(200).json({
      success: true,
      message: "Appointment Fetched Successfully",
      data: appointmentData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const completeAppointment = async (req, res) => {
  try {
    const { docId } = req.user;
    const { appId } = req.body;

    if (!docId) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorized" });
    }

    const appointment = await Appointment.findById(appId);
    // Check if appointment exists
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointment.docId !== docId) {
      return res.status(403).json({ success: false, message: "Not Allowed" });
    }

    appointment.isCompleted = true;
    await appointment.save();
    res.status(200).json({ success: true, message: "Appointment completed" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { docId } = req.user;
    const { appId } = req.body;

    if (!docId) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorized" });
    }

    const appointment = await Appointment.findById(appId);
    // Check if appointment exists
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointment.docId !== docId) {
      return res.status(403).json({ success: false, message: "Not Allowed" });
    }

    appointment.cancelled = true;
    await appointment.save();
    res.status(200).json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//api to get dashboard data
export const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.user;
    const appointments = await Appointment.find({ docId });

    if (!docId) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorized" });
    }

    if (!appointments) {
      return res
        .status(400)
        .json({ success: false, message: "No Appointment Found" });
    }

    let earnings = 0;

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.forEach((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.status(200).json({ success: true, dashData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//api to get doctor profile for doctor panel
export const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.user;
    const doctor = await Doctor.findById(docId).select("-password");
    if (!doctor) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const { docId } = req.user;
    const { fees, address, availability } = req.body;

    const doctor = await Doctor.findById(docId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Check if at least one field is provided
    if (!fees && !address && availability === undefined) {
      return res.status(400).json({ success: false, message: "At least one field is required" });
    }

    // Update only the fields that are provided
    if (fees !== undefined) doctor.fees = fees;
    if (address !== undefined) doctor.address = address;
    if (availability !== undefined) doctor.availability = availability;

    await doctor.save();
    res.status(200).json({ success: true, message: "Profile updated successfully" });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
