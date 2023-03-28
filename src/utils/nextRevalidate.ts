import { FireCMSContext } from '@camberi/firecms';
import axios from 'axios';
import { tokensCollection } from '../collections/tokensCollections';

// Get's token from database
const getToken = async (context: FireCMSContext) => {
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

export const revalidatePage = async (context: FireCMSContext, data: string) => {
  const token = await getToken(context);
  if (!!!token) {
    return;
  }
  try {
    let nextServerURL = process.env.REACT_APP_LOCAL_NEXT_REVALIDATE_URL;

    if (process.env.NODE_ENV === 'production') {
      nextServerURL = process.env.REACT_APP_NEXT_REVALIDATE_URL;
    }

    const res = await axios.post(nextServerURL as string, {
      token: token,
      data: data,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
