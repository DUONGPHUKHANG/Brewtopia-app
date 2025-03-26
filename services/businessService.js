const Business = require("../models/Business");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

// Lấy danh sách tất cả businesses
const getBusinesses = async () => {
  return await Business.find().populate("owner", "name email");
};

// Lấy thông tin business theo ID
const getBusinessById = async (id) => {
  return await Business.findById(id).populate("owner", "name email");
};

// Tạo mới business
const createBusiness = async (businessData, userId, files) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("Người dùng không tồn tại");

    if (
      !businessData.shopName ||
      !businessData.address ||
      !businessData.email ||
      !businessData.phoneNumber
    ) {
      throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
    }

    businessData.owner = userId;

    if (
      !businessData.address.coordinates ||
      businessData.address.coordinates.length !== 2
    ) {
      throw new Error("Tọa độ không hợp lệ");
    }

    // Upload ảnh đại diện business nếu có
    if (files && files.image) {
      console.log("File image được upload:", files.image);
      businessData.image = files.image[0].path; // Cloudinary trả về URL trong file.path
    }

    // Upload ảnh CMND/CCCD cho identification nếu có
    if (files && files.citizenIdImage) {
      if (!businessData.identification) {
        businessData.identification = {};
      }
      businessData.identification.citizenIdImage = files.citizenIdImage[0].path;
    }

    const business = new Business(businessData);
    await business.save();
    return business;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Cập nhật business theo ID
const updateBusiness = async (id, updateData) => {
  return await Business.findByIdAndUpdate(id, updateData, { new: true });
};

// Xóa business theo ID
const deleteBusiness = async (id) => {
  return await Business.findByIdAndDelete(id);
};

module.exports = {
  getBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
