import Doctor from "../models/doctorModel.js";

export const changeAvailability = async (req, res) => {
  try {
    const { _id } = req.body;

    const doctor = await Doctor.findOne({ _id });
    if (!doctor)
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    doctor.availability = !doctor.availability;
    await doctor.save();
    res.json({ success: true, message: "Availability changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "something went wrong",
        error: error.message,
      });
  }
};
