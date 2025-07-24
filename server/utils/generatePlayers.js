const { Player, PlayerPrice, PlayerRating } = require("../models/Player");
const Team = require("../models/Team");
const User = require("../models/User");

const POSITIONS = {
  Goalkeeper: 3,
  Defender: 6,
  Midfielder: 6,
  Attacker: 5,
};

const generateRandomName = () => {
  const firstNames = [
    "Leo",
    "Cristiano",
    "Neymar",
    "Kylian",
    "Erling",
    "Mo",
    "Luka",
    "Kevin",
    "Harry",
    "Karim",
    "Virgil",
    "Sadio",
    "Son",
    "Gareth",
    "Antoine",
    "Raheem",
    "Bruno",
    "Marcus",
    "Thomas",
    "Phil",
    "Jack",
    "Jadon",
    "Kai",
    "Romelu",
    "Timo",
    "Frenkie",
    "Alisson",
    "Ederson",
    "Thibaut",
    "Jan",
    "Jan Oblak",
    "Manuel",
    "Marc-André",
    "Gianluigi",
    "Kepa",
    "Jordan",
    "Hugo",
    "Hugo Lloris",
    "Jordan Pickford",
  ];
  const lastNames = [
    "Messi",
    "Ronaldo",
    "Jr",
    "Mbappe",
    "Haaland",
    "Salah",
    "Modric",
    "De Bruyne",
    "Kane",
    "Benzema",
    "Van Dijk",
    "Mane",
    "Son",
    "Bale",
    "Griezmann",
    "Sterling",
    "Fernandes",
    "Rashford",
    "Muller",
    "Foden",
    "Grealish",
    "Sancho",
    "Havertz",
    "Lukaku",
    "Werner",
    "De Jong",
    "Alisson",
    "Ederson",
    "Courtois",
    "Oblak",
    "Neuer",
    "Ter Stegen",
    "Donnarumma",
    "Kepa",
    "Pickford",
    "Lloris",
  ];
  return (
    firstNames[Math.floor(Math.random() * firstNames.length)] +
    " " +
    lastNames[Math.floor(Math.random() * lastNames.length)]
  );
};

const generateRandomTeamName = () => {
  const adjectives = [
    "Mighty",
    "Flying",
    "Golden",
    "Thunder",
    "Royal",
    "Brave",
    "Rapid",
    "Iron",
    "Wild",
    "United",
    "Dynamic",
    "Classic",
    "Epic",
    "Legendary",
    "Supreme",
    "Fierce",
    "Valiant",
    "Invincible",
    "Fearless",
    "Glorious",
    "Victorious",
    "Champion",
    "Elite",
  ];
  const surnames = [
    "Lions",
    "Eagles",
    "Wolves",
    "Tigers",
    "Dragons",
    "Sharks",
    "Bulls",
    "Falcons",
    "Panthers",
    "Hawks",
    "Raptors",
    "Stallions",
    "Foxes",
    "Bears",
    "Cheetahs",
    "Rhinos",
    "Cobras",
    "Leopards",
    "Pumas",
    "Grizzlies",
    "Buffaloes",
    "Mustangs",
    "Warriors",
    "Titans",
  ];
  return (
    adjectives[Math.floor(Math.random() * adjectives.length)] +
    " " +
    surnames[Math.floor(Math.random() * surnames.length)]
  );
};

const generateTeamAndPlayers = async (userId) => {
  const team = new Team({
    userId,
    name: generateRandomTeamName(),
    players: [],
  });

  await team.save();

  const players = [];

  for (const position in POSITIONS) {
    const count = POSITIONS[position];
    for (let i = 0; i < count; i++) {
      const player = new Player({
        name: generateRandomName(),
        position,
        teamId: team._id,
      });
      await player.save();

      player.image = `https://robohash.org/${player._id}?200x200`;
      await player.save();

      const price = Math.floor(Math.random() * 1000000) + 1000000;
      const playerPrice = new PlayerPrice({
        playerId: player._id,
        price,
      });
      await playerPrice.save();

      const rating = (Math.random() * 5 + 5).toFixed(1);
      const playerRating = new PlayerRating({
        playerId: player._id,
        rating: Number(rating),
      });
      await playerRating.save();

      players.push(player._id);
    }
  }

  team.players = players;
  await team.save();

  await User.findByIdAndUpdate(userId, { teamId: team._id });

  return team;
};

module.exports = generateTeamAndPlayers;
