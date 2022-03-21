/// <reference types="react" />
import { WorkflowScreen, Patient, PatientIntake } from "../..";
export default function BasicIntake({ actions: $, entry: { id: patientId, patient }, }: WorkflowScreen<{
    patient: {
        age?: Patient.Age;
        sex?: Patient.Sex;
    };
    id: string;
}, {
    onCompleteIntake: (patientId: string, data: PatientIntake) => void;
}>): JSX.Element;
