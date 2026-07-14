import { neon, NeonQueryFunction } from '@neondatabase/serverless';

let sql: NeonQueryFunction<false, false> | null = null;

if (process.env.DATABASE_URL) {
  sql = neon(process.env.DATABASE_URL);
} else {
  console.warn('[db] DATABASE_URL not set — leaderboard persistence disabled');
}

export { sql };

const RETENTION_MS = 7 * 24 * 60 * 60 * 1000;

export async function initDb(): Promise<void> {
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id         SERIAL PRIMARY KEY,
      username   VARCHAR(20)  NOT NULL,
      email      VARCHAR(254),
      score      INTEGER      NOT NULL,
      category   VARCHAR(50)  NOT NULL,
      timestamp  BIGINT       NOT NULL
    )
  `;
  await sql`ALTER TABLE leaderboard ADD COLUMN IF NOT EXISTS email VARCHAR(254)`;
}

export async function purgeExpiredEntries(): Promise<void> {
  if (!sql) return;
  const cutoff = Date.now() - RETENTION_MS;
  try {
    await sql`DELETE FROM leaderboard WHERE timestamp < ${cutoff}`;
  } catch (err) {
    console.error('[db] Failed to purge expired leaderboard entries:', err);
  }
}
