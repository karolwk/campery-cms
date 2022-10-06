import {
  buildCollection,
  buildProperty,
  EntityReference,
} from '@camberi/firecms';

type marKetingIcons = {
  iconURL: string;
  title: string;
  description: string;
};

type faqMainPage = {
  question: string;
  answer: string;
};

type mainPageCollection = {
  title: string;
  description: string;
  icons: marKetingIcons[];
  teaserTitle: string;
  teaserContent: string;
  campersTitle: string;
  campersDescription: string;
  faq: faqMainPage[];
};
