import express from 'express'
import { register, login, getProfile, updateProfile } from '../controllers/userController.js'
import { authUser } from '../auth/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single("image"), authUser, updateProfile)

export default userRouter