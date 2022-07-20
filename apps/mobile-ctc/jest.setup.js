jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({goBack: jest.fn()}),
  useRoute: () => ({
    params: {},
  }),
}));
jest.mock('react-native-text-input-mask', () => ({
  default: jest.fn(),
}));
jest.mock('react-native-file-viewer', () => ({
  default: jest.fn(),
}));
jest.mock('react-native-html-to-pdf', () => ({
  default: jest.fn(),
}));

/**
 * https://docs.swmansion.com/react-native-reanimated/docs/guide/testing/
 */
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();
