const express = require("express");
const router = express.Router();
const { getTeam } = require("../controllers/teamController");
const protect = require("../middlewares/authMiddleware");

router.get("/", protect, getTeam);

module.exports = router;
