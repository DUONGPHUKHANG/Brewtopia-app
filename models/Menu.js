const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    cafe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cafe",
      required: true,
      index: true,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
    itemCount: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

// Middleware để tự động cập nhật itemCount
MenuSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.$push && update.$push.items) {
    this.update({}, { $inc: { itemCount: 1 } });
  }
  if (update.$pull && update.$pull.items) {
    this.update({}, { $inc: { itemCount: -1 } });
  }
  next();
});

const Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu;
