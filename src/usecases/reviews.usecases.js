const createError = require("http-errors");

const Reviews = require("../models/reviews.model");

async function create(data) {
  if (!data) {
    throw createError(400, "All fields are mandatory");
  }
  const review = await Reviews.create(data);
  return review;
}

async function getAll() {
  const reviews = await Reviews.find({});
  return reviews;
}

async function updateById(id, newData) {
  const existingReview = await Reviews.findById(id);
  if (!existingReview) {
    throw createError(404, "Review not found");
  }
  const updateReview = await Reviews.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return updateReview;
}

async function deleteReviewById(id) {
  const existingReview = await Reviews.findById(id);
  if (!existingReview) {
    throw createError(404, "Review not found");
  }
  const deleteReview = await Reviews.findByIdAndDelete(id);
  return deleteReview;
}

module.exports = { create, getAll, updateById, deleteReviewById };
