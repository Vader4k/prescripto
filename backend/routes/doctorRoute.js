import express from "express";
import {
  doctorList,
  loginDoctor,
  getAppointment,
  cancelAppointment,
  completeAppointment,
} from "../controllers/doctorController.js";
import { authDoctor } from "../auth/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, getAppointment);
doctorRouter.post("/complete-appointment", authDoctor, completeAppointment);
doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointment);

export default doctorRouter;
