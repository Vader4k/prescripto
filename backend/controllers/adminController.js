import Doctor from "../models/doctorModel.js";

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

    const image = req.file.path;

    const doctor = await Doctor.create({
      name,
      email,
      password,
      speciality,
      degree,
      about,
      experience,
      fees,
      address,
      image
    });
    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add doctor", error: error.message });
  }
};
