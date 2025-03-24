const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    cafe: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe" },
    title: String,
    description: String,
    date: Date,
    image: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Event", EventSchema);
