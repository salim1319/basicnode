import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const categories = [
  { label: "Travel", icon: "user" },
  { label: "Shopping", icon: "user" },
  { label: "Travaling", icon: "user" },
  { label: "Bills", icon: "user" },
];

// REGISTRATION PART

export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(406).json({ message: "user is already exsists in this email" });
    return;
  }

  //hash password
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = await User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    categories,
  });

  await user.save();

  res.status(201).json({ message: "user is created" });
};

//////////LOGIN PART///////////

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(406).json({ message: "user not found" });
    return;
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    res.status(406).json({ message: "user not found" });
    return;
  }

  //create jwt token
  const payload = {
    username: email,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ message: "successfully logged in...", token, user });
};
