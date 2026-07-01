// Load env variables
require("dotenv").config();
require("./db");

// Imports
const express = require("express");
const cors = require("cors");

// App init
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Placement Management Backend is running");
});

// ROUTES
const authRoutes = require("./routes/auth.routes");
const studentRoutes = require("./routes/student.routes");

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
