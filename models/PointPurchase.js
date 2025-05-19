const mongoose = require("mongoose");

const PointPurchases = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: {
      type: Number,
      required: true,
      min: 1,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "CANCELED"],
      default: "PENDING",
    },
  },
  { timestamps: true, versionKey: false }
);

const PointPurchase = mongoose.model("PointPurchase", PointPurchases);
module.exports = PointPurchase;
