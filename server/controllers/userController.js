import User from '../models/users.js';
import bcrypt from 'bcryptjs';
const createUser = async(req,res)=>{
    
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

const deleteUser =  async(req,res)=>{
    try{

await User.findByIdAndDelete(req.params.id);
res.status(200).json({message:'User deleted successfully'});
    }catch(err){
        res.status(500).json({message:'Server error', error:err.message});
    }
}


 export {createUser,deleteUser};
