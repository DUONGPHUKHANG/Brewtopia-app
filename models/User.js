const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    avatar: String,
    verificationCode: String,
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    provider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    isActive: { type: Boolean, default: false },
    lastActive: { type: Date },
    points: {
      type: Number,
      default: 0,
      min: [0, "Points must be non-negative"],
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
