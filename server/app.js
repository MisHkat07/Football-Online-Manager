const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const marketRoutes = require("./routes/marketRoutes");
const userRoutes = require("./routes/userRoutes");
const playerRoutes = require("./routes/playerRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/users", userRoutes);
app.use("/api/players", playerRoutes);

// Status check
app.get("/", (req, res) => {
  res.send("Fantasy Manager API is running");
});

module.exports = app;
