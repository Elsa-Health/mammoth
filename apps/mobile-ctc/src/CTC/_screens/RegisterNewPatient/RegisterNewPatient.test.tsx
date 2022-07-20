import React from 'react';

import {render} from '@testing-library/react-native';
import Screen from './index';

import {ThemeProvider} from '@elsa-ui/react-native/theme';

jest.useFakeTimers(); // jest.useFakeTimers('legacy') for jest >= 27
// call animation
jest.runAllTimers();

describe('Register New Patient Screen', () => {
  test('Renders correctly', () => {
    // ....
    render(
      <ThemeProvider>
        <Screen
          actions={({navigation}) => ({
            checkIfPatientExists(patientId) {},
            onRegisterPatient(patient, investigations, cb?) {},
          })}
        />
      </ThemeProvider>,
    );
  });
});
