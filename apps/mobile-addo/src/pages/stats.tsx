import React from 'react';
import {ScrollView, View} from 'react-native';

import {Layout, Text} from '../components';

import {useAsyncRetry} from 'react-use';
import {
  StateAssessmentRecord as Visit,
  useMainState,
} from '../app/context/main';

import {differenceInDays, differenceInHours, format} from 'date-fns';
import {
  ActivityIndicator,
  Button as RNPButton,
  Divider,
} from 'react-native-paper';
import {properAgeString} from '../app/utils';

import {Medication} from 'elsa-health-data-fns';
import _ from 'lodash';
import {Button} from '../components/input';
import {useNavigation} from '@react-navigation/native';

function StatItem({title, subtitle, count}) {
  return (
    <View style={{flex: 1, display: 'flex', alignItems: 'center', padding: 2}}>
      <Text>{title}</Text>
      <Text font="bold" style={{fontSize: 40}}>
        {count}
      </Text>
      <Text>{subtitle}</Text>
    </View>
  );
}

/**
 * A single visit entry
 * ----
 */
function VisitItem(visit: Visit) {
  const {age, sex} = visit.record.assessmentInfo;
  return (
    <View style={{marginVertical: 8}}>
      <Text
        font="medium"
        style={[{textTransform: 'capitalize'}, {letterSpacing: 1}]}>
        {sex}
      </Text>
      <Text>{properAgeString(age)}</Text>
    </View>
  );
}

function RecentVisit({visits, top}: {visits: Visit[]; top?: number}) {
  return (
    <View>
      <View>
        <Text font="bold" style={{fontSize: 20}}>
          Recent Visits
        </Text>
      </View>
      {count(visits) === 0 ? (
        <View style={{alignItems: 'center', paddingVertical: 20}}>
          <Text style={{textAlign: 'center'}} italic>
            No visit has been recorded on the device as of yet.
          </Text>
        </View>
      ) : (
        <View>
          {visits
            .sort(recenyDiff)
            .slice(0, top ?? 3)
            .map((visit, ix) => (
              <View style={{marginVertical: 4}}>
                {ix !== 0 && <Divider />}
                <VisitItem {...visit} />
              </View>
            ))}
        </View>
      )}
    </View>
  );
}

function MedicationItem({id, count}: {id: Medication.All; count: number}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
      }}>
      <Text>{Medication.all.fromKey(id)}</Text>
      <Text>{count}</Text>
    </View>
  );
}

function TopMedications({
  medications,
  top,
}: {
  medications: [Medication.All, number][];
  top?: number;
}) {
  return (
    <View>
      <View>
        <Text font="bold" style={{fontSize: 20}}>
          Top Medications
        </Text>
      </View>
      {count(medications) === 0 ? (
        <View style={{alignItems: 'center', paddingVertical: 20}}>
          <Text style={{textAlign: 'center'}} italic>
            No medications administerred has been recorded on the device as of
            yet.
          </Text>
        </View>
      ) : (
        <View>
          {medications
            .sort((a, b) => -(a[1] - b[1]))
            .slice(0, top ?? 3)
            .map(([med, count]) => (
              <>
                <MedicationItem id={med} count={count} />
              </>
            ))}
        </View>
      )}
    </View>
  );
}

export default function StatisticsScreen() {
  const {assessments} = useMainState();
  const {retry, value, loading} = useAsyncRetry(async () => {
    const assessmentToday = assessments.filter(isInLast24hrs);
    const trend = groupByFullDate(assessments).map(s => s[1]);

    const visits = assessments.sort(recenyDiff);

    const x = {
      visits,
      medications: Object.entries(
        _.countBy(flat(visits.map(getMedications)), x => x),
      ) as [Medication.All, number][],
      visitsIn24Hrs: count(assessmentToday),
      medsIn24Hrs: sum(assessmentToday.map(countMedicaiton)),
      visitsDailyAvg: median(trend.map(count)),
      medsDailyAvg: median(
        trend.map(manyAs => sum(manyAs.map(countMedicaiton))),
      ),
    };

    return x;
  }, [assessments]);

  const navigation = useNavigation();
  return (
    <Layout title="Statistics" style={{padding: 0}} navigation={navigation}>
      {value === undefined ? (
        loading ? (
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator animating={true} color={'#4665af'} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Something went wrong. Please try again</Text>
            <RNPButton icon="refresh" onPress={retry}>
              Retry
            </RNPButton>
          </View>
        )
      ) : (
        <>
          <View
            style={{
              flex: 1,
              borderBottomColor: '#4665af',
              borderBottomWidth: 0.5,
            }}>
            <View style={{flex: 1}}>
              <View style={{display: 'flex', flexDirection: 'row', flex: 1}}>
                <StatItem
                  title="Total Last 24hrs"
                  count={value.visitsIn24Hrs}
                  subtitle="Visits"
                />
                <StatItem
                  title="Daily Avg."
                  count={value.visitsDailyAvg}
                  subtitle="Visits"
                />
              </View>
              <View style={{display: 'flex', flexDirection: 'row', flex: 1}}>
                <StatItem
                  title="Dispensed Last 24hrs"
                  count={value.medsIn24Hrs}
                  subtitle="Medication"
                />
                <StatItem
                  title="Daily Avg."
                  count={value.medsDailyAvg}
                  subtitle="Medication"
                />
              </View>
            </View>
          </View>
          <View style={{flex: 2}}>
            <ScrollView contentContainerStyle={{padding: 16}}>
              {/* Top medications */}
              <TopMedications medications={value.medications} top={3} />

              {/* Recent Visits */}
              <View style={{marginTop: 6}}>
                <RecentVisit visits={value.visits} top={3} />
              </View>
            </ScrollView>
            <View
              style={{
                paddingHorizontal: 16,
                flexDirection: 'row',
                marginVertical: 8,
              }}>
              <RNPButton
                style={{flex: 1}}
                mode="contained"
                color="#4665af"
                onPress={() => {
                  console.log('Get copy');
                }}>
                <Text style={{color: '#FFF'}}>Get Copy</Text>
              </RNPButton>
              <RNPButton
                style={{flex: 1}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={{color: '#4665af'}}>Go Back</Text>
              </RNPButton>
            </View>
          </View>
        </>
      )}
    </Layout>
  );
}

/**
 * Functions for computing different values for the stats
 * ------------------------------------------
 */

// so they use the same time reference
const now = new Date();

function isInLast24hrs(assessment: Visit): boolean {
  return differenceInHours(now, new Date(assessment.record.dateTime)) <= 24;
}

function countMedicaiton(as: Visit) {
  return count(as.recommendations.dispensed_medication?.medications || []);
}

function groupByFullDate(assessments: Visit[]) {
  //
  const dateGroups: {[date: string]: Visit[]} = {};
  assessments.forEach(as => {
    const dateStr = getFullDate(new Date(as.record.dateTime));

    if (dateGroups[dateStr] === undefined) {
      dateGroups[dateStr] = [];
    }

    dateGroups[dateStr].push(as);
  });

  return Object.entries(dateGroups);
}

function recenyDiff(as1: Visit, as2: Visit) {
  return differenceInHours(
    new Date(as2.record.dateTime),
    new Date(as1.record.dateTime),
  );
}

function getMedications(assessement: Visit) {
  return assessement.recommendations.dispensed_medication?.medications || [];
}

/**
 * Basic Val | Arr. Operations
 * ----------------
 */
const neg =
  (fn: (...args: any[]) => number) =>
  (...args: any[]) =>
    -fn(...args);

function flat<A>(arrs: A[][]): A[] {
  return ([] as A[]).concat(...arrs);
}

/**
 * Group by function
 * @param visits
 * @param fn
 * @returns
 */
function groupByFn<G extends string, AT>(visits: AT[], fn: (as: AT) => G) {
  const groups: {[g in G]?: AT[]} = {};
  visits.forEach(v => {
    const gp = fn(v);

    if (groups[gp] === undefined) {
      groups[gp] = [];
    }

    (groups[gp] as AT[]).push(v);
  });

  return Object.entries(groups);
}
/**
 * Compute median average of numbers
 * @param arr
 * @returns
 */
const median = (arr: number[]) => {
  if (count(arr) < 3) {
    return mean(arr);
  }

  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

/**
 * Compute mean average of numbers
 * @param arr
 * @returns
 */
const mean = (arr: number[]) => {
  if (count(arr) <= 0) {
    return 0;
  }

  return sum(arr) / count(arr);
};

const count = (arr: any[]) => {
  return arr.length;
};

const sum = (arr: number[]) => {
  let _sum = 0;
  for (let x of arr) {
    _sum += x;
  }

  return _sum;
};

/**
 * Get full date in the format `YYYY-MM-DD`
 */
function getFullDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
