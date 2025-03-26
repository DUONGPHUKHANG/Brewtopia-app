const businessService = require("../services/businessService");

// Tạo mới business
const createBusiness = async (req, res) => {
  try {
    const { body, user, files } = req; // Lấy files từ req.files
    console.log(body, user, files);

    const business = await businessService.createBusiness(body, user.id, files);
    res.status(201).json(business);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy danh sách businesses
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await businessService.getBusinesses();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy business theo ID
const getBusinessById = async (req, res) => {
  try {
    const business = await businessService.getBusinessById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: "Không tìm thấy business" });
    }
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Cập nhật business
const updateBusiness = async (req, res) => {
  try {
    const updatedBusiness = await businessService.updateBusiness(
      req.params.id,
      req.body
    );
    if (!updatedBusiness) {
      return res.status(404).json({ message: "Không tìm thấy business" });
    }
    res.status(200).json(updatedBusiness);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa business
const deleteBusiness = async (req, res) => {
  try {
    const deletedBusiness = await businessService.deleteBusiness(req.params.id);
    if (!deletedBusiness) {
      return res.status(404).json({ message: "Không tìm thấy business" });
    }
    res.status(200).json({ message: "Đã xóa business thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
};
