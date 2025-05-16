const User = require("../models/User");
const Review = require("../models/Review");
const Cafe = require("../models/Cafe");

// 🏡 Tạo quán cafe mới
const createCafe = async (data) => {
  return await Cafe.create(data);
};

// 📜 Lấy danh sách tất cả quán cafe
const getAllCafes = async () => {
  return await Cafe.find();
};

// 🔍 Lấy thông tin chi tiết một quán cafe theo ID
const getCafeById = async (id) => {
  return await Cafe.findById(id);
};

// ✏️ Cập nhật thông tin quán cafe
const updateCafe = async (id, data) => {
  data.status = "success";
  return await Cafe.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// 🗑️ Xóa quán cafe
const deleteCafe = async (id) => {
  return await Cafe.findByIdAndDelete(id);
};

// 🔎 Tìm quán cafe gần vị trí người dùng
// const getCafesNearby = async (longitude, latitude, maxDistance = 5000) => {
//   if (!longitude || !latitude) {
//     throw new Error("Thiếu tọa độ (longitude và latitude)!");
//   }
//   const lng = parseFloat(longitude);
//   const lat = parseFloat(latitude);
//   if (isNaN(lng) || isNaN(lat)) {
//     throw new Error("Tọa độ phải là số hợp lệ");
//   }
//   if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
//     throw new Error(
//       "Tọa độ không hợp lệ: lng phải trong [-180, 180] và lat trong [-90, 90]"
//     );
//   }

//   try {
//     const cafes = await Cafe.find({
//       location: {
//         $near: {
//           $geometry: { type: "Point", coordinates: [lng, lat] },
//           $maxDistance: parseInt(maxDistance),
//         },
//       },
//     });
//     return cafes;
//   } catch (err) {
//     throw new Error("Lỗi khi tìm quán cafe gần vị trí của bạn: " + err.message);
//   }
// };
// const updateCafeRating = async (cafeId) => {
//   try {
//     // Lấy tất cả review hợp lệ (chỉ đếm review của user, không đếm admin)
//     const reviews = await Review.find({ cafe: cafeId }).populate("user");
//     const validReviews = reviews.filter(
//       (review) => review.user.role === "user"
//     );

//     const reviewCount = validReviews.length;
//     const averageRating = reviewCount
//       ? validReviews.reduce((sum, review) => sum + review.rating, 0) /
//         reviewCount
//       : 0;

//     // Cập nhật rating và số lượng review
//     await Cafe.findByIdAndUpdate(cafeId, {
//       rating: Number(averageRating.toFixed(1)), // Chuyển về số
//       reviewCount: reviewCount,
//       reviews: validReviews.map((r) => r._id), // Đảm bảo danh sách review luôn đúng
//     });
//   } catch (err) {
//     throw new Error("Lỗi khi cập nhật rating: " + err.message);
//   }
// };
// const getCafeMenu = async (cafeId) => {
//   try {
//     const cafe = await Cafe.findById(cafeId).populate("menu");
//     if (!cafe) return null;
//     return cafe.menu;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

module.exports = {
  createCafe,
  getAllCafes,
  getCafeById,
  updateCafe,
  deleteCafe,
  // getCafesNearby,
  // updateCafeRating,
  // getCafeMenu,
};
