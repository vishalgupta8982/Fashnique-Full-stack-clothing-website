const validateMongoDbId = require("../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");
const Color = require("../models/colorModel");

const createColor = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Color.create(req.body);
    res.json(newCategory);
  } catch (err) {
    throw new Errror(err);
  }
});

const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const currCategory = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(currCategory);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const dltCategory = await Color.findOneAndDelete(id);
    res.json(dltCategory);
  } catch (err) {
    throw new Error(EvalError);
  }
});

const getAllColor = asyncHandler(async (req, res) => {
  try {
    const allCategory = await Color.find();
    res.json(allCategory);
  } catch (err) {
    throw new Error(err);
  }
});
const getColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const categoryDetail = await Color.findById(id);
    res.json(categoryDetail);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getAllColor,
  getColor,
};
