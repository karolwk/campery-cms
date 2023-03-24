import { FireCMSContext } from '@camberi/firecms';
import { BlogEntryContent } from '../collections/blogCollection';
import { camperCollection } from '../collections/camperCollection';
import { tokensCollection } from '../collections/tokensCollections';

interface makeUrlOptions {
  startDash?: boolean;
}

interface PolishChars {
  [key: string]: string;
}

const polishToRegular = (text: string): string => {
  const polishChars: PolishChars = {
    ą: 'a',
    ć: 'c',
    ę: 'e',
    ł: 'l',
    ń: 'n',
    ó: 'o',
    ś: 's',
    ż: 'z',
    ź: 'z',
  };

  return text
    .toLowerCase()
    .replace(/[ąćęłńóśżź]/g, (match) => polishChars[match]);
};

export const makeURLfromName = (
  name: string,
  opts?: makeUrlOptions
): string => {
  const link = polishToRegular(name.trim().toLowerCase().replace(/ /g, '-'));
  if (opts?.startDash) {
    return '/' + link;
  }

  return link;
};

export const firstLetterLowercase = (name: string): string => {
  if (name.length < 2) {
    return name;
  }
  return name.replace(' ', '_').toLowerCase();
};

export const getIsPublished = async (context: FireCMSContext, id: string) => {
  try {
    const res = await context.dataSource.fetchEntity({
      path: 'campers',
      entityId: id,
      collection: camperCollection,
    });
    return res?.values.isPublished;
  } catch (error) {
    console.log(error);
  }
};

// Get's token from database
export const getToken = async (context: FireCMSContext) => {
  try {
    const res = await context.dataSource.fetchCollection({
      path: 'tokens',
      collection: tokensCollection,
    });
    return res[0].values.isrToken;
  } catch (error) {
    console.log(error);
    return '';
  }
};

// Testing function
export const testPromise = (ms: number, msg: string) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(msg);
      return resolve;
    }, ms)
  );

/**
 * Calculates the average reading speed of a string based on word count and
 * returns a string indicating the estimated reading time in minutes.
 *
 */

export const calculateReadingSpeed = (input: BlogEntryContent[]): string => {
  const margedSections = input
    .map((entry) => {
      if (entry.type === 'text') {
        return entry.value;
      }
      return '';
    })
    .join(' ');

  const words = margedSections.trim().split(/\s+/); // split input into words
  const wordCount = words.length;
  const averageReadingSpeed = 200; // average reading speed in words per minute
  const readingTime = Math.round(wordCount / averageReadingSpeed); // calculate reading time in minutes
  const starter = 'Ten artykuł przeczytasz';
  if (readingTime < 1) {
    return `${starter} w mniej niż minutę`;
  } else if (readingTime === 1) {
    return `${starter} w minutę`;
  } else if (readingTime <= 4) {
    return `${starter} w ${readingTime} minuty`;
  } else {
    return `${starter} w ${readingTime} minut`;
  }
};
