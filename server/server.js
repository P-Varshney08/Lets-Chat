import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.get('/', (req, res) => {
    res.json({msg: 'Root Route'});
})

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})