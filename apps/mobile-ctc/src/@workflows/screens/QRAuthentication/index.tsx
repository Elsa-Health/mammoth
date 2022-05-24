import React from 'react';
import {WorkflowScreen} from '../..';

import {StyleSheet, View} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {useTheme} from '../../../@libs/elsa-ui/theme';
import {Text} from '../../../@libs/elsa-ui/components';
import {ElsaColorableIcon} from '../../../@libs/elsa-ui/visuals/vectors';
import {
  Modal,
  Portal,
  Button,
  ActivityIndicator,
  IconButton,
} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {useAsyncFn} from 'react-use';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {authenticateProvider} from '../../../provider/backend';
import type {ElsaProvider, Identity} from '../../../provider/backend';
import {AuthOutput} from '../../../provider/context';

function ConfirmationField({
  value,
  onChangeValue,
  cellCount = 6,
}: {
  value: string;
  onChangeValue: (value: string) => void;
  cellCount?: number;
}) {
  const ref = useBlurOnFulfill({value, cellCount});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChangeValue,
  });

  const {color} = useTheme();

  const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    cell: {
      width: 50,
      height: 60,
      lineHeight: 38,
      paddingTop: 10,
      fontSize: 24,
      borderWidth: 2,
      borderRadius: 6,
      borderColor: color.secondary.base,
      textAlign: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
      value={value}
      onChangeText={onChangeValue}
      cellCount={cellCount}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({index, symbol, isFocused}) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
}

const PLATFORM_CODE: {
  platform: 'ctc' | 'addo' | 'labs';
} = {
  platform: 'ctc',
};

function VerifyCodeFromProvider({
  phoneNumber,
  confirmResult,
  identity,
  onQueryProvider,
}: {
  phoneNumber: string;
  confirmResult: FirebaseAuthTypes.ConfirmationResult;
  identity: Identity;
  onQueryProvider: (provider: ElsaProvider) => void;
}) {
  const [code, setCode] = React.useState('');

  const [state, verifyCode] = useAsyncFn(async code => {
    // Confirming the code
    const uc = await confirmResult.confirm(code);
    if (uc !== null) {
      const x = await authenticateProvider(
        firestore(),
        uc.user,
        identity,
        PLATFORM_CODE,
      );

      return x;
    }

    throw new Error('Unable to log you in. Please try again later.');
  });
  return (
    <>
      <View style={{marginBottom: 16}}>
        <Text style={{lineHeight: 20, marginBottom: 12}}>
          Code sent to <Text font="bold">{phoneNumber}</Text>. Please enter the
          code to verify your access
        </Text>
        <ConfirmationField value={code} onChangeValue={setCode} />
      </View>
      <Button
        mode="outlined"
        loading={state.loading}
        disabled={code.length !== 6}
        onPress={() =>
          verifyCode(code)
            .then(provider => {
              console.log('##:', provider);
              onQueryProvider(provider);
            })
            .catch(err => {
              console.error('Unable to verify code');
              console.error(err);
            })
        }>
        Verify Code
      </Button>
    </>
  );
}

export default function QRAuthenticationScreen({
  actions: $,
}: WorkflowScreen<
  {},
  {
    authenticate: (qrCodeDigest: string) => Promise<AuthOutput>;
    onQueryProvider: (provider: ElsaProvider) => void;
  }
>) {
  const {color, spacing} = useTheme();
  const scanner = React.useRef();

  //
  const [identity, set] = React.useState<null | string>(() => null);
  // confirmation code
  const [visible, setVisible] = React.useState(false);

  const [state, auth] = useAsyncFn(
    async authStr => {
      const out = await $.authenticate(authStr);

      if (out.type === 'v1') {
        // pass along the provider
        $.onQueryProvider(out.obj);
        return undefined;
      }

      if (out.type === 'v2') {
        return out.obj;
      }

      // You shouldn't see this
      throw new Error(
        "Unsupported authentication method. You shouldn't even see this",
      );
    },
    [identity],
  );

  // React.useEffect(() => {
  //   console.log({state});
  // }, [state]);

  React.useEffect(() => {
    if (identity !== null) {
      setVisible(true);

      auth(identity).catch(() => {
        // authenticate
        console.log('failed to authenticate');
      });
    } else {
      setVisible(false);
    }
  }, [identity]);

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            marginHorizontal: 12,
          }}>
          {state.loading ? (
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ActivityIndicator animating />
                <Text style={{marginLeft: 8}}>Authenticating...</Text>
              </View>
            </View>
          ) : state?.value !== undefined ? (
            <VerifyCodeFromProvider
              phoneNumber={state.value.phoneNumber}
              confirmResult={state.value.confirm}
              identity={state.value.identity}
              onQueryProvider={$.onQueryProvider}
            />
          ) : (
            <View>
              <View>
                <Text>{state.error?.message}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 16,
                }}>
                <Button
                  disabled={state.loading}
                  onPress={() => {
                    // Reset Identity
                    set(null);
                    scanner.current?.reactivate();
                  }}>
                  Re-scan
                </Button>
              </View>
            </View>
          )}
        </Modal>
      </Portal>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              padding: spacing.lg,
              flex: 0.6,
            }}>
            <ElsaColorableIcon
              width={35}
              height={35}
              color={color.primary.base}
            />
            <View style={{marginTop: 12}}>
              <Text size={28} font="bold">
                Scan to login
              </Text>
              {__DEV__ && (
                <View style={{marginVertical: 5}}>
                  <Button
                    icon="code-json"
                    mode="outlined"
                    onPress={() =>
                      // auth login
                      set('JWVHbExokY0mXsRcabAg@C9U3KgCvUof410gynImJ')
                    }>
                    Dev Login
                  </Button>
                  {/* <Text>Something</Text> */}
                </View>
              )}
              {/* <Text
                color={color.secondary.base}
                style={{lineHeight: 22, marginTop: 8}}>
                To gain access, please scan the code on your credentials card
              </Text> */}
            </View>
          </View>
        </View>
        <View style={{flex: 2}}>
          <View style={{height: 200}}>
            <QRCodeScanner
              ref={node => {
                scanner.current = node;
              }}
              onRead={e => {
                // Scan the code
                // converts the data to proper information
                set(e.data);
              }}
              // ca
              vibrate
              showMarker
              customMarker={
                <View
                  style={{
                    borderColor: color.secondary.light,
                    borderWidth: 1,
                    width: 250,
                    height: 250,
                    borderRadius: 5,
                  }}
                />
              }
            />
          </View>
        </View>
      </View>
    </>
  );
}
