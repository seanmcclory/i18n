import 'react-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: {
        navigation: {
          home: string;
          about: string;
          contact: string;
        };
        common: {
          loading: string;
          error: string;
          save: string;
          cancel: string;
          language: string;
        };
        app: {
          title: string;
          counter: {
            button: string;
            instruction: string;
          };
          learn_more: string;
        };
      };
    };
  }
}