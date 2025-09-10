import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: "All fields are required" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ username, email, password });
  return res.json({
    user: { _id: user._id, username: user.username, email: user.email },
    token: generateToken(user._id)
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "All fields are required" });
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  return res.json({
    user: { _id: user._id, username: user.username, email: user.email },
    token: generateToken(user._id)
  });
};

export const me = async (req, res) => {
  res.json(req.user);
};
