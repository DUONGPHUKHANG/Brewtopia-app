const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    avatar: String,
    verificationCode: String, // lưu mã xác thực (4 số)
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    provider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
  },
  { timestamps: true, versionKey: false }
);
const user = mongoose.model("User", UserSchema);
module.exports = user;
