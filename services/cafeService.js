const Cafe = require("../models/Cafe");
const Review = require("../models/Review");

// 🏡 Tạo quán cafe mới
const createCafe = async (cafeData) => {
  // Kiểm tra thông tin bắt buộc
  if (!cafeData.name) {
    throw new Error("Tên quán cafe không được để trống");
  }
  if (!cafeData.address) {
    throw new Error("Địa chỉ quán cafe không được để trống");
  }
  if (
    !cafeData.location ||
    !cafeData.location.coordinates ||
    cafeData.location.coordinates.length !== 2
  ) {
    throw new Error("Thông tin vị trí quán cafe không hợp lệ");
  }

  // Validate tọa độ: phải là số và trong phạm vi hợp lệ
  const [lng, lat] = cafeData.location.coordinates;
  if (typeof lng !== "number" || typeof lat !== "number") {
    throw new Error("Tọa độ phải là số");
  }
  if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
    throw new Error(
      "Tọa độ không hợp lệ: Kinh độ phải trong [-180, 180] và vĩ độ trong [-90, 90]"
    );
  }

  try {
    const cafe = await Cafe.create(cafeData);
    return cafe;
  } catch (err) {
    throw new Error("Lỗi khi tạo quán cafe: " + err.message);
  }
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
  if (!id) throw new Error("ID quán cafe không được để trống");

  // Nếu có cập nhật location, kiểm tra dữ liệu
  if (cafeData.location && cafeData.location.coordinates) {
    if (cafeData.location.coordinates.length !== 2) {
      throw new Error("Thông tin vị trí không hợp lệ");
    }
    const [lng, lat] = cafeData.location.coordinates;
    if (typeof lng !== "number" || typeof lat !== "number") {
      throw new Error("Tọa độ phải là số");
    }
    if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
      throw new Error(
        "Tọa độ không hợp lệ: Kinh độ phải trong [-180, 180] và vĩ độ trong [-90, 90]"
      );
    }
  }

  try {
    const updatedCafe = await Cafe.findByIdAndUpdate(id, cafeData, {
      new: true,
      runValidators: true, // Áp dụng validation từ schema
    });
    if (!updatedCafe) throw new Error("Không tìm thấy quán cafe với ID: " + id);
    return updatedCafe;
  } catch (err) {
    throw new Error("Lỗi khi cập nhật quán cafe: " + err.message);
  }
};

// 🗑️ Xóa quán cafe
const deleteCafe = async (id) => {
  if (!id) throw new Error("ID quán cafe không được để trống");
  try {
    const deletedCafe = await Cafe.findByIdAndDelete(id);
    if (!deletedCafe)
      throw new Error("Không tìm thấy quán cafe để xóa với ID: " + id);
    return deletedCafe;
  } catch (err) {
    throw new Error("Lỗi khi xóa quán cafe: " + err.message);
  }
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

module.exports = {
  createCafe,
  getAllCafes,
  getCafeById,
  updateCafe,
  deleteCafe,
  getCafesNearby,
  updateCafeRating,
};
