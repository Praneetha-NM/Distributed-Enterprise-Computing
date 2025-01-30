import express from 'express'
const app = express()
import userRoutes from './Routes/user.js';
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
import "./db.js"

app.use(express.json())
app.use(cors())
app.use("/api/user", userRoutes)

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})