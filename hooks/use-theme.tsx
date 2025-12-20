import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, Theme } from '@/constants/colors';

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const value = useMemo(() => ({
    theme: isDark ? darkTheme : lightTheme,
    isDark,
  }), [isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback for when used outside provider
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    return {
      theme: isDark ? darkTheme : lightTheme,
      isDark,
    };
  }
  return context;
}
