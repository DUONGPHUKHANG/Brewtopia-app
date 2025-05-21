const Item = require("../models/Item");
const Menu = require("../models/Menu");

const additem = async (menuId, itemData) => {
  if (
    !menuId ||
    !itemData.name ||
    !itemData.price ||
    !itemData.category ||
    !itemData.image
  ) {
    throw new Error(
      "Thiếu thông tin: menuId, tên món, giá, danh mục và ảnh không được để trống"
    );
  }

  try {
    // Tạo món mới
    const newItem = new Item({
      menuId: menuId,
      name: itemData.name,
      price: Number(itemData.price),
      category: itemData.category,
      image: itemData.image,
    });
    await newItem.save();
    // Cập nhật Menu thêm món này vào items
    await Menu.findByIdAndUpdate(
      menuId,
      { $push: { items: newItem._id } },
      { new: true }
    );

    return newItem;
  } catch (error) {
    throw new Error("Lỗi khi thêm món: " + error.message);
  }
};

const updateitem = async (itemId, updateData) => {
  if (!itemId) throw new Error("ID món không được để trống");

  try {
    const updatedItem = await Item.findByIdAndUpdate(itemId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) throw new Error("Không tìm thấy món ăn để cập nhật");

    return updatedItem;
  } catch (error) {
    throw new Error("Lỗi khi cập nhật món: " + error.message);
  }
};

const deleteitem = async (itemId) => {
  if (!itemId) throw new Error("ID món không được để trống");

  try {
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) throw new Error("Không tìm thấy món ăn để xóa");

    return deletedItem;
  } catch (error) {
    throw new Error("Lỗi khi xóa món: " + error.message);
  }
};

module.exports = {
  additem,
  updateitem,
  deleteitem,
};
