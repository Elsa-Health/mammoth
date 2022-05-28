import React from 'react';
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetView,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

export function useBottomModal(
  config: {
    index?: number;
    snapPoints: Array<string | number>;
    onSheetChange?: (index: number) => void;
  } = {snapPoints: ['25%', '90%']},
) {
  // ref
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = React.useMemo(() => config.snapPoints, []);

  // callbacks
  const handlePresentModalPress = React.useCallback(() => {
    console.log('Show');
    // console.log(bottomSheetModalRef.current);
    bottomSheetModalRef.current?.present?.();
  }, [bottomSheetModalRef.current]);

  // callbacks
  const handleCloseModal = React.useCallback(() => {
    console.log('Close');
    // console.log(bottomSheetModalRef.current?.close);
    bottomSheetModalRef.current?.close();
  }, [bottomSheetModalRef.current]);

  function BottomModal({
    children: Child,
  }: {
    children: ({
      close,
      present,
      dismiss,
    }: {
      close?: () => void;
      present?: () => void;
      dismiss?: () => void;
    }) => React.ReactNode;
  }) {
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        enablePanDownToClose={false}
        handleIndicatorStyle={null}
        index={config.index ?? 1}
        backdropComponent={CustomBackdrop}
        snapPoints={snapPoints}
        onChange={config.onSheetChange}>
        <BottomSheetView>
          <Child {...bottomSheetModalRef.current} />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }

  return {
    BottomModal,
    ref: bottomSheetModalRef,
    closeModal: handleCloseModal,
    changeIndex: (index: number) =>
      bottomSheetModalRef.current?.snapToIndex(index),
    presentModal: handlePresentModalPress,
  };
}

export const CustomBackdrop = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 2],
      [0, 0.8],
      Extrapolate.CLAMP,
    ),
  }));

  // styles
  const containerStyle = React.useMemo(
    () => [
      style,
      {
        backgroundColor: '#000',
        //   backgroundColor: theme.color.secondary.dark,
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return <Animated.View style={containerStyle} />;
};
