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

    // Create an object to hold the fields to update
    const updateData = {};

    // Populate updateData based on provided fields
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (dob) updateData.dob = dob;
    if (gender) updateData.gender = gender;

    // Handle image upload if provided
    if (image) {
      const uploadResult = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });

      if (uploadResult.secure_url) {
        updateData.image = uploadResult.secure_url; // Only add image if upload is successful
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image to Cloudinary",
        });
      }
    }

    // Check if at least one field is provided
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for update.",
      });
    }

    // Update user with the fields provided
    await User.findByIdAndUpdate(id, updateData, { new: true }); // `new: true` returns the updated document

    return res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
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
    const { docId, slotDate, slotTime } = req.body;
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

    if (existingAppointment && existingAppointment.cancelled == false) {
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

    if (doctor.availability == false) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor is not available" });
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

    //update the doctors slots_booked
    const updatedSlots = [...doctor.slots_booked, { slotDate, slotTime }];

    await Doctor.findByIdAndUpdate(
      docId,
      { slots_booked: updatedSlots },
      { new: true }
    );

    //update the user's appointment array
    const updatedAppointment = [...user.appointments, newAppointment._id];

    //save the updated user data with the new appointment
    await User.findByIdAndUpdate(
      id,
      { appointments: updatedAppointment },
      { new: true }
    );

    // Return success response
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    // Added error parameter
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

//api to get list of appointments
export const listOfAppointments = async (req, res) => {
  try {
    const { id } = req.user; // Assuming this gets the logged-in user's ID
    const appointmentArr = await Appointment.find({ userId: id });

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    if (appointmentArr.length <= 0) {
      return res.status(400).json({
        success: false,
        message: "You have not booked any appointment",
      });
    }

    // Respond with the fetched appointment
    return res.status(200).json({ success: true, data: appointmentArr });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//api to cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.user;
    const { appId } = req.body;

    const appointmentData = await Appointment.findById(appId);

    if (!appointmentData) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment not found" });
    }

    //verify owner of appointment
    if (appointmentData.userId !== id) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized action" });
    }

    appointmentData.cancelled = true;
    await appointmentData.save();

    res.status(200).json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

//api to make payment without a gateway for now
export const makePayment = async (req, res) => {
  try {
    const { id } = req.user;
    const { appId } = req.body;

    const appointment = await Appointment.findById(appId);
    if (!appointment) {
      return res
        .status(400)
        .json({ success: false, message: "Appoint not found" });
    }

    if (appointment.userId !== id) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized action" });
    }

    appointment.payment = true;
    await appointment.save();
    res.status(200).json({ success: true, message: "Payment successful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};
