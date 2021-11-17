import React from 'react';
import { Grid, Typography } from '@mui/material';

const NOTFound = () => {
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      height='600px'
      spacing={2}
    >
      <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#E7451E' }}>
        Opps...Page Not Found...
      </Typography>
    </Grid>
  );
};

export default NOTFound;
