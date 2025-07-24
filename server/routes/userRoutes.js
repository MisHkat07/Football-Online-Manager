const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { getUserById } = require("../controllers/userController");

const router = express.Router();

router.get("/:id", protect, getUserById);

module.exports = router;
