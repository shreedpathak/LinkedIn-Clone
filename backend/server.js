import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import MongoDB from './lib/db.js';
import cookieParser from 'cookie-parser';

dotenv.config({ path: '../.env' });

const app = express();  
const PORT = process.env.PORT || 3000;
MongoDB();
app.use(express.json()); // Body parser
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});