// const businessService = require("../services/businessService");

// // Tạo mới business
// const createBusiness = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const business = await businessService.createBusiness(userId);
//     res.status(201).json({ message: "Tạo business thành công", business });
//   } catch (error) {
//     console.log(error);
//     res.status(error.statusCode || 500).json({
//       message: error.message || "Lỗi server",
//     });
//   }
// };

// // Lấy danh sách businesses
// const getAllBusinesses = async (req, res) => {
//   try {
//     const businesses = await businessService.getBusinesses();
//     res.status(200).json(businesses);
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi server", error: error.message });
//   }
// };

// // Lấy business theo ID
// const getBusinessById = async (req, res) => {
//   try {
//     const business = await businessService.getBusinessById(req.params.id);
//     if (!business) {
//       return res.status(404).json({ message: "Không tìm thấy business" });
//     }
//     res.status(200).json(business);
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi server", error: error.message });
//   }
// };

// // Cập nhật business
// const updateProfileBusiness = async (req, res) => {
//   try {
//     const updatedBusiness = await businessService.updateBusiness(
//       req.params.id,
//       req.body
//     );
//     if (!updatedBusiness) {
//       return res.status(404).json({ message: "Không tìm thấy business" });
//     }
//     res.status(200).json(updatedBusiness);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Xóa business
// const deleteBusiness = async (req, res) => {
//   try {
//     const deletedBusiness = await businessService.deleteBusiness(req.params.id);
//     if (!deletedBusiness) {
//       return res.status(404).json({ message: "Không tìm thấy business" });
//     }
//     res.status(200).json({ message: "Đã xóa business thành công" });
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi server", error: error.message });
//   }
// };

// module.exports = {
//   createBusiness,
//   getAllBusinesses,
//   getBusinessById,
//   updateProfileBusiness,
//   deleteBusiness,
// };
