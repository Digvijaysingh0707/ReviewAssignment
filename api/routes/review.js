const express = require("express");
const reviewRouter = express.Router();
const reviewFunctions = require("../functions/reviewFunctions.js");

reviewRouter.post("/new", async (req, res) => {
  let result = await reviewFunctions.addReview(req);
  res.status(result?.code).send(result);
});

reviewRouter.get("/get", async (req, res) => {
  let result = await reviewFunctions.getReview(req);
  res.status(result?.code).send(result);
});

reviewRouter.put("/:id", async (req, res) => {
  let result = await reviewFunctions.updateReview(req);
  res.status(result?.code).send(result);
});

reviewRouter.delete("/:id", async (req, res) => {
  let result = await reviewFunctions.deleteReview(req);
  res.status(result?.code).send(result);
});

module.exports = reviewRouter;