// Angrej Singh - 026
// Akashdeep Singh Gill - 925
// Karanpreet Sachdeva - 994
// Riya Sidhu - 435
// Manmeet Kaur - 039

const mongoose = require("mongoose");

const carStatusSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  CarId: {
    type: mongoose.Schema.ObjectId,
    ref: "Car",
    require: true,
  },
  carStatus: {
    type: String,
    enum: ["", "Pending", "Sold", "Rejected"],
    required: false,
  },
});

const CarStatus = mongoose.model("CarStatus", carStatusSchema);

module.exports = CarStatus;
