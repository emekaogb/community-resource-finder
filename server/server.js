import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";
import userRoutes from "./routes/users.js";
import resourceRoutes from "./routes/resources.js";
import "dotenv/config";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

/* Better Auth */
app.all("/api/auth/{*path}", toNodeHandler(auth));

/* Express */
app.use(express.json());

/* Routes */
app.use("/api/user", userRoutes);
app.use("/api/resources", resourceRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

/* Server */
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});