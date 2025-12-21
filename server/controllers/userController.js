import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utilis/generateToken.js';
const Register = async(req,res)=>{
    
    try {
        const {username,email,password,roles} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
       const newUser = new User({
        username,
        email,
        password:hashedPassword,
        roles

       });
       await newUser.save();
       res.status(201).json({message:'User created successfully', user:newUser});
        
    } catch (error) {
        res.status(500).json({message:'Server error', error:error.message});
    }
 }



const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({message:'Invalid credentials'});
        }
const accessToken  = await generateAccessToken(user);
const refreshToken = await generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();

 
res.cookie('refreshToken',refreshToken,{
    httpOnly:true,
    secure:false,
    sameSite:'lax',
    maxAge:30*24*60*60*1000,
})
            return res.status(200).json({ 
            message: 'Login successful', 
            accessToken, // Frontend stores this in memory (not localStorage)
            user: { id: user._id, email: user.email } 
        });
    }catch(err){
        res.status(500).json({message:'Server error', error:err.message});
    }
}


const deleteUser =  async(req,res)=>{
    try{

  const user =  await User.findByIdAndDelete(req.params.id);
  if(!user){
    return res.status(404).json({message:'User not found'});
  }
res.status(200).json({message:'User deleted successfully'});
    }catch(err){
        res.status(500).json({message:'Server error', error:err.message});
    }
}


const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  const user = await User.findOne({ refreshToken });

  if (!user) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token expired" });
      }

      const newAccessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken: newAccessToken });
    }
  );
};

const logoutUser = async (req, res) => {
  req.user.refreshToken = null;
  await req.user.save();

  res.json({ message: "Logged out successfully" });
};

 export {Register,deleteUser,login,refreshToken,logoutUser};
