const { Player } = require("../models/Player");

// Get player by ID
const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.json(player);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update player listin by ID

const updatePlayerUnListingById = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.json(player);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const updatePlayerListingById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    const Team = require("../models/Team");
    const team = await Team.findById(player.teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const teamPlayers = await Player.find({ teamId: team._id });
    const listedCount = teamPlayers.filter((p) => !p.isListed).length;

    if (listedCount <= 15) {
      return res
        .status(400)
        .json({ error: "Cannot have less than 15 players. Add more players to the team." });
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedPlayer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getPlayerById,
  updatePlayerListingById,
  updatePlayerUnListingById,
};
