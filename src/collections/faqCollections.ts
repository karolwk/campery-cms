import {
  buildCollection,
  buildEntityCallbacks,
  EntityOnSaveProps,
} from '@camberi/firecms';
import { revalidatePage } from '../utils/nextRevalidate';

export type FaqMainPage = {
  question: string;
  answer: string;
};

const mainPageCallbacks = buildEntityCallbacks({
  //update front page
  onSaveSuccess: async ({ context }: EntityOnSaveProps<FaqMainPage>) => {
    const res = await revalidatePage(context, '/');
    console.log(res);
  },
});

export const faqCollection = buildCollection<FaqMainPage>({
  name: 'FAQ ogólne',
  singularName: 'faq',
  icon: 'Quiz',
  path: 'faq',

  permissions: ({ authController }) => ({
    edit: true,
    create: true,
    delete: true,
  }),

  properties: {
    question: {
      name: 'Pytanie',
      dataType: 'string',
    },
    answer: {
      name: 'Odpowiedź',
      dataType: 'string',
      markdown: true,
    },
  },
});
