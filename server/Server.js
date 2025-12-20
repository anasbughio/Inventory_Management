import express from 'express';
import cors from 'cors';    
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/users',userRoutes);


app.listen(PORT,()=>{
    console.log(`Serer is running on port ${PORT}`);
})





