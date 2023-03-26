import {
  buildCollection,
  buildEntityCallbacks,
  buildProperty,
} from '@camberi/firecms';
import {
  calculateReadingSpeed,
  makeURLfromName,
  polishToRegular,
} from '../utils/helpers';

export interface BlogEntry {
  name: string;
  headerImage: string;
  created_on: Date;
  updated_on: Date;
  status: string;
  urlSlug: string;
  content: BlogEntryContent[];
  readTime: string;
}

export type BlogEntryContent = BlogEntryImages | BlogEntryText | BlogHeaderText;

interface BlogEntryImages {
  type: 'images';
  value: string[];
}

interface BlogEntryText {
  type: 'text';
  value: string;
}
interface BlogHeaderText {
  type: 'header';
  value: string;
}

const blogCallbacks = buildEntityCallbacks({
  onPreSave: ({ values }) => {
    values.urlSlug = makeURLfromName(values.name);
    values.readTime = calculateReadingSpeed(values.content);

    return values;
  },
});

export const blogCollection = buildCollection<BlogEntry>({
  name: 'Blog',
  path: 'blog',
  icon: 'Article',
  callbacks: blogCallbacks,
  properties: {
    name: {
      name: 'Tytuł',
      dataType: 'string',
      validation: { required: true },
    },

    headerImage: {
      name: 'Obrazek tytułowy',
      dataType: 'string',
      storage: {
        storagePath: 'images',
        acceptedFiles: ['image/*'],
        metadata: {
          cacheControl: 'max-age=1000000',
        },
      },
    },
    created_on: {
      name: 'Kiedy utworzony',
      dataType: 'date',
      autoValue: 'on_create',
    },

    updated_on: {
      name: 'Kiedy zmodyfikowany',
      dataType: 'date',
      autoValue: 'on_update',
    },
    status: buildProperty(({ values }) => ({
      name: 'Status',
      validation: { required: true },
      dataType: 'string',
      columnWidth: 140,
      enumValues: {
        published: {
          id: 'published',
          label: 'Opublikowany',
          disabled: !values.headerImage,
        },
        draft: 'Roboczy',
      },
      defaultValue: 'draft',
    })),

    content: buildProperty({
      name: 'Sekcja blogu',
      description: 'Może być jedna lub kilka',
      validation: { required: true },
      dataType: 'array',
      columnWidth: 400,
      oneOf: {
        typeField: 'type', // you can ommit these `typeField` and `valueField` props to use the defaults
        valueField: 'value',

        properties: {
          header: buildProperty({
            dataType: 'string',
            name: 'Tytuł sekcji',
          }),
          images: buildProperty({
            name: 'Obrazki',
            dataType: 'array',
            of: buildProperty({
              dataType: 'string',
              storage: {
                storagePath: 'images',
                acceptedFiles: ['image/*'],
                metadata: {
                  cacheControl: 'max-age=1000000',
                },
              },
            }),
            description:
              'This fields allows uploading multiple images at once and reordering',
          }),

          text: buildProperty({
            dataType: 'string',
            name: 'Treść sekcji',
            markdown: true,
          }),
        },
      },
    }),

    readTime: {
      name: 'Czas czytania',
      dataType: 'string',
      disabled: true,
      description: 'Generuje się automatycznie po zapisie.',
    },

    urlSlug: {
      name: 'Adres url',
      dataType: 'string',

      disabled: true,
      description: 'Adres url generuje sie automatycznie z tytułu po zapisie.',
    },
  },
});
