const Owner = require("../models/owner.model");
const Vet = require("../models/vet.model");
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
  const newOwner = await Owner.create(data);
  return newOwner;
}

async function getAll() {
  const owners = await Owner.find({});
  return owners;
}

async function getById(id) {
  const owner = await Owner.findById(id);
  return owner;
}

module.exports = {
  create,
  getAll,
  getById,
};
