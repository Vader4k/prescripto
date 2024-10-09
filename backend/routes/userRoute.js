import express from 'express'
import { register, login, getProfile } from '../controllers/userController.js'
import { authUser } from '../auth/authUser.js'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/profile', authUser, getProfile)

export default userRouter