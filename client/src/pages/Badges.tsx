import { motion } from 'framer-motion';
import { ArrowLeft, Award } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { BADGES } from '../types/progress';

interface BadgesProps {
  onBack: () => void;
}

export function Badges({ onBack }: BadgesProps) {
  const { progress } = useProgress();

  const earnedBadges = BADGES.filter(b => progress.badges.includes(b.id));
  const unearnedBadges = BADGES.filter(b => !progress.badges.includes(b.id));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col min-h-full pb-24"
    >
      <div className="bg-gradient-to-br from-nigerian-green to-nigerian-green-dark pt-10 pb-6 px-4">
        <div className="flex items-center gap-2">
          <button onClick={onBack} aria-label="Back to profile" className="p-1.5 bg-white/20 rounded-xl text-white mr-1">
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center gap-2">
            <Award size={20} className="text-festive-gold" />
            <h1 className="text-white font-black text-xl">Badges</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-4">
        {/* Earned badges */}
        {earnedBadges.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-3">
              Badges Earned ({earnedBadges.length}/{BADGES.length})
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {earnedBadges.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-3 border border-festive-gold/30 dark:border-festive-gold/20 shadow-sm"
                >
                  <div className="text-2xl mb-1">{badge.emoji}</div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{badge.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{badge.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Locked badges */}
        {unearnedBadges.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-400 dark:text-gray-500 text-sm mb-3">Locked Badges</h2>
            <div className="grid grid-cols-2 gap-2">
              {unearnedBadges.map(badge => (
                <div
                  key={badge.id}
                  className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-3 border border-gray-100 dark:border-gray-700 opacity-60"
                >
                  <div className="text-2xl mb-1 grayscale">{badge.emoji}</div>
                  <p className="font-bold text-gray-500 dark:text-gray-400 text-sm">{badge.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No badges yet */}
        {earnedBadges.length === 0 && unearnedBadges.length === BADGES.length && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 text-center shadow-sm">
            <p className="text-4xl mb-2">🏅</p>
            <p className="font-bold text-gray-700 dark:text-gray-300">No badges yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Complete quizzes to earn badges!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
