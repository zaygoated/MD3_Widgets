import React, { createContext, useContext, useState, useMemo } from 'react';
import { generateMD3Palette } from './md3Palette';
import { getThemeTokens, DEFAULT_SEED } from './tokens';

const ThemeContext = createContext({
  theme: {},
  isDark: true,
  seedColor: DEFAULT_SEED,
  setIsDark: () => {},
  setSeedColor: () => {}
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [seedColor, setSeedColor] = useState(DEFAULT_SEED);

  const palette = useMemo(() => generateMD3Palette(seedColor), [seedColor]);
  const theme = useMemo(() => getThemeTokens(palette, isDark), [palette, isDark]);

  return (
    <ThemeContext.Provider value={{ theme, isDark, seedColor, setIsDark, setSeedColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
