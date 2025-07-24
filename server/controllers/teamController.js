const Team = require("../models/Team");
const { PlayerPrice, PlayerRating } = require("../models/Player");

const getTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ userId: req.user._id }).populate(
      "players"
    );

    if (!team) {
      return res.status(404).json({
        error: "Team not found yet. Please wait for creation to complete.",
      });
    }

    const playersWithDetails = await Promise.all(
      team.players.map(async (p) => {
        const latestPrice = await PlayerPrice.findOne({ playerId: p._id }).sort(
          { date: -1 }
        );
        const latestRating = await PlayerRating.findOne({
          playerId: p._id,
        }).sort({ date: -1 });
        return {
          _id: p._id,
          name: p.name,
          position: p.position,
          isListed: p.isListed,
          askingPrice: p.askingPrice,
          image: p.image,
          teamId: p.teamId,
          price: latestPrice ? latestPrice.price : null,
          rating: latestRating ? latestRating.rating : null,
        };
      })
    );
    const userBudget = req.user.budget;
    res.json({
      _id: team._id,
      name: team.name,
      owner: req.user.email,
      budget: userBudget,
      players: playersWithDetails,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getTeam };
