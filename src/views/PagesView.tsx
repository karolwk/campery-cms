import React from 'react';

import { useSideEntityController } from '@camberi/firecms';

import ViewButton from '../components/ui/ViewButton';
import TopView from '../components/ui/TopView';
import { mainPageCollection } from '../collections/mainPageCollection';
import { statutPageCollection } from '../collections/statutPageCollection';
import { privacyPageCollection } from '../collections/privacyPageCollection';

type Props = {};

const PagesView = (props: Props) => {
  const contactsEntityController = useSideEntityController();

  const mainPageEntityHandler = () =>
    contactsEntityController.open({
      entityId: 'wZd7hHxY6F6AAU3uw7Ru',
      path: '/mainPage',
      collection: mainPageCollection,
      width: 800,
    });

  const statutPageEntityHandler = () =>
    contactsEntityController.open({
      entityId: 'GtdzfNw5YO6TNysXj6lU',
      path: '/statutPage',
      collection: statutPageCollection,
      width: 800,
    });

  const privacyPageEntityHandler = () => {
    contactsEntityController.open({
      entityId: 'KZmsOUu5YWPleloaEDRp',
      path: '/privacyPage',
      collection: privacyPageCollection,
      width: 800,
    });
  };

  return (
    <TopView title="Edytuj strony">
      <ViewButton
        onClick={mainPageEntityHandler}
        content="Stronę główna"
        buttonText="Zmień"
      />
      <ViewButton
        onClick={privacyPageEntityHandler}
        content="Strona 'Polityka Prywatności'"
        buttonText="Zmień"
      />
      <ViewButton
        onClick={statutPageEntityHandler}
        content="Strona 'Warunki wynajmu'"
        buttonText="Zmień"
      />
    </TopView>
  );
};

export default PagesView;
