import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo2.png';

interface AboutProps {
  onBack: () => void;
}

export function About({ onBack }: AboutProps) {
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
            <img src={logoImg} alt="Showcase Nigeria logo" className="w-7 h-7 object-contain" />
            <h1 className="text-white font-black text-xl">About</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="font-black text-gray-900 dark:text-white text-lg mb-2">Showcase Nigeria</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            A quiz app celebrating Nigerian food, music, culture, sports, geography, history,
            fashion, languages, and Nollywood — solo or with friends.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={18} className="text-nigerian-green" />
            <h2 className="font-black text-gray-900 dark:text-white text-lg">Privacy Policy</h2>
          </div>

          <div className="flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              Your quiz progress, streaks, and badges are stored only on this device
              (browser local storage) and are never sent to our servers.
            </p>
            <p>
              When you finish a quiz, your chosen username, score, and category are sent to
              our leaderboard database so you can see how you rank globally. If you optionally
              provide an email address, it is stored alongside your leaderboard entry and is
              never displayed publicly — it exists only in case we ever need to contact you
              about your scores.
            </p>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              We automatically delete all leaderboard entries — including usernames, scores,
              and any email addresses — after 7 days.
            </p>
            <p>
              We don't sell your data, use it for advertising, or share it with third parties.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
