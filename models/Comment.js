const mongoose = require("mongoose");
const autoPopulateUser = require("../middlewares/populateMiddleware");

const CommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID của Review hoặc Post
    targetType: { type: String, enum: ["Post", "Review"], required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Danh sách user đã like comment
  },
  { timestamps: true, versionKey: false }
);

// Middleware tự động populate user khi lấy comment
CommentSchema.pre(/^find/, autoPopulateUser);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
