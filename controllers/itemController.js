const { additem, updateitem, deleteitem } = require("../services/ItemService");

const addItem = async (req, res) => {
  try {
    const MenuId = req.params.id;
    const data = req.body;

    if (req.files && req.files["image"]) {
      const imageFile = req.files["image"][0];
      data.image = imageFile.path;
    }
    const newItemItem = await additem(MenuId, req.body);
    res.status(201).json(newItemItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const updatedItemItem = await updateitem(itemId, req.body);
    res.status(200).json(updatedItemItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const deletedItemItem = await deleteitem(itemId);
    res.status(200).json(deletedItemItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addItem,
  updateItem,
  deleteItem,
};
