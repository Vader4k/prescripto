import express from "express";
import { doctorList, loginDoctor, getAppointment } from "../controllers/doctorController.js";
import { authDoctor } from "../auth/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, getAppointment)

export default doctorRouter