import React, { ReactElement } from 'react';
import { PropertyPreviewProps } from '@camberi/firecms';

import Icon from '@mui/material/Icon';

export default function IconPreview({
  value,
  property,
  size,
}: PropertyPreviewProps<string>) {
  return value ? (
    <>
      <Icon>{value}</Icon>
    </>
  ) : (
    <Icon baseClassName="Abc" color="primary" />
  );
}
