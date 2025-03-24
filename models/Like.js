const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "targetModel",
    },
    targetModel: { type: String, enum: ["Post", "Review"], required: true }, // Xác định loại đối tượng được like
  },
  { timestamps: true, versionKey: false }
);
const like = mongoose.model("Like", LikeSchema);
module.exports = like;
