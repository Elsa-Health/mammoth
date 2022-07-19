import React from 'react';
import {View, Text} from 'react-native';
import RNRestart from 'react-native-restart';

import * as Sentry from '@sentry/react-native';
export class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
}> {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return {error: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log({errorInfo});
    console.error(error);

    Sentry.captureEvent(error);

    // deal with errorInfo if needed
    this.setState({error});
  }

  handleBackToSignIn = async () => {
    // restart app
    RNRestart.Restart();
  };

  render() {
    if (this.state.error) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Something here!</Text>
        </View>
      );
    } else {
      return this.props.children;
    }
  }
}
