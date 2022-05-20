import {DefaultTheme, configureFonts} from 'react-native-paper';
import {DefaultColor, fontFamilyStyle} from './default';
const fontConfig = {
  regular: {
    fontFamily: fontFamilyStyle({font: 'normal'}),
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: fontFamilyStyle({font: 'medium'}),
    fontWeight: 'normal',
  },
  light: {
    fontFamily: fontFamilyStyle({font: 'light'}),
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: fontFamilyStyle({font: 'light'}),
    fontWeight: 'normal',
  },
};

const paperTheme = {
  ...DefaultTheme,
  fonts: configureFonts({android: fontConfig, ios: fontConfig}),
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
    primary: DefaultColor.primary.base,
    accent: DefaultColor.secondary.base,
  },
};

export default paperTheme;
