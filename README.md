![ELSA HEALTH](https://www.elsa.health/elsa-logo.png)

# Elsa Health Monolith

This repository is a Monolithic that contains many of the Elsa Health products, including `apps` like the Providers Application, Admin Dashboard (soon!) and `packages` that are used by these apps, like UI and Utility library

Document Structure:

-   [`apps/`](apps/) - Applications
    -   [`mobile-providers`](apps/mobile-providers/) Elsa Health's Providers Application
-   [`packages/`](packages/) - UI and Utility Library
    -   [`@elsa-ui/react-native`](packages/ui-react-native/) Elsa Health's UI package for React Native Apps
-   [`coverage-merge`](coveralls-merge/) - \* This is the modified project forked from https://github.com/sourceallies/coveralls-merge. Will soon be moved to it's own forked version of the repository.

## Badges

[![Coverage Status](https://coveralls.io/repos/github/Elsa-Health/mammoth/badge.svg?branch=main)](https://coveralls.io/github/Elsa-Health/mammoth?branch=main)

The badges are for the entire repository. Soon, there will be tests that are attached against each

NOTE: since the `coveralls-merge` is a forked project,it is NOT included in the overall build

## Get Started

This project was created using [Turborepo](https://turborepo.org/), so we get all the fancy stuff that it offers, like mananging workspaces. Since there are javascript related projects, this project uses `yarn` as a package manager.

Requirements:

-   node `>=14.*`
-   yarn `>=1.22.*`

### Installation

Installation from an individual project, should be done at the application levels, you can check them by navigating [here](apps/)

To install the depencies for this repository, run:

```bash
# ./<root-Dir>
yarn
```
