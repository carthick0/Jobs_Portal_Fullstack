const express = require('express');
const mongoose = require('mongoose');
const { PORT} = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const jobRoutes =require('./routes/jobRoutes')
const app = express();

app.use('/api/jobs',jobRoutes)


app.listen(PORT, async() => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectDB();
  console.log("DB connected successfully")
  
});
