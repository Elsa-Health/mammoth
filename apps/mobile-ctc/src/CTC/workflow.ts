import {buildWorkflowStore, WorkflowNavigator} from '../workflows';

import DashboardScreen from './_screens/Dashboard';
import PatientDashboard from './_screens/PatientDashboard';
import InvestigationsDashboardScreen from './_screens/InvestigationDashboard';
import MedicationsDashboardScreen from './_screens/MedicationDashboard';
import ReportSummaryScreen from './_screens/ReportSummary';

import ViewAppointmentsScreen from './_screens/ViewAppointments';
import ViewVisitScreen from './_screens/ViewVisit';
import ViewPatientScreen from './_screens/ViewPatient';
import ViewInvestigationScreen from './_screens/ViewInvestigation';

import MedicationMapScreen from './_screens/MedicationMap';
import RegisterNewPatientScreen from './_screens/RegisterNewPatient';
import ReportMissedAppointmentScreen from './_screens/ReportMissedAppointment';

import MedicationDispenseScreen from './_screens/MedicationDispense';
import MedicationRequestScreen from './_screens/MedicationRequest';

// import NewVisitEntryScreen from './_screens/BasicPatientIntake';
// import HIVStageIntakeScreen from './_screens/HIVStageIntake';
// import HIVAdherenceAssessmentScreen from './_screens/HIVAdherenceAssessment';
// import ConcludeAssessmentScreen from './_screens/ConcludeAssessment';

import MedicationVisit from './_screens/MedicationVisit';
import MedicationStock from './_screens/MedicationStock';
import * as ctc from '@elsa-health/emr/lib/ctc/ctc.types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UseAppointments} from './emr/react-hooks';
import {List} from 'immutable';

// These are all the pages to navigate to
export type WorkflowParamList = WorkflowNavigator<{
  'ctc.dashboard': typeof DashboardScreen;
  // DashboardScreen
  'ctc.patient-dashboard': typeof PatientDashboard;
  'ctc.investigations-dashboard': typeof InvestigationsDashboardScreen;
  'ctc.medications-dashboard': typeof MedicationsDashboardScreen;

  'ctc.view-investigation': typeof ViewInvestigationScreen<ctc.InvestigationRequest>;
  'ctc.report-missed-appointments': typeof ReportMissedAppointmentScreen;
  'ctc.view-appointments': typeof ViewAppointmentsScreen;
  'ctc.medication-map': typeof MedicationMapScreen;
  'ctc.report-summary': typeof ReportSummaryScreen;
  'ctc.medication-visit': typeof MedicationVisit<
    ctc.Patient,
    ctc.Visit,
    ctc.Organization
  >;
  'ctc.medication-stock': typeof MedicationStock;
  'ctc.register-new-patient': typeof RegisterNewPatientScreen;

  'ctc.view-patient': typeof ViewPatientScreen;
  'ctc.view-visit': typeof ViewVisitScreen;
  'ctc.view-medication-dispenses': typeof MedicationDispenseScreen;
  'ctc.view-single-medication-request': typeof MedicationRequestScreen;
}>;

// Setup the application
const {WorkflowProvider, useWorkflowContext, useWorkflowStore} =
  buildWorkflowStore<{
    appointments: List<any>;
    visits: List<ctc.Visit>;
    patients: List<ctc.Patient>;
    'appointment-requests': List<ctc.AppointmentRequest>;
    'appointment-responses': List<ctc.AppointmentResponse>;
    'medication-requests': List<ctc.MedicationRequest>;
    stock: any;
  }>();

const Stack = createNativeStackNavigator<WorkflowParamList>();

// Something here
export {WorkflowProvider, useWorkflowContext, Stack, useWorkflowStore};

// start
