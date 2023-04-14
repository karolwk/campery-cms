import {
  buildCollection,
  buildEntityCallbacks,
  buildProperty,
  EntityOnSaveProps,
  EntityOnDeleteProps,
} from '@camberi/firecms';
import { calculateReadingSpeed, makeURLfromName } from '../utils/helpers';
import { revalidatePage } from '../utils/nextRevalidate';

export interface BlogEntry {
  name: string;
  headerImage: string;
  created_on: Date;
  updated_on: Date;
  status: string;
  urlSlug: string;
  content: BlogEntryContent[];
  readTime: string;
  metaTitle: string;
  metaDescription: string;
}

export type BlogEntryContent = BlogEntryImages | BlogEntryText | BlogHeaderText;

interface BlogEntryImages {
  type: 'images';
  value: string;
}

interface BlogEntryText {
  type: 'text';
  value: string;
}
interface BlogHeaderText {
  type: 'header';
  value: string;
}

let revalidateSignal = '';
const blogCallbacks = buildEntityCallbacks({
  onPreSave: ({ values }) => {
    if (!values.urlSlug) {
      values.urlSlug = makeURLfromName(values.name as string);
    }
    values.readTime = calculateReadingSpeed(
      values.content as BlogEntryContent[]
    );
    if (!values.metaTitle) {
      values.metaTitle = values.name;
    }

    return values;
  },

  // update server
  onSaveSuccess: async ({
    context,
    values,
    status,
  }: EntityOnSaveProps<BlogEntry>) => {
    // Rebuild app because of new entity or signal switch
    if (status !== 'existing' || revalidateSignal === 'REBUILD') {
      revalidateSignal = '';
      // code for rebuilding
      const res = await revalidatePage(context, 'rebuild');
      console.log(res);
      console.log('PAGE REBUILD');
      return;
    }
    // If entity exist we only revalidate
    if (values.status === 'published') {
      await revalidatePage(context, '/blog/' + values.urlSlug);
    }
  },
  onDelete: async ({ context }: EntityOnDeleteProps<BlogEntry>) => {
    // After delete we must rebuild entire app
    const res = await revalidatePage(context, 'rebuild');
    console.log(res);
    console.log('PAGE REBUILD');
  },
});

export const blogCollection = buildCollection<BlogEntry>({
  name: 'Blog',
  path: 'blog',
  icon: 'Article',
  group: 'strony',
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
      group: 'strony',
      oneOf: {
        typeField: 'type', // you can ommit these `typeField` and `valueField` props to use the defaults
        valueField: 'value',

        properties: {
          header: buildProperty({
            dataType: 'string',
            name: 'Tytuł sekcji',
          }),
          images: {
            name: 'Obrazek sekcji',
            dataType: 'string',
            storage: {
              storagePath: 'images',
              acceptedFiles: ['image/*'],
              metadata: {
                cacheControl: 'max-age=1000000',
              },
            },
          },

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

    metaTitle: {
      name: 'Tytuł strony do wyszukiwarki',
      dataType: 'string',
      description:
        'Tytuł strony do wyszukiwarki domyslnie ustawi sie na tytul artykulu',
    },
    metaDescription: {
      name: 'Opis strony do wyszukiwarki',
      dataType: 'string',
      description: 'Opis strony do wyszukiwaraki pownien mieć maks 160 znaków',
    },
  },
});
