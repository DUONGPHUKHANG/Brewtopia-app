const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    cafe: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe", required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    bestSeller: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);
const menu = mongoose.model("Menu", MenuSchema);
module.exports = menu;
