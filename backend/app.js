// Angrej Singh - 026
// Akashdeep Singh Gill - 925
// Karanpreet Sachdeva - 994
// Riya Sidhu - 435
// Manmeet Kaur - 039

const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { hashPasswordfunc } = require("./bcrypt");
const Car = require("./models/Car");
const { isAuth, isAdmin } = require("./middleware");
const app = express();
const multer = require("multer");
const fs = require("fs/promises");
const CarStatus = require("./models/CarStatus");
const { ObjectId } = require("mongodb");
const passwordValidator = require("password-validator");
const passwordSchema = new passwordValidator();
const nodemailer = require("nodemailer");
const { config } = require("dotenv");
const winston = require('winston');
var date = Date.now();
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'projectlogs.log' })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});
config({ path: "./config.env" });
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Add properties to the schema
passwordSchema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

app.post("/register", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Validate password against the schema
    if (!passwordSchema.validate(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password Must be at least 8 characters long. Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }
    let user = await User.findOne({ email });

    if (user) {
      logger.error("User already exists");
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await hashPasswordfunc(password);
    user = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    logger.info("User registered successsfully");
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Registered Successfully",
        token,
        user,
      });
  } catch (error) {
    next(error);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      logger.info("All fields are required");
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      logger.error("Invalid Email or Password");
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    logger.info("Login Successfully");
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
  } catch (error) {
    next(error);
  }
});

app.get("/logout", (req, res, next) => {
  try {
    return res
      .status(200)
      .cookie("token", null, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message: "Logout Successfully",
      });
  } catch (error) {
    next(error);
  }
});

// photo upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//Create car
app.post(
  "/car",
  isAuth,
  isAdmin("admin"),
  upload.single("file"),
  async (req, res, next) => {
    try {
      const {
        make,
        model,
        year,
        color,
        price,
        mileage,
        fuelType,
        transmission,
        engineSize,
        vin,
        carStatus,
      } = req.body;
      await Car.create({
        photo: req.file.path,
        make,
        model,
        year,
        color,
        price,
        mileage,
        fuelType,
        transmission,
        engineSize,
        vin,
        carStatus,
      });
      return res.status(201).json({
        success: true,
        message: "Car Created Successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

app.post("/emailSend", isAuth, async (req, res) => {
  try {
    const { _id } = req.body;

    let user = await User.findById({ _id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    console.log("useruser::::::", user);
    console.log("process.env.EMAIL,::::::", process.env.EMAIL);
    console.log("process.env.PASSWORD::::::", process.env.PASSWORD);

    const transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      // to: user.email,
      to: "lambtoncar22@gmail.com",
      subject: "Request to admin for approval",
      html: `<p>Dear Admin,</p>
      <p>I hope this message finds you well. I wanted to inform you that a new car request has been submitted by ${user.name}. Kindly review the request at your earliest convenience.</p>
      <p>Thank you for your attention to this matter.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(400).send({ success: false, message: error.message });
      } else {
        return res.status(201).json({
          success: true,
          message: "Mail has been send",
          info,
        });
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

// car status
app.post("/carStatus", isAuth, async (req, res, next) => {
  try {
    const { userId, CarId, carStatus } = req.body;
    await CarStatus.create({
      userId: new ObjectId(userId),
      CarId: new ObjectId(CarId),
      carStatus,
    });
    return res.status(201).json({
      success: true,
      message: "Car status added",
    });
  } catch (error) {
    next(error);
  }
});

// get car status
app.get("/CarStatus", isAuth, async (req, res, next) => {
  try {
    const getCars = await CarStatus.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $lookup: {
          from: "cars",
          localField: "CarId",
          foreignField: "_id",
          as: "cars",
        },
      },
      {
        $project: {
          userId: "$users",
          carId: "$cars",
          carStatus: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Cars fetched Successfully",
      cars: getCars,
    });
  } catch (error) {
    next(error);
  }
});

// car status update
app.put("/carStatus/:id", isAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { carStatus } = req.body;
    await CarStatus.findByIdAndUpdate(id, {
      carStatus,
    });
    return res.status(201).json({
      success: true,
      message: "Car status updated",
    });
  } catch (error) {
    next(error);
  }
});

// get all cars
app.get("/car", isAuth, async (req, res, next) => {
  try {
    const { price, year, color, make, model, carStatus } = req.query;
    const query = {};
    if (price) {
      query.price = Number(price);
    }
    if (year) {
      query.year = Number(year);
    }
    if (color) {
      query.color = color;
    }
    if (make) {
      query.make = make;
    }
    if (model) {
      query.model = model;
    }
    if (carStatus) {
      const statusArray = carStatus.split(",");
      query.carStatus = { $in: statusArray };
    }
    const cars = await Car.find(query);
    return res.status(200).json({
      success: true,
      cars,
    });
  } catch (error) {
    next(error);
  }
});

//get one
app.get("/car/:id", isAuth, async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      car,
    });
  } catch (error) {
    next(error);
  }
});

// update car
app.put(
  "/car/:id",
  isAuth,
  isAdmin("admin", "salePerson"),
  upload.single("file"),
  async (req, res, next) => {
    try {
      const {
        make,
        model,
        year,
        color,
        price,
        mileage,
        fuelType,
        transmission,
        engineSize,
        vin,
      } = req.body;
      const getOneCar = await Car.findById(req.params.id);
      let updatedFields = {
        make,
        model,
        year,
        color,
        price,
        mileage,
        fuelType,
        transmission,
        engineSize,
        vin,
      };

      if (req.file) {
        await fs.unlink(getOneCar?.photo);
        updatedFields.photo = req.file.path;
      }

      let updatedCar = await Car.findByIdAndUpdate(
        req.params.id,
        updatedFields
      );

      if (!updatedCar) {
        return res.status(404).json({
          success: false,
          message: "Car Not Found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Car Updated Successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

// delete car
app.delete("/car/:id", isAuth, isAdmin("admin"), async (req, res, next) => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car Not Found",
      });
    }
    await fs.unlink(car.photo);
    await car.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Car Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
});

app.use("*", (req, res, next) => {
  try {
    return res.status(404).json({
      success: false,
      message: "Route Not Found",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = app;
