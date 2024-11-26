const createError = require("http-errors");

const Pets = require("../models/pets.model");
const User = require("../models/user.model");

async function create(data) {
  if (!data) {
    throw createError(400, "All fields are mandatory");
  }
  const pet = await Pets.create(data);
  return pet;
}

async function getAll() {
  const pets = await Pets.find({}).populate("owner").populate("vet");
  return pets;
}

async function deleteById(id, userId) {
  const existingPet = await Pets.findById(id);
  const user = await User.findById(userId.user);

  if (!existingPet) {
    throw createError(404, "Pet not found");
  }

  if (!user) {
    throw createError(404, "User not found");
  }

  if (user._id.toString() !== existingPet.user.toString()) {
    throw createError(403, "You can't delete this pet");
  }

  const petDeleted = await Pets.findByIdAndDelete(id);
  return petDeleted;
}

async function updateById(id, newData) {
  const existingPet = await Pets.findById(id);
  if (!existingPet) {
    throw createError(404, "Pet not found");
  }

  const petUpdated = await Post.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return petUpdated;
}

module.exports = { create, getAll, deleteById, updateById };
