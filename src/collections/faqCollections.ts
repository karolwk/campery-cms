import {
  buildCollection,
  buildEntityCallbacks,
  EntityOnDeleteProps,
} from '@camberi/firecms';
import { revalidatePage } from '../utils/nextRevalidate';

export type FaqMainPage = {
  question: string;
  answer: string;
};

const faqCallbacks = buildEntityCallbacks({
  //update front page
  onDelete: async ({ context }: EntityOnDeleteProps<FaqMainPage>) => {
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
  callbacks: faqCallbacks,
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
