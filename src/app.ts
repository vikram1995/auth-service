import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import authRoutes from "./routes/authRoutes";
import { configurePassport } from "./config/passportConfig";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true, // Replace with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies to be sent if needed
  })
);

// Session middleware
app.use(
  session({
    secret: "your-secret-key", //process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true, // Makes the cookie inaccessible to JavaScript
      secure: process.env.NODE_ENV === "production", // Set to true only in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    },
  })
);
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
configurePassport(passport);

// Routes
app.use("/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
