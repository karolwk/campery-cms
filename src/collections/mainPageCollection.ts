import { buildCollection, EntityReference } from '@camberi/firecms';

type MarKetingIcons = {
  iconURL: string;
  title: string;
  description: string;
};

type MainPageCollection = {
  title: string;
  description: string;
  icons: MarKetingIcons[];
  teaserTitle: string;
  teaserContent: string;
  campersTitle: string;
  campersDescription: string;
  faq: EntityReference[];
};

export const mainPageCollection = buildCollection<MainPageCollection>({
  name: 'Strona Główna',
  singularName: 'Strona Główna',
  // icon: 'CarRental',
  path: 'mainPage',
  hideFromNavigation: true,
  description: 'Dodawaj, edytuj i usuwaj kampery',
  exportable: true,
  group: 'strony',
  permissions: ({ authController }) => ({
    edit: true,
    create: true,
    delete: false,
  }),
  properties: {
    title: {
      name: 'Tytuł',
      validation: { required: true },
      dataType: 'string',
    },
    description: {
      name: 'Opis strony',
      validation: { required: true },
      dataType: 'string',
      multiline: true,
    },

    icons: {
      dataType: 'array',
      name: 'Wybierz opisy marketingowe',
      of: {
        dataType: 'map',
        properties: {
          iconURL: {
            name: 'Dodaj ikone',
            dataType: 'string',
            storage: {
              storagePath: 'ikonsMarketing',
              acceptedFiles: ['image/*'],
              metadata: {
                cacheControl: 'max-age=1000000',
              },
            },
          },
          title: {
            name: 'Tytuł',
            dataType: 'string',
          },
          description: {
            name: 'Opis',
            dataType: 'string',
            markdown: true,
          },
        },
      },
    },
    teaserTitle: {
      name: 'Tytuł zajawki',
      validation: { required: true },
      dataType: 'string',
    },
    teaserContent: {
      name: 'Opis zajawki',
      validation: { required: true },
      dataType: 'string',
      markdown: true,
    },
    campersTitle: {
      name: 'Tytuł opisu kamperów',
      validation: { required: true },
      dataType: 'string',
    },
    campersDescription: {
      name: 'Opis główny kamperów',
      validation: { required: true },
      dataType: 'string',
      markdown: true,
    },
    faq: {
      dataType: 'array',
      name: 'Dodaj pytania do FAQ na stronie głównej',
      of: {
        dataType: 'reference',
        path: 'faq',
      },
    },
  },
});
