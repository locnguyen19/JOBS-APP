// const mongoose = require("mongoose");

// mongoose.connect('mongodb+srv://Mathias123:Mathias123@cluster0.mzyay.mongodb.net/JOB');

// const db = mongoose.connection;

// db.on("connected", () => {
//   console.log("Mongo Db Connection Successfull");
// });

// db.on("error", () => {
//   console.log("Mongo Db Connection Failed");
// });

import mongoose from 'mongoose'

const connectDB = (url) => {
  return mongoose.connect(url)
}
export default connectDB
