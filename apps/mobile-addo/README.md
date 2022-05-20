![ELSA HEALTH](https://www.elsa.health/elsa-logo.png)

# Elsa Health for ADDO

_Previously Elsa Ddx_

## Introduction

Created and Maintained by the Elsa.Health team, this project is to support your local "Duka la dawa".

Features included:

- Providing decision support for clients likely conditions
- Reveal the next steps to likely be followed as suggested by Elsa's Team
- Analytics and reporting for your business
- Operated both online and offline
- Works for both English and Swahili

## Development

This "sub"-project is a part of a monolith that was created from Turborepo, with yarn. Until further notice, let's stick that way.

### Get started

First, navigate into the `mobile-addo` project and install the dependencies.

```bash
# After cloning the project, navigate to the project
cd apps/mobile-addo

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

## Deployment

This project is ready for deployment on Android platforms through the google play store.
It is possible to build for, and deploy to iOS and windows devices, but that has not
been our priority to optimize for, pull requests are welcomed though!

```bash
# build the apk (could take a few minutes)
# to test out your build apk on your device (assuming you are in the ./android directory)
yarn android --variant="release"
```

### TODO

Main

- [x] Localization - English
- [x] Localization - Swahili
- [x] Decision support
- [ ] Decision support - Offline Integration

Support

- [ ] Include Test + Coverage

## License

[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)

## Changelogs

If interested in seeing the changelogs for the apps before, please see [this](docs/CHANGELOG/)
