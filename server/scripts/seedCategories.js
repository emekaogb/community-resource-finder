import "dotenv/config";
import { pool } from "../config/database.js";

const categoryNames = ["Food Bank", "Homeless Shelter", "Free/Low-Cost Clinic", "Mental Health Support", "Job Training Center", "Community Event", "After-School Programs", "Immigration/Legal Aid"]

const insertCategory = async (name) => {
    const insertQuery = {
        text: 'INSERT INTO categories (name) VALUES ($1)'
    }

    await pool.query(insertQuery, [name], (err, res) => {
        if (err) {
            console.error('⚠️ error inserting category', err)
            return
        }

        console.log(`✅ ${name} added successfully`)
    });
}

const run = async () => {
    for (const cn of categoryNames) {
        await insertCategory(cn);
    }
}

run();