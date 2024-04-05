// Angrej Singh - 026
// Akashdeep Singh Gill - 925
// Karanpreet Sachdeva - 994
// Riya Sidhu - 435
// Manmeet Kaur - 039

const jwt = require("jsonwebtoken");
const User = require("./models/User");
const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: true,
        message: "Please login first",
      });
    }
    const tokenId = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(tokenId._id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (...types) => {
  return (req, res, next) => {
    if (!types.includes(req.user.type)) {
      return res.status(400).json({
        success: false,
        message: "Permission denied for user",
      });
    }
    next()
  };
};

module.exports = { isAuth,isAdmin };
