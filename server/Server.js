import express from 'express';
import cors from 'cors';    
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import helmet from  'helmet';
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp  from "hpp";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    })
);
app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: { ...req.query },
    writable: true,
    configurable: true,
    enumerable: true,
  });
  next();
});
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());
connectDB();

app.use('/api/users',userRoutes);


app.listen(PORT,()=>{
    console.log(`Serer is running on port ${PORT}`);
})





