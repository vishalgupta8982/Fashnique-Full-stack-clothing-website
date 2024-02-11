const Blog=require('../models/blogModel');
const User=require('../models/userModel');
  var fs=require("fs")
const asyncHandler=require("express-async-handler");
const validateMongoDbId= require("../utils/validateMongoDbId");
const { trusted } = require('mongoose');
const { cloudinaryUploadImg } = require("../utils/cloudinary");
 

const createBlog = asyncHandler(async(req,res)=>{
try{
const newBlog = await Blog.create(req.body)
res.json({
    status:"success",
    newBlog,
})
}
catch(error){
    throw new Error(error)
}
})


const updateBlog=asyncHandler(async(req,res)=>{
   const {id}=req.params
    try{
        const updateBlog=await Blog.findByIdAndUpdate(id,req.body,{
            new:true,
        })
        res.json(updateBlog)
    }
    catch(err){
throw new Error(err)
    }
})

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("disLikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});


const getAllBlog=asyncHandler(async(req,res)=>{
    try{
        const getAllBlog=await Blog.find();
        res.json(getAllBlog)
        }
    catch(err){
        throw new Error(EvalError)
    }
})

const deleteBlog=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)
    try{
        const deleteBlog=await Blog.findByIdAndDelete(id);
        res.json(deleteBlog)
    }
    catch(err){
        throw new Error(err)
    }
})

  const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find if the user has disliked the blog
    const alreadyDisliked = blog?.disLikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );

    if (alreadyDisliked) {
        console.log("dislikes laready")
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { disLikes: loginUserId },
          isDisliked: false,
        },
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      const updatedBlogWithLike = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );

      res.json(updatedBlogWithLike);
    } else if (isLiked) {
        console.log("likes laready");
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(updatedBlog);
    } else {
        console.log("hlol");
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(updatedBlog);
    }
  });


 const dislikedBlog = asyncHandler(async (req, res) => {
   const { blogId } = req.body;
   validateMongoDbId(blogId);
   // Find the blog which you want to be liked
   const blog = await Blog.findById(blogId);
   // find the login user
   const loginUserId = req?.user?._id;
   // find if the user has liked the blog
   const isDisLiked = blog?.isDisliked;
   // find if the user has disliked the blog
   const alreadyLiked = blog?.likes?.find(
     (userId) => userId?.toString() === loginUserId?.toString()
   );
   if (alreadyLiked) {
     const blog = await Blog.findByIdAndUpdate(
       blogId,
       {
         $pull: { likes: loginUserId },
         isLiked: false,
       },
       { new: true }
     );
     const updatedBlogWithDisLike = await Blog.findByIdAndUpdate(
       blogId,
       {
         $push: { disLikes: loginUserId },
         isDisLiked : true,
       },
       { new: true }
     );

     res.json(updatedBlogWithDisLike);
   }
   if (isDisLiked) {
     const blog = await Blog.findByIdAndUpdate(
       blogId,
       {
         $pull: { disLikes: loginUserId },
         isDisliked: false,
       },
       { new: true }
     );
     res.json(blog);
   } else {
     const blog = await Blog.findByIdAndUpdate(
       blogId,
       {
         $push: { disLikes: loginUserId },
         isDisliked: true,
       },
       { new: true }
     );
     res.json(blog);
   }
 });

 const uploadImages = asyncHandler(async (req, res) => {
   const { id } = req.params;
   validateMongoDbId(id);
   try {
     const uploader = async (path) => {
       const newpath = await cloudinaryUploadImg(path, "images");
       return newpath;
     };
     const urls = [];
     const files = req.files;

     for (const file of files) {
       const { path } = file;
       const newpath = await uploader(path);
       urls.push(newpath.url);
     
     }

    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $push: {
          images: {
            $each: urls.map((url) => ({ url })),
          },
        },
      },
      {
        new: true,
      }
    );

     res.json(findBlog);
   } catch (err) {
     throw new Error(err);
   }
 });


module.exports={createBlog,updateBlog,getBlog,getAllBlog,deleteBlog,likeBlog,dislikedBlog,uploadImages}
