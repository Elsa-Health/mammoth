import React from 'react';
import {AltLayout as Layout, Text} from '../../../@libs/elsa-ui/components';
import {ScrollView, useWindowDimensions, View, ViewProps} from 'react-native';
import {WorkflowScreen} from '../..';

import {CTC, LabTest} from '@elsa-health/data-fns';
import {DefaultColor, DefaultSpacing} from '../../../@libs/elsa-ui/theme';
import {ProgressBar, TouchableRipple, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Section({
  title,
  children,
  style,
}: {
  title?: string;
  children: React.ReactNode;
  style?: ViewProps['style'];
}) {
  return (
    <View style={style}>
      {title && <Text font="bold">{title}</Text>}
      <View>{children}</View>
    </View>
  );
}

export default function CTCNextStepsScreen({
  entry: {nextSteps: data, progress = 0.3},
  actions: $,
}: WorkflowScreen<
  {
    nextSteps: Partial<CTC.NextStepsObject>;
    data: {tests: Array<CTC.Test | LabTest>};
    progress: number;
  },
  {
    onDispenseMedication: (
      treatments: string[] | undefined,
      arvStatus?: CTC.Status,
    ) => void;
    onOrderInvestigation: (recommended: CTC.Test[]) => void;
    onGoBack: () => void;
  }
>) {
  const {
    counselingRecommendations: counselingRec,
    treatments,
    tests,
    status,
  } = data;

  return (
    <Layout title="Next Steps" style={{padding: 0}}>
      <ScrollView contentContainerStyle={{marginHorizontal: DefaultSpacing.md}}>
        <View style={{marginVertical: DefaultSpacing.md}}>
          <Text>
            As part of the next steps, please add information to show the way
            forward for how the patient can proceed
          </Text>
        </View>

        {/* Progress */}
        <View>
          <Text>You have a few information to fill for progress</Text>
          <View style={{paddingVertical: DefaultSpacing.sm}}>
            <Text size={'lg'}>{`${(100 * progress).toFixed(0)}`}%</Text>
            <ProgressBar style={{marginTop: 4}} progress={progress} />
          </View>
        </View>

        {/* Select Actions */}
        <View style={{paddingVertical: DefaultSpacing.md}}>
          <Button
            mode="contained"
            color={DefaultColor.secondary.base}
            onPress={() => $.onOrderInvestigation(tests || [])}>
            Investigations
          </Button>
          <View style={{marginVertical: DefaultSpacing.sm}}>
            <Button
              mode="contained"
              color={DefaultColor.secondary.base}
              onPress={() => $.onDispenseMedication(treatments, status)}>
              Medications
            </Button>
          </View>
        </View>
        {/* Counseling */}
        {counselingRec !== undefined && counselingRec.length > 0 && (
          <View>
            <Section title="Counseling">
              <Text>
                Here are suggestions to what I would inform the patient
              </Text>
              {counselingRec.map((cr, ix) => (
                <View
                  key={cr}
                  style={{
                    marginVertical: DefaultSpacing.xs,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon name="check" size={18} />
                  <Text style={{marginLeft: DefaultSpacing.md}}>{cr}</Text>
                </View>
              ))}
            </Section>
          </View>
        )}
      </ScrollView>
      <View style={{marginVertical: 16, paddingHorizontal: DefaultSpacing.md}}>
        <Button
          onPress={$.onGoBack}
          mode="outlined"
          color={DefaultColor.secondary.base}>
          Go To Final Summary
        </Button>
      </View>
    </Layout>
  );
}
