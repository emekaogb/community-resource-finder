import dotenv from 'dotenv'
dotenv.config({ path: 'server/.env' })
import { pool } from "./database.js"

const createResourcesTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS resources;

        CREATE TABLE IF NOT EXISTS resources (
            id SERIAL PRIMARY KEY,
            place_id varchar(255),
            name varchar(255) NOT NULL,
            street varchar(255),
            city varchar(255),
            state varchar(255),
            zip_code integer,
            description varchar(500),
            phone integer,
            website varchar(255),
            image varchar(255)
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 resources table created successfully')
    } catch (err) {
        console.error('⚠️ error creating resources table', err)
    }
}

const seedResourcesTable = async () => {
    await createResourcesTable()

    resourcesData.forEach((resource) => {
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

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting resource', err)
                return
            }

            console.log(`✅ ${resource.name} added successfully`)
        })
    })
}

// Join table (user <--> resource)
const createFavoritesTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS user_favorites;

        CREATE TABLE IF NOT EXISTS user_favorites (
            user_id integer NOT NULL,
            resource_id integer NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (resource_id) REFERENCES resources(id)
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 favorites table created successfully')
    } catch (err) {
        console.error('⚠️ error creating favorites table', err)
    }
}