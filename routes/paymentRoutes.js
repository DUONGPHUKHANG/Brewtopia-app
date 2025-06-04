const express = require("express");
const router = express.Router();
const {
  createPayos,
  handlePayOshook,
  getPaymentInfo,
  createZaloPayPayment,
  getZaloPayPaymentInfo,
  handleZaloPayWebhook,
  getAllPayments,
} = require("../controllers/paymentController");
const { authenticateUser } = require("../middlewares/authMiddleware");

router.post("/", authenticateUser, getAllPayments);
router.post("/createPayos", authenticateUser, createPayos);
router.get("/webhook/PayOs", handlePayOshook);
router.get("/:orderCode", authenticateUser, getPaymentInfo);
//==========================================================
router.post("/createZaloPay", authenticateUser, createZaloPayPayment);
router.get("/webhook/ZaloPay", handleZaloPayWebhook);
router.get("/:orderCode", authenticateUser, getZaloPayPaymentInfo);

module.exports = router;
