const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    images: [String],
  },
  { timestamps: true, versionKey: false }
);
const post = mongoose.model("Post", PostSchema);
module.exports = post;
