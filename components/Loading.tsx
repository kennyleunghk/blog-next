import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      minHeight='400px'
    >
      <Grid item>
        <CircularProgress color='secondary' />
      </Grid>
    </Grid>
  );
};

export default Loading;
