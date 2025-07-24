const { Player } = require("../models/Player");
const Team = require("../models/Team");
const User = require("../models/User");

const getMarketPlayers = async (req, res) => {
  try {
    const players = await Player.find({ isListed: true }).populate("teamId");
    const formatted = players.map((p) => ({
      _id: p._id,
      name: p.name,
      position: p.position,
      askingPrice: p.askingPrice,
      teamId: p.teamId._id,
      teamName: p.teamId.name || "Unknown",
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch market players" });
  }
};

const buyPlayer = async (req, res) => {
  const buyerUser = req.user;
  const { playerId } = req.params;

  try {
    const player = await Player.findById(playerId);
    if (!player || !player.isListed) {
      return res.status(404).json({ error: "Player not listed for sale" });
    }

    const sellerTeam = await Team.findById(player.teamId);
    const buyerTeam = await Team.findOne({ userId: buyerUser._id });

    if (!buyerTeam || !sellerTeam) {
      return res.status(404).json({ error: "Team(s) not found" });
    }

    if (buyerTeam._id.equals(sellerTeam._id)) {
      return res.status(400).json({ error: "Cannot buy your own player" });
    }

    const price = Math.floor(player.askingPrice * 0.95);

    // Get buyer and seller users
    const buyerUserDoc = await User.findById(buyerUser._id);
    const sellerUserDoc = await User.findById(sellerTeam.userId);
    if (!buyerUserDoc || !sellerUserDoc) {
      return res.status(404).json({ error: "User(s) not found" });
    }
    if (buyerUserDoc.budget < price) {
      return res.status(400).json({ error: "Insufficient budget" });
    }

    if (buyerTeam.players.length >= 25) {
      return res
        .status(400)
        .json({ error: "Your team has reached the max 25 player limit" });
    }

    if (sellerTeam.players.length <= 15) {
      return res
        .status(400)
        .json({ error: "Seller cannot drop below 15 players" });
    }
    // Update player details
    player.teamId = buyerTeam._id;
    player.isListed = false;
    player.askingPrice = 0;
    await player.save();

    buyerTeam.players.push(player._id);
    await buyerTeam.save();

    sellerTeam.players = sellerTeam.players.filter(
      (pId) => pId.toString() !== player._id.toString()
    );
    await sellerTeam.save();
    
    buyerUserDoc.budget -= price;
    sellerUserDoc.budget += price;
    await buyerUserDoc.save();
    await sellerUserDoc.save();

    res.json({ message: "Player bought successfully", playerId: player._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Transfer failed" });
  }
};

module.exports = {
  getMarketPlayers,
  buyPlayer,
};
