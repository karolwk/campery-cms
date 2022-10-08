import {
  buildCollection,
  buildProperty,
  EntityReference,
} from '@camberi/firecms';

type MarKetingIcons = {
  iconURL: string;
  title: string;
  description: string;
};

type FaqMainPage = {
  question: string;
  answer: string;
};

type MainPageCollection = {
  title: string;
  description: string;
  icons: MarKetingIcons[];
  teaserTitle: string;
  teaserContent: string;
  campersTitle: string;
  campersDescription: string;
  faq: FaqMainPage[];
};

export const faqMainPageCollection = buildCollection<FaqMainPage>({
  name: 'FAQ Strona główna',
  singularName: 'faq',
  path: 'faqMainPage',

  properties: {
    question: {
      name: 'Pytanie',
      dataType: 'string',
    },
    answer: {
      name: 'Odpowiedź',
      dataType: 'string',
    },
  },
});

export const mainPageCollection = buildCollection<MainPageCollection>({
  name: 'Strona Główna',
  singularName: 'mainpage',
  // icon: 'CarRental',
  path: 'mainPage',

  description: 'Dodawaj, edytuj i usuwaj kampery',
  exportable: true,
  group: 'główne',
  permissions: ({ authController }) => ({
    edit: true,
    create: true,
    delete: true,
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
    },
    icons: {
      dataType: 'array',
      name: 'Wybierz opisy marketingowe',
      of: {
        dataType: 'reference',
        path: 'marketingIcons',
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
      name: 'Opis kamperów',
      validation: { required: true },
      dataType: 'string',
    },
  },
});
