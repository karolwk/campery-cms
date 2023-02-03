import { PropertyPreviewProps } from '@camberi/firecms';
import { Typography } from '@mui/material';

import Icon from '@mui/material/Icon';

export default function IconPreview({ value }: PropertyPreviewProps<string>) {
  return value ? (
    <>
      <Icon>{value}</Icon>
    </>
  ) : (
    <Typography>No icon</Typography>
  );
}
