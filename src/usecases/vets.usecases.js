const Vet = require("../models/vet.model");
const Owner = require("../models/owner.model");
const encription = require("../lib/encription");
const createError = require("http-errors");
//const jwt = require("../lib/jwt");
//const { sign } = require("jsonwebtoken");

async function create(data) {
  existingOwner = await Owner.findOne({ user: data.user });
  existingVet = await Vet.findOne({ user: data.user });
  if (existingOwner || existingVet) {
    throw createError(400, "User alredy have a role");
  }
  const newVet = await Vet.create(data);
  return newVet;
}

async function getAll() {
  const vets = await Vet.find({}).populate("user", "name lastName");
  return vets;
}

async function getById(id) {
  const vet = await Vet.findById(id);
  return vet;
}

module.exports = {
  create,
  getAll,
  getById,
};
