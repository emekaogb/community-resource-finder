import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";
import userRoutes from "./routes/users.js";
import "dotenv/config";

const app = express();

/* Better Auth */
app.all("/api/auth/{*path}", toNodeHandler(auth));

/* Express */
app.use(express.json());

/* Routes */
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

/* Server */
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});