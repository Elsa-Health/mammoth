declare const _default: Partial<{
    common: {
        actions: {
            present: string;
            absent: string;
            save: string;
            close: string;
            cancel: string;
            next: string;
        };
        loading: string;
        close: string;
        change: string;
        cancel: string;
        next: string;
        previous: string;
        sex: {
            male: string;
            female: string;
        };
        show: string;
        hide: string;
        delete: string;
        date: string;
        age: {
            years: string;
            months: string;
            days: string;
        };
        gender_patient: string;
        presenting_symptom: string;
        absent_symptom: string;
        symptom: {
            one: string;
            other: string;
        };
        complete: string;
    };
    login: {
        title: string;
        description: string;
    };
    home: {
        greetings: {
            hi: string;
            hi_person: string;
        };
        history: {
            title: string;
            subtext: {
                none: string;
                present: string;
            };
            item: {
                ps: string;
                as: string;
                your_decision: string;
            };
            total_records: string;
            action: string;
        };
        new_assessment: {
            title: string;
            description: string;
            action: string;
        };
    };
    settings: {
        title: string;
        sample: string;
        language: {
            title: string;
            description: string;
            action: string;
        };
        choose_language: {
            title: string;
            description: string;
        };
        logout: {
            title: string;
            description: string;
            action: string;
        };
    };
    assessment: {
        ldonpar: {
            location: string;
            duration: string;
            onset: string;
            nature: string;
            periodicity: string;
            aggravators: string;
            reducers: string;
        };
        intake: {
            title: string;
            description: string;
            footer_note: string;
            is_pregnant: string;
            delivery_due_date: string;
        };
        summary: {
            signs_summary: {
                text: string;
                no_symptoms: string;
                no_symptoms_more: string;
            };
            elsa_diagnosis: {
                title: string;
                nothing: string;
                other_conditions: string;
            };
            buttons: {
                add: string;
                conclude: string;
            };
            discard_dialog: {
                title: string;
                description: string;
                action: string;
            };
        };
        search: {
            title: string;
            elsa_suggestions: string;
            search_notice: string;
            select_item: string;
        };
        manage: {
            title: string;
            search_text: string;
            see_insights: string;
            no_symptoms: {
                text: string;
                description: string;
            };
        };
        feedback: {
            err: {
                text_make_selection: string;
            };
            title: string;
            condition_decision: {
                title: string;
                description: string;
                component: {
                    text: string;
                    search_text: string;
                    elsa_choices: string;
                    all_conditions: string;
                };
            };
            next_steps: {
                title: string;
                description: string;
                dispense_meds: string;
                recommend_tests: string;
                supply_ors_text: string;
                supply_ors_button: string;
            };
            recommendations: {
                title: string;
                refered_nearest_facilty_text: string;
                refered_to_lab_tests: {
                    text: string;
                    component: {
                        text: string;
                        search_text: string;
                        all_lab_tests: string;
                    };
                };
                dispensed_medications: {
                    text: string;
                    component: {
                        text: string;
                        search_text: string;
                        all_medications: string;
                    };
                };
                additional_recommendations: {
                    text: string;
                    placeholder: string;
                };
            };
        };
    };
    components: {
        age: {
            text: string;
            items: {
                years: string;
                months: string;
                days: string;
            };
        };
        sex: {
            text: string;
            items: {
                male: string;
                female: string;
            };
        };
        vitalSigns: {
            text: string;
            weight: {
                text: string;
                items: {
                    kg: string;
                    lb: string;
                };
            };
            height: {
                text: string;
                items: {
                    cm: string;
                    ft: string;
                };
            };
            temp: {
                text: string;
                items: {
                    celc: string;
                    farh: string;
                };
            };
        };
    };
}>;

export { _default as default };
