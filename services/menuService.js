const Menu = require("../models/Menu");

/**
 * Tạo một món trong menu
 * @param {Object} menuData - Dữ liệu món cần tạo (bao gồm cafe, name, price, image, category)
 */
const createMenuItem = async (menuData) => {
  return await Menu.create(menuData);
};

/**
 * Lấy danh sách món theo cafeId
 * @param {String} cafeId - ID của quán cafe
 */
const getMenuItemsByCafe = async (cafeId) => {
  return await Menu.find({ cafe: cafeId });
};

/**
 * Lấy thông tin một món theo ID
 * @param {String} id - ID của món menu
 */
const getMenuItemById = async (id) => {
  return await Menu.findById(id);
};

/**
 * Cập nhật món theo ID
 * @param {String} id - ID của món menu
 * @param {Object} menuData - Dữ liệu cập nhật
 */
const updateMenuItem = async (id, menuData) => {
  return await Menu.findByIdAndUpdate(id, menuData, { new: true });
};

/**
 * Xóa món theo ID
 * @param {String} id - ID của món menu
 */
const deleteMenuItem = async (id) => {
  return await Menu.findByIdAndDelete(id);
};

module.exports = {
  createMenuItem,
  getMenuItemsByCafe,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
};
