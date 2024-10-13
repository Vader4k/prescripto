import express from "express";
import { addDoctor, loginAdmin, getAllDoctors, getAppointments, cancelAppointment, AdminDashboard } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import { authAdmin } from "../auth/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";
const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/all-doctors", authAdmin, getAllDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailability)
adminRouter.post("/login", loginAdmin);
adminRouter.get('/appointments', authAdmin, getAppointments)
adminRouter.post('/cancel-appointment', authAdmin, cancelAppointment)
adminRouter.get('/dashboard', authAdmin, AdminDashboard)

export default adminRouter;
