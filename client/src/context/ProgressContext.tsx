import { createContext, useContext, type ReactNode } from 'react';
import { useProgress as useProgressState } from '../hooks/useProgress';

type ProgressContextValue = ReturnType<typeof useProgressState>;

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const value = useProgressState();
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider');
  return ctx;
}
