import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";
import userRoutes from "./routes/users.js";
import resourceRoutes from "./routes/resources.js";
import categoryRoutes from "./routes/categories.js";
import favoriteRoutes from "./routes/favorites.js";
import reviewRoutes from "./routes/reviews.js";
import "dotenv/config";

const app = express();

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, origin)
    else callback(new Error("Not allowed by CORS"))
  },
  credentials: true,
}));

/* Better Auth */
app.all("/api/auth/{*path}", toNodeHandler(auth));

/* Express */
app.use(express.json());

/* Routes */
app.use("/api/user", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

/* Server */
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});