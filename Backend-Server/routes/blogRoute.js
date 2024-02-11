const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, likeBlog, dislikedBlog, uploadImages } = require("../controller/blogCtrl");
const {
  uploadPhoto,
  blogImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();
router.post("/", authMiddleware, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 5),
  blogImgResize,
  uploadImages
);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikedBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id",getBlog);
router.get("/",getAllBlog);
router.delete("/:id",authMiddleware,isAdmin,deleteBlog);
 
module.exports = router;
