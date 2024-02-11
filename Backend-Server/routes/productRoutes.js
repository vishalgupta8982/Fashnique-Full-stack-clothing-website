const express = require("express");

const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishList, rating, uploadImages, deleteImages } = require("../controller/productCtrl");
const {isAdmin,authMiddleware}=require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
const router = express.Router();
 
router.get("/:id",getaProduct)
router.put('/upload',authMiddleware,isAdmin,uploadPhoto.array('images',5),productImgResize,uploadImages)
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.post("/", authMiddleware, isAdmin ,createProduct);
 
router.get("/",getAllProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/deleteImages/:id", authMiddleware, isAdmin,deleteImages);
 
module.exports = router;
