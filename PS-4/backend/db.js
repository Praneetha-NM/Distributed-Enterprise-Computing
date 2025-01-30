import mongoose from "mongoose";
const MONGO_URI = "mongodb+srv://postgres:12345>@cluster0.qnioi.mongodb.net/Spotify";

mongoose.connect(MONGO_URI).then(console.log("Connected to database"))