const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { PORT} = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const jobRoutes =require('./routes/jobRoutes')
const authRoutes=require('./routes/authRoutes');
const applyRoutes=require('./routes/applyRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/jobs',jobRoutes)
app.use('/api/apply',applyRoutes);
app.use('/api',authRoutes)

app.listen(PORT, async() => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectDB();
  console.log("DB connected successfully")
  
});
