const User = require("../models/User");
const Review = require("../models/Review");
const Cafe = require("../models/Cafe");
const cafe = require("../models/Cafe");

// 🏡 Tạo quán cafe mới
const createCafe = async (cafeData) => {
  const { owner } = cafeData;

  // Kiểm tra xem user có tồn tại không
  const user = await User.findById(owner);
  if (!user) {
    throw new Error("Người dùng không tồn tại");
  }

  // Gán status mặc định nếu chưa có
  cafeData.status = "pending";

  // Tạo quán cafe mới với toàn bộ dữ liệu
  const cafe = await Cafe.create(cafeData);
  return cafe;
};

// 📜 Lấy danh sách tất cả quán cafe
const getAllCafes = async () => {
  try {
    const cafes = await Cafe.find();
    return cafes;
  } catch (err) {
    throw new Error("Lỗi khi lấy danh sách quán cafe: " + err.message);
  }
};

// 🔍 Lấy thông tin chi tiết một quán cafe theo ID
const getCafeById = async (id) => {
  if (!id) throw new Error("ID quán cafe không được để trống");
  try {
    const cafe = await Cafe.findById(id);
    if (!cafe) {
      throw new Error("Không tìm thấy quán cafe với ID: " + id);
    }
    return cafe;
  } catch (err) {
    throw new Error("Lỗi khi lấy thông tin quán cafe: " + err.message);
  }
};

// ✏️ Cập nhật thông tin quán cafe
const updateCafe = async (id, cafeData) => {
  // console.log(cafeData);

  if (
    !cafeData.address ||
    !cafeData.shopName ||
    !cafeData.email ||
    !cafeData.phoneNumber
  ) {
    throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
  }

  // Nếu trạng thái hiện tại là pending → cập nhật thành success
  if (cafeData.status === "pending") {
    cafeData.status = "success";
  }

  const updatedCafe = await Cafe.findByIdAndUpdate(id, cafeData, {
    new: true,
    runValidators: true,
  });

  return updatedCafe;
};

// 🗑️ Xóa quán cafe
const deleteCafe = async (id) => {
  if (!id) throw new Error("ID quán cafe không được để trống");
  const deletedCafe = await Cafe.findByIdAndDelete(id);
  if (!deletedCafe)
    throw new Error("Không tìm thấy quán cafe để xóa với ID: " + id);
  return deletedCafe;
};

// 🔎 Tìm quán cafe gần vị trí người dùng
const getCafesNearby = async (longitude, latitude, maxDistance = 5000) => {
  if (!longitude || !latitude) {
    throw new Error("Thiếu tọa độ (longitude và latitude)!");
  }
  const lng = parseFloat(longitude);
  const lat = parseFloat(latitude);
  if (isNaN(lng) || isNaN(lat)) {
    throw new Error("Tọa độ phải là số hợp lệ");
  }
  if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
    throw new Error(
      "Tọa độ không hợp lệ: lng phải trong [-180, 180] và lat trong [-90, 90]"
    );
  }

  try {
    const cafes = await Cafe.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: parseInt(maxDistance),
        },
      },
    });
    return cafes;
  } catch (err) {
    throw new Error("Lỗi khi tìm quán cafe gần vị trí của bạn: " + err.message);
  }
};
const updateCafeRating = async (cafeId) => {
  try {
    // Lấy tất cả review hợp lệ (chỉ đếm review của user, không đếm admin)
    const reviews = await Review.find({ cafe: cafeId }).populate("user");
    const validReviews = reviews.filter(
      (review) => review.user.role === "user"
    );

    const reviewCount = validReviews.length;
    const averageRating = reviewCount
      ? validReviews.reduce((sum, review) => sum + review.rating, 0) /
        reviewCount
      : 0;

    // Cập nhật rating và số lượng review
    await Cafe.findByIdAndUpdate(cafeId, {
      rating: Number(averageRating.toFixed(1)), // Chuyển về số
      reviewCount: reviewCount,
      reviews: validReviews.map((r) => r._id), // Đảm bảo danh sách review luôn đúng
    });
  } catch (err) {
    throw new Error("Lỗi khi cập nhật rating: " + err.message);
  }
};
const getCafeMenu = async (cafeId) => {
  try {
    const cafe = await Cafe.findById(cafeId).populate("menu");
    if (!cafe) return null;
    return cafe.menu;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCafe,
  getAllCafes,
  getCafeById,
  updateCafe,
  deleteCafe,
  getCafesNearby,
  updateCafeRating,
  getCafeMenu,
};
