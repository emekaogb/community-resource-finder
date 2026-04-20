import { betterAuth } from "better-auth";
import { pool } from "../config/database.js"
import "dotenv/config";

export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});