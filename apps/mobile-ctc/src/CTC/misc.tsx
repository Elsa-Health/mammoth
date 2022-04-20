import React from 'react';

import {renderToStaticMarkup} from 'react-dom/server';
import HtmlToPdf from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

import {ToastAndroid} from 'react-native';
import {fetchPatients, fetchAppointments, fetchVisits} from './fns';

import {format} from 'date-fns';

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