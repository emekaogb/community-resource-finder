import { Router } from "express";
import { pool } from "../config/database.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/:resourceId", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT rv.*, u.name AS user_name, u.image AS user_image
      FROM reviews rv
      JOIN "user" u ON rv.user_id = u.id
      WHERE rv.resource_id = $1
      ORDER BY rv.created_at DESC
    `, [req.params.resourceId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

router.post("/:resourceId", requireAuth, async (req, res) => {
  const { rating, comment } = req.body;
  if (!rating || !comment) return res.status(400).json({ error: "Rating and comment are required" });
  try {
    const { rows } = await pool.query(`
      INSERT INTO reviews (user_id, resource_id, rating, comment, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *
    `, [req.user.id, req.params.resourceId, rating, comment]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create review" });
  }
});

export default router;
