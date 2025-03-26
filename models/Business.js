const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shopName: { type: String, required: true },
    address: {
      street: String,
      ward: String,
      district: String,
      city: String,
      coordinates: { type: [Number], required: true },
    },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    menu: [
      {
        category: String,
        items: [{ name: String, price: Number, image: String }],
      },
    ],
    taxInfo: {
      taxCode: { type: String, required: true },
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
        required: true,
      },
    },
    identification: {
      nationality: String,
      citizenIdImage: String, // Link ảnh CMND/CCCD
    },
  },
  { timestamps: true }
);

BusinessSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Business", BusinessSchema);
