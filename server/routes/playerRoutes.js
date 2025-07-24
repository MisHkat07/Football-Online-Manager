const express = require("express");
const {
  getPlayerById,
  updatePlayerListingById,
  updatePlayerUnListingById,
} = require("../controllers/playerController");

const router = express.Router();

router.get("/:id", getPlayerById);

router.put("/list/:id", updatePlayerListingById);
router.put("/unlist/:id", updatePlayerUnListingById);

module.exports = router;
