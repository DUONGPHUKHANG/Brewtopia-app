const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    cafe: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe", required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
    itemCount: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

const Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu;
