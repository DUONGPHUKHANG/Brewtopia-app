const mongoose = require("mongoose");

const ShareSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "targetModel",
    },
    targetModel: { type: String, enum: ["Post", "Review"], required: true },
    platform: {
      type: String,
      enum: ["facebook", "twitter", "zalo", "copy_link"],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
const share = mongoose.model("Share", ShareSchema);
module.exports = share;
