const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const connectDB = require('./db');
const errorHandler = require('./utils/errorHandler');
const helmet = require('helmet');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 
app.use(helmet()); 

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/syllabus", require("./routes/syllabus.routes"));
app.use("/api/ai", require("./utils/ai.limiter"), require("./routes/ai.routes"));
app.use("/api/studyplans", require("./routes/studyplan.routes"));

app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch((err) => console.log("DB Error:", err));

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received: closing server and database connection');
  await mongoose.connection.close();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing server and database connection');
  await mongoose.connection.close();
  process.exit(0);
});