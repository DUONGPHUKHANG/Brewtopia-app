const {
  addMenuItem,
  getMenuByCafe,
  updateMenuItem,
  deleteMenuItem,
} = require("../services/menuService");

const addMenu = async (req, res) => {
  try {
    const { cafeId } = req.params;
    const newMenuItem = await addMenuItem(cafeId, req.body);
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMenu = async (req, res) => {
  try {
    const { cafeId } = req.params;
    const menu = await getMenuByCafe(cafeId);
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { itemId } = req.params;
    const updatedItem = await updateMenuItem(itemId, req.body);
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { itemId } = req.params;
    const deletedItem = await deleteMenuItem(itemId);
    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addMenu, getMenu, updateMenu, deleteMenu };
