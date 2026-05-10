const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    city: String,
    date: String,
    location: String,
    price: Number,
    seats: Number,
    description: String,
    img: String,
    tag: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);