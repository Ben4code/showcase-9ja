import { motion } from 'framer-motion';
import { ArrowLeft, Trophy } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { CATEGORIES } from '../types/quiz';

interface YourScoresProps {
  onBack: () => void;
}

export function YourScores({ onBack }: YourScoresProps) {
  const { progress } = useProgress();

  const catStats = CATEGORIES.map(cat => ({
    category: cat,
    progress: progress.categories[cat.id],
  })).sort((a, b) => (b.progress?.highScore ?? 0) - (a.progress?.highScore ?? 0));

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
            <Trophy size={20} className="text-festive-gold" />
            <h1 className="text-white font-black text-xl">Your Scores</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        {catStats.map(({ category, progress: cp }, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-3 border border-gray-100 dark:border-gray-700 flex items-center gap-3"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.bgGradient} flex items-center justify-center text-lg flex-shrink-0`}>
              {category.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{category.label}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{cp?.totalPlays ?? 0} plays</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-black text-gray-900 dark:text-white">{(cp?.highScore ?? 0).toLocaleString()}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">pts</p>
            </div>
            {cp?.completed && (
              <span className="text-xs bg-nigerian-green text-white px-2 py-0.5 rounded-full font-bold">✓</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
