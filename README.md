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

![CI](https://github.com/Elsa-Health/mammoth/actions/workflows/test.yml/badge.svg)
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

## FAQ

#### Who are the intended users of this application?

While the tool can be used by all healthcare providers across all cadres,
it is primiarly built for those at lower level facilities like dispensaries,
laboratories, drug shops, and community healthcare providers.

#### What are the minimum requirements for the end user of the tool?

We expect that the user has had some training in healthcare services, even a
minimal amount of training will be very helpful. The application also assumes
the user knows the names of diseases or conditions, so that they can better
interpret the results of the tool.

#### How do the algorithms work?

The tool uses probabilities to quantify the likelihood of a patient having a
certain disease by running simulations of patinents with each of the diseases
covered, and then comparing the results of the simulations to the data being
observerd.

#### Does the application need internet access?

No. You do not need to have internet to use the built application.
This does come with some down sides in the production setting (not being able
to push updates), however, in our case, we have found that the benefits far
outweigh the costs.

There is a plan for hybrid in the future.

#### How well does the disease identification work?

The disease identification models are built by health specialists like pediatricians,
oncologists, dermatologits, etc and are focused on cause and effect mechanisms.

This means, the models will have varying accuracies depending on the deployment
context and target group.

For our current deployment environemnt (Tanzania),
we are seeing an average F1 score of 0.82.

#### I found a major issue! How do I let you know?

You should file an issue as soon as you can, and we will look into it.
This is a great way to support our overall vision.

## License

[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
