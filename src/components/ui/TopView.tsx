import { Box, Container, Grid, Typography } from '@mui/material';

type Props = {
  children: React.ReactNode;
  title: string;
};

const TopView = ({ children, title }: Props) => {
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
          <Grid container rowSpacing={5} columnSpacing={3}>
            <Grid item xs={12}>
              <Typography variant={'h4'}>{title}</Typography>
            </Grid>
            {children}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default TopView;
