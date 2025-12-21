import jwt from 'jsonwebtoken';

const generateAccessToken  = async(user)=>{
   
    return  jwt.sign(
        {id:user._id,roles:user.role},
        process.env.JWT_SECRET,
        {expiresIn:'15m'}
    )
}

const generateRefreshToken = async(user)=>{

return jwt.sign(
    {id:user._id},
    process.env.JWT_REFRESH_SECRET,
    {expiresIn:'7d'}
)}


export {generateAccessToken,generateRefreshToken};