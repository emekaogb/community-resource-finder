import { Router } from "express";
import { pool } from "../config/database.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT r.*, array_agg(c.name) FILTER (WHERE c.name IS NOT NULL) AS categories
      FROM resources r
      JOIN user_favorites uf ON r.id = uf.resource_id
      LEFT JOIN resource_category rc ON r.id = rc.resource_id
      LEFT JOIN categories c ON rc.category_id = c.id
      WHERE uf.user_id = $1
      GROUP BY r.id
      ORDER BY r.id
    `, [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

router.post("/:resourceId", async (req, res) => {
  try {
    await pool.query(
      `INSERT INTO user_favorites (user_id, resource_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [req.user.id, req.params.resourceId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("POST /favorites error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:resourceId", async (req, res) => {
  try {
    await pool.query(
      `DELETE FROM user_favorites WHERE user_id = $1 AND resource_id = $2`,
      [req.user.id, req.params.resourceId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});

export default router;
