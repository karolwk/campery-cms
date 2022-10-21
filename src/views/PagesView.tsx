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
