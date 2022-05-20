import nextStepsBasic from './data/core/next-steps-basic.json'
import nextStepsExtended from './data/translated/next-steps-extended.json'

import type { Condition } from './base'
import type { LabTest, Medication } from './recommended'

type Langugage = 'en' | 'sw'
type LangMap = { [k in Langugage]?: string }

export declare namespace NextSteps {
    type MoreInfo<K extends string, T = { text: string }> = { id: K } & T
    type Basic<M extends string = string, T extends string = string> = {
        triageLevel: string,
        referAndTriageLevel: string,
        refer: boolean,
        medications: MoreInfo<M>[],
        testRecommendations: MoreInfo<T>[],
        otherRecommendations?: string
    }
    type Extended<M extends string = string, T extends string = string> = {
        referAndTriageLevel: LangMap,
        medications: MoreInfo<M, LangMap>[],
        testRecommendations: MoreInfo<T, LangMap>[],
        otherRecommendations?: LangMap
    }
    type ExtendedVals<M extends string = string, T extends string = string> = {
        referAndTriageLevel: string | undefined,
        medications: M[],
        testRecommendations: T[],
    }
}

type _AllMedications = Medication.Addo | Medication.GS

// // all conditions
// const medicaitionsFn = medications.all
// const condIdsFn = () => conditions().map(s => s.id)
// const medicationIds = () => medicaitionsFn().map(s => s.id)
// const labTestIds = () => labTests().map(s => s.id)

export function basic <C extends Condition, M extends _AllMedications, L extends LabTest>(
    conditionsFn: () => C[],
    medicationsFn: () => M[], 
    labTestsFn: () => L[]
) {
    
    const meds = medicationsFn()
    const labTests = labTestsFn()

    const _vals = {} as { [id in C]: NextSteps.Basic<M, L> }

    Object.entries(nextStepsBasic)
        .map(v => {
            const [id, val] = v
            return {
                id,
                ...val
            }
        })
        .filter(s => conditionsFn().includes(s.id as any))
        .map(s => {
            const d = {} as { id: C } & NextSteps.Basic<M, L>
            d['id'] = s.id as C
            d['refer'] = s.refer
            d['triageLevel'] = s['triage-level']
            d['referAndTriageLevel'] = s['refer-and-triage-level']

            d['medications'] = s['medications'].filter(f => meds.includes(f.id as any)).map(f => ({ id: f.id, text: f.text }) as NextSteps.MoreInfo<M>)
            d['testRecommendations'] = s['test-recommendations'].filter(f => labTests.includes(f.id as any)).map(f => ({ id: f.id, text: f.text }) as NextSteps.MoreInfo<L>)
            
            // @ts-ignore
            const other = s['other-recommendations'] as string | undefined

            if (other !== undefined) {
                d['otherRecommendations'] = other
            }

            return d
        })
        .forEach(s => {
            const { id, ...other } = s
            _vals[id] = other
        })

    return _vals
}


export function extended <C extends Condition, M extends _AllMedications, L extends LabTest>(
    conditionsFn: () => C[],
    medicationsFn: () => M[], 
    labTestsFn: () => L[]
) {
    const meds = medicationsFn()
    const labTests = labTestsFn()

    const basicInfo = basic(conditionsFn, medicationsFn, labTestsFn)
    const _vals = {} as { [id in C]: NextSteps.Extended<M, L> }
    const _localeVals = Object.entries(nextStepsExtended)
        .map(v => {
            const [id, val] = v
            return {
                id,
                ...val
            }
        })
        .filter(s => conditionsFn().includes(s.id as any))
        .map(s => {
            const d = {} as { id: C } & NextSteps.Extended<M, L>
            d['id'] = s.id as C
            d['referAndTriageLevel'] = s['refer-and-triage-level']
            
            // @ts-ignore
            d['medications'] = s['medications'].filter(t => meds.includes(t.id as any)) 
            
            // @ts-ignore
            d['testRecommendations'] = s['test-recommendations'].filter(t => labTests.includes(t.id as any))

            // @ts-ignore
            const other = s['other-recommendations'] as LangMap | undefined

            if (other !== undefined) {
                d['otherRecommendations'] = other
            }
            return d
        })

        // Converts it to objects that can
    _localeVals.forEach(s => {
        const { id, ...other } = s
        // @ts-ignore
        _vals[id] = { ...basicInfo[id], ...other }
    })

    return {
        all: _vals,
        locale: (lang: Langugage) => {
            const _vals = {} as { [id in C]: NextSteps.Basic<M, L> &  NextSteps.ExtendedVals<M, L> }
            _localeVals.map(lv => {
                const nlv = { id: lv.id } as { id: C } & NextSteps.ExtendedVals<M, L>
                nlv['referAndTriageLevel'] = lv['referAndTriageLevel'][lang]
                nlv['medications'] = lv['medications'].map(s => s[lang]).filter(s => s !== undefined) as M[]
                nlv['testRecommendations'] = lv['testRecommendations'].map(s => s[lang]).filter(s => s !== undefined) as L[]
                return nlv
            }).forEach(s => {
                const { id, ...other } = s
                // @ts-ignore
                _vals[id] = { ...basicInfo[id], ...other }
            })

            return _vals
        }
    }
}

