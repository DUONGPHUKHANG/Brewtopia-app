const express = require("express");
const {
  createPointPurchase,
  getPointPurchases,
} = require("../controllers/pointController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticateUser, createPointPurchase);
router.get("/", authenticateUser, getPointPurchases);

module.exports = router;
