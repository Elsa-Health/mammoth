import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {Text} from '@elsa-ui/react-native/components';

import {Divider, HelperText} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@elsa-ui/react-native/theme';
import {TextInput} from 'react-native-paper';

import SectionedMultiSelect, {
  SectionedMultiSelectProps,
} from 'react-native-sectioned-multi-select';

export function Column(rp: {
  icon?: string;
  children: React.ReactNode;
  wrapperStyle?: ViewProps['style'];
  contentStyle?: ViewProps['style'];
  spaceTop?: boolean;
}) {
  const {spacing, color} = useTheme();
  return (
    <View
      style={[
        {
          display: 'flex',
          flexDirection: 'column',
        },
        rp.wrapperStyle,
        rp.spaceTop ?? false ? {marginTop: spacing.sm} : undefined,
      ]}>
      {rp.icon && <Icon color={color.primary.base} size={24} name={rp.icon} />}
      <View
        style={[
          {
            flexDirection: 'column',
          },
          rp.contentStyle,
        ]}>
        {rp.children}
      </View>
    </View>
  );
}

export function Row(rp: {
  icon?: string;
  children: React.ReactNode;
  wrapperStyle?: ViewProps['style'];
  contentStyle?: ViewProps['style'];
  spaceTop?: boolean;
  spaceBottom?: boolean;
}) {
  const {spacing, color} = useTheme();
  return (
    <View
      style={[
        {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        },
        rp.wrapperStyle,
        rp.spaceTop ?? false ? {marginTop: spacing.sm} : undefined,
        rp.spaceBottom ?? false ? {marginBottom: spacing.sm} : undefined,
      ]}>
      {rp.icon && (
        <Icon
          color={color.primary.base}
          size={24}
          name={rp.icon}
          style={{marginRight: 8}}
        />
      )}
      <View
        style={[
          {
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          rp.contentStyle,
        ]}>
        {rp.children}
      </View>
    </View>
  );
}

export function Block({
  style,
  bg,
  borderTop,
  borderBottom,
  children,
}: {
  style?: ViewProps['style'];
  bg?: string;
  borderTop?: boolean;
  borderBottom?: boolean;
  children: React.ReactNode;
}) {
  const {spacing} = useTheme();
  return (
    <View
      style={[
        {
          borderColor: '#38518c',
          borderTopWidth: borderTop ? 1 : 0,
          borderBottomWidth: borderBottom ? 1 : 0,
          backgroundColor: bg ?? '#FFF',
          padding: spacing.md,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

/**
 * TODO:You need to change this
 * @param param0
 * @returns
 */
export function SimpleDate({
  value,
  onChangeValue,
}: {
  value: {year?: string; month?: string; date?: string};
  onChangeValue: (d: string) => void;
}) {
  return (
    <View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TextInput
          mode="outlined"
          label="Date"
          value={value?.date ?? ''}
          keyboardType="number-pad"
          style={{flex: 1}}
          maxLength={2}
        />
        <TextInput
          mode="outlined"
          label="Month"
          value={value?.month ?? ''}
          keyboardType="number-pad"
          style={{flex: 1, marginLeft: 8}}
          maxLength={2}
        />
        <TextInput
          mode="outlined"
          label="Year"
          value={value?.year ?? ''}
          keyboardType="number-pad"
          style={{flex: 2, marginLeft: 8}}
          maxLength={4}
        />
      </View>
      <View>
        <HelperText type="error" visible={true}>
          Date is invalid!
        </HelperText>
      </View>
    </View>
  );
}

function iconToggle(
  name: 'close' | 'check' | 'search' | 'keyboard-arrow-down',
  style: object = {},
) {
  switch (name) {
    case 'check':
      return <Icon name="check" size={24} style={[style, {marginRight: 4}]} />;
    case 'search':
      return <Icon name="magnify" size={24} style={style} />;
    case 'keyboard-arrow-down':
      return <Icon name="chevron-down" size={24} style={style} />;
    case 'close':
      return (
        <Icon
          name="close-circle"
          size={24}
          color="#38518c"
          style={{marginHorizontal: 5}}
        />
      );
  }

  return null;
}

/**
 * Dropdown component
 * @returns
 */
export function MultiSelect<T>(
  props: Omit<SectionedMultiSelectProps<T>, 'styles' | 'IconRenderer'>,
) {
  const {color, typography} = useTheme();
  return (
    <SectionedMultiSelect
      // items={searchableConditions}
      IconRenderer={(props: {name: string; style: object}) => {
        // @ts-ignore
        return iconToggle(props.name, props.style);
      }}
      subKey="children"
      // searchPlaceholderText="Select conditions"
      // selectText="Choose conditions"
      showDropDowns={false}
      expandDropDowns
      readOnlyHeadings={true}
      // onSelectedItemsChange={(items) => setSelectedItems(items)}
      // selectedItems={selectedItems}
      {...props}
      styles={{
        selectToggle: {
          padding: 8,
          paddingHorizontal: 12,
          marginVertical: 4,
          borderColor: color.primary.base,
          borderWidth: 1,
          borderRadius: 6,
        },
        selectToggleText: {
          fontFamily: typography.fontFamilyStyle(),
          color: color.primary.dark,
        },
        container: {backgroundColor: `#fff`},
        selectedItem: {backgroundColor: `#4665af22`, borderRadius: 6},
        itemText: {
          fontFamily: typography.fontFamilyStyle({
            font: 'bold',
          }),
          textTransform: 'uppercase',
          fontSize: 18,
        },
        subItemText: {
          fontFamily: typography.fontFamilyStyle({
            font: 'normal',
          }),
          fontSize: 16,
          paddingHorizontal: 8,
        },
        selectedSubItemText: {
          fontFamily: typography.fontFamilyStyle({
            font: 'medium',
            italic: true,
          }),
        },
        chipText: {
          fontFamily: typography.fontFamilyStyle({
            font: 'medium',
          }),
          fontSize: 14,
          color: color.secondary.dark,
        },
        chipContainer: {backgroundColor: '#dae0ef', borderColor: '#4665af'},
        confirmText: {
          fontFamily: typography.fontFamilyStyle({
            font: 'bold',
          }),
        },
      }}
    />
  );
}

/**
 * Sectioned Component
 * @param props
 * @returns
 */
export function Section(props: {
  title?: string;
  desc?: string;
  icon?: string;
  style?: ViewProps['style'];
  mode?: 'raised' | 'flat';
  side?: 'left' | 'right';
  spaceTop?: boolean;
  spaceBottom?: boolean;
  noPad?: boolean;
  children?: React.ReactNode;
  removeLine?: boolean;
}) {
  const {spacing} = useTheme();

  const isT = Boolean(props.title) || Boolean(props.desc);
  return (
    <View
      style={[
        sectionStyle.default,
        (props.mode ?? 'flat') === 'raised'
          ? sectionStyle.raised
          : sectionStyle.flat,
        props.style,
        props.noPad ?? false ? undefined : sectionStyle.padded,
        props.spaceBottom ?? false ? {marginBottom: spacing.md} : undefined,
        props.spaceTop ?? false ? {marginTop: spacing.md} : undefined,
      ]}>
      {/* <View style={{marginBottom: 4}}> */}
      {isT && (
        <>
          <View style={{marginBottom: 8}}>
            {props.title && (
              <Text font="bold" size={19} color="#1c2846">
                {props.title}
              </Text>
            )}
            {props.desc && (
              <Text
                font="medium"
                size={14}
                style={{marginTop: 4}}
                color={'#777'}>
                {props.desc}
              </Text>
            )}
          </View>
          {(!props.removeLine ?? true) && <Divider />}
        </>
      )}
      {props.children && (
        <View style={isT ? {marginTop: 8} : {}}>{props.children}</View>
      )}
    </View>
  );
}

const sectionStyle = StyleSheet.create({
  raised: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#4665af',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  padded: {
    padding: 14,
    paddingHorizontal: 12,
  },
  flat: {
    padding: 6,
  },
  default: {
    backgroundColor: '#FFF',
  },
});
