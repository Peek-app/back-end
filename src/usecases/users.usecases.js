const User = require("../models/user.model");
const encryption = require("../lib/encription");
const createError = require("http-errors");
const jwt = require("../lib/jwt");
//const { sign } = require("jsonwebtoken");

async function create(data) {
  existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw createError(400, "User alredy exist");
  }
  if (!data.password) {
    throw createError(400, "Password require");
  }
  if (data.password.length < 6) {
    throw createError(400, "Password is too short.");
  }

  const password = encryption.encrypt(data.password); //Se debe encriptar
  data.password = password;
  const newUser = await User.create(data);
  return newUser;
}

async function getAll() {
  const users = await User.find({});
  return users;
}

async function getById(id) {
  const user = await User.findById(id);
  return user;
}

async function deleteById(id) {
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw createError(404, "user not found");
  }
  const userDelted = await User.findByIdAndDelete(id);
  return userDelted;
}

async function updateById(id, data) {
  const existingUser = await User.findById(id).select("+password");
  if (!existingUser) {
    throw createError(404, "user not found");
  }

  if (data.password) {
    if (!data.oldPassword) {
      throw createError(401, "New password is required");
    }
    const isValidatePassword = encryption.compare(
      data.oldPassword,
      existingUser.password
    );

    if (!isValidatePassword) {
      throw createError(401, "Invalid password");
    }

    const password = encryption.encrypt(data.password); //Se debe encriptar
    data.password = password;
  }

  const user = await User.findByIdAndUpdate(id, data, { new: true });
  return user;
}

async function login(data) {
  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user) {
    throw createError(401, "Invalid credentials");
  }

  const isValidatePassword = encryption.compare(data.password, user.password);

  if (!isValidatePassword) {
    throw createError(401, "Invalid credentials");
  }

  const token = jwt.sign({ id: user._id });

  return { token, userId: user._id };
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  login,
};
