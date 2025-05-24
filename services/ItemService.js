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

  const newItemData = {
    menuId,
    name: itemData.name,
    price: Number(itemData.price),
    category: itemData.category,
    image: itemData.image,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await Item.collection.insertOne(newItemData);
  const newItem = { ...newItemData, _id: result.insertedId };
  await Menu.collection.updateOne(
    { _id: menuId },
    { $push: { items: newItem._id } }
  );
  return newItem;
};

const updateitem = async (itemId, updateData) => {
  if (!itemId) throw new Error("ID món không được để trống");
  const updatedItem = await Item.findByIdAndUpdate(itemId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedItem) throw new Error("Không tìm thấy món ăn để cập nhật");
  return updatedItem;
};

const deleteitem = async (itemId) => {
  if (!itemId) throw new Error("ID món không được để trống");
  const deletedItem = await Item.findByIdAndDelete(itemId);
  if (!deletedItem) throw new Error("Không tìm thấy món ăn để xóa");
  return deletedItem;
};

module.exports = {
  additem,
  updateitem,
  deleteitem,
};
