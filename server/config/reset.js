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
            phone varchar(255),
            website varchar(255),
            image text
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 resources table created successfully')
    } catch (err) {
        console.error('⚠️ error creating resources table', err)
    }
}

// Join table (user <--> resource)
const createFavoritesTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS user_favorites;

        CREATE TABLE IF NOT EXISTS user_favorites (
            user_id text NOT NULL,
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

const createCategoriesTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS categories;

        CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            name varchar(255) NOT NULL,
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 categories table created successfully')
    } catch (err) {
        console.error('⚠️ error creating categories table', err)
    }
}

const createReviewsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS reviews;

        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            user_id text NOT NULL,
            resource_id integer NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (resource_id) REFERENCES resources(id),
            rating integer NOT NULL,
            comment text NOT NULL,
            created_at timestamp
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 reviews table created successfully')
    } catch (err) {
        console.error('⚠️ error creating reviews table', err)
    }
}

const createResourceCategoryTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS resource_category;

        CREATE TABLE IF NOT EXISTS resource_category (
            resource_id integer NOT NULL,
            category_id integer NOT NULL,
            FOREIGN KEY (resource_id) REFERENCES resources(id),
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 resource_category table created successfully')
    } catch (err) {
        console.error('⚠️ error creating resource_category table', err)
    }
}

