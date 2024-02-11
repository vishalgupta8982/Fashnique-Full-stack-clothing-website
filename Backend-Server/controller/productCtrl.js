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
    const {id}  = req.params;
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title);
        }
            const updateProduct=await Product.findOneAndUpdate({_id:id},req.body,{new:true,})
            res.json(updateProduct)
    }
    catch(error){
        throw new Error(error)
    }
})

const deleteProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        const deleteProduct=await Product.findOneAndDelete(id)
        res.json(deleteProduct)
    }
    catch(error){
        throw new Error(error);
    }
})

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllProduct=asyncHandler(async(req,res)=>{
    try{
      //filtering
      const queryObj={...req.query};
      const excludeFields=["page","sort","limit","fields"]
      excludeFields.forEach((el)=>delete queryObj[el]);
      
      let queryStr=JSON.stringify(queryObj);
      queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`); 
      let query=Product.find(JSON.parse(queryStr))

      //sorting
if(req.query.sort){
  const sortBy=req.query.sort.split(',').join(' ')
query=query.sort(sortBy)
}else{
query=query.sort('-createdAt')
}
//limiting the field
  if(req.query.fields){
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  }
  else{
query=query.select('-__v')
  }

  //pagination

  const page=req.query.page;
  const limit=req.query.limit;
  const skip=(page-1)*limit;
  query=query.skip(skip).limit(limit)
  if(req.query.page){
    const productCount=await Product.countDocuments();
    if(skip>=productCount)
    throw new Error("This page is not exist")
  }
  console.log(page,limit,skip);

         const product=await query;
         res.json(product)
    }
    catch(error){
        throw new Error(error)
    }
})

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
    );
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
