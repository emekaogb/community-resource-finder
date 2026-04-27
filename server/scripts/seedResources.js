import "dotenv/config";
import { searchPlaces, getPlaceDetails, transformPlace } from "../config/places.js";
import { pool } from "../config/database.js";

const insertResource = async (resource) => {
    const insertQuery = {
        text: 'INSERT INTO resources (name, street, city, state, zip_code, description, phone, website, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
    }

    const values = [
        resource.name,
        resource.street,
        resource.city,
        resource.state,
        resource.zip_code,
        resource.description,
        resource.phone,
        resource.website,
        resource.image
    ]

    await pool.query(insertQuery, values, (err, res) => {
        if (err) {
            console.error('⚠️ error inserting resource', err)
            return
        }

        console.log(`✅ ${resource.name} added successfully`)
    });
};

const CATEGORIES = [
    "Food Bank",
    "Homeless Shelter",
    "Free Low-Cost Clinic",
    "Mental Health Support",
    "Job Training Center",
    "Community Event",
    "After-School Programs",
    "Immigration Legal Aid",
];

const run = async () => {
    for (const category of CATEGORIES) {
        console.log(`🔍 Searching for: ${category}`);
        const places = await searchPlaces(category);

        for (const p of places) {
            const details = await getPlaceDetails(p.place_id);
            const resource = transformPlace(details);
            await insertResource(resource);
        }
    }

    console.log("Done seeding");
    process.exit();
};

run();