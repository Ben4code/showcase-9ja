import { useState } from 'react';
import { Edit3, Flame, Star, Target, Moon, Sun, Info, ChevronRight, Trophy, Award } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { BADGES } from '../types/progress';
import { useDark } from '../App';
import { About } from './About';
import { YourScores } from './YourScores';
import { Badges } from './Badges';
import logoImg from '../assets/logo2.png';

type ProfileView = 'menu' | 'about' | 'scores' | 'badges';

export function Profile() {
  const { progress, setUsername } = useProgress();
  const { isDark, toggle: toggleDark } = useDark();
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(progress.username);
  const [view, setView] = useState<ProfileView>('menu');

  const earnedBadgeCount = BADGES.filter(b => progress.badges.includes(b.id)).length;
  const completedCats = Object.values(progress.categories).filter(c => c.completed).length;

  const saveName = () => {
    if (nameInput.trim()) setUsername(nameInput.trim());
    setEditingName(false);
  };

  if (view === 'about') return <About onBack={() => setView('menu')} />;
  if (view === 'scores') return <YourScores onBack={() => setView('menu')} />;
  if (view === 'badges') return <Badges onBack={() => setView('menu')} />;

  const menuItems = [
    { icon: Trophy, label: 'Your Scores', onClick: () => setView('scores') },
    { icon: Award, label: 'Badges', onClick: () => setView('badges') },
    { icon: Info, label: 'About & Privacy Policy', onClick: () => setView('about') },
  ];

  return (
    <div className="flex flex-col min-h-full pb-24">
      <div className="bg-gradient-to-br from-nigerian-green to-nigerian-green-dark pt-10 pb-8 px-4 relative">
        <img
          src={logoImg}
          alt="Showcase Nigeria logo"
          className="absolute top-4 left-4 w-9 h-9 object-contain drop-shadow"
        />
        <button
          onClick={toggleDark}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 text-white"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="flex flex-col items-center gap-3">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl font-black text-white">
            {progress.username ? progress.username[0].toUpperCase() : '🦅'}
          </div>

          {/* Username */}
          {editingName ? (
            <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-3 py-2">
              <input
                className="bg-transparent text-white font-bold text-lg text-center outline-none placeholder-white/50 w-32"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveName()}
                autoFocus
                maxLength={20}
                aria-label="Your name"
                placeholder="Enter name"
              />
              <button onClick={saveName} className="text-white/80 text-sm font-bold">Save</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-white font-black text-xl">
                {progress.username || 'Anonymous User'}
              </h1>
              <button onClick={() => setEditingName(true)} aria-label="Edit username" className="text-white/60">
                <Edit3 size={14} />
              </button>
            </div>
          )}

          {/* Streak */}
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1.5 text-white/90">
              <Flame size={16} className="text-orange-300" />
              <span className="text-sm font-bold">{progress.currentStreak} day streak</span>
            </div>
            <div className="w-px h-4 bg-white/30" />
            <span className="text-white/70 text-xs">Best: {progress.longestStreak} days</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Star, value: progress.totalScore.toLocaleString(), label: 'Total Score', color: 'text-festive-gold' },
            { icon: Target, value: `${completedCats}/6`, label: 'Completed', color: 'text-nigerian-green' },
            { icon: Flame, value: progress.totalGamesPlayed.toString(), label: 'Games Played', color: 'text-orange-500' },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl p-3 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                <Icon size={20} className={`mx-auto mb-1 ${stat.color}`} />
                <p className="font-black text-gray-900 dark:text-white text-lg leading-none">{stat.value}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Menu links */}
        <div className="flex flex-col gap-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-3"
              >
                <Icon size={18} className="text-gray-400" />
                <span className="flex-1 text-left font-semibold text-gray-700 dark:text-gray-300 text-sm">
                  {item.label}
                </span>
                {item.label === 'Badges' && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {earnedBadgeCount}/{BADGES.length}
                  </span>
                )}
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
