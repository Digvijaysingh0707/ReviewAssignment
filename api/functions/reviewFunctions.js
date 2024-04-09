let reviewFunctions = new Object();
import reviewdal from "../controllers/reviewController.js";
import appHelper from "../helper/appHelper.js";

reviewFunctions.addReview = async (req) => {
  try {
    let review = await reviewdal.addReview(req);
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

reviewFunctions.getReview = async (params) => {
  try {
    let review = await reviewdal.getReview(params);
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
    let review = await reviewdal.deleteReview(req);
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
    
    let review = await reviewdal.updateReview(req);
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

export default reviewFunctions;