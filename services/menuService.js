const Cafe = require("../models/Cafe");
const Menu = require("../models/Menu");

const addMenuItem = async (cafeId, menuData) => {
  console.log(cafeId, menuData);

  if (
    !cafeId ||
    !menuData.name ||
    !menuData.price ||
    !menuData.category ||
    !menuData.image
  ) {
    throw new Error(
      "Thiếu thông tin: cafeId, tên món, giá, danh mục và ảnh không được để trống"
    );
  }

  const cafe = await Cafe.findById(cafeId);
  if (!cafe) {
    throw new Error("Quán cafe không tồn tại");
  }

  try {
    const newMenuItem = new Menu({
      name: menuData.name,
      price: menuData.price,
      category: menuData.category,
      image: menuData.image,
      cafe: cafeId,
    });

    await newMenuItem.save();

    cafe.menu.push(newMenuItem._id);
    await cafe.save();

    return newMenuItem;
  } catch (error) {
    throw new Error("Lỗi khi thêm món: " + error.message);
  }
};

const getMenuByCafe = async (cafeId) => {
  if (!cafeId) throw new Error("ID quán cafe không được để trống");

  try {
    const menu = await Menu.find({ cafe: cafeId });
    return menu;
  } catch (error) {
    throw new Error("Lỗi khi lấy menu: " + error.message);
  }
};

const updateMenuItem = async (itemId, updateData) => {
  if (!itemId) throw new Error("ID món không được để trống");

  try {
    const updatedItem = await Menu.findByIdAndUpdate(itemId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) throw new Error("Không tìm thấy món ăn để cập nhật");

    return updatedItem;
  } catch (error) {
    throw new Error("Lỗi khi cập nhật món: " + error.message);
  }
};

const deleteMenuItem = async (itemId) => {
  if (!itemId) throw new Error("ID món không được để trống");

  try {
    const deletedItem = await Menu.findByIdAndDelete(itemId);
    if (!deletedItem) throw new Error("Không tìm thấy món ăn để xóa");

    return deletedItem;
  } catch (error) {
    throw new Error("Lỗi khi xóa món: " + error.message);
  }
};

module.exports = {
  addMenuItem,
  getMenuByCafe,
  updateMenuItem,
  deleteMenuItem,
};
