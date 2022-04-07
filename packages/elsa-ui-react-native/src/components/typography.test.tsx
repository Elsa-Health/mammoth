import React from 'react';

import { render } from '@testing-library/react-native';
import { Heading, Text } from './typography';

describe('Heading', () => {
  it('Renders', () => {
    render(<Heading />);
  });
});

describe('Text', () => {
  it('Renders', () => {
    render(<Text />);
  });
});
