import { buildCollection } from '@camberi/firecms';

type StatutPageCollection = {
  metaTitle: string;
  metaDescription: string;
  pagetitle: string;
  pageSubtitle: string;
  mainContent: string;
};
export const privacyPageCollection = buildCollection<StatutPageCollection>({
  name: 'Polityka Prywatności',
  singularName: 'Polityka Prywatności',

  path: 'privacyPage',
  hideFromNavigation: true,
  description: 'Edytuj strone - Polityka Prywaności',
  exportable: true,
  group: 'strony',
  permissions: ({ authController }) => ({
    edit: true,
    create: false,
    delete: false,
  }),
  properties: {
    pagetitle: {
      dataType: 'string',
      name: 'Tytuł strony',
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
