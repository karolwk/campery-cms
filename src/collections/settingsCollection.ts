import {
  buildCollection,
  buildProperty,
  buildProperties,
  buildEntityCallbacks,
  EntityOnSaveProps,
} from '@camberi/firecms';
import { getToken } from '../utils/helpers';
import { revalidatePage } from '../utils/nextRevalidate';

type GoogleMaps = {
  type: 'googlemaps';
  url: string;
};

type SnazzyMaps = {
  type: 'snazzymaps';
  url: string;
};

type PageSettings = {
  logoURL: string;
  email: string;
  phone: string;
  companyName: string;
  companyaddress: string;
  companyZipCode: string;
  companyCity: string;
  googleMapsApi: string;
  maps: GoogleMaps | SnazzyMaps;
  facebook: string | null;
  instagram: string | null;
  pinterest: string | null;
  twitter: string | null;
};

const pageSettingsCallbacks = buildEntityCallbacks({
  //update front page
  onSaveSuccess: async ({ context }: EntityOnSaveProps<PageSettings>) => {
    const res = await revalidatePage(context, 'rebuild');
    console.log(res);
  },
});

export const pageSettingsCollection = buildCollection<PageSettings>({
  name: 'Ustawienia strony',
  description: 'Zmień główne ustawienia strony',
  hideFromNavigation: true,
  path: 'settings',
  singularName: 'Podstawowe dane kontatkowe',
  group: 'pozostałe',
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
      validation: { required: true },
    },
    companyaddress: {
      name: 'Podaj adres siedziby',
      dataType: 'string',
      multiline: true,
      validation: { required: true },
    },
    companyCity: {
      name: 'Podaj miasto',
      dataType: 'string',
      multiline: true,
      validation: { required: true },
    },
    companyZipCode: {
      name: 'Podaj kod pocztowy',
      dataType: 'string',
      multiline: true,
      validation: { required: true },
    },
    facebook: {
      name: 'Podaj adres strony na Facebooku',
      dataType: 'string',
    },
    instagram: {
      name: 'Podaj adres do Instagrama',
      dataType: 'string',
    },
    pinterest: {
      name: 'Podaj adres do Pinteresta',
      dataType: 'string',
    },
    twitter: {
      name: 'Podaj adres do Twittera',
      dataType: 'string',
    },
    googleMapsApi: {
      dataType: 'string',
      name: 'API Google Mapy',
      description: "API do wyświetlania mapy na stronie 'Kontakt'",
    },

    maps: ({ values }) => {
      const properties = buildProperties<any>({
        type: {
          dataType: 'string',
          enumValues: {
            google: 'Mapy Google',
            snazzyMaps: 'Mapy Snazzy Maps',
          },
        },
      });

      if (values.maps) {
        if ((values.maps as any).type === 'google') {
          properties['url'] = buildProperty({
            dataType: 'string',
            name: 'wklej adres url mapki',
          });
        } else if ((values.maps as any).type === 'snazzyMaps') {
          properties['url'] = buildProperty({
            dataType: 'string',
            name: 'wklej adres url mapki',
          });
        }
      }

      return {
        dataType: 'map',
        name: 'Mapy',

        properties: properties,
      };
    },
  },
  callbacks: pageSettingsCallbacks,
});
