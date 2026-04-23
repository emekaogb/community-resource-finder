import { Router } from "express";
import { pool } from "../config/database.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM resources ORDER BY id");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM resources WHERE id = $1", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Resource not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resource" });
  }
});

export default router;
