import { useCallback } from 'react';
import { adminsUIDS, firebaseConfig } from './shared/firebaseAPI';
import { camperCollection } from './collections/camperCollection';
import { mainAmenitiesCollection } from './collections/mainAmenitiesCollection';
import { User as FirebaseUser } from 'firebase/auth';
import { Authenticator, FirebaseCMSApp, CMSView } from '@camberi/firecms';
import { mainPageCollection } from './collections/mainPageCollection';
import 'typeface-rubik';
import '@fontsource/ibm-plex-mono';
import { pageSettingsCollection } from './collections/settingsCollection';
import SettingsView from './views/SettingsView';
import PagesView from './views/PagesView';
import { faqCollection } from './collections/faqCollections';
import { statutPageCollection } from './collections/statutPageCollection';
import { privacyPageCollection } from './collections/privacyPageCollection';
import { tokensCollection } from './collections/tokensCollections';

export default function App() {
  const myAuthenticator: Authenticator<FirebaseUser> = useCallback(
    async ({ user, authController }) => {
      if (adminsUIDS.includes(user?.uid as string)) {
        return true;
      } else {
        throw Error('Brak uprawnień by przeglądać tą stronę!');
      }
    },
    []
  );

  const customViews: CMSView[] = [
    {
      path: 'strony',
      name: 'Strony',
      description: 'Edytuj strony',
      icon: 'Web',
      view: <PagesView />,
    },
    {
      path: 'settings',
      name: 'Ustawienia',
      description: 'Ustawienia aplikacji',
      icon: 'Settings',

      view: <SettingsView />,
    },
  ];

  return (
    <FirebaseCMSApp
      name={'Kampery na wynajem - zaplecze'}
      authentication={myAuthenticator}
      collections={[
        camperCollection,
        mainAmenitiesCollection,
        faqCollection,
        mainPageCollection,
        pageSettingsCollection,
        statutPageCollection,
        privacyPageCollection,
        tokensCollection,
      ]}
      firebaseConfig={firebaseConfig}
      views={customViews}
    />
  );
}
