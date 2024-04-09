import Review from "../model/reviewModel.js";

const reviewdal = new Object();

const isEmptyValue = (keyValue) => {
  if (
    keyValue === null ||
    keyValue === "null" ||
    keyValue === undefined ||
    keyValue === "undefined" ||
    keyValue === ""
  ) {
    return true;
  } else {
    return false;
  }
};

reviewdal.addReview = async (req) => {
  try {
    const { title, content } = req?.body;
    if (!title || !content) {
      return {
        status: false,
        message: "All fields required",
      };
    }
    let review = new Review({
      title,
      content,
    });

    let savedReview = await review.save();
    return {
      status: true,
      data: savedReview,
      message: "review added successfully",
    };
  } catch (error) {
    return { status: false, message: error.message ? error.message : error };
  }
};

reviewdal.getReview = async (params) => {
  let query = { isDeleted: false };
  let { pageNo, count, sortKey, sortOrder, search } = params;
  let sort = { createdAt: -1 };

  if (search) {
    query = {
      ...query,
      $or: [{ title: { $regex: search, $options: "i" } }],
    };
  }

  if (sortKey && sortOrder) {
    sort = { [sortKey]: sortOrder };
  }

  if (isEmptyValue(pageNo)) {
    pageNo = 0;
  }

  if (isEmptyValue(count)) {
    count = 0;
  }

  try {
    const allReviews = await Review.find(query)
      .sort(sort)
      .skip(pageNo * count)
      .limit(count)
      .lean();
    if (allReviews.length === 0) return { status: true, message: "no reviews" };
    else
      return { status: true, data: allReviews, message: "all reviews fetched" };
  } catch (error) {
    return { status: false, message: error.message ? error.message : error };
  }
};




reviewdal.updateReview = async (req) => {
  try {
      const { title, content } = req?.body;
      const reviewId = req.params["id"];
    if (!title || !content) {
      return {
        status: false,
        message: "All fields required",
      };
    }

    let query = {};
    let update = {};
      let options = { new: true };
      
      query._id = reviewId;
      
      if (title) {
        update.title = title;
      }

      if (content) {
        update.content = content;
      }

    const updatedReview = await Review.findOneAndUpdate(
      query,
      update,
      options
    );
    if (!updatedReview) {
      return {
        status: false,
        message: "Review not found",
      };
    }
    return {
      status: true,
      data: updatedReview,
      message: "updated successfully",
    };
  } catch (error) {
    return {
      status: false,
      message: error.message ? error.message : error,
    };
  }
};

reviewdal.deleteReview = async (req) => {
  try {
    let review_Id = req.params["id"];
    let parameter = req.query.parameter;
    if (parameter === "undo") {
      let review = await Review.findById(review_Id);
      review.isDeleted = false;
      let deletedReview = await review.save();
      return {
        status: true,
        data: deletedReview,
        message: "undo completed",
      };
    }
    const reviewExists = await Review.findById(review_Id);
    if (!reviewExists) {
      return { status: false, message: "review does not exist" };
    }
    reviewExists.isDeleted = true;
    let deletedReview = await reviewExists.save();
    return {
      status: true,
      data: deletedReview,
      message: "deleted successfully",
    };
  } catch (error) {
    return { status: false, message: error.message ? error.message : error };
  }
};

export default reviewdal;