import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/me", requireAuth, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

export default router;