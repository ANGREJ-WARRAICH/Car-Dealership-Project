// Angrej Singh - 026
// Akashdeep Singh Gill - 925
// Karanpreet Sachdeva - 994
// Riya Sidhu - 435
// Manmeet Kaur - 039
const bcrypt = require("bcryptjs");
const hashPasswordfunc = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};

module.exports = { hashPasswordfunc };
