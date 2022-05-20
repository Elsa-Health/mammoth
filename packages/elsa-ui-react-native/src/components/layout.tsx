import React from 'react';
import {
  Pressable,
  StatusBar,
  View,
  ViewProps,
  SafeAreaView,
} from 'react-native';
import { ElsaIcon, ArrowBackIcon, ElsaColorableIcon } from '../visuals/vectors';
import theme, { Color, Spacing } from '../theme';
import { RevealContent } from './misc';
import { Heading } from './typography';

import { Appbar } from 'react-native-paper';

type LayoutProps = {
  wrapperStyle?: ViewProps['style'];
  headerStyle?: ViewProps['style'];
  navigation?: any | undefined;
  title?: string;

  /**
   * Overrides and forcefully hides the go back button
   */
  hideGoBack?: boolean;

  /**
   * Hides header
   */
  hideHeader?: boolean;

  hideLogo?: boolean;

  testID?: string;

  backIcon?: typeof ArrowBackIcon;
} & ViewProps;
const BaseLayout = function ({
  hideGoBack = false,
  hideHeader = false,
  hideLogo = false,
  navigation,
  title,
  wrapperStyle,
  headerStyle,
  backIcon: BackIcon = ArrowBackIcon,
  testID,
  ...viewProps
}: LayoutProps) {
  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={[{ flex: 1 }, wrapperStyle]}>
      <StatusBar animated backgroundColor={'#FFF'} barStyle={'dark-content'} />
      {/* header component */}
      <RevealContent
        show={!hideHeader}
        style={[
          {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: Spacing.md,
            paddingHorizontal: Spacing.md,
            backgroundColor: '#FFF',
            // backgroundColor: 'pink',
          },
          headerStyle,
        ]}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Show only show if there is a back navigation, or hide override */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <RevealContent
              show={
                navigation !== undefined &&
                navigation.canGoBack() &&
                !hideGoBack
              }
            >
              <Pressable
                android_ripple={{
                  borderless: true,
                  radius: 16,
                  color: theme.color.primary.light,
                }}
                testID={`${testID}-back-button`}
                style={{ padding: 8, marginRight: 10 }}
                onPress={goBack}
              >
                {/* @ts-ignore */}
                <BackIcon style={{ color: theme.color.primary.dark }} />
              </Pressable>
            </RevealContent>
            {/* Should show if there is title added */}
            <RevealContent show={title !== undefined}>
              <Heading font="bold" color="#000">
                {title}
              </Heading>
            </RevealContent>
          </View>

          {/* Elsa's logo */}
          <RevealContent show={!hideLogo} style={{ marginRight: 6, flex: 1 }}>
            {/* @ts-ignore */}
            <ElsaIcon
              style={{ alignSelf: 'flex-end' }}
              width={25}
              height={25}
            />
          </RevealContent>
        </View>

        {/* Right actions */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'blue',
          }}
        ></View>
      </RevealContent>
      {/* child component */}
      <View
        {...viewProps}
        testID={testID}
        style={[
          {
            flex: 1,
            padding: Spacing.md,
            paddingTop: 8,
            backgroundColor: '#FFF',
          },
          viewProps.style,
        ]}
      />
    </SafeAreaView>
  );
};

/**
 * Main Layout component
 */
function MainLayout(props: LayoutProps) {
  return <BaseLayout {...props} />;
}

/**
 * Alternative layout component with different style
 */
function AltLayout({
  hideGoBack = false,
  hideHeader = false,
  hideLogo = false,
  navigation,
  title,
  wrapperStyle,
  headerStyle,
  backIcon: BackIcon = ArrowBackIcon,
  testID,
  ...viewProps
}: LayoutProps) {
  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={[{ flex: 1 }, wrapperStyle]}>
      <StatusBar
        animated
        backgroundColor={Color.primary.dark}
        barStyle={'light-content'}
      />
      {/* header component */}
      {!hideHeader && (
        <Appbar.Header>
          <RevealContent
            show={
              navigation !== undefined && navigation.canGoBack() && !hideGoBack
            }
          >
            <Appbar.BackAction onPress={goBack} />
          </RevealContent>
          <Appbar.Content title={title} />
          <RevealContent show={!hideLogo} style={{ paddingHorizontal: 8 }}>
            {/* @ts-ignore */}
            <ElsaColorableIcon
              color={'#fff'}
              style={{ alignSelf: 'flex-end' }}
              width={24}
              height={24}
            />
          </RevealContent>
        </Appbar.Header>
      )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Show only show if there is a back navigation, or hide override */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <RevealContent
            show={
              navigation !== undefined && navigation.canGoBack() && !hideGoBack
            }
          >
            <Pressable
              android_ripple={{
                borderless: true,
                radius: 16,
                color: theme.color.primary.light,
              }}
              testID={`${testID}-back-button`}
              style={{ padding: 8, marginRight: 10 }}
              onPress={goBack}
            >
              {/* @ts-ignore */}
              <BackIcon style={{ color: theme.color.primary.dark }} />
            </Pressable>
          </RevealContent>
        </View>
      </View>

      {/* Right actions */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'blue',
        }}
      ></View>
      {/* child component */}
      <View
        {...viewProps}
        testID={testID}
        style={[
          {
            flex: 1,
            padding: Spacing.md,
            paddingTop: 8,
            backgroundColor: '#FFF',
          },
          viewProps.style,
        ]}
      />
    </SafeAreaView>
  );
}

export { View, MainLayout as Layout, AltLayout };
