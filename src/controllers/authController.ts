import { Request, Response } from "express";
import User from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    user = new User({ name, email, password });
    await user.save();

    req.login(user, (err) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error logging in after registration" });
        return;
      }

      res.status(201).json({ message: "User registered and logged in", user });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "Login successful", user: req.user });
};
