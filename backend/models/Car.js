// Angrej Singh - 026
// Akashdeep Singh Gill - 925
// Karanpreet Sachdeva - 994
// Riya Sidhu - 435
// Manmeet Kaur - 039

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    required: true,
    type: String,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    enum: ["Manual", "Automatic"],
    required: true,
  },
  fuelType: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    required: true,
  },
  vin: {
    type: String,
    required: true,
  },
  engineSize: {
    type: Number,
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
