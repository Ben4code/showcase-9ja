import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: { rejectUnauthorized: false },
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id SERIAL PRIMARY KEY,
      username VARCHAR(20) NOT NULL,
      score INTEGER NOT NULL,
      category VARCHAR(50) NOT NULL,
      timestamp BIGINT NOT NULL
    )
  `);
}
