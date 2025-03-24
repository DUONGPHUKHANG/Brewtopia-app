const menuService = require("../services/menuService");

/**
 * Controller: Tạo món mới
 */
const createMenuItem = async (req, res) => {
  try {
    const menuItem = await menuService.createMenuItem(req.body);
    res.status(201).json(menuItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo món menu", error: error.message });
  }
};

/**
 * Controller: Lấy danh sách món của một quán cafe
 */
const getMenuItems = async (req, res) => {
  try {
    const { cafeId } = req.params;
    const menuItems = await menuService.getMenuItemsByCafe(cafeId);
    res.status(200).json(menuItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách món", error: error.message });
  }
};

/**
 * Controller: Lấy thông tin một món theo ID
 */
const getMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await menuService.getMenuItemById(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Món menu không tồn tại" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy thông tin món", error: error.message });
  }
};

/**
 * Controller: Cập nhật món theo ID
 */
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMenuItem = await menuService.updateMenuItem(id, req.body);
    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Món menu không tồn tại" });
    }
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật món", error: error.message });
  }
};

/**
 * Controller: Xóa món theo ID
 */
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenuItem = await menuService.deleteMenuItem(id);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Món menu không tồn tại" });
    }
    res.status(200).json({ message: "Xóa món menu thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa món", error: error.message });
  }
};

module.exports = {
  createMenuItem,
  getMenuItems,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
