const { generateToken } = require('../config/jwtToken');
const crypto = require("crypto")
const User = require('../models/userModel')
const Product=require('../models/productModel')
const Cart=require('../models/cartModel')
const Coupan=require('../models/coupanModel')
const Order=require('../models/orderModel')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv").config({ path: "./.env" });
const asyncHandler = require("express-async-handler");
const uniqid=require("uniqid")
const validateMongoDbId = require('../utils/validateMongoDbId');
const sendEmail = require('./emailCtrl');
validateMongoDbId
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    //user exist
    throw new Error("User already exist")
  }
});
//user login
const loginUserCtrl = asyncHandler(async (req, res) => {

  const { email, password } = req.body;
  const findUser = await User.findOne({ email })
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        new: true,
      }
    );
    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  }
  else {
    throw new Error("Inavalid credential")
  }
})

//admin login
const loginAdminCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== 'admin') {
    throw new Error("not authorized")
  }
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const updateUser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        new: true,
      }
    );
     
    res.json({
      _id: findAdmin?._id,
      firstName: findAdmin?.firstName,
      lastName: findAdmin?.lastName,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});

 


 

//get all user
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers)
  }
  catch (err) {
    throw new Error(err)
  }
})

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id)
  try {
    const getUser = await User.findById(id)
    res.json(getUser)
  }
  catch (err) {
    throw new Error(err)
  }
})

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id)
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({ deleteUser, })
  }
  catch (err) {
    throw new Error(err)
  }
})

const updateaUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id)
  try {
    const updateUser = await User.findByIdAndUpdate(_id, {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      mobile: req?.body?.mobile
    },
      { new: true });
    res.json(updateUser)
  }
  catch (err) {
    throw new Error(err)
  }
})

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id)
  validateMongoDbId(id)
  try {
    const block = User.findByIdAndUpdate(id, {
      isBlocked: true
    },
      {
        new: true,
      })
    res.json({
      message: "User Blocked"
    })
  }
  catch (err) {
    throw new err;
  }
})
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id)
  try {
    const unBlock = User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: false,
      }
    );
    res.json({
      message: "User Unblocked"
    })
  } catch (err) {
    throw new err();
  }
})

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);

  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json({ "message": "you password changes succeessfully" });
  }
  else {
    res.json(user)
  }
})


const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user not found with this email")
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, please follow this link to reset your password. This link is valid for 10 minute from now. <a href='http://localhost:${process.env.PORT}/api/user/reset-password/${token}' >click here</>`

    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Passowrd Link",
      htm: resetURL
    }
    sendEmail(data)
    res.json(token);
  }
  catch (error) {
    throw new Error(error)
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash('sha256').update(token).digest("hex")
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })
  if (!user) {
    throw new Error("Token Expired, Please try again later");
  }
  user.password = password;
  user.passwordToken = undefined,
    user.passwordResetExpires = undefined;
  await user.save();
  res.json(user)
})


const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate('wishlist');
    res.json(findUser)
  } catch (err) {
    throw new Error(err)
  }
})

//save user address
const saveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id)
  try {
    const updateUser = await User.findByIdAndUpdate(_id, {
      address: req?.body?.address,
    },
      { new: true });
    res.json(updateUser)
  } catch (err) {
    throw new Error(err)
  }
})
// add to cart
const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
   const {_id}=req.user
   
  try {
    let products=[]
    const user = await User.findById(_id);
    const alreadyExistCart = await Cart.findOne({orderBy:user._id})
    if(alreadyExistCart){
      await Cart.deleteOne({ _id: alreadyExistCart._id });
    }
    for(let i=0;i<cart.length;i++){
      let object={};
  object.product=cart[i]._id;
object.count=cart[i].count;
object.color=cart[i].color;   
let getPrice=await Product.findById(cart[i]._id).select("price").exec();
object.price=getPrice.price;
products.push(object);
}
 let cartTotal=0;
 console.log(products)
 for(let i=0;i<products.length;i++){
  cartTotal=cartTotal+products[i].price*products[i].count;
 }
 let newCart=await new Cart({
  products,
  cartTotal,
  orderBy:user?._id
 }).save();
 res.json(newCart)
  } catch (err) {
    throw new Error(err);
  }
})

const getUserCart=asyncHandler(async(req,res)=>{
  const {_id}=req.user;
  validateMongoDbId(_id);
  try{
    const cart=await Cart.findOne({orderBy:_id}).populate("products.product" );
    res.json(cart)
  }catch(err){
    throw new Error(err)
  }
})

const emptyCart=asyncHandler(async(req,res)=>{
   const { _id } = req.user;
   validateMongoDbId(_id);
   try {
     const user = await  User.findOne({_id})
     const cart=await Cart.findOneAndRemove({orderBy:user._id})
     res.json(cart);
   } catch (err) {
     throw new Error(err);
   }
})

const applyCoupan=asyncHandler(async(req,res)=>{
  const {coupan}=req.body;
  const {_id}=req.user
   try{
  const validCoupan=await Coupan.findOne({name:coupan});
   if(validCoupan==null){
    throw new Error("inavlid coupan")
   }
   const user=await User.findOne({_id});
   let {products,cartTotal}=await Cart.findOne({orderBy:user._id}).populate("products.product")
   let totalAfterDiscount=(cartTotal-(cartTotal*validCoupan.discount)/100).toFixed(2);
   await Cart.findOneAndUpdate(
     { orderBy: user._id },
     { totalAfterDiscount },
     {
       new: true,
     }
   );
   res.json(totalAfterDiscount)
  }catch(err){
    throw new Error(err)
  }

})

const createOrder=asyncHandler(async(req,res)=>{
  const {_id}=req.user
  const {COD,coupanApplied}=req.body;
  if(!COD){
    throw new Error("Create Cash order failed")
  }
try{
  const user=await User.findById(_id)
  let userCart=await Cart.findOne({orderBy:user._id})
  let finalAmout=0;
  if(coupanApplied && userCart.totalAfterDiscount){
    finalAmout=userCart.totalAfterDiscount
  }
  else{
    finalAmount=userCart.cartTotal
  }
  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqid(),
      method: "COD",
      amount: finalAmout,
      status: "Cash On Delivery",
      createdAt: Date.now(),
      currency: "usd",
    },
    orderBy: user._id,
    orderStatus: "Cash On Delivery",
  }).save();
  let update=userCart.products.map((item)=>{
    return{
      updateOne:{
        filter:{_id:item.product._id},
        update:{$inc:{quantity:item.count,sold:+item.count}}
      }
    }
  })
  const updated=await Product.bulkWrite(update,{})
  res.json({message:"success"})
}catch(err){
  throw new Error(err)
}
})

const getOrder=asyncHandler(async(req,res)=>{
  const {_id}=req.user;
  validateMongoDbId(_id)
  try
  {
    const userOrder=await Order.findOne({orderBy:_id}).populate("products.product")
    res.json(userOrder)
  }catch(err){
    throw new Error(err)
  }
})

const updateOrderStatus=asyncHandler(async(req,res)=>{
  const {status}=req.body;
  const {id}=req.params;
  validateMongoDbId(id)

  try{
    const updateOrder=await  Order.findByIdAndUpdate(id,{orderStatus:status,
    paymentIntent:{
      status:status
    }},{new:true})
    res.json(updateOrder)
  }catch(err){
    throw new Error(err)
  }
})

const getAllOrder = asyncHandler(async (req, res) => {
  try {
    const userOrder = await Order.find().populate("products.product").populate("orderBy")
    res.json(userOrder)
  } catch (err) {
    throw new Error(err)
  }
})

const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id)
  try {
    const userOrder = await Order.findOne({ orderBy: id }).populate("products.product")
    res.json(userOrder)
  } catch (err) {
    throw new Error(err)
  }
})


module.exports = { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updateaUser, blockUser, unblockUser,  updatePassword, forgotPasswordToken, resetPassword, loginAdminCtrl, getWishlist, saveAddress, userCart ,getUserCart,emptyCart,applyCoupan,createOrder,getOrder,updateOrderStatus,getAllOrder,getOrderByUserId}