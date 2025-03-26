const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    cafe: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe" },
    title: String,
    description: String,
    date: Date,
    image: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // 🔥 Thêm danh sách followers
  },
  { timestamps: true, versionKey: false }
);
const event = mongoose.model("Event", EventSchema);
module.exports = event;
