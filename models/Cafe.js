const mongoose = require("mongoose");

const CafeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true },
    },
    images: [String],
    description: String,
    phone: String,
    openingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    services: [String], // Ví dụ: ["WiFi miễn phí", "Máy lạnh", "Giữ xe"]
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
    rating: { type: Number, default: 0 }, // Điểm đánh giá trung bình
    reviewCount: { type: Number, default: 0 }, // Số lượng review
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true, versionKey: false }
);

CafeSchema.index({ location: "2dsphere" });
const cafe = mongoose.model("Cafe", CafeSchema);
module.exports = cafe;
