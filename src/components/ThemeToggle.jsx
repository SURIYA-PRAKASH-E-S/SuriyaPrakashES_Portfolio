import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? '🌙' : '☀️'}
      </button>
      
      {/* Theme Status */}
      <div className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
        {isDark ? 'Dark' : 'Light'}
      </div>
    </div>
  );
};

export default ThemeToggle;