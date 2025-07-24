const express = require("express");
const router = express.Router();
const {
  getMarketPlayers,
  buyPlayer,
} = require("../controllers/marketController");
const protect = require("../middlewares/authMiddleware");

router.get("/", getMarketPlayers); 

router.post(
  "/buy/:playerId",
  protect,
  buyPlayer
);


module.exports = router;
