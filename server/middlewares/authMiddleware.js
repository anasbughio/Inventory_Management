import jwt from 'jsonwebtoken';
import User from '../models/users.js';          
import dotenv from 'dotenv';
dotenv.config();
const auth = async(req,res,next)=>{
    const token  = req.cookies.jwt;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
            try{
                // token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select('-password');
                next();
            }catch(err){
                res.status(401).json({message:'Not authorized, token failed'});
            }


    }

    if(!token){
        res.status(401).json({message:'Not authorized, no token'});
    }

};

export default auth;
