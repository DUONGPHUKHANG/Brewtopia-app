const express = require("express");
const router = express.Router();
const {
  createPayos,
  handleWebhook,
  getPaymentInfo,
} = require("../controllers/paymentController");
const { authenticateUser } = require("../middlewares/authMiddleware");

router.post("/createPayos", authenticateUser, createPayos);
router.get("/webhook", handleWebhook);
router.get("/:orderCode", authenticateUser, getPaymentInfo);

module.exports = router;
