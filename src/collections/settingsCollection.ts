import {
  buildCollection,
  buildProperty,
  EntityReference,
} from '@camberi/firecms';

type GoogleMaps = {
  type: 'googlemaps';
  value: string;
};

type SnazzyMaps = {
  type: 'snazzymaps';
  value: string;
};

type PageSettings = {
  logoURL: string;
  email: string;
  phone: string;
  companyName: string;
  companyaddress: string;
  maps: (GoogleMaps | SnazzyMaps)[];
};

export const pageSettingsCollection = buildCollection<PageSettings>({
  name: 'Ustawienia strony',
  description: 'Zmień główne ustawienia strony',
  path: 'settings',
  properties: {
    logoURL: {
      name: 'Wybierz logo',
      dataType: 'string',
      storage: {
        storagePath: 'images',
        acceptedFiles: ['image/*'],
        metadata: {
          cacheControl: 'max-age=1000000',
        },
      },
    },
    email: {
      name: 'Podaj e-mail',
      dataType: 'string',
      validation: { required: true },
    },
    phone: {
      name: 'Podaj nr telefonu',
      dataType: 'string',
      validation: { required: true },
    },
    companyName: {
      name: 'Podaj dane firmy/osoby',
      dataType: 'string',
    },
    companyaddress: {
      name: 'Podaj adres siedziby',
      dataType: 'string',
      multiline: true,
    },
    maps: buildProperty({
      name: 'Wybierz mape',
      description: 'Wybierz dostawcę mapki która będzie używana na stronie',
      dataType: 'array',
      oneOf: {
        typeField: 'type',
        valueField: 'value',
        properties: {
          googlemaps: buildProperty({
            dataType: 'string',
            name: 'Google Maps',
          }),
          snazzymaps: buildProperty({
            dataType: 'string',
            name: 'Snazzy Maps',
          }),
        },
      },
    }),
  },
});
