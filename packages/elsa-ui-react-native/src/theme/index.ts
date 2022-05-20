export type fontFamiliStyleType =
  | 'light'
  | 'normal'
  | 'medium'
  | 'bold'
  | 'black'
  | 'extra-black';

export const fontFamilyStyle = (
  props: { italic?: boolean; font?: fontFamiliStyleType } = {}
) => {
  if (props.italic !== undefined) {
    if (props.italic) {
      // italic fonts
      switch (props.font || 'normal') {
        case 'light':
          return 'AvenirLTStd-LightOblique';
        case 'medium':
          return 'AvenirLTStd-MediumOblique';
        case 'bold':
          return 'AvenirLTStd-HeavyOblique';
        case 'black':
          return 'AvenirLTStd-BookOblique';
        case 'extra-black':
          return 'AvenirLTStd-BlackOblique';

        case 'normal':
        default:
          return 'AvenirLTStd-Oblique';
      }
    }
  }

  switch (props.font || 'normal') {
    case 'light':
      return 'AvenirLTStd-Light';
    case 'medium':
      return 'AvenirLTStd-Medium';
    case 'bold':
      return 'AvenirLTStd-Heavy';
    case 'black':
      return 'AvenirLTStd-Book';
    case 'extra-black':
      return 'AvenirLTStd-Black';

    case 'normal':
    default:
      return 'AvenirLTStd-Roman';
  }
};

export const Color = {
  primary: {
    base: '#4665AF',
    light: '#7992e1',
    dark: '#003b7f',
    text: '#FFF',
  },
  secondary: {
    base: '#5558A6',
    light: '#8685d8',
    dark: '#222f77', // can change in the future
    text: '#FFF',
  },
};

export const Spacing = {
  'xs': 4,
  'sm': 8,
  'md': 16,
  'lg': 24,
  'xl': 32,
  '2xl': 48,
};

export const Typography = {
  fontFamilyStyle,
  sizes: {
    'xs': '12px',
    'sm': '14px',
    'md': '16px',
    'lg': '20px',
    'xl': '24px',
    '2xl': '28px',
  },
};

export default {
  /**
   * Created from:
   * https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=4666ae&secondary.color=00796B
   */
  color: Color,
  typography: Typography,
  spacing: Spacing,
};
