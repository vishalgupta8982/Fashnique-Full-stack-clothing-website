const express=require("express");
const { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updateaUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdminCtrl, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupan, createOrder, getOrder, updateOrderStatus, getAllOrder, getOrderByUserId } = require("../controller/userCtrl");
const {authMiddleware,isAdmin} = require("../middlewares/authMiddleware");
const router=express.Router();
router.post('/register',createUser);
router.post('/forgot-password-token',forgotPasswordToken)
router.put("/reset-password/:token", resetPassword);
router.put('/password',authMiddleware,updatePassword)
router.post('/login',loginUserCtrl) 
router.post('/admin-login',loginAdminCtrl)
router.post('/cart',authMiddleware,userCart)
router.post('/cart/applyCoupan',authMiddleware,applyCoupan)
router.post('/cart/cash-order',authMiddleware,createOrder)
router.get('/get-order',authMiddleware,getOrder)
router.get('/get-all-order',getAllOrder)
router.get('/getorderbyuser/:id',authMiddleware,isAdmin,getOrderByUserId)
router.put('/order/update-order/:id',authMiddleware,isAdmin,updateOrderStatus)
router.post('/save-address',authMiddleware,saveAddress)
router.get('/all-users',getallUser)
router.get('/cart',authMiddleware,getUserCart)
router.delete('/empty-cart',authMiddleware,emptyCart)
router.get("/wishlist",authMiddleware,getWishlist)
router.get("/:id",authMiddleware,isAdmin,getaUser)
router.delete("/:id",deleteaUser)
router.put("/edit-user",authMiddleware,updateaUser)
router.put("/block-user/:id",authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware,isAdmin, unblockUser);
 
module.exports=router;
