const express = require("express");

const reviewsUseCases = require("../usecases/reviews.usecases");

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const reviewsData = request.body;
    const newReview = await reviewsUseCases.create(reviewsData);

    response.json({
      success: true,
      message: "Review is created",
      data: { reviews: newReview },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (request, response) => {
  try {
    const reviews = await reviewsUseCases.getAll();

    response.json({
      success: true,
      message: "All reviews",
      data: { reviews },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const reviewDeleted = await reviewsUseCases.deleteReviewById(id);

    response.json({
      success: true,
      message: "Post deleted",
      data: { reviews: reviewDeleted },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const reviewsData = request.body;
    const reviewUpdated = await reviewsUseCases.updateById(id, reviewsData);

    response.json({
      success: true,
      message: "Post updated",
      data: { reviews: reviewUpdated },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
