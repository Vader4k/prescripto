import Doctor from "../models/doctorModel.js";

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
