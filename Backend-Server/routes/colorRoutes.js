const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createColor,
  updateColor,
  deleteColor,
  getAllColor,
  getColor,
} = require("../controller/colorCtrl");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);
router.get("/", getAllColor);
router.get("/:id", getColor);
module.exports = router;
