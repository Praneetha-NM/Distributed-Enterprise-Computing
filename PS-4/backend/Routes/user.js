import { Router } from "express";
import User from "../Models/User.js";
import { generateToken } from "../helper/generateToken.js";
import jsonWeb from 'jsonwebtoken'

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      user = await User.findOne({ email: username });
    }
    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    } 
    else {
      if (user.password !== password) {
        return res.json({ success: false, message: "Invalid Credentials" });
      } else {
        let token = await generateToken(user._id)
        console.log(token)
        return res.json({ success: true, token, user, message: "Logged In Succesfully" });
      }
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  try {
    if (user) {
      let token = await generateToken(user._id)
      console.log(token)
      res.json({ success: true, message: "User Created", user, token });
      console.log("User created")
    } else {
      res.json({ success: false, message: "User Creation Error" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal error" });
  }
});

router.get('/me', async (req, res) => {
  try {
    const {token} = req.headers
    if(!token) {
      return res.status(401).json({ success: false, message:"Unauthorised" });
    }
    const data = jsonWeb.verify(token, process.env.JWT_SECRET)
    const user= await User.findById(data.id)

    if(user){
     return res.json({user, success: true, message:"User Found" });
    }
    else{
      return res.status(404).json({ success: false, message:"User Not Found" });
     }
  } catch (error) {
    res.json({ success: false, message:error.message });
    
  }
})

export default router;