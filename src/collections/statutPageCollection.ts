import {
  buildCollection,
  buildEntityCallbacks,
  EntityOnSaveProps,
} from '@camberi/firecms';
import { makeURLfromName } from '../utils/helpers';
import { revalidatePage } from '../utils/nextRevalidate';

type StatutPageCollection = {
  metaTitle: string;
  metaDescription: string;
  pagetitle: string;
  pageSubtitle: string;
  mainContent: string;
  faq: {
    answer: string;
    question: string;
  }[];
};

const pageStatutCallbacks = buildEntityCallbacks({
  //update front page
  onSaveSuccess: async ({
    values,
    context,
  }: EntityOnSaveProps<StatutPageCollection>) => {
    const res = await revalidatePage(
      context,
      '/' + makeURLfromName(values.pagetitle as string)
    );
    console.log(res);
  },
});

export const statutPageCollection = buildCollection<StatutPageCollection>({
  name: 'Warunki wynajmu',
  singularName: 'Warunki wynajmu',
  path: 'statutPage',
  hideFromNavigation: true,
  description: 'Edytuj strone - Warunki wynajmu',
  exportable: true,
  group: 'strony',
  callbacks: pageStatutCallbacks,
  permissions: ({ authController }) => ({
    edit: true,
    create: false,
    delete: false,
  }),
  properties: {
    pagetitle: {
      dataType: 'string',
      name: 'Tytuł strony',
      defaultValue: 'Warunki wynajmu',
      disabled: true,
      validation: {
        required: true,
      },
    },
    pageSubtitle: {
      dataType: 'string',
      name: 'Podtytuł strony',
    },
    mainContent: {
      dataType: 'string',
      name: 'Treść strony',
      validation: { required: true },
      multiline: true,
      markdown: true,
    },

    faq: {
      name: 'Faq Warunki najmu',
      dataType: 'array',
      of: {
        dataType: 'map',
        properties: {
          question: {
            dataType: 'string',
            name: 'Pytanie - FAQ Warunki najmu',
          },
          answer: {
            dataType: 'string',
            name: 'Odpowiedź - FAQ Warunki najmu',
          },
        },
      },
      expanded: true,
    },
    metaTitle: {
      dataType: 'string',
      name: 'Tytuł strony - do wyszukiwarki',
      validation: {
        required: true,
      },
    },
    metaDescription: {
      dataType: 'string',
      name: 'Opis strony - do wyszukiwarki',
      validation: {
        required: true,
      },
    },
  },
});
