import { useCallback } from 'react';
import { firebaseConfig } from './shared/firebaseAPI';
import { camperCollection } from './collections/camperCollection';
import { mainAmenitiesCollection } from './collections/mainAmenitiesCollection';
import { iconsCollection } from './collections/mainAmenitiesCollection';
import { User as FirebaseUser } from 'firebase/auth';
import { Authenticator, FirebaseCMSApp, CMSView } from '@camberi/firecms';
import { mainPageCollection } from './collections/mainPageCollection';
import 'typeface-rubik';
import '@fontsource/ibm-plex-mono';
import { pageSettingsCollection } from './collections/settingsCollection';
import SettingsView from './views/SettingsView';
import PagesView from './views/PagesView';
import { faqCollection } from './collections/faqCollections';

export default function App() {
  const myAuthenticator: Authenticator<FirebaseUser> = useCallback(
    async ({ user, authController }) => {
      if (user?.email?.includes('flanders')) {
        throw Error('Stupid Flanders!');
      }

      const sampleUserRoles = await Promise.resolve(['admin']);
      authController.setExtra(sampleUserRoles);

      return true;
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
        iconsCollection,
        faqCollection,
        mainPageCollection,
        pageSettingsCollection,
      ]}
      firebaseConfig={firebaseConfig}
      views={customViews}
    />
  );
}
