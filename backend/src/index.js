const express = require('express');
const cookieParser = require('cookie-parser');



const { PORT } = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');

const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const applyRoutes = require('./routes/applyRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const cors = require("cors");
app.use(cors({
  origin: "https://jobs-portal-fullstack-dw4g.vercel.app",
  credentials: true
}));

app.use('/api/jobs', jobRoutes);
app.use('/api/apply', applyRoutes);
app.use('/api/auth', authRoutes);


app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  try {
    await connectDB();
    console.log('✅ DB connected successfully');
  } catch (err) {
    console.error('❌ DB connection failed', err);
  }
});
