const Cafe = require("../models/Cafe");
const Menu = require("../models/Menu");

const getMenuItem = async (cafeId) => {
  if (!cafeId) throw new Error("ID quán cafe không được để trống");
  const menu = await Menu.find({ cafe: cafeId });
  return menu;
};

const deleteMenuItem = async (itemId) => {
  if (!itemId) throw new Error("ID món không được để trống");

  const deletedItem = await Menu.findByIdAndDelete(itemId);
  if (!deletedItem) throw new Error("Không tìm thấy món ăn để xóa");

  return deletedItem;
};

module.exports = {
  getMenuItem,
  deleteMenuItem,
};
