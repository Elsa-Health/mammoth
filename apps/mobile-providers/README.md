![ELSA HEALTH](https://www.elsa.health/elsa-logo.png)

# Elsa Health Assistant for Providers

_Health and wellness for all._

The Elsa Health Assistant is an android application that can be deployed with healthcare providers across levels of care to collect information on patients signs, symptoms, and risk factors. Paired with Elsa's Symptom Assessment algorithms, healthcare providers use the application to get insights on the likely cause of a patients symptoms.

The application supports English and Swahili and has been tested with users across the healthcare cadre spectrum for usability.

## Badges

// TODO

<!-- ![build](https://github.com/Elsa-Health/elsa-providers/workflows/build/badge.svg) ![test](https://github.com/Elsa-Health/elsa-providers/workflows/CI/badge.svg) <a href='https://coveralls.io/github/Elsa-Health/elsa-providers'><img src='https://coveralls.io/repos/github/Elsa-Health/elsa-providers/badge.svg' alt='Coverage Status' /></a> -->

## Installation

To quickly get started with setting up your development environment,
please follow the instructions on the official react-native website here
: [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

After setting up your local computer, proceed to clone and install the packages as follows:

```bash
  # After cloning the project, navigate to the repository
  cd apps/mobile-providers

  # install the node modules/packages listed in package.json
  yarn install

  # run the app on your phone or emulator
  yarn android

  # if your android phone is connected and set up in debugging mode, the app will be
  # started on your phone, otherwise it will launch an emulator locally.
```

To set your phone up for development and debugging on it, follow the instructions here: https://reactnative.dev/docs/running-on-device

##### Note: If there are any issues with the local set up, please file an issue and we will work together to fix it!

## Deployment

This project is ready for deployment on Android platforms through the google play store.
It is possible to build for, and deploy to iOS and windows devices, but that has not
been our priority to optimize for, pull requests are welcomed though!

```bash
# build the apk (could take a few minutes)
# to test out your build apk on your device (assuming you are in the ./android directory)
yarn android --variant="release"
```

To publish to the app and play stores, you must first sign the apk, for more details on that, visit: [https://reactnative.dev/docs/signed-apk-android](https://reactnative.dev/docs/signed-apk-android)

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
