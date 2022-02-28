import { Symptom } from "./libs/data-fns"
import { symptoms } from "./symptoms"

// copy(responses.map(r => r.symptoms.map(s => s.Name)).filter(a => a.length > 0)
const symptomMatrix: Array2D<Symptom> = [
    [
        "ear-pain",
        "fatigue",
        "fever",
        "irritable",
        "reduced-appetite"
    ],
    [
        "chills",
        "fever",
        "headache",
        "fatigue",
        "rigor",
        "jaundice"
    ],
    [
        "ear-pain",
        "fatigue",
        "fever",
        "hearingLoss",
        "irritable",
        "reduced-appetite"
    ],
    [
        "fever",
        "tachycardia",
        "dehydration",
        "abdominal-pain",
        "bloody-diarrhoea",
        "watery-diarrhoea",
        "diarrhoea",
        "vomiting",
        "chills"
    ],
    [
        "fever",
        "tachycardia",
        "dehydration",
        "abdominal-pain",
        "bloody-diarrhoea",
        "watery-diarrhoea",
        "diarrhoea",
        "vomiting",
        "chills"
    ],
    [
        "chills",
        "dyspnoea",
        "fever",
        "headache",
        "fatigue",
        "rigor",
        "jaundice",
        "hyperventilation",
        "convulsions",
        "tachypnoea",
        "tachycardia"
    ],
    [
        "dysuria"
    ],
    [
        "tachycardia",
        "dehydration",
        "bloody-diarrhoea",
        "watery-diarrhoea",
        "diarrhoea"
    ],
    [
        "abdominal-pain",
        "vomiting"
    ],
    [
        "cough",
        "dyspnoea",
        "voice-hoarseness"
    ],
    [
        "dyspnoea"
    ],
    [
        "dysphagia",
        "dyspnoea",
        "halitosis",
        "hyperemic-tonsils",
        "sore-throat"
    ],
    [
        "cough",
        "dyspnoea",
        "facial-pain",
        "headache"
    ],
    [
        "dyspnoea"
    ],
    [
        "dyspnoea"
    ],
    [
        "cough",
        "dyspnoea"
    ],
    [
        "chest-tightness",
        "chest-pain",
        "cough",
        "dyspnoea"
    ],
    [
        "cachexia",
        "chest-tightness",
        "chest-pain",
        "cough",
        "dyspnoea"
    ],
    [
        "cough",
        "dyspnoea",
        "facial-pain",
        "headache"
    ],
    [
        "cough",
        "dyspnoea"
    ],
    [
        "cough",
        "dyspnoea"
    ],
    [
        "dysuria"
    ],
    [
        "dysuria"
    ]
]

type Array2D<T> = Array<Array<T>>


/**
 * Gets the first item of list
 * @param l 
 * @returns "number"
 */
function fst(l: any[] = []) {
  return l[0]
}

/**
 * Gets the second item of list
 * @param l 
 * @returns {number}
 */
function snd(l: any[] = []) {
  return l[1]
}

/**
 * Given an array gets the counts of the contents
 * @param l 
 * @returns {Record<string, number>}
 */
function countBy(l: Array<string>): Record<string, number> {
  return l.reduce((acc, value) => {
      if (!acc[value]) {
        acc[value] = 1;
      } else {
        acc[value]++;
      }
      return acc;
    }, {})
}

/**
 * Returns the intersection of 2 arrays
 * @param l 
 * @returns {Record<string, number>}
 */
function intersection(a = [], b = []) {
  const setB = new Set(b)
  return [...new Set(a)].filter(x => setB.has(x))
}

/**
 * Sort a multidimensional (2D) array by second parameter
 * @param l 
 * @returns {Record<string, number>}
 */
function multiDimSort(a: [string, number], b: [string, number]) {
  return snd(b) - snd(a)
}

const concat = (a = [], b = []) => {
  return a.concat(b)
}

const differenceWith = (a: Array<string>) => (b: Array<string>) => {
  return a.filter(x => b.indexOf(x) < 0)
}


function getAssociatedSymptoms(symptoms: Array2D<string>, presentSymptom: Array<string>, absentSymptoms: Array<string>, count = 3) {
  const relevantGroups = symptoms.filter(syList => intersection(syList, presentSymptom).length > 0)
  const excludedFrom = differenceWith(relevantGroups.flat());
  const symptomRanks = countBy(excludedFrom(concat(presentSymptom, absentSymptoms))) // { "fever": 5, "cough": 3, ... }
  return Object.entries(symptomRanks).sort(multiDimSort).slice(0, count).map(fst)
}

// properly format the symptoms to those that exists in the symptoms list
const all_symptoms = symptoms.map(s => s.id)
const existingSymptomsMatrix = symptomMatrix.map(s => s.filter(x => all_symptoms.includes(x)))

export const getAssocSymptomRecords = (presentSymptom: Symptom[], absentSymptoms: Symptom[], count: number = 3) => {
    return getAssocSym(existingSymptomsMatrix, presentSymptom, absentSymptoms, count)
                .filter(s => all_symptoms.includes(s))
}

const getAssocSym = (symptomMatrix: Array2D<Symptom>, present: Symptom[], absent: Symptom[], count: number = 3) => {
    // filter out those in absent
    const remainingAfterAbsent = symptomMatrix.filter(row => !row.some(s => absent.includes(s)))
    const inPresent = symptomMatrix.filter(row => row.some(s => present.includes(s)))

    // Merge the two
    const final = [
        ...inPresent.reduce((acc, curr) => {curr.map(item => acc.push(item)); return acc}, []),
        ...remainingAfterAbsent.reduce((acc, curr) => {curr.map(item => acc.push(item)); return acc}, [])
    ].filter(s => !present.includes(s))

    const symptomRanks = countBy(final)
    return Object.entries(symptomRanks).sort(multiDimSort).slice(0, count).map(fst)
}