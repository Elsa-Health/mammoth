import React from 'react';

import {renderToStaticMarkup} from 'react-dom/server';
import HtmlToPdf from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

import {fetchPatients, fetchAppointments, fetchVisits} from './fns';

import {format} from 'date-fns';
import {Chip, Modal, Portal, TouchableRipple} from 'react-native-paper';
import {Text} from '@elsa-ui/react-native/components';
import create from 'zustand';
import {View} from 'react-native';
import {capitalize} from 'lodash';
import {Row} from './temp-components';
import {NetworkStatus} from '../app/utils';
import {useWorkflowStore} from './workflow';

export const generateReport = async () => {
  const patientsCount = (await fetchPatients()).length;
  const apptsCount = (await fetchAppointments()).length;
  const visitsCount = (await fetchVisits()).length;

  const html_ = renderToStaticMarkup(
    <div>
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
      <hr />
      <div>
        <div>
          <h3># of Patients</h3>
          <span>{patientsCount}</span>
        </div>
        <div>
          <h3># of Appointments</h3>
          <span>{apptsCount}</span>
        </div>
        <div>
          <h3># of Visits</h3>
          <span>{visitsCount}</span>
        </div>
      </div>
      <footer>
        <p></p>
      </footer>
    </div>,
  );

  // console.log(html_);
  try {
    const file = await HtmlToPdf.convert({
      html: html_,
      fileName: `Report-${format(new Date(), 'yyyy-MM-dd-HH:mm:ss')}`,
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
};

type AppContextState = {
  status: NetworkStatus | undefined;
  retry: () => void;
  updateStatus: (status: NetworkStatus | undefined) => void;
  updateRetryFn: (retry: () => void) => void;
};
export const useApp = create<AppContextState>(set => ({
  status: 'offline',
  updateStatus: status => set(_s => ({status})),
  retry: () => {},
  updateRetryFn: retry => set(_s => ({retry})),
}));

export function ConnectionStatus({retry}: any) {
  const status = useWorkflowStore(s => s.value.networkStatus);

  const onPress = React.useCallback(() => {
    console.log(retry);
    return status === 'error' || status === 'offline' ? retry() : undefined;
  }, [status, retry]);

  const color = React.useMemo(
    () => (status === 'online' || status === 'error' ? '#FFF' : '#000'),
    [status],
  );

  const backgroundColor = React.useMemo(
    () =>
      status === 'connecting'
        ? '#CCC'
        : status === 'offline'
        ? '#EEE'
        : status === 'online'
        ? '#4665af'
        : '#F00',
    [status],
  );

  const text = React.useMemo(
    () =>
      `${capitalize(status)}. ${
        status === 'error' || status === 'offline' ? 'Press to reconnect?' : ''
      }`,
    [status],
  );

  return (
    <TouchableRipple onPress={onPress}>
      <View
        style={{
          backgroundColor,
          paddingVertical: 2,
        }}>
        <Text
          size="sm"
          font="medium"
          style={{textAlign: 'center'}}
          color={color}>
          {text}
        </Text>
      </View>
    </TouchableRipple>
  );
}

const CTCOptionsAvailable = Object.entries({
  'Meru District Hospital': '02020100',
  'Mbuguni CTC': '02020101',
  'Usa Dream': '02020250',
  'Nkoaranga Lutheran Hospital': '02020300',
  'Usa Government': '02020500',
  Momela: '02020118',
  Makiba: '02020105',
  'Ngarenanyuki Health Centre': '02020103',
  Mareu: '02020120',
  'Other - Not Registered': '',
});

export const PatientQuery = function ({children, myCtcId, onChange, onFocus}) {
  const [showSelectionModal, setShow] = React.useState(false);

  return (
    <>
      <Portal>
        <Modal
          visible={showSelectionModal}
          onDismiss={() => setShow(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            margin: 36,
          }}>
          <View>
            <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
              <Text font="bold" size={'lg'}>
                Select CTC
              </Text>
            </View>
            <View>
              {CTCOptionsAvailable.map(([name, ctc], ix) => (
                <TouchableRipple
                  key={ix}
                  onPress={() => {
                    setShow(false);
                    onChange?.(ctc);
                    onFocus?.();
                  }}>
                  <View
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                    }}>
                    <Text size={16} style={{marginBottom: 4, letterSpacing: 1}}>
                      {name}
                    </Text>
                    <Text
                      font="medium"
                      size={16}
                      style={{
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                      }}>
                      {ctc}
                    </Text>
                  </View>
                </TouchableRipple>
              ))}
            </View>
          </View>
        </Modal>
      </Portal>
      <View>
        {children}
        <Row contentStyle={{justifyContent: 'flex-start'}} spaceTop spaceBottom>
          {myCtcId !== undefined && (
            <Chip
              icon="home"
              onPress={() => {
                onChange(myCtcId);
                onFocus?.();
              }}
              style={{marginRight: 4}}>
              My facility
            </Chip>
          )}
          <Chip icon="information" onPress={() => setShow(true)}>
            Select Facility
          </Chip>
        </Row>
      </View>
    </>
  );
};
