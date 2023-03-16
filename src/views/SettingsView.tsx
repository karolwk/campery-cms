import React from 'react';

import { useSideEntityController } from '@camberi/firecms';
import { pageSettingsCollection } from '../collections/settingsCollection';
import ViewButton from '../components/ui/ViewButton';
import TopView from '../components/ui/TopView';
import { tokensCollection } from '../collections/tokensCollections';

const SettingsView = () => {
  const settingsEntityController = useSideEntityController();

  const handleSettings = () =>
    settingsEntityController.open({
      entityId: '4qep1ITrkPDrxDRnaeYy',
      path: '/settings', // this path is not mapped in our collections
      collection: pageSettingsCollection,
      width: 800,
    });

  const handleTokens = () => {
    settingsEntityController.open({
      entityId: 'bKhjO7YYCi8uamGquPSo',
      path: '/tokens',
      collection: tokensCollection,
      width: 800,
    });
  };

  return (
    <TopView title="Ustawienia strony">
      <ViewButton
        onClick={handleSettings}
        content="Dane kontaktowe"
        buttonText="Zmień"
      />
      <ViewButton onClick={handleTokens} content="Tokeny" buttonText="Zmień" />
    </TopView>
  );
};

export default SettingsView;
