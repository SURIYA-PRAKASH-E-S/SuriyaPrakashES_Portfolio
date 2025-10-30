import { useTheme } from './ThemeContext';

const MyComponent = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div className={`p-4 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};