const validateMongoDbId=require('../utils/validateMongoDbId')
const asyncHandler=require("express-async-handler");
const BlogCategory=require('../models/blogCategoryModel')

const createBlogCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await BlogCategory.create(req.body);
    res.json(newCategory);
  } catch (err) {
    throw new Errror(err);
  }
});

const updateBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const currCategory = await BlogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(currCategory);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const dltCategory = await BlogCategory.findByIdAndDelete(id);
    res.json(dltCategory);
  } catch (err) {
    throw new Error(EvalError);
  }
});

const getAllBlogCategory = asyncHandler(async (req, res) => {
  try {
    const allCategory = await BlogCategory.find();
    res.json(allCategory);
  } catch (err) {
    throw new Error(err);
  }
});
const getBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const categoryDetail = await BlogCategory.findById(id);
    res.json(categoryDetail);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getAllBlogCategory,
  getBlogCategory,
};


 