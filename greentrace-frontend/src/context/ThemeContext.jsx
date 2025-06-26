// src/context/ThemeContext.jsx
import { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          background: {
            default: '#f5f7fa',
            paper: '#ffffff',
          },
        }
      : {
          background: {
            default: '#0f172a',
            paper: '#1e293b',
          },
        }),
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
  },
});

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);
