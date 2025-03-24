const Cafe = require("../models/Cafe");
const Review = require("../models/Review");
const User = require("../models/User");
const { updateCafeRating } = require("./cafeService");

// Tạo một review mới
const createReview = async (reviewData) => {
  // Kiểm tra thông tin bắt buộc
  if (
    !reviewData.user ||
    !reviewData.cafe ||
    !reviewData.content ||
    reviewData.rating == null
  ) {
    throw new Error(
      "Thiếu thông tin: user, cafe, nội dung review và rating không được để trống"
    );
  }

  // Kiểm tra quán cafe có tồn tại không
  const cafeExists = await Cafe.findById(reviewData.cafe);
  if (!cafeExists) {
    throw new Error("Quán cafe không tồn tại");
  }

  try {
    // Tạo review mới
    const newReview = await Review.create(reviewData);

    // Lấy user từ database để kiểm tra vai trò
    const user = await User.findById(reviewData.user);

    if (!user) throw new Error("Người dùng không tồn tại");

    if (user.role === "user") {
      // Thêm review vào danh sách của quán cafe và tăng số lượng review
      await Cafe.findByIdAndUpdate(reviewData.cafe, {
        $push: { reviews: newReview._id },
      });

      // Cập nhật lại số lượng review và rating
      await updateCafeRating(reviewData.cafe);
    }

    return newReview;
  } catch (err) {
    throw new Error("Lỗi khi tạo review: " + err.message);
  }
};

// Lấy review theo ID
const getReviewById = async (id) => {
  if (!id) throw new Error("ID review không được để trống");
  try {
    const review = await Review.findById(id).populate("user cafe");
    if (!review) throw new Error("Không tìm thấy review với ID: " + id);
    return review;
  } catch (err) {
    throw new Error("Lỗi khi lấy review: " + err.message);
  }
};

// Lấy danh sách tất cả review
const getAllReviews = async () => {
  try {
    const reviews = await Review.find().populate("user cafe");
    return reviews;
  } catch (err) {
    throw new Error("Lỗi khi lấy danh sách review: " + err.message);
  }
};

// Cập nhật review
const updateReview = async (id, updateData) => {
  if (!id) throw new Error("ID review không được để trống");
  try {
    const updatedReview = await Review.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("user cafe");
    if (!updatedReview) throw new Error("Không tìm thấy review với ID: " + id);
    return updatedReview;
  } catch (err) {
    throw new Error("Lỗi khi cập nhật review: " + err.message);
  }
};

// Xóa review
const deleteReview = async (id) => {
  if (!id) throw new Error("ID review không được để trống");
  try {
    // Tìm review cần xóa
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview)
      throw new Error("Không tìm thấy review để xóa với ID: " + id);

    // Kiểm tra quán cafe có tồn tại không
    const cafe = await Cafe.findById(deletedReview.cafe);
    if (cafe) {
      // Đảm bảo reviewCount không bị giảm xuống dưới 0
      const newReviewCount = Math.max(0, cafe.reviewCount - 1);

      // Cập nhật lại reviewCount
      await Cafe.findByIdAndUpdate(deletedReview.cafe, {
        reviewCount: newReviewCount,
      });

      // Cập nhật lại rating trung bình
      await updateCafeRating(deletedReview.cafe);
    }

    return deletedReview;
  } catch (err) {
    throw new Error("Lỗi khi xóa review: " + err.message);
  }
};

// Lấy danh sách review cho một quán cafe
const getReviewsByCafe = async (cafeId) => {
  if (!cafeId) throw new Error("ID quán cafe không được để trống");
  try {
    const reviews = await Review.find({ cafe: cafeId })
      .populate("user cafe")
      .sort({ createdAt: -1 });
    return reviews;
  } catch (error) {
    throw new Error("Lỗi khi lấy review của quán cafe: " + error.message);
  }
};

module.exports = {
  createReview,
  getReviewById,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviewsByCafe,
};
