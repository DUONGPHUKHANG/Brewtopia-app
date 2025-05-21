// models/MenuItem.js
const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema(
  {
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    category: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: null },
    bestSeller: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const Item = mongoose.model("MenuItem", MenuItemSchema);
module.exports = Item;
