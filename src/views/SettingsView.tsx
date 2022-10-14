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
import { pageSettingsCollection } from '../collections/settingsCollection';
import ViewButton from '../components/ui/ViewButton';

type Props = {};

const SettingsView = (props: Props) => {
  const sideEntityController = useSideEntityController();

  const onEntityButtonHandler = () =>
    sideEntityController.open({
      entityId: '4qep1ITrkPDrxDRnaeYy',
      path: '/settings', // this path is not mapped in our collections
      collection: pageSettingsCollection,
      width: 800,
    });
  return (
    <Box display="flex" width={'100%'} height="100%">
      <Box
        m="auto"
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
              <Typography variant={'h4'}>
                Tutaj zmienisz ustawienia strony
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <ViewButton
                onClick={onEntityButtonHandler}
                content="Zmień ustawienia kontaktowo/adresowe"
                buttonText="Zmień"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default SettingsView;
