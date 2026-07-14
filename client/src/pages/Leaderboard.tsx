import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { CATEGORIES } from '../types/quiz';

interface GlobalEntry {
  username: string;
  score: number;
  category: string;
  timestamp: number;
}

export function Leaderboard() {
  const { progress } = useProgress();
  const [global, setGlobal] = useState<GlobalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(r => r.json())
      .then(({ leaderboard }) => setGlobal(leaderboard ?? []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-full pb-24">
      <div className="bg-gradient-to-br from-nigerian-green to-green-700 pt-10 pb-6 px-4 rounded-b-2xl">
        <h1 className="text-white font-black text-xl">Leaderboard</h1>
        <p className="text-white/70 text-xs mt-1">Global rankings</p>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {loading ? (
          <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">Loading…</div>
        ) : error ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 text-center">
            <p className="text-4xl mb-2">⚠️</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Couldn't load global rankings.</p>
          </div>
        ) : global.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 text-center">
            <p className="text-4xl mb-2">🏅</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">No global scores yet.</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Complete a quiz to appear here!</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            {global.map((entry, i) => {
              const category = CATEGORIES.find(c => c.id === entry.category);
              const isMe = entry.username === progress.username;
              return (
                <motion.div
                  key={`${entry.username}-${entry.timestamp}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-center gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-700 last:border-0 ${isMe ? 'bg-nigerian-green/5' : ''}`}
                >
                  <span className="w-6 text-center text-sm font-bold text-gray-400 dark:text-gray-500 flex-shrink-0">
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm truncate ${isMe ? 'text-nigerian-green' : 'text-gray-900 dark:text-white'}`}>
                      {entry.username}
                      {isMe && ' (you)'}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {category ? `${category.emoji} ${category.label}` : entry.category}
                    </p>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-gray-200 tabular-nums flex-shrink-0">
                    {entry.score.toLocaleString()}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
