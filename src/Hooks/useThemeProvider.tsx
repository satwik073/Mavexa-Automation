import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProviderOptions } from '@/Global/GlobalSiteNavigators/NavigationState/Constants/structure';

interface ThemeContextType {
  currentTheme: ThemeProviderOptions;
  setCurrentTheme: (theme: ThemeProviderOptions) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: ThemeProviderOptions.DARK_TH,
  setCurrentTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProviderRules: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeProviderOptions>(ThemeProviderOptions.DARK_TH);

  useEffect(() => {
    const savedTheme = localStorage.getItem('Theme-Config') as ThemeProviderOptions || ThemeProviderOptions.DARK_TH;
    setCurrentTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('Theme-Config', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => 
      prevTheme === ThemeProviderOptions.LIGHT_TH ? ThemeProviderOptions.DARK_TH : ThemeProviderOptions.LIGHT_TH
    );
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
