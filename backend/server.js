const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes")
dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");



connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.use("/api/test", testRoutes)