/**
 * This is the default language
 */
export default {
    common: {
        actions: {
            present: "Present",
            absent: "Absent",
            save: 'Save',
            close: "$t(common.close)",
            cancel: "$t(common.cancel)",
        },
        loading: "Loading",
        close: "Close",
        change: "Change",
        cancel: "Cancel",

        next: "Next",
        previous: "Previous",

        // sex
        sex: {
            male: "Male",
            female: "Female"
        },

        show: "Show",
        hide: "Hide",
        delete: "Delete",

        date: "Date",
        age: {
            years: "Years",
            months: "Months",
            days: "Days"
        },
        gender_patient: "{{ sex_text }} patient",
        presenting_symptom: "Presenting Symptom",
        absent_symptom: "Absent Symptom",
        symptom: {
            one: "Symptom",
            other: "Symptoms"
        },
        complete: "Complete"
    },
    login: {
        title: "Scan your card",
        description: "Please scan the QR code on your card"
    },
    home: {
        greetings: {
            hi: "Hi",
            hi_person: "Hi, {{ person }}",
        },
        history: {
            title: "Here's the list of your previous assessments",
            subtext: {
                none: "You haven't been visited by any patient recently",
                present: "+ {{ count }} other assessments",
                
            },
            item: {
                ps: "$t(common.presenting_symptom)",
                as: "$t(common.absent_symptom)",
                your_decision: "Your decision"
            },
            total_records: "Total recorded assessments",
            action: "View Assessment History",
        },
        new_assessment: {
            title: "Start new assessment",
            description: "To start a new assessment, please click on the button below",
            action: "New Assessment"
        }
    },
    settings: {
        title: "Settings",
        sample: "Hello there! This is sample",
        language: {
            title: "Change Language",
            description: "Select the language that you'd like to take effect across the entire application",
            action: "Apply language"
        },
        choose_language: {
            title: "Choose Language",
            description: "Choose the language that you'd like to take effect across the entire application",
        },
        logout: {
            title: "Logout",
            description: "Logout from the application",
            action: "Logout"
        }
    },
    /** Assessment pages */
    assessment: {
        ldonpar: {
            location: "Location",
            duration: "Duration",
            onset: "Onset",
            nature: "Nature",
            periodicity: "Periodicity",
            aggravators: "Aggravators",
            reducers: "Reducers"
        },
        intake: {
            title: 'Patient intake',
            description: 'Please enter the patient\'s details',
            footer_note: "Tap on \'$t(common.next)\' go to the symptom assessment",
            is_pregnant: "Is pregnant?",
            delivery_due_date: "Delivery due date"
        },
        /**
         * Summary pages
         */
        summary: {
            signs_summary: {
                text: "Signs and symptoms summary",
                no_symptoms: "There are no symptoms added",
                no_symptoms_more: "Tap on the button below to add a symptom or sign",
            },
            elsa_diagnosis: {
                title: "Elsa's Differential Diagnosis",
                nothing: "Nothing to from elsa",
                other_conditions: "Other conditions"
            },
            buttons: {
                add: "Add symptom or sign",
                conclude: "Conclude Assessment"
            },
            discard_dialog: {
                title: "Discard Assessment?",
                description: "Are you sure you want to discard the current symptom assessment?",
                action: "Discard"
            }
        },
        search: {
            title: "Search for sign or symptom",
            elsa_suggestions: "Elsa's suggestions",
            search_notice: "Begin typing below or selecting Elsa's suggestions to find signs or symptoms",
            select_item: "Press on an item to specify information on the sign or symptom",

        },
        manage: {
            title: "Manage Symptoms",
            search_text: "$t(assessment.search.title)",
            see_insights: "See Elsa's Ingishts",
            no_symptoms: {
                text: "No symptoms added",
                description: "Tap on the search box above, or choose from the list below to get started"
            },

        },
        feedback: {
            err: {
                text_make_selection: "Make sure you first select the condition of choice"
            },
            title: "Assessment Feedback",
            condition_decision: {
                title: "Condition Decision",
                description: "Based on your knowledge and assessment, what is you opinion of the underlying condition causing the patients symptoms",
                component: {
                    text: "Choose conditions",
                    search_text: "Search conditions",
                    elsa_choices: "Elsa's choices",
                    all_conditions: "Conditions"
                }
            },
            next_steps: {
                title: "Next Steps",
                description: "Based on the most likely condition above, you should consider the following recommendations.",
                dispense_meds: "Dispense the following medication",
                recommend_tests: "Recommend the patient gets the following tests",
                supply_ors_text: "Please make sure to supply patient with Oral Rehydration Salts (ORS)",
                supply_ors_button: "Tap to Include ORS"

            },
            recommendations: {
                title: "Recommendations provided",
                refered_nearest_facilty_text: "Refered to the nearest facility",
                refered_to_lab_tests: {
                    text: "Refered to a laboratory testing",
                    component: {
                        text: "Choose laboratory tests",
                        search_text: "Search laboratory tests",
                        all_lab_tests: "Laboratory tests"
                    }
                },
                dispensed_medications: {
                    text: "Dispensed medication to the patient",
                    component: {
                        text: "Choose medications",
                        search_text: "Search medications",
                        all_medications: "Medications"
                    }
                },
                additional_recommendations: {
                    text: "Provided additional recommendations to the patient",
                    placeholder: "Please type in recommendations, if any"
                },
            }
        },
    },
    components: {
        age: {
            text: "Age",
            items: {
                years: "Years",
                months: "Months",
                days: "Days",
            }
        },
        sex: {
            text: 'Sex',
            items: {
                male: "Male",
                female: "Female"
            }
        },
        vitalSigns: {
            text: 'Vital Signs',
            weight: {
                text: "Weight",
                items: {
                    "kg": "Kg",
                    "lb": "Lb",
                }
            },
            height: {
                text: "Height",
                items: {
                    "cm": "Cm",
                    "ft": "Ft",
                }
            },
            temp: {
                text: "Temperature",
                items: {
                    "celc": "*C",
                    "farh": "*F",
                }
            },
        }
    }
}
