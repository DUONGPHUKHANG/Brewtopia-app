const mongoose = require("mongoose");

const PointBonusSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["daily", "event", "referral", "admin", "task"],
      required: true,
      default: "admin", // nếu tặng thủ công thì mặc định là từ admin
    },
    note: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "revoked"],
      default: "active",
    },
  },
  { timestamps: true, versionKey: false }
);
const PointBonus = mongoose.model("PointBonus", PointBonusSchema);
module.exports = PointBonus;
