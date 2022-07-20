import React from 'react';

import {render} from '@testing-library/react-native';
import Screen from './index';

import {ThemeProvider} from '@elsa-ui/react-native/theme';

describe('Register New Patient Screen', () => {
  test('Renders correctly', () => {
    // ....
    render(
      <ThemeProvider>
        <Screen />
      </ThemeProvider>,
    );
  });
});
