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
    <Box display="flex" width={'100%'} height="100%">
      <Box
        display="flex"
        flexDirection={'column'}
        alignItems={'center'}
        justifyItems={'center'}
      >
        <Container
          maxWidth={'md'}
          sx={{
            my: 4,
          }}
        >
          <Grid container rowSpacing={5} columnSpacing={2}>
            <Grid item xs={12}>
              <Typography variant={'h4'}>Ustawienia strony</Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <ViewButton
                onClick={onEntityButtonHandler}
                content="Zmień ustawienia kontaktowo/adresowe"
                buttonText="Zmień"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ViewButton
                onClick={onEntityButtonHandler}
                content="Zmień ustawienia kontaktowo/adresowe"
              >
                adsasd
              </ViewButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default SettingsView;
