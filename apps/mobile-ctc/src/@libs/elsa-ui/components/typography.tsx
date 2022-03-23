import React from 'react';
import styled from 'styled-components/native';
import {Text as NativeText} from 'react-native';
import theme from '../theme';

type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

function getFontSize(size: FontSize | number) {
  switch (size) {
    case 'xs':
      return theme.typography.sizes.xs;
    case 'sm':
      return theme.typography.sizes.sm;
    case 'md':
      return theme.typography.sizes.md;
    case 'lg':
      return theme.typography.sizes.lg;
    case 'xl':
      return theme.typography.sizes.xl;
    case '2xl':
      return theme.typography.sizes['2xl'];
    default:
      return size + 'px';
  }
}

export const Text = styled(NativeText)<{
  font?: 'light' | 'normal' | 'medium' | 'bold' | 'black' | 'extra-black';
  italic?: boolean;
  size?: number | FontSize;
  color?: string;
}>`
  color: ${({color}) => color || '#000'};
  font-family: ${theme.typography.fontFamilyStyle};
  font-style: normal;
  line-height: 20px;
  font-size: ${({size = 'md'}) => getFontSize(size)};
`;

export const Heading = styled(Text)`
  font-size: 20px;
`;
