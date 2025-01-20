const createError = require("http-errors");

const Pets = require("../models/pets.model");
const User = require("../models/user.model");

async function create(data) {
  if (
    !data.name ||
    !data.birthday ||
    !data.typeAnimal ||
    !data.breed ||
    !data.picture ||
    !data.petOwner
  ) {
    throw createError(400, "All fields are mandatory");
  }
  const pet = await Pets.create(data);
  return pet;
}

async function getAll() {
  const pets = await Pets.find({}).populate("petOwner").populate("vet");
  return pets;
}

async function deleteById(id) {
  const existingPet = await Pets.findById(id);

  if (!existingPet) {
    throw createError(404, "Pet not found");
  }

  const petDeleted = await Pets.findByIdAndDelete(id);
  return petDeleted;
}

async function updateById(id, newData) {
  const existingPet = await Pets.findById(id);
  if (!existingPet) {
    throw createError(404, "Pet not found");
  }

  const petUpdated = await Pets.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return petUpdated;
}

async function getById(id) {
  const pet = await Pets.findById(id).populate("petOwner").populate("vet");
  if (!pet) {
    throw createError(404, "Pet not found");
  }
  return pet;
}

async function getVaccinesByPetId(petId) {
  const pet = await Pets.findById(petId).populate("vaccines");
  if (!pet) {
    throw createError(404, "Pet not found");
  }
  return pet.vaccines;
}

async function getByOwnerId(ownerId) {
  const pets = await Pets.find({ petOwner: ownerId })
    .populate("petOwner")
    .populate("vet");
  return pets;
}

async function getByVetId(vetId) {
  const pets = await Pets.find({ vet: vetId })
    .populate("petOwner")
    .populate("vet");
  return pets;
}

module.exports = {
  create,
  getAll,
  deleteById,
  updateById,
  getById,
  getByOwnerId,
  getByVetId,
  getVaccinesByPetId,
};
