import express from 'express'
import { register, login, getProfile, updateProfile, bookAppointment, listOfAppointments, cancelAppointment } from '../controllers/userController.js'
import { authUser } from '../auth/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/profile', authUser, getProfile)
userRouter.post('/update-profile', authUser, upload.single("image"), updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, listOfAppointments)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)

export default userRouter