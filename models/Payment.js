const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // target: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   refPath: "targetModel",
  // },
  orderCode: { type: Number, require: true, unique: true },
  amount: { type: Number, required: true },
  description: { type: String, require: true },
  paymentLinkId: { type: String },
  targetModel: {
    type: String,
    enum: ["OrderMeetingRoom", "PointPurchase"],
    //đang test chưa dùng vì liên quan tới thanh toán cho đặt phòng hoặc point
  },
  status: {
    type: String,
    enum: ["PENDING", "PAID", "FAILED", "CANCELLED"],
    default: "PENDING",
  },
  Provider: {
    type: String,
    enum: ["Momo", "Vnpay", "Payos", "Paypal"],
    default: "Payos",
  },
  currency: {
    type: String,
    enum: ["VND", "USD"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const payment = mongoose.model("Payment", PaymentSchema);
module.exports = payment;
