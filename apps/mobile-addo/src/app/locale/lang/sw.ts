import type en from "./en"

export default {

    common: {
        actions: {
            present: "Ipo",
            absent: "Haipo",
            save: 'Kubali',
            close: "$t(common.close)",
            cancel: "$t(common.cancel)",
        },
        loading: "Inapakua",
        close: "Funga",
        change: "Badili",
        cancel: "Ghairi",
        next: "Endelea",
        previous: "Rudi",

        // sex
        sex: {
            male: "Kiume",
            female: "Kike"
        },

        show: "Onyesha",
        hide: "Ficha",
        delete: "Futa",
        date: "Tarehe",
        age: {
            years: "Miaka",
            months: "Miezi",
            days: "Siku"
        },
        gender_patient: "Mgonjwa wa {{ sex_text }}",
        presenting_symptom: "Dalili wasilishi",
        absent_symptom: "Dalili za kutokuwepo",
        symptom: {
            one: "Dalili",
            other: "Dalili"
        },
        complete: "Kamilisha"
    },
    login: {
        title: "Soma kadi yako",
        description: "Tafathali somesha kadi yako kwenye sehemu ya simu kwa hapo chini"
    },
    home: {
        greetings: {
            hi: "Salama",
            hi_person: "Salama, {{ person }}"
        },
        history: {
            title: "Anglia historia ya wagonjwa waliokutembelea",
            subtext: {
                none: "Hamna wagonjwa waliowekwa kwenye system",
                present: "na rekodi {{ count }} nyingine",
                
            },
            item: {
                ps: "Dalili ziliopo",
                as: "Dalili ambazo hazipo",
                your_decision: "Maamuzi yako"
            },
            
            total_records: "Idadi ya rekodi",
            action: "Onyesha rekodi zote",
        },
        new_assessment: {
            title: "Tathmini",
            description: "Ili kuanzisha tathmini mpya, bonyeza hapo chini",
            action: "Anza tathmini mpya"
        }
    },
    settings: {
        title: "Mipangilio",
        sample: "Salama! Hii ni sample",
        language: {
            title: "Badili lugha",
            description: "Badilisha lugha unayotaka itafsiriwe wenye kifaa chako",
            action: "Weka mabadiliko"
        },
        choose_language: {
            title: "Chagua Lugha",
            description: "Chagua lugha unayotaka itafsiriwe wenye kifaa chako",
        },
        logout: {
            title: "Ondoka",
            description: "Ondoka kwa muda kwenye kifaa mpaka pale utakapo rudi tena",
            action: "Ondoka sasa"
        }
    },
    assessment: {
        ldonpar: {
            location: "Mahali Mwilini",
            duration: "Muda",
            onset: "Onset",
            nature: "Asili",
            periodicity: "Periodicity",
            aggravators: "Vichochezi",
            reducers: "Vinavyo punguza dalili"
        },
        intake: {
            title: 'Kumpokea mgojwa',
            description: 'Ingiza maelezo ya mgonjwa unayempokea',
            footer_note: "Bonyeza \'$t(common.next)\' ili kwenda kwenye uthamini wa mgonjwa",
            is_pregnant: "Anamimba?",
            delivery_due_date: "Siku ya kukadiria ya kuzaa"
        },
        /**
         * Summary pages
         */
        summary: {
            signs_summary: {
                text: "Muhtasari yenye ishara na dalili",
                no_symptoms: "Hamna ishara au dalili zilizo wekwa",
                no_symptoms_more: "Bonyeza hapo chini ilikuongeza ishara au dalili",
            },
            elsa_diagnosis: {
                title: "Utambuzi ya juu kutoka kwa Elsa",
                nothing: "Hamna utambuzi wowote uliotoleawa na elsa ",
                other_conditions: "Utambuzi mengine"
            },
            buttons: {
                add: "Ongeza ishara au dalili",
                conclude: "Hitimisha tathmini"
            },
            discard_dialog: {
                title: "Sitisha tathmini?",
                description: "Unauhakika unataka kusitisha tathmini unayoishughulikia?",
                action: "Sitisha"
            }
        },
        search: {
            title: "Tafuta ishara au dalili",
            elsa_suggestions: "Mapendekezo ya Elsa",
            search_notice: "Anza kwa kuandika ishara au dalili hapo chini au kuchangua mapendekezo ya Elsa",
            select_item: "Bonyeza ishara inayokaribiana na unachotafuta ili kuongoza mambo mengine juu ya hiyo",
        },
        manage: {
            title: "Simamia dalili",
            search_text: "$t(assessment.search.title)",
            see_insights: "Chunguza maarifa ya Elsa",
            no_symptoms: {
                text: "Hamna dalili au ishara zilizo wekwa",
                description: "Ili kuongeza dalili za mgonjwa, bonyeza hapo juu na uanze kuandika"
            },

        },
        feedback: {
            err: {
                text_make_selection: "Kuna kosa. Lazima kuchangue utambuzi wako kabla ya kuendelea"
            },
            title: "Mapendekezo yako",
            condition_decision: {
                title: "Uchaguo wa hali yako",
                description: "Kwa hisia zako, ni hali gani zinazo msumbua mgonjwa?",
                component: {
                    text: "Fanya chaguo ya hali",
                    search_text: "Tafuta chaguo",
                    elsa_choices: "Utambuzi wa Elsa",
                    all_conditions: "Hali tofauti"
                }
            },
            next_steps: {
                title: "Hatua Zifuatayo",
                description: "Kulingana na hali inayowezekana hapo juu, unapaswa kuzingatia mapendekezo yafuatayo.",
                dispense_meds: "Toa dawa zifuatazo",
                recommend_tests: "Pendekeza mgonjwa apate vipimo vifuatavyo",
                supply_ors_text: "Tafadhali mpatie mgonjwa Oral Rehydration Salts (ORS)",
                supply_ors_button: "Bonyeza kuongeza ORS"
            },
            recommendations: {
                title: "Mapendekezo mengine",
                refered_nearest_facilty_text: "Mrejeshe kituo cha afya cha karibu",
                refered_to_lab_tests: {
                    text: "Rejea vipimo vya mahabara",
                    component: {
                        text: "Chagua kipimo au vipimo",
                        search_text: "Tafuta kipimo cha mahabara",
                        all_lab_tests: "Vipimo tofauti"
                    }
                },
                dispensed_medications: {
                    text: "Dawa ya kumpatia mgonjwa",
                    component: {
                        text: "Chagua dawa ya kumpatia",
                        search_text: "Tafuta dawa",
                        all_medications: "Dawa tofauti"
                    }
                },
                additional_recommendations: {
                    text: "Unamapendekezo megine kwa ajili ya mgonywa",
                    placeholder: "Andika mapendekezo yoyote, kama yapo, uliyonayo kwa ajili ya mgonjwa"
                },
            }
        },
        components: {
            age: {
                text: "Umri",
                items: {
                    years: "$t(common.age.years)",
                    months: "$t(common.age.months)",
                    days: "$t(common.age.days)",
                }
            },
            sex: {
                text: 'Junsia',
                items: {
                    male: "$t(common.male)",
                    female: "$t(common.female)"
                }
            },
            vitalSigns: {
                text: 'Ishara muhimu',
                weight: {
                    text: "Uzito",
                    items: {
                        "kg": "Kg",
                        "lb": "Lb",
                    }
                },
                height: {
                    text: "Urefu",
                    items: {
                        "cm": "Cm",
                        "ft": "Ft",
                    }
                },
                temp: {
                    text: "Joto",
                    items: {
                        "celc": "*C",
                        "farh": "*F",
                    }
                },
            }
        }
    },
} as Partial<typeof en>
