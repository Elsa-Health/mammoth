import { DefaultTheme, configureFonts } from 'react-native-paper';
import { Color, fontFamilyStyle } from '.';
const fontConfig = {
  regular: {
    fontFamily: fontFamilyStyle({ font: 'normal' }),
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: fontFamilyStyle({ font: 'medium' }),
    fontWeight: 'normal',
  },
  light: {
    fontFamily: fontFamilyStyle({ font: 'light' }),
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: fontFamilyStyle({ font: 'light' }),
    fontWeight: 'normal',
  },
};

const paperTheme = {
  ...DefaultTheme,
  // @ts-ignore
  fonts: configureFonts({ android: fontConfig, ios: fontConfig }),
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
    primary: Color.primary.base,
    accent: Color.secondary.base,
  },
};

export default paperTheme;
