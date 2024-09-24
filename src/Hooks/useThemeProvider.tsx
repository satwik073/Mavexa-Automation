import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeUpdater = () => {
  const { theme} = useTheme();
console.log(theme)
  useEffect(() => {

    if (theme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return null;
};

export default ThemeUpdater;