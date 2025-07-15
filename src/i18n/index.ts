import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    common: {
      "navigation": {
        "home": "Home",
        "about": "About",
        "contact": "Contact"
      },
      "common": {
        "loading": "Loading...",
        "error": "An error occurred",
        "save": "Save",
        "cancel": "Cancel",
        "language": "Language"
      },
      "app": {
        "title": "Vite + React",
        "counter": {
          "button": "count is {{count}}",
          "instruction": "Edit <1>src/App.tsx</1> and save to test HMR"
        },
        "learn_more": "Click on the Vite and React logos to learn more"
      }
    }
  },
  it: {
    common: {
      "navigation": {
        "home": "Home",
        "about": "Chi siamo",
        "contact": "Contatti"
      },
      "common": {
        "loading": "Caricamento...",
        "error": "Si è verificato un errore",
        "save": "Salva",
        "cancel": "Annulla",
        "language": "Lingua"
      },
      "app": {
        "title": "Vite + React",
        "counter": {
          "button": "il conteggio è {{count}}",
          "instruction": "Modifica <1>src/App.tsx</1> e salva per testare HMR"
        },
        "learn_more": "Clicca sui loghi di Vite e React per saperne di più"
      }
    }
  },
  pl: {
    common: {
      "navigation": {
        "home": "Strona główna",
        "about": "O nas",
        "contact": "Kontakt"
      },
      "common": {
        "loading": "Ładowanie...",
        "error": "Wystąpił błąd",
        "save": "Zapisz",
        "cancel": "Anuluj",
        "language": "Język"
      },
      "app": {
        "title": "Vite + React",
        "counter": {
          "button": "licznik wynosi {{count}}",
          "instruction": "Edytuj <1>src/App.tsx</1> i zapisz, aby przetestować HMR"
        },
        "learn_more": "Kliknij na loga Vite i React, aby dowiedzieć się więcej"
      }
    }
  },
  fr: {
    common: {
      "navigation": {
        "home": "Accueil",
        "about": "À propos",
        "contact": "Contact"
      },
      "common": {
        "loading": "Chargement...",
        "error": "Une erreur s'est produite",
        "save": "Enregistrer",
        "cancel": "Annuler",
        "language": "Langue"
      },
      "app": {
        "title": "Vite + React",
        "counter": {
          "button": "le compteur est {{count}}",
          "instruction": "Modifiez <1>src/App.tsx</1> et enregistrez pour tester HMR"
        },
        "learn_more": "Cliquez sur les logos Vite et React pour en savoir plus"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    resources,
    
    defaultNS: 'common',
    ns: ['common'],
  });

export default i18n;