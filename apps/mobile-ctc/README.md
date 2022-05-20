![ELSA HEALTH](https://www.elsa.health/elsa-logo.png)

# Elsa Health for CTC

## Introduction

Created and Maintained by the Elsa.Health team, this project is to support health facilities that are helping PLWA (People Living With AIDS)

## Development

This "sub"-project is a part of a monolith that was created from Turborepo, with yarn. Until further notice, let's stick that way.

### Get started

First, navigate into the `mobile-ctc` project and install the dependencies.

```bash
# After cloning the project, navigate to the project
cd apps/mobile-ctc

# install the packages listed in package.json
yarn
```

If done, run the following scripts for development with:

```bash
# run the app on your phone or emulator
yarn android

# start the metro bundler
yarn start
```

### TODO

Main

- [x] Patient Management
  - [x] LTFU Patients
- [x] Appointments (Appts.) Management
  - [x] Upcoming Appts.
  - [x] Missing Appts.
- [x] Localization - English
- [ ] Localization - Swahili
- [x] Symptom Assessment - Decision support
  - [ ] Decision support - Offline
- [ ] Risk Assessement

Support

- [ ] Friendlier UI / UX Update
- [ ] Include Unit Test
- [ ] Include Integration Test
- [ ] Include Coverage

## License

[Apache License 2.0](./LICENSE)
