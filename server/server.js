const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes Middleware
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/payments", paymentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
