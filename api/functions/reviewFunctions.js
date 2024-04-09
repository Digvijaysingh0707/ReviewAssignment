let reviewFunctions = new Object();
const Review =require("../controllers/reviewController.js");
const appHelper =require("../helper/appHelper.js");

reviewFunctions.addReview = async (req) => {
  try {
    let review = await Review.addReview(req);
    if (!review.status) {
      return appHelper.apiResponse(404, false, review?.message);
    }
    return appHelper.apiResponse(200, true, review?.message, review.data);
  } catch (error) {
    return appHelper.apiResponse(
      500,
      false,
      error.message ? error.message : error
    );
  }
};

reviewFunctions.getReview = async (req) => {
  try {
    let review = await Review.getReview(req);
    if (!review.status) {
      return appHelper.apiResponse(404, false, review?.message);
    }
    return appHelper.apiResponse(200, true, review?.message, review?.data);
  } catch (error) {
    return appHelper.apiResponse(
      500,
      false,
      error.message ? error.message : error
    );
  }
};

reviewFunctions.deleteReview = async (req) => {
  try {
    let review = await Review.deleteReview(req);
    if (!review.status) {
      return appHelper.apiResponse(404, false, review?.message);
    }
    return appHelper.apiResponse(200, true, review?.message);
  } catch (error) {
    return appHelper.apiResponse(
      500,
      false,
      error.message ? error.message : error
    );
  }
};

reviewFunctions.updateReview = async (req) => {
  try {
    let review = await Review.updateReview(req);
    if (!review.status) {
      return appHelper.apiResponse(404, false, review?.message);
    }
    return appHelper.apiResponse(200, true, review?.message);
  } catch (error) {
    return appHelper.apiResponse(
      500,
      false,
      error.message ? error.message : error
    );
  }
};

module.exports = reviewFunctions