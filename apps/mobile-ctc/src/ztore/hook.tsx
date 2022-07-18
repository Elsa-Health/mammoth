import React from 'react';
import WebView from 'react-native-webview';

class BackgroundRunner extends React.Component {
  render() {
    const runBeforeFirst = `
  window.isNativeApp = true;
  true; // note: this is required, or you'll sometimes get silent failures
`;
    return (
      <WebView
        ref={el => (this.webview = el)}
        source={{html: '<html><body></body></html>'}}
        injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
      />
    );
  }
}
