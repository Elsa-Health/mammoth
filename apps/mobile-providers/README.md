## Installation

Package isntallations made:
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/docs/install)
  - [Expanded configuration](./android/gradle.properties#L31) for the storage
- [React Navigation](https://reactnavigation.org/docs/getting-started/) (Version 6)
  - `@react-navigation/native`
  - `@react-navigation/native-stack`

Changes made from the default:
- [Hermes enabled](./android/app/build.gradle#L81)
- [MultiDex enabled](./android/build.gradle#L10)
- Specified [kotlin version](./android/build.gradle#L11) `1.5.31`

For iOS installation. only do this.
```
npx pod-install ios
```

TODO:
- [ ] Convert this template to a `npm` project starter template
  - [ ] Include changing names of the application
  - [ ] Include Sentry addition
  - [ ] Code push configuration
