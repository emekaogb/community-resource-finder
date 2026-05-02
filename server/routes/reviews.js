import { Router } from "express";
import { pool } from "../config/database.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/mine", requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT rv.*, r.name AS resource_name, u.name AS user_name, u.image AS user_image
      FROM reviews rv
      JOIN resources r ON rv.resource_id = r.id
      JOIN "user" u ON rv.user_id = u.id
      WHERE rv.user_id = $1
      ORDER BY rv.created_at DESC
    `, [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

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

router.delete("/:reviewId", requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING id`,
      [req.params.reviewId, req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Review not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete review" });
  }
});

router.put("/:reviewId", requireAuth, async (req, res) => {
  const { rating, comment } = req.body;
  if (!rating || !comment) return res.status(400).json({ error: "Rating and comment are required" });
  try {
    const { rows } = await pool.query(`
      UPDATE reviews SET rating = $1, comment = $2
      WHERE id = $3 AND user_id = $4
      RETURNING *
    `, [rating, comment, req.params.reviewId, req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Review not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update review" });
  }
});

export default router;
