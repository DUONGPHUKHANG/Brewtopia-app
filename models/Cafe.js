const mongoose = require("mongoose");
const defaultOpeningHour = () => ({ open: "08:00", close: "22:00" });

const CafeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shopName: { type: String, default: null },
    status: {
      type: String,
      enum: ["pending", "success"],
      default: "pending",
    },
    address: {
      street: String,
      ward: String,
      district: String,
      city: String,
      coordinates: { type: [Number], default: [0, 0] },
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    phoneNumber: { type: String, default: null },
    taxInfo: {
      taxCode: { type: String },
      businessType: {
        type: String,
        enum: [
          "Traditional",
          "Take-away",
          "Garden cafe",
          "Book cafe",
          "Acoustic cafe",
          "Other",
        ],
        default: "Other",
      },
    },
    identification: {
      nationality: { type: String, default: null },
      citizenIdImage: { type: String, default: null }, // URL to image
    },
    description: { type: String },
    openingHours: {
      monday: { type: Object, default: defaultOpeningHour },
      tuesday: { type: Object, default: defaultOpeningHour },
      wednesday: { type: Object, default: defaultOpeningHour },
      thursday: { type: Object, default: defaultOpeningHour },
      friday: { type: Object, default: defaultOpeningHour },
      saturday: { type: Object, default: defaultOpeningHour },
      sunday: { type: Object, default: defaultOpeningHour },
    },
    services: [{ type: String }],
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
    event: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Tạo index cho trường location để hỗ trợ tìm kiếm không gian (geospatial queries)
CafeSchema.index({ location: "2dsphere" });

const cafe = mongoose.model("Cafe", CafeSchema);
module.exports = cafe;
