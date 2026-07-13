import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.get('/', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT username, score, category, timestamp FROM leaderboard ORDER BY score DESC LIMIT 50'
  );
  res.json({ leaderboard: rows });
});

router.post('/', async (req, res) => {
  const { username, score, category } = req.body as {
    username: string;
    score: number;
    category: string;
  };
  if (!username || typeof score !== 'number' || !category) {
    res.status(400).json({ error: 'username, score, and category are required' });
    return;
  }
  const entry = { username: username.slice(0, 20), score, category, timestamp: Date.now() };
  await pool.query(
    'INSERT INTO leaderboard (username, score, category, timestamp) VALUES ($1, $2, $3, $4)',
    [entry.username, entry.score, entry.category, entry.timestamp]
  );
  res.json({ ok: true, entry });
});

export default router;
