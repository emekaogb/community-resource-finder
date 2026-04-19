import { betterAuth } from "better-auth";
import { postgresAdapter } from "better-auth/adapters/postgres";
import { pool } from "./database.js";

export const auth = betterAuth({
  database: postgresAdapter({
    pool,
  }),
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});