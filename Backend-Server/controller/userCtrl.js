const { generateToken } = require("../config/jwtToken");
const mongoose = require('mongoose');
const crypto = require("crypto");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupan = require("../models/coupanModel");
const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ path: "./.env" });
const asyncHandler = require("express-async-handler");
const uniqid = require("uniqid");
const validateMongoDbId = require("../utils/validateMongoDbId");
const sendEmail = require("./emailCtrl");
validateMongoDbId;
// const createUser = asyncHandler(async (req, res) => {
//   const email = req.body.email;
//   const findUser = await User.findOne({ email: email });
//   if (!findUser) {
//     //create new user
//     const newUser = await User.create(req.body);
//     res.json(newUser);
//   } else {
//     //user exist
//     throw new Error("User already exist");
//   }
// });
// const createUser = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   // Check if the user already exists
//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     throw new Error("User already exists");
//   }

//   try {
//     const generateOTP = () => {
//       return Math.floor(100000 + Math.random() * 900000);
//     };
//     // Generate OTP
//     const otp = generateOTP();
//     // Save OTP and timestamp to the user document in the database
//     const newUser = await User.create({ ...req.body, passwordResetToken: otp });

//     const resetURL =
//       `
//     <img  src="https://res.cloudinary.com/dytlgwywf/image/upload/v1712242872/fzwn8ubzt8ydxvnfj2cj.jpg" width="400" alt="secure" />
//     <div style="font-size:22px" > 
//     <b>Hey,</b>
//     <b> Here's your OTP to log into your fashionique account.${otp}</b>
//     </div>
//     `
//     const data = {
//       to: email,
//       text: "Hey User",
//       subject: "Your OTP for Forgot Password",
//       htm: resetURL,
//     };
//     sendEmail(data);
//     res.json({ message: "OTP sent to your email. Please check your inbox to verify your account." });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser.isVerified) {
    throw new Error("User already exists");
  }

  try {
    const generateOTP = () => {
          return Math.floor(100000 + Math.random() * 900000);
        };
    // Generate OTP
    const otp = generateOTP();

    if (existingUser) {
      // Update the existing user document with new OTP if the user is not verified yet
      existingUser.passwordResetToken = otp;
      await existingUser.save();
    } else {
      // Save OTP and timestamp to the user document in the database if the user doesn't exist
      await User.create({ ...req.body, passwordResetToken: otp });
    }

    // Compose email content with OTP
    const resetURL =
          `
        <img  src="https://res.cloudinary.com/dytlgwywf/image/upload/v1712242872/fzwn8ubzt8ydxvnfj2cj.jpg" width="400" alt="secure" />
        <div style="font-size:22px" >
        <b>Hey,</b>
        <b> Here's your OTP to log into your fashionique account.${otp}</b>
        </div>
        `
        const data = {
          to: email,
          text: "Hey User",
          subject: "Your OTP for Forgot Password",
          htm: resetURL,
        };
        sendEmail(data);

    res.json({ message: "OTP sent to your email. Please check your inbox to verify your account." });
  } catch (error) {
    throw new Error(error);
  }
});

const verifyAccount = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  // Verify OTP
  if (otp !== user.passwordResetToken) {
    throw new Error("Invalid OTP");
  }

  // Create the account if OTP is correct
  user.isVerified = true;
  await user.save();

  res.json({ message: "Account verified successfully." });
});
//user login
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser.role !== "user" || !findUser.isVerified) {
    throw new Error("not authorized");
  }
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const updateUser = await User.findByIdAndUpdate(findUser.id, {
      new: true,
    });
    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Inavalid credential");
  }
});

//admin login
const loginAdminCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin" || !findAdmin.isVerified) {
    throw new Error("not authorized");
  }
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const updateUser = await User.findByIdAndUpdate(findAdmin.id, {
      new: true,
    });

    res.json({
      _id: findAdmin?._id,
      firstName: findAdmin?.firstName,
      lastName: findAdmin?.lastName,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    return res.status(401).json({ error: "Invalid username or password" });
  }
});
//get all user
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (err) {
    throw new Error(err);
  }
});
const getaUserDetail = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userDetail = await User.findById(_id);
    res.json(userDetail);
  } catch (err) {
    throw new Error(err);
  }
});
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getUser = await User.findById(id);
    res.json(getUser);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({ deleteUser });
  } catch (err) {
    throw new Error(err);
  }
});

const updateaUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.json(updateUser);
  } catch (err) {
    throw new Error(err);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User Blocked",
    });
  } catch (err) {
    throw new err();
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
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
      message: "User Unblocked",
    });
  } catch (err) {
    throw new err();
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user._id;
  const { currentPassword, newPassword } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  const isCurrentPasswordValid = await user.isPasswordMatched(currentPassword);
  if (!isCurrentPasswordValid) {
    return res.status(401).json({ message: "Incorrect current password" });
  }
  user.password = newPassword;
  const updatedPassword = await user.save();
  res.json({ message: "Your password has been changed successfully" });
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user not found with this email");
  }
  try {
    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 900000);  
    };
    const otp = generateOTP();
    user.passwordResetToken = otp;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    const resetURL =
    `
    <img  src="https://res.cloudinary.com/dytlgwywf/image/upload/v1712242872/fzwn8ubzt8ydxvnfj2cj.jpg" width="400" alt="secure" />
    <div style="font-size:22px" > 
    <b>Hey,</b>
    <b> Here's your OTP to log into your fashionique account.${otp}</b>
    </div>
    `
    const data = {
      to: email,
      text: "Hey User",
      subject: "Your OTP for Forgot Password",
      htm: resetURL,
    };
    sendEmail(data);
    res.json({"message":"sent"});
  } catch (error) {
    throw new Error(error);
  }
});
const verifyOTP = asyncHandler(async (req, res) => {
  const { email, enteredOTP } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found with this email");
  }
  try {
    if (enteredOTP !== user.passwordResetToken) {
      throw new Error("Invalid OTP");
    }
    if (user.passwordResetExpires < Date.now()) {
      throw new Error("OTP has expired");
    }
    res.json({ message: "OTP verified. You can now reset your password." });
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, password, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found with this email");
  }
  if (otp !== user.passwordResetToken) {
    throw new Error("Invalid OTP");
  }
  if (user.passwordResetExpires < Date.now()) {
    throw new Error("OTP has expired");
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successful." });
});


const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (err) {
    throw new Error(err);
  }
});

//save user address
const saveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const address = req.body
  validateMongoDbId(_id);
  const newAddress = {
    _id: new mongoose.Types.ObjectId(),
    ...address
  };
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      { $push: { address: { $each: [newAddress], $position: 0 } } },
      { new: true }
    );
    res.json(updateUser);
  } catch (err) {
    throw new Error(err);
  }
});


const deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findById(_id);
    let addressIndex = -1;
    user.address.forEach((address, index) => {
      if (address._id.toString() === id) {
        addressIndex = index;
      }
    });
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }
    user.address.splice(addressIndex, 1);
    await user.save();
    res.json({ message: "Address deleted successfully" });
  } catch (err) {
    console.error("Error deleting address:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, color, size, quantity, price } = req.body;
  const userId = req.user._id;
  try {
    let cart = await Cart.findOne({ userId }).populate('products.productId').exec();
    if (!cart) {
      cart = await Cart.create({ userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(product =>
      product.productId._id.equals(productId) && product.color === color && product.size === size
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
      cart.products[existingProductIndex].price = price; // Update price if necessary
    } else {
      cart.products.unshift({ productId, color, size, quantity, price });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOne({ userId: _id }).populate(
      "products.productId"
    ).populate("products.color");
    let totalPrice = 0;
    cart.products.forEach(product => {
      let discountedPrice = product.productId.price * (1 - product.productId.discount / 100);
      totalPrice += discountedPrice * product.quantity;
    });
    cart.products.sort((a, b) => new Date(a.date) - new Date(b.date));
    const cartWithTotalPrice = {
      ...cart.toObject(),
      totalPrice: Math.floor(totalPrice)
    };
    res.json(cartWithTotalPrice);
  } catch (err) {
    throw new Error(err);
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const index = cart.products.findIndex(product =>
      product.equals(id)
    );

    if (index === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }
    cart.products.splice(index, 1);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const applyCoupan = asyncHandler(async (req, res) => {
  const { coupan } = req.body;
  const { _id } = req.user;
  try {
    const validCoupan = await Coupan.findOne({ name: coupan });
    const validCouponExpiry = new Date(validCoupan.expiry);
    const currentDate = new Date();
    if (validCoupan == null || validCouponExpiry < currentDate) {
      throw new Error("invalid coupan");
    }
    const user = await User.findOne({ _id });

    const cart = await Cart.findOne({ userId: _id }).populate(
      "products.productId"
    ).populate("products.color");
    let cartTotal = 0;
    cart.products.forEach(product => {
      let discountedPrice = product.productId.price * (1 - product.productId.discount / 100);
      cartTotal += discountedPrice * product.quantity;
    });
    let totalAfterDiscount = Math.floor(cartTotal - (cartTotal * validCoupan.discount) / 100);

    await Cart.findOneAndUpdate(
      { userId: user._id },
      { totalAfterDiscount },
      {
        new: true,
      }
    );
    res.json(totalAfterDiscount);
  } catch (err) {
    throw new Error(err);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { COD, totalPriceAfterDiscount, address } = req.body;
  if (!COD) {
    throw new Error("Create Cash order failed");
  }
  try {
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ userId: user._id }).populate(
      "products.productId"
    ).populate("products.color");
    let newOrder = await new Order({
      products: userCart.products.map(product => ({
        product: product.productId._id,
        count: product.quantity,
        color: product.color,
        size: product.size,
        address: address
      })),
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: totalPriceAfterDiscount,
        status: "Cash On Delivery",
        createdAt: Date.now(),
        currency: "inr",
      },
      orderBy: user._id,
      orderStatus: "Cash On Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.productId._id },
          update: { $inc: { quantity: item.count, sold: +item.count } },
        },
      };
    });
    res.json({ message: "success" });
  } catch (err) {
    throw new Error(err);
  }
});

const getOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userOrder = await Order.find({ orderBy: _id })
      .populate("products.product")
      .populate("orderBy")
      .sort({ createdAt: -1 });
    res.json(userOrder);
  } catch (err) {
    throw new Error(err);
  }
});


const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  console.log(status, id)
  validateMongoDbId(id);
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
      },
      { new: true }
    );
    res.json(updateOrder);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllOrder = asyncHandler(async (req, res) => {
  try {
    const userOrder = await Order.find()
      .populate("products.product")
      .populate("orderBy");
    res.json(userOrder);
  } catch (err) {
    throw new Error(err);
  }
});

const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userOrder = await Order.findOne({ orderBy: id }).populate(
      "products.product"
    );
    res.json(userOrder);
  } catch (err) {
    throw new Error(err);
  }
});
const getOrderByOrderId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userOrder = await Order.findOne({ _id: id }).populate(
      "products.product"
    );
    res.json(userOrder);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateaUser,
  blockUser,
  unblockUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdminCtrl,
  getWishlist,
  saveAddress,
  deleteAddress,
  addToCart,
  getUserCart,
  removeFromCart,
  applyCoupan,
  createOrder,
  getOrder,
  updateOrderStatus,
  getAllOrder,
  getOrderByUserId,
  getaUserDetail,
  getOrderByOrderId,
  verifyOTP,
  verifyAccount
};
