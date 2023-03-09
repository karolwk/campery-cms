import { FireCMSContext } from '@camberi/firecms';
import { tokensCollection } from '../collections/tokensCollections';

export const makeURLfromName = (name: string): string => {
  return name.trim().toLowerCase().replace(/ /g, '-');
};

export const firstLetterLowercase = (name: string): string => {
  if (name.length < 2) {
    return name;
  }
  return name.replace(' ', '_').toLowerCase();
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
