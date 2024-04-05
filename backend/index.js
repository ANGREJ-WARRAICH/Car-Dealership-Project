// Angrej Singh - 026
// Akashdeep Singh Gill - 925
// Karanpreet Sachdeva - 994
// Riya Sidhu - 435
// Manmeet Kaur - 039

const { config } = require("dotenv");
const app = require("./app");
const connectDB = require("./db");

config({ path: "./config.env" });
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
