import { createContext, useContext, useState } from 'react';

type Theme = {
  background: string;
  text: string;
  subText: string;
  inputBorder: string;
  inputBackground: string;
  cardBackground: string;
  buttonColor: string;
  linkColor: string;
};

const lightTheme: Theme = {
  background: '#ffffff',
  text: '#000000',
  subText: '#666666',
  inputBorder: '#cccccc',
  inputBackground: '#ffffff',
  cardBackground: '#f9f9f9',
  buttonColor: '#4CAF50',
  linkColor: 'blue',
};

const darkTheme: Theme = {
  background: '#121212',
  text: '#ffffff',
  subText: '#aaaaaa',
  inputBorder: '#444444',
  inputBackground: '#1e1e1e',
  cardBackground: '#1e1e1e',
  buttonColor: '#4CAF50',
  linkColor: '#7aadff',
};

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme: isDark ? darkTheme : lightTheme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}