import { Router } from "express";
import { pool } from "../config/database.js";
import { searchPlaces, getPlaceDetails, transformPlace, CATEGORIES } from "../config/places.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT r.*, array_agg(c.name) FILTER (WHERE c.name IS NOT NULL) AS categories
      FROM resources r
      LEFT JOIN resource_category rc ON r.id = rc.resource_id
      LEFT JOIN categories c ON rc.category_id = c.id
      GROUP BY r.id
      ORDER BY r.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;

  const roundedLat = lat ? Math.round(parseFloat(lat) * 100) / 100 : null;
  const roundedLng = lng ? Math.round(parseFloat(lng) * 100) / 100 : null;

  try {
    if (roundedLat && roundedLng) {
      const { rows: cached } = await pool.query(
        `SELECT COUNT(*) FROM resources WHERE lat = $1 AND lng = $2`,
        [roundedLat, roundedLng]
      );

      if (parseInt(cached[0].count) > 0) {
        const { rows } = await pool.query(`
          SELECT r.*, array_agg(c.name) FILTER (WHERE c.name IS NOT NULL) AS categories
          FROM resources r
          LEFT JOIN resource_category rc ON r.id = rc.resource_id
          LEFT JOIN categories c ON rc.category_id = c.id
          WHERE r.lat = $1 AND r.lng = $2
          GROUP BY r.id
          ORDER BY r.id
        `, [roundedLat, roundedLng]);
        return res.json(rows);
      }
    }

    const results = await Promise.all(
      CATEGORIES.map(async (category) => {
        const places = await searchPlaces(category, lat, lng);
        return places.map(p => ({ ...p, category }));
      })
    );
    const places = results.flat();

    const resources = await Promise.all(
      places.map(async (p) => {
        const details = await getPlaceDetails(p.place_id);
        const resource = transformPlace(details);

        const { rows } = await pool.query(
          `INSERT INTO resources (place_id, name, street, city, state, zip_code, lat, lng, description, phone, website, image)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
           ON CONFLICT (place_id) DO NOTHING
           RETURNING id`,
          [resource.id, resource.name, resource.street, resource.city, resource.state,
           resource.zip_code, roundedLat, roundedLng, resource.description, resource.phone, resource.website, resource.image]
        );

        const resourceId = rows[0]?.id ?? (
          await pool.query(`SELECT id FROM resources WHERE place_id = $1`, [resource.id])
        ).rows[0].id;

        await pool.query(
          `INSERT INTO resource_category (resource_id, category_id)
           SELECT $1, id FROM categories WHERE name = $2
           ON CONFLICT (resource_id, category_id) DO NOTHING`,
          [resourceId, p.category]
        );

        return { ...resource, id: resourceId, category: p.category };
      })
    );

    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch nearby resources" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT r.*, array_agg(c.name) FILTER (WHERE c.name IS NOT NULL) AS categories
      FROM resources r
      LEFT JOIN resource_category rc ON r.id = rc.resource_id
      LEFT JOIN categories c ON rc.category_id = c.id
      WHERE r.id = $1
      GROUP BY r.id
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Resource not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resource" });
  }
});

export default router;
