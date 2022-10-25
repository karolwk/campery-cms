import { buildCollection } from '@camberi/firecms';

export type FaqMainPage = {
  question: string;
  answer: string;
};

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
