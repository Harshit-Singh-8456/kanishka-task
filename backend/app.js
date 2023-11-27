require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
// error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// Routers
const jobsRouter = require('./routes/jobs');

console.log('app starting');
app.use(express.json());

// routes
app.use("/api/v1/jobs", jobsRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;