import React from 'react';

import { useSideEntityController } from '@camberi/firecms';
import { pageSettingsCollection } from '../collections/settingsCollection';
import ViewButton from '../components/ui/ViewButton';
import TopView from '../components/ui/TopView';

type Props = {};

const SettingsView = (props: Props) => {
  const contactsEntityController = useSideEntityController();

  const onEntityButtonHandler = () =>
    contactsEntityController.open({
      entityId: '4qep1ITrkPDrxDRnaeYy',
      path: '/settings', // this path is not mapped in our collections
      collection: pageSettingsCollection,
      width: 800,
    });

  return (
    <TopView title="Ustawienia strony">
      <ViewButton
        onClick={onEntityButtonHandler}
        content="Podstawowe dane kontaktowe"
        buttonText="Zmień"
      />
    </TopView>
  );
};

export default SettingsView;
