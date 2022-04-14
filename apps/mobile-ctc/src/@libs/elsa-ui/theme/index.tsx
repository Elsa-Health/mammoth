import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import rnpTheme from './rnp';

import {DefaultColor, DefaultTypography, DefaultSpacing} from './default';
type ThemeConfig = {
  contentType: 'white' | 'colored';
  color: typeof DefaultColor;
  typography: typeof DefaultTypography;
  spacing: typeof DefaultSpacing;
};

const DefaultTheme: ThemeConfig = {
  /**
   * Created from:
   * https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=4666ae&secondary.color=00796B
   */
  contentType: 'white', // 'white' | 'colored',
  color: DefaultColor,
  typography: DefaultTypography,
  spacing: DefaultSpacing,
};

export default DefaultTheme;

const ThemeContext = React.createContext(DefaultTheme);

export function ThemeProvider({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme?: (defaultTheme: ThemeConfig) => ThemeConfig;
}) {
  return (
    <ThemeContext.Provider value={theme ? theme(DefaultTheme) : DefaultTheme}>
      <PaperProvider theme={rnpTheme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}

export {DefaultColor, DefaultSpacing, DefaultTypography} from './default';
