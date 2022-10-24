import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';

import {
  buildCollection,
  Entity,
  EntityCollectionView,
  useAuthController,
  useReferenceDialog,
  useSelectionController,
  useSideEntityController,
  useSnackbarController,
} from '@camberi/firecms';
import { pageSettingsCollection } from '../collections/settingsCollection';
import ViewButton from '../components/ui/ViewButton';
import TopView from '../components/ui/TopView';
import { faqCollection, FaqMainPage } from '../collections/mainPageCollection';

type Props = {};

const SettingsView = (props: Props) => {
  const snackbarController = useSnackbarController();

  const contactsEntityController = useSideEntityController();

  const onEntityButtonHandler = () =>
    contactsEntityController.open({
      entityId: '4qep1ITrkPDrxDRnaeYy',
      path: '/settings', // this path is not mapped in our collections
      collection: pageSettingsCollection,
      width: 800,
    });

  const referenceDialog = useReferenceDialog({
    path: 'faq',
    onSingleEntitySelected(entity: Entity<FaqMainPage> | null) {
      contactsEntityController.open({
        entityId: entity?.id,
        path: '/faq', // this path is not mapped in our collections
        collection: faqCollection,
        width: 800,
      });
    },
  });

  return (
    <TopView title="Ustawienia strony">
      <ViewButton
        onClick={onEntityButtonHandler}
        content="Podstawowe dane"
        buttonText="Zmień"
      />

      <ViewButton onClick={onEntityButtonHandler} content="Sociale">
        Zmień
      </ViewButton>

      <ViewButton
        onClick={referenceDialog.open}
        content="Często zadawane pytania (FAQ)"
      >
        Zmień
      </ViewButton>
    </TopView>
  );
};

export default SettingsView;
