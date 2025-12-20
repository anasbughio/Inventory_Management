import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async()=>{

    try{
  await  mongoose.connect(process.env.MONGODB_URL);
console.log("MOngoDB connected Successfully");
    }catch(err){
        console.err("Error in connection to MongoDB",err);
        process.exit(1);

    }
}


export default connectDB;