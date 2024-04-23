import mysql from 'mysql2/promise';

// Configuration for the database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// A function to get a connection from the pool
export async function getConnection() {
    return await pool.getConnection();
}