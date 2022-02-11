import React from 'react'

import create from 'zustand'
import createContext from 'zustand/context'
import { ConditionId, Differential } from '../../../../@types'
import { Recommendations } from '../../../app/context/main'

import type { DietaryHistory } from './DietaryHistory'
import type { MedicationHistory } from './MedicalHistory'
import type { PatientIntakeData } from './PatientIntake'

export type PatientDescription = {
    patientIntake: undefined | PatientIntakeData,
    medicalHistory: undefined | MedicationHistory,
    dietaryHistory: undefined | DietaryHistory,
    elsa: {
        // discretized data
        conditions: Differential[],
        computed: any[]
    },
    assessment: {
        conditions: ConditionId[],
        record: Recommendations
    }
    setData: (data: Partial<PatientDescription>) => void
    setDataChange: (dc: (data: PatientDescription) => PatientDescription) => void
}

const { Provider, useStore: usePatientDescription } = createContext<PatientDescription>()

const createStore = () => create<PatientDescription>((set, get) => ({
    patientIntake: undefined,
    medicalHistory: undefined,
    dietaryHistory: undefined,

    // Where Elsa's insights are stored
    elsa: {
        conditions: [],
        computed: []
    },

    // Default data for assessments
    assessment: {
        conditions: [],
        record: {
            ref_nearest: false,
            refered_lab_testing: {
                selected: false,
                tests: []
            },
            dispensed_medication: {
                selected: false,
                medications: []
            },
            recommendations: ""
        }
    },

    setData: (data: Partial<PatientDescription>) => set(p => ({...p, ...data})),
    setDataChange: (dc: (data: PatientDescription) => PatientDescription) => set(p => dc(p))
}))


function PatientDescriptionProvider (props: { children: React.ReactNode }) {
    return (
        <Provider createStore={createStore}>
            {props.children}
        </Provider>
    )
}

export { PatientDescriptionProvider, usePatientDescription }