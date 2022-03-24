import React from 'react';
import {useTranslation} from 'react-i18next';

import {View} from 'react-native';
import {Text} from '../../../@libs/elsa-ui/components';
import {Chip, RevealContent} from '../../../@libs/elsa-ui/components/misc';
import {
  CheckIcon,
  EyeIcon,
  TrashIcon,
  XIcon,
} from '../../../@libs/elsa-ui/visuals/vectors';
import theme from '../../../@libs/elsa-ui/theme';

export function SymptomItem({
  present,
  onRemove,
  name,
  description,
  onShowSymptom,
}: {
  present: boolean;
  onRemove: () => void;
  onShowSymptom: () => void;
  name: string;
  description: string;
}) {
  const {t: tc} = useTranslation('translation', {keyPrefix: 'common'});

  return (
    <View style={{paddingTop: 10}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {present ? (
          <CheckIcon width={20} height={20} />
        ) : (
          <XIcon width={20} height={20} />
        )}
        <Text
          style={{
            textTransform: 'uppercase',
            marginLeft: 4,
            fontSize: 14,
            color: present ? 'green' : 'red',
          }}>
          {present ? 'Present' : 'Absent'}
        </Text>
      </View>
      <View style={{paddingVertical: 4, flex: 1}}>
        <Text
          font="bold"
          style={{
            marginBottom: 3,
            fontSize: 18,
            textTransform: 'capitalize',
          }}>
          {name}
        </Text>
        <Text>{description}</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={{flex: 1}} />
        <Chip onPress={onRemove}>
          <TrashIcon
            width={18}
            height={18}
            style={{color: theme.color.secondary.base}}
          />
        </Chip>
        <RevealContent show={present}>
          <Chip
            onPress={onShowSymptom}
            style={{
              marginLeft: 6,
              display: 'flex',
              alignSelf: 'flex-end',
              padding: 4,
              paddingHorizontal: 18,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: theme.color.secondary.base,
              }}>{tc`show`}</Text>
            <EyeIcon
              width={18}
              height={18}
              style={{
                marginLeft: 10,
                color: theme.color.secondary.base,
              }}
            />
          </Chip>
        </RevealContent>
      </View>
    </View>
  );
}
