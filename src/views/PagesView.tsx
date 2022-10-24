import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Paper,
  Tooltip,
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

import ViewButton from '../components/ui/ViewButton';
import TopView from '../components/ui/TopView';
import { mainPageCollection } from '../collections/mainPageCollection';

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

  return (
    <TopView title="Edytuj strony">
      <ViewButton
        onClick={mainPageEntityHandler}
        content="Stronę główna"
        buttonText="Zmień"
      />
      <ViewButton
        onClick={mainPageEntityHandler}
        content="Strona 'O nas'"
        buttonText="Zmień"
      />
      <ViewButton
        onClick={mainPageEntityHandler}
        content="Strona 'Warunki wynajmu'"
        buttonText="Zmień"
      />
    </TopView>
  );
};

export default PagesView;
