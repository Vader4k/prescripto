import Doctor from "../models/doctorModel.js";
import bcryptjs from "bcryptjs";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";

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
      return res
        .status(400)
        .json({ message: `Missing fields: ${missingFields.join(", ")}` });
    }

    //validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // check if doctor already exists
    let user = await Doctor.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Doctor already exists with this email" });
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
    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add doctor", error: error.message });
  }
};
