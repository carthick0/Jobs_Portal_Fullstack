const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const { PORT } = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');

const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const applyRoutes = require('./routes/applyRoutes');

const app = express();


const isProd = process.env.VERCEL_ENV === "production";
const frontendOrigin = "https://jobs-portal-fullstack-1sfz.vercel.app";

app.use(cors({
  origin: frontendOrigin, 
  credentials: true,
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/jobs', jobRoutes);
app.use('/api/apply', applyRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Mode: ${isProd ? "Production" : "Development"}`);
  try {
    await connectDB();
    console.log('✅ DB connected successfully');
  } catch (err) {
    console.error('❌ DB connection failed', err);
  }
});
