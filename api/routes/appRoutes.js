const express = require("express");
const reviewRouter =require("./review.js");

const appRoute = express.Router();

appRoute.initialize = (app) => {
  app.use("/review", reviewRouter);
};

module.exports = appRoute;