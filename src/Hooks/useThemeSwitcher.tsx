import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme(); // Access the theme and setTheme function
  const [mounted, setMounted] = useState(false); // Handle SSR issue

  // Ensure that the component is mounted before accessing the theme value (since it's null on the server)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents rendering the component until it is mounted

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
};

export default ThemeSwitcher;
