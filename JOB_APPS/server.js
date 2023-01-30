import cors from 'cors'
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import connectDB from './db/connect.js'
import mongoose from 'mongoose'
import 'express-async-errors';
mongoose.set('strictQuery', true);



// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';



//Routes
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js'
app.use(express.json())
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/job', authenticateUser, jobsRouter);
app.use(cors())
// app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.get('/', (req, res) => {
  res.send("Wellcome to our backend server");
});
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
