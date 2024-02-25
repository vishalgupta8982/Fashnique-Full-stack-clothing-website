const express=require("express");
const { createCoupan, getAllCoupan, updateCoupan, deleteCoupan, getCoupan } = require("../controller/coupanCtrl");
const router=express.Router();
const { authMiddleware, isAdmin }=require('../middlewares/authMiddleware')
router.post('/',authMiddleware,isAdmin,createCoupan)
router.get('/',authMiddleware,isAdmin,getAllCoupan)
router.get('/:id',authMiddleware,isAdmin,getCoupan)
router.put('/:id',authMiddleware,isAdmin,updateCoupan)
router.delete('/:id',authMiddleware,isAdmin,deleteCoupan)
module.exports=router