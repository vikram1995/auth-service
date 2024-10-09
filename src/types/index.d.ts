declare module "express-session" {
  import { Session } from "express-session";

  interface SessionData {
    userId: string; // Store user ID in session
  }
}
