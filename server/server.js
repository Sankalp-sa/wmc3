import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

//route imports
import userRoutes from './routes/userRoutes.js';

// config dotenv
dotenv.config();

// connet to database
connectDB();

const app = express();

// cors
app.use(cors());
app.use(express.json());
    
// routes

app.use('/api/v1/users',userRoutes);

// server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


