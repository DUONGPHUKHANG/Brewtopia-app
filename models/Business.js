// const mongoose = require("mongoose");

// const BusinessSchema = new mongoose.Schema(
//   {
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     shopName: { type: String },
//     status: {
//       type: String,
//       enum: ["pending", "success"], // chỉ được phép 2 giá trị này
//       default: "pending",
//     },
// address: {
//   street: String,
//   ward: String,
//   district: String,
//   city: String,
//   coordinates: { type: [Number] },
//   location: {
//     type: { type: String, enum: ["Point"], default: "Point" },
//     coordinates: { type: [Number] }, // [longitude, latitude]
//   },
// },
//     email: { type: String },
//     phoneNumber: { type: String },
//     taxInfo: {
//       taxCode: { type: String },
//       businessType: {
//         type: String,
//         enum: [
//           "Traditional",
//           "Take-away",
//           "Garden cafe",
//           "Book cafe",
//           "Acoustic cafe",
//           "Other",
//         ],
//         default: "Other",
//       },
//     },
//     identification: {
//       nationality: String,
//       citizenIdImage: String, // Link ảnh CMND/CCCD
//     },
//     description: String,
//     openingHours: {
//       monday: { open: String, close: String },
//       tuesday: { open: String, close: String },
//       wednesday: { open: String, close: String },
//       thursday: { open: String, close: String },
//       friday: { open: String, close: String },
//       saturday: { open: String, close: String },
//       sunday: { open: String, close: String },
//     },
//     services: [String], // Ví dụ: ["WiFi miễn phí", "Máy lạnh", "Giữ xe"]
//     menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
//     event: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
//     reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
//     rating: { type: Number, default: 0 }, // Điểm đánh giá trung bình
//     reviewCount: { type: Number, default: 0 }, // Số lượng review
//   },

//   { timestamps: true }
// );

// BusinessSchema.index({ location: "2dsphere" });

// module.exports = mongoose.model("Business", BusinessSchema);
