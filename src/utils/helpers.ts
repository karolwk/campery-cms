import { FireCMSContext } from '@camberi/firecms';
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
