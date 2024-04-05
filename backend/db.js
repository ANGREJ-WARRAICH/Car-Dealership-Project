// Angrej Singh - 026
// Akashdeep Singh Gill - 925
// Karanpreet Sachdeva - 994
// Riya Sidhu - 435
// Manmeet Kaur - 039

const mongoose = require("mongoose");
const User = require("./models/User");
const { hashPasswordfunc } = require("./bcrypt");

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`db Connected with host: ${connection.host}`);
    const users = await User.find({}).count();
    if (!users) {
      const hashedPassword = await hashPasswordfunc("admin@123");
      await User.create({
        email: "admin@gmail.com",
        password: hashedPassword,
        type: "admin",
        name: "Admin",
      });
    }
  } catch (error) {
    return error
  }
};

module.exports = connectDB;
