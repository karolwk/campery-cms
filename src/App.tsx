import { useCallback } from 'react';
import { firebaseConfig } from './shared/firebaseAPI';
import { camperCollection } from './collections/camperCollection';
import { mainAmenitiesCollection } from './collections/mainAmenitiesCollection';
import { iconsCollection } from './collections/mainAmenitiesCollection';
import { User as FirebaseUser } from 'firebase/auth';
import { Authenticator, FirebaseCMSApp } from '@camberi/firecms';
import {
  faqCollection,
  mainPageCollection,
} from './collections/mainPageCollection';
import 'typeface-rubik';
import '@fontsource/ibm-plex-mono';

export default function App() {
  const myAuthenticator: Authenticator<FirebaseUser> = useCallback(
    async ({ user, authController }) => {
      if (user?.email?.includes('flanders')) {
        throw Error('Stupid Flanders!');
      }

      console.log('Allowing access to', user?.email);
      // This is an example of retrieving async data related to the user
      // and storing it in the user extra field.
      const sampleUserRoles = await Promise.resolve(['admin']);
      authController.setExtra(sampleUserRoles);

      return true;
    },
    []
  );

  return (
    <FirebaseCMSApp
      name={'Kampery na wynajem - zaplecze'}
      authentication={myAuthenticator}
      collections={[
        camperCollection,
        mainAmenitiesCollection,
        iconsCollection,
        faqCollection,
        mainPageCollection,
      ]}
      firebaseConfig={firebaseConfig}
    />
  );
}
