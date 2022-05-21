import {useNavigation} from '@react-navigation/core';
import React, {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import {useApplication} from '../app/context/app';
import {useMainState} from '../app/context/main';
import {properAgeString} from '../app/utils';
import {ArchiveIcon, ElsaIcon, PlusIcon, SettingsIcon} from '../assets/vectors';
import {Heading, Layout, Text} from '../components';
import {buttonStyles} from '../components/input';
import {Pressable} from '../components/pressable';
import theme from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton} from 'react-native-paper';

import dayjs from 'dayjs';
var advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

const TOTAL_COUNT_TO_SHOW = 3;
function MinifiedPatientHistory() {
  const {assessments: data} = useMainState();

  const {t} = useTranslation('translation', {keyPrefix: 'home.history'});
  const {t: tc} = useTranslation('translation', {keyPrefix: 'common'});
  const REMAINING_MARKS = React.useMemo(
    () => Math.max(0, data.length - TOTAL_COUNT_TO_SHOW),
    [data],
  );

  if (data.length === 0) {
    return (
      <View>
        <Text>{t`subtext.none`}</Text>
      </View>
    );
  }

  return (
    <Fragment>
      <Text>{t`total_records`}</Text>
      <Heading style={{fontSize: 35}} font="bold">
        {data.length}
      </Heading>
      <View style={{marginVertical: 6}}>
        {[...data]
          .sort(s => {
            // make sure you do this because it won't know you have serialized in Date Time
            return -new Date(s.record.dateTime).getTime();
          })
          .slice(0, TOTAL_COUNT_TO_SHOW)
          .map((d, ix) => {
            const {assessmentInfo: ai, diagnosis} = d.record;

            return (
              <View
                key={`visitation-${ix}`}
                style={{
                  borderTopColor: theme.color.secondary.light,
                  marginTop: 8,
                  paddingTop: 8,
                  borderTopWidth: ix !== 0 ? 1 : 0,
                }}>
                <Text>
                  {ai.sex === 'male' ? tc`sex.male` : tc`sex.female`},{' '}
                  {properAgeString(ai.age)}
                </Text>
                {/* { ai.presentingSymptoms.length !== 0 && <Text style={{ textTransform: 'capitalize' }}>PS: {ai.presentingSymptoms.map(s => getName(s.id)?.symptom).join(", ")}</Text> } */}
                {/* { ai.absentSymptoms.length !== 0 && <Text style={{ textTransform: 'capitalize' }}>AS: {ai.absentSymptoms.map(s => getName(s.id)?.symptom).join(", ")}</Text> } */}
                {/* <Text style={{ textTransform: 'capitalize' }}>{t`item.your_decision`}: { diagnosis.user.map(s => s.label).join(", ") }</Text> */}
                <Text
                  font="medium"
                  style={{
                    textTransform: 'capitalize',
                    marginTop: 4,
                    fontSize: 12,
                    color: '#777',
                  }}>
                  {tc`date`}:{' '}
                  {dayjs(d.record.dateTime).format('YYYY, Do MMM HH:mm:ss')}
                </Text>
              </View>
            );
          })}
      </View>
      {REMAINING_MARKS !== 0 && (
        <View style={{paddingVertical: 4}}>
          <Text font="medium">
            {t('subtext.present', {count: REMAINING_MARKS})}
          </Text>
        </View>
      )}
    </Fragment>
  );
}

/** This is the actual intro view to introduce the flow */
export default function HomePage() {
  const navigation = useNavigation();
  const user = useApplication(s => s.user);
  const {t} = useTranslation();

  return (
    <Layout hideHeader>
      <View
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          marginVertical: 16,
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <ElsaIcon width={30} height={30} />
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <IconButton
              icon="chart-bar"
              size={24}
              color="#4665af"
              onPress={() => navigation.navigate('app.stats')}
            />
            <IconButton
              icon="account"
              size={24}
              color="black"
              onPress={() => navigation.navigate('app.settings')}
            />
          </View>
        </View>
        <View style={{marginTop: 12}}>
          <Text font="extra-black" style={{fontSize: 26}}>
            {t`home.greetings.hi`},
          </Text>
          <Text font="extra-black" style={{fontSize: 26, marginTop: 6}}>
            {user?.name}
          </Text>
        </View>
      </View>

      <ScrollView style={{}}>
        {/* Start a new assessment */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginVertical: 10,
          }}>
          <Heading font="bold">{t`home.new_assessment.title`}</Heading>
          <Text
            style={{
              marginVertical: 5,
            }}>{t`home.new_assessment.description`}</Text>
          <View style={{marginTop: 10, width: '100%'}}>
            <Pressable
              onPress={() => {
                // navigate to patient intake
                navigation.navigate('app.core', {
                  screen: 'intake',
                });
              }}
              style={[
                buttonStyles.primaryButton,
                {
                  borderWidth: 0,
                  borderRadius: 100,
                  paddingHorizontal: 16,
                  borderColor: theme.color.primary.dark,
                },
                {justifyContent: 'center'},
              ]}>
              <PlusIcon
                style={{marginRight: 8, marginVertical: 4, color: '#FFF'}}
              />
              <Text
                font="bold"
                style={{color: '#FFF'}}>{t`home.new_assessment.action`}</Text>
            </Pressable>
          </View>
        </View>
        <View style={{flex: 1}}>
          {/* Assessment History */}
          <View style={{marginVertical: 16}}>
            <MinifiedPatientHistory />
            <View style={{marginTop: 10, width: '100%'}}>
              <Pressable
                onPress={() => {
                  // navigate to patient intake
                  navigation.navigate('app.history');
                }}
                style={[
                  buttonStyles.primaryOutlineButton,
                  {paddingHorizontal: 0},
                  {justifyContent: 'center'},
                ]}>
                <ArchiveIcon
                  style={{
                    marginRight: 8,
                    marginVertical: 4,
                    color: theme.color.primary.dark,
                  }}
                />
                <Text
                  font="bold"
                  style={{
                    color: theme.color.primary.dark,
                  }}>{t`home.history.action`}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
