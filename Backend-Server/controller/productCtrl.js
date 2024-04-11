const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify=require("slugify")
const User = require("../models/userModel");
const validateMongoDbId=require('../utils/validateMongoDbId')
 const {cloudinaryUploadImg, cloudinaryDeleteImg}=require('../utils/cloudinary')
 const fs=require('fs')
const createProduct = asyncHandler(async (req, res) => {
  try {
    if(req.body.title){
        req.body.slug=slugify(req.body.title)
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new error(error);
  }
});

const updateProduct=asyncHandler(async(req,res)=>{
  const { slug } = req.params;
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title);
        }
      const updateProduct = await Product.findOneAndUpdate({ slug: slug },req.body,{new:true,})
            res.json(updateProduct)
    }
    catch(error){
        throw new Error(error)
    }
})

const deleteProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        const deleteProduct=await Product.findByIdAndDelete(id)
        res.json(deleteProduct)
    }
    catch(error){
        throw new Error(error);
    }
})

const getaProduct = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const findProduct = await Product.findOne({slug:slug}).populate("color");
    res.json(findProduct);
  } catch (err) {
    throw new Error(err);
  }
});

 
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields", "color"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Dynamically construct the query object
    Object.keys(queryObj).forEach(key => {
      if (key === 'totalRatings' && queryObj[key].gte) {
        const totalRatingsGTE = parseFloat(queryObj[key].gte);
        if (!isNaN(totalRatingsGTE)) {
          queryObj[key] = { $gte: totalRatingsGTE };
        }
      } else if (key === 'discount' && queryObj[key].gte) {
        const discountGTE = parseFloat(queryObj[key].gte);
        if (!isNaN(discountGTE)) {
          queryObj[key] = { $gte: discountGTE };
        }
      } 
      else if (key === 'price' && queryObj[key].gte) {
        const priceGTE = parseFloat(queryObj[key].gte);
        if (!isNaN(priceGTE)) {
          queryObj[key] = { $gte: priceGTE };
        }
      } 
      else if (key === 'price' && queryObj[key].lte) {
        const priceLTE = parseFloat(queryObj[key].lte);
        if (!isNaN(priceLTE)) {
          queryObj[key] = { $gte: priceLTE };
        }
      } 
    });

    let query = Product.find(queryObj);

    // Add color filtering
    if (req.query.color) {
      const decodedColors = decodeURIComponent(req.query.color).split(',').map(color => color.trim()); // Decode and split colors
      query = query.where('color').in(decodedColors); // Filter products by color
    }

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;  
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    const products = await query;
    const totalProducts = await Product.countDocuments(queryObj);
    const totalPages = Math.ceil(totalProducts / limit);
    product = products.filter((product) => {
      const effectivePrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;
      const gte = queryObj.price?.$gte || 0
      const lte = queryObj.price?.$lte || Infinity
      return effectivePrice >=  gte   && effectivePrice <= lte ;
    });
      res.json({
        data: {
          product,
          totalPages,
        }
      });
  } catch (error) {
    throw new Error(error);
  }
});


const addToWishList=asyncHandler(async(req,res)=>{
  
   const { _id } = req.user;
   const { prodId } = req.body;
   try {
     const user = await User.findById(_id);
     const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
     if (alreadyadded) {
       let user = await User.findByIdAndUpdate(
         _id,
         {
           $pull: { wishlist: prodId },
         },
         {
           new: true,
         }
       );
       res.json(user);
     } else {
       let user = await User.findByIdAndUpdate(
         _id,
         {
           $push: { wishlist: prodId },
         },
         {
           new: true,
         }
       );
       res.json(user);
     }
   } catch (error) {
     throw new Error(error);
   }
})

const rating=asyncHandler(async(req,res)=>{
  const {_id}=req.user;
  const {star,prodId,comment}=req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedBy.toString() === _id.toString()
    );
    if (alreadyRated) {
        const updateRating = await Product.updateOne(
          {
            ratings: { $elemMatch: alreadyRated },
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          },
          {
            new: true,
          }
        );
    }
    else{
      const rateProduct=await Product.findByIdAndUpdate(prodId,{
        $push:{
          ratings:{
            star:star,
            comment:comment,
            postedBy:_id
          }
        }
      },{new:true})
    }
    const getAllRating=await Product.findById(prodId);
    let totalRating =getAllRating.ratings.length;

    let ratingsum = getAllRating.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalRatings: actualRating,
      },
      { new: true }
    ) ;
    res.json(finalproduct);
  } catch (err) {
    throw new Error(err);
  }
})

const uploadImages=asyncHandler(async(req,res)=>{
  try{
const uploader = async (path) => {
  const newpath = await cloudinaryUploadImg(path, "images");
  return newpath;
};
const urls=[];
const files=req.files;
for(const file of files){
  const {path}=file;
  const newpath=await uploader(path);
  urls.push(newpath)
}
const images=urls.map((file)=>{
  return file
}
)
res.json(images)
  } 
  catch(err){
    throw new Error(err)
  }
})
const deleteImages=asyncHandler(async(req,res)=>{
  const {id}=req.params
  try{
  const deleted=cloudinaryDeleteImg(id,"images");
  res.json({message:"deleted"})
  } 
  catch(err){
    throw new Error(err)
  }
})


module.exports = { createProduct,getaProduct,getAllProduct,updateProduct,deleteProduct,addToWishList,rating,uploadImages,deleteImages };
