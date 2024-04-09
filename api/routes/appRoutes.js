import express from "express";
import reviewRouter from "./review.js"


const appRoute = express.Router();



appRoute.initialize = (app) => {
  app.use("/review", reviewRouter);
};

export default appRoute;