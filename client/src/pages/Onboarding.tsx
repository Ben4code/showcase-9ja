import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: (name: string, country: string) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [step, setStep] = useState<'name' | 'country'>('name');

  const handleSubmit = () => {
    if (name.trim() && country.trim()) {
      onComplete(name.trim(), country.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nigerian-green to-green-700 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-sm shadow-2xl"
      >
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-4"
          >
            <Sparkles size={48} className="text-festive-gold" />
          </motion.div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
            {step === 'name' ? "What's your name?" : "Where are you from?"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {step === 'name' ? "Let's get to know you" : "Tell us about your home"}
          </p>
        </div>

        <div className="space-y-4">
          {step === 'name' ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && name.trim() && setStep('country')}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-nigerian-green focus:outline-none transition-colors"
                autoFocus
              />
              <button
                onClick={() => name.trim() && setStep('country')}
                disabled={!name.trim()}
                className="w-full mt-4 bg-nigerian-green text-white font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
              >
                Continue
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Enter your country"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-nigerian-green focus:outline-none transition-colors"
                autoFocus
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setStep('name')}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!country.trim()}
                  className="flex-1 bg-nigerian-green text-white font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
                >
                  Start Quiz
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
