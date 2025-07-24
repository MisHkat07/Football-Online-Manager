const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: String,
  position: {
    type: String,
    enum: ["Goalkeeper", "Defender", "Midfielder", "Attacker"],
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  isListed: {
    type: Boolean,
    default: false,
  },
  askingPrice: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "",
  },
});

const playerPriceSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const playerRatingSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  Player: mongoose.model("Player", playerSchema),
  PlayerPrice: mongoose.model("PlayerPrice", playerPriceSchema),
  PlayerRating: mongoose.model("PlayerRating", playerRatingSchema),
};
