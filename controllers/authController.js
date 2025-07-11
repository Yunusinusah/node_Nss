const bcrypt = require("bcrypt");
const users = require("../config/data"); // Assume: users is a Map<id, user>
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || "15m";

let userIdCounter = 1;

class AuthController {
  // Register new user
  async register(req, res) {
    const { username, password } = req.body;

    // Prevent duplicate usernames
    for (const user of users.values()) {
      if (user.username === username) {
        return res.status(400).json({ message: "User already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = userIdCounter++;

    users.set(id, { id, username, password: hashedPassword });

    return res.status(201).json({ message: "User registered", id });
  }

  // Login
  async login(req, res) {
    const { username, password } = req.body;

    const user = [...users.values()].find(u => u.username === username);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRY,
    });

    return res.json({ token });
  }

  // Profile by user ID
  async profile(req, res) {
    const userId = req.user.id;
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ id: user.id, username: user.username });
  }
}

module.exports = new AuthController();
