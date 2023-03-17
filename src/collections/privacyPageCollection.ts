import {
  buildCollection,
  EntityOnSaveProps,
  buildEntityCallbacks,
} from '@camberi/firecms';
import { revalidatePage } from '../utils/nextRevalidate';
import { makeURLfromName } from '../utils/helpers';
type StatutPageCollection = {
  metaTitle: string;
  metaDescription: string;
  pagetitle: string;
  pageSubtitle: string;
  mainContent: string;
};

const statutPageCallbacks = buildEntityCallbacks({
  //update front page
  onSaveSuccess: async ({
    context,
    values,
  }: EntityOnSaveProps<StatutPageCollection>) => {
    const res = await revalidatePage(
      context,
      makeURLfromName(values.pagetitle as string, { startDash: true })
    );
    console.log(res);
  },
});

export const privacyPageCollection = buildCollection<StatutPageCollection>({
  name: 'Polityka Prywatności',
  singularName: 'Polityka Prywatności',

  path: 'privacyPage',
  hideFromNavigation: true,
  description: 'Edytuj strone - Polityka Prywaności',
  exportable: true,
  group: 'strony',
  callbacks: statutPageCallbacks,
  permissions: ({ authController }) => ({
    edit: true,
    create: false,
    delete: false,
  }),
  properties: {
    pagetitle: {
      dataType: 'string',
      name: 'Tytuł strony',
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
