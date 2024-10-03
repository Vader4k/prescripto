import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT
const corsOption = {
    origin: true,
    Credentials: true
}

app.use(express.json())
app.use(cors(corsOption))

app.get("/", (req, res) => {
    res.send("hello world")
})

app.listen(port, ()=> {
    console.log(`server is running on ${port}`)
} )