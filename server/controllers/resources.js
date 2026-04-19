import { pool } from "../config/database.js"

const createFavorite = async (req, res) => {
    try {
        const { user_id, resource_id } = req.body
        const results = await pool.query(`
            INSERT INTO user_favorites (user_id, resource_id)
            VALUES($1, $2)
            RETURNING *`,
        )
    } catch (err) {

    }
}