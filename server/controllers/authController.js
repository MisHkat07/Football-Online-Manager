const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const generateTeamAndPlayers = require("../utils/generatePlayers");

const authUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    let user = await User.findOne({ email });

    if (user) {
      // login flow
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch)
        return res.status(401).json({ error: "Invalid credentials" });

      const token = generateToken(user._id);
      res.cookie("userId", user._id.toString());
      res.cookie("email", user.email);
      return res.json({ message: "Login successful", token });
    } else {
      // register floww
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      user = new User({ email, passwordHash });
      await user.save();

      const token = generateToken(user._id);

      setTimeout(async () => {
        try {
          await generateTeamAndPlayers(user._id);
          console.log(`Team created for user: ${user.email}`);
        } catch (err) {
          console.error("Team creation error:", err);
        }
      }, 1000);

      res.cookie("userId", user._id.toString());
      res.cookie("email", user.email);
      return res.status(201).json({ message: "User registered", token });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { authUser };
