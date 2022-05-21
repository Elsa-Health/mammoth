import React from 'react';
import {ScrollView, View} from 'react-native';

import {Layout, Text} from '../components';

import {useAsyncRetry} from 'react-use';
import {
  StateAssessmentRecord as Visit,
  useMainState,
} from '../app/context/main';

import {differenceInDays, differenceInHours, format} from 'date-fns';
import {ActivityIndicator, Button, Divider} from 'react-native-paper';
import {properAgeString} from '../app/utils';

import {Medication} from 'elsa-health-data-fns';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';

import FileViewer from 'react-native-file-viewer';
import HtmlToPdf from 'react-native-html-to-pdf';
import {renderToStaticMarkup} from 'react-dom/server';

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
              <View style={{marginVertical: 4}} key={visit.record.id}>
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
              <React.Fragment key={med}>
                <MedicationItem id={med} count={count} />
              </React.Fragment>
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
            <Button icon="refresh" onPress={retry}>
              Retry
            </Button>
          </View>
        )
      ) : (
        <>
          <PageToRender {...value} />
          <View>
            <View
              style={{
                paddingHorizontal: 16,
                flexDirection: 'row',
                marginVertical: 8,
              }}>
              <Button
                style={{flex: 1}}
                mode="contained"
                color="#4665af"
                onPress={async () => {
                  const html_ = renderToStaticMarkup(
                    <PageToPrint {...value} />,
                  );
                  console.log(html_);

                  try {
                    const file = await HtmlToPdf.convert({
                      html: html_,
                      fileName: `ADDO-Statistics-${format(
                        new Date(),
                        'yyyy-MM-dd-HH:mm:ss',
                      )}`,
                      directory: 'Documents',
                    });
                    // console.log(file.filePath);

                    if (file.filePath !== undefined) {
                      await FileViewer.open(file.filePath);
                    }
                    // Alert.alert(file.filePath || 'Save here!');
                  } catch (err) {
                    throw new Error('Failed! Unable to generate report');
                  }
                }}>
                <Text style={{color: '#FFF'}}>Get Copy</Text>
              </Button>
              <Button
                style={{flex: 1}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={{color: '#4665af'}}>Go Back</Text>
              </Button>
            </View>
          </View>
        </>
      )}
    </Layout>
  );
}

function tCell({text, value}: {text: string; value: number}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <p>{text}</p>
      <span style={{display: 'block', fontSize: 30}}>{value}</span>
    </div>
  );
}

function PageToPrint(stats: {
  visits: Visit[];
  medications: [Medication.All, number][];
  visitsIn24Hrs: number;
  medsIn24Hrs: number;
  visitsDailyAvg: number;
  medsDailyAvg: number;
}) {
  return (
    <>
      <html>
        <body style={{minHeight: '100v'}}>
          <div style={{height: '100%'}}>
            <header>
              {/* Elsa Logo */}
              <svg
                width={50}
                height={50}
                viewBox="0 0 126 126"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M125.5 34.8V96.7H38.4C33.4 96.7 29.3 92.6 29.3 87.6V58H40.1V84.5C40.1 85.2 40.7 85.9 41.5 85.9H114.8V35.6C114.8 22.2 103.9 11.3 90.5 11.3H0.5V0.5H91.2C110.1 0.5 125.5 15.9 125.5 34.8Z"
                  fill="#4666AE"
                />
                <path
                  d="M0.5 91.2V29.3H87.6C92.6 29.3 96.7 33.4 96.7 38.4V68H85.9V41.5C85.9 40.7 85.3 40.1 84.5 40.1H11.3V90.5C11.3 103.9 22.2 114.8 35.6 114.8H125.5V125.6H34.8C15.9 125.5 0.5 110.1 0.5 91.2Z"
                  fill="#4666AE"
                />
              </svg>
              <h2>Report</h2>
              <label>Date: {format(new Date(), 'MMMM dd, yyyy')}</label>
            </header>
            <main
              style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
              {/* summary table */}
              <table style={{}}>
                <div>
                  <h3>Visits</h3>
                </div>
                <div>
                  {tCell({
                    text: 'Total Visits In 24hrs',
                    value: stats.visitsIn24Hrs,
                  })}
                  {tCell({
                    text: 'Daily Average Visits',
                    value: stats.visitsDailyAvg,
                  })}
                </div>
                <div>
                  <h3>Medication</h3>
                </div>
                <div>
                  {tCell({
                    text: 'Total Dispensed Medication In 24hrs',
                    value: stats.visitsIn24Hrs,
                  })}
                  {tCell({
                    text: 'Daily Average Dispensed Medication',
                    value: stats.visitsDailyAvg,
                  })}
                </div>
              </table>
              {stats.medications.length !== 0 && (
                <div>
                  <h3>Top 10 Medications</h3>
                  <div>
                    {stats.medications.slice(0, 10).map(([md, count]) => (
                      <div key={md}>
                        {count > 0 ? (
                          <>
                            <label>
                              <b>{count}</b>
                            </label>
                            &nbsp;
                            <label>{Medication.all.fromKey(md)}</label>
                          </>
                        ) : (
                          <div>-</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
            <hr />
            <footer>
              <i>*This document was generated through the Elsa ADDO</i>
            </footer>
          </div>
        </body>
      </html>
    </>
  );
}

function PageToRender(stats: {
  visits: Visit[];
  medications: [Medication.All, number][];
  visitsIn24Hrs: number;
  medsIn24Hrs: number;
  visitsDailyAvg: number;
  medsDailyAvg: number;
}) {
  return (
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
              count={stats.visitsIn24Hrs}
              subtitle="Visits"
            />
            <StatItem
              title="Daily Avg."
              count={stats.visitsDailyAvg}
              subtitle="Visits"
            />
          </View>
          <View style={{display: 'flex', flexDirection: 'row', flex: 1}}>
            <StatItem
              title="Dispensed Last 24hrs"
              count={stats.medsIn24Hrs}
              subtitle="Medication"
            />
            <StatItem
              title="Daily Avg."
              count={stats.medsDailyAvg}
              subtitle="Medication"
            />
          </View>
        </View>
      </View>
      <View style={{flex: 2}}>
        <ScrollView contentContainerStyle={{padding: 16}}>
          {/* Top medications */}
          <TopMedications medications={stats.medications} top={10} />

          {/* Recent Visits */}
          <View style={{marginTop: 6}}>
            <RecentVisit visits={stats.visits} top={3} />
          </View>
        </ScrollView>
      </View>
    </>
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
