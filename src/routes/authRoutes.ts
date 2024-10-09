import express from "express";
import passport from "passport";
import { registerUser, loginUser } from "../controllers/authController";
import validate from "../middlewares/validationMiddleware";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validators/userValidators";

const router = express.Router();

// Register route
router.post("/register", validate(registerUserSchema), registerUser);

// Login route
router.post(
  "/login",
  validate(loginUserSchema),
  passport.authenticate("local"),
  loginUser
);

// Google auth routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

export default router;
