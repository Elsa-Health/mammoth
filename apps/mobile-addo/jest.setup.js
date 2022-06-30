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
