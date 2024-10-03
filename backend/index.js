import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
// app configurations
dotenv.config()
const app = express()
const port = process.env.PORT
connectDB()
connectCloudinary()
const corsOption = {
    origin: true,
    Credentials: true
}

// middlewares for interracting to frontend
app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser())

// routes
app.get("/", (req, res) => {
    res.send("hello world")
})
app.listen(port, ()=> {
    console.log(`server is running on ${port}`)
} )

// admin routes
// localhost:5000/api/admin/
app.use("/api/admin", adminRouter);
