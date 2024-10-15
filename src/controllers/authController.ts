import { Request, Response } from "express";
import User from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        message:
          "This email is already associated with an account. Please use a different email or log in.",
      });
      return;
    }

    // Create a new user
    user = new User({ name, email, password });
    await user.save();

    // Automatically log the user in after successful registration
    req.login(user, (err) => {
      if (err) {
        res.status(500).json({
          message:
            "Registration successful, but we encountered an issue logging you in. Please try logging in manually.",
        });
        return;
      }
      delete user?.password;
      res.status(201).json({
        message: "Registration successful! You are now logged in.",
        success: true,
        user,
      });
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An unexpected error occurred on the server. Please try again later.",
    });
  }
};

export const loginUser = (req: Request, res: Response) => {
  console.log("Session ID:", req.session.id);
  res.status(200).json({
    message: "You have successfully logged in. Welcome back!",
    user: req.user,
  });
};

export const isLoggedIn = (req: Request, res: Response) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // If authenticated, return user info
    res.status(200).json({
      message: "User authenticated successfully",
      user: req.user,
    });
  } else {
    // If not authenticated, return unauthorized status
    res.status(401).json({ message: "Unauthorized" });
  }
};
