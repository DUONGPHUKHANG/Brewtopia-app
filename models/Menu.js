const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    cafe: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe" },
    name: String,
    price: Number,
    image: String,
  },
  { timestamps: true, versionKey: false }
);
const menu = mongoose.model("Menu", MenuSchema);
module.exports = menu;
