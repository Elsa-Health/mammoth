import React from 'react';
import i18n, {InitOptions} from 'i18next';
import {I18nextProvider} from 'react-i18next';

// Language files
import en from './lang/en';
import sw from './lang/sw';

// building the maps for the texts
import {Symptom, SymptomDescription} from 'elsa-health-data-fns';

i18n.init(
  {
    // setup the default language
    lng: 'sw', // if you're using a language detector, do not define the lng option

    // might want to make this toggalable on build
    debug: false,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: en,
        'donpar-map': SymptomDescription.locale('en').object,
        symptoms: Object.fromEntries(Symptom.locale('en').api.pairs()),
      },
      sw: {
        translation: sw,
        'donpar-map': SymptomDescription.locale('sw').object,
        symptoms: Object.fromEntries(Symptom.locale('sw').api.pairs()),
      },
    },
    compatibilityJSON: 'v3',
    interpolation: {escapeValue: false}, // React already does escaping
    // ...options
  },
  err => {
    if (err) {
      console.log('houston, we have a problem!');
      console.error(err);
    }
  },
);

export const LanguageProvider = ({
  options,
  children,
}: {
  options?: InitOptions;
  children: React.ReactNode;
}) => {
  const [ready, setReady] = React.useState(false);
  // FIXME: update the language when the language changes
  const lang = 'en'; // useApplication((s) => s.settings.lang, shallow);

  // Building the entire language part of the system
  React.useEffect(() => {
    setReady(true);
    // NOTE: Removes the configurations outside.. Something needs to happen here
  }, [options]);

  /**
   * Listening to changes in the language
   */
  React.useEffect(() => {
    setReady(false);
    i18n.changeLanguage(lang, err => {
      if (err) {
        console.log('LANG CHANGE // houston, we have a problem!');
        console.error(err);
      }

      setReady(true);
    });
  }, [lang]);

  if (!ready) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
