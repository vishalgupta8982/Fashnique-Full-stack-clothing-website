const Coupan=require('../models/coupanModel')
const validateMongoDbId=require('../utils/validateMongoDbId')
const asyncHandler=require("express-async-handler")

const createCoupan=asyncHandler(async(req,res)=>{
    try{
        const newCoupan=await Coupan.create(req.body);
        res.json(newCoupan)
    }
    catch(err){
        throw new Error(err)
    }
})

const getAllCoupan = asyncHandler(async (req, res) => {
  try {
    const allCoupan = await Coupan.find();
    res.json(allCoupan);
  } catch (err) {
    throw new Error(err);
  }
});
const updateCoupan = asyncHandler(async (req, res) => {
    const {id}=req.params;
    validateMongoDbId(id)
  try {
    const updateCoupan = await Coupan.findByIdAndUpdate(id,req.body,{new:true});
    res.json(updateCoupan);
  } catch (err) {
    throw new Error(err);
  }
});
const deleteCoupan = asyncHandler(async (req, res) => {
    const {id}=req.params
    validateMongoDbId(id)
  try {
    const deleteCoupan = await Coupan.findByIdAndDelete(id);
    res.json(deleteCoupan);
  } catch (err) {
    throw new Error(err);
  }
});
const getCoupan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const coupanDetail = await Coupan.findById(id);
    res.json(coupanDetail);
  } catch (err) {
    throw new Error(err);
  }
});
module.exports={createCoupan,getAllCoupan,updateCoupan,deleteCoupan,getCoupan}