import { Link } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import { APP_DEFAULT_PATH } from 'src/config';

// assets
import error404 from 'assets/images/maintenance/Error404.png';
import TwoCone from 'assets/images/maintenance/TwoCone.png';

// ==============================|| ERROR 404 - MAIN ||============================== //

export default function Error404() {
  return (
    <Grid
      container
      spacing={10}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', pt: 1.5, pb: 1, overflow: 'hidden' }}
    >
      <Grid item xs={12}>
        <Stack direction="row">
          <Grid item>
            <Box sx={{ width: { xs: 250, sm: 590 }, height: { xs: 130, sm: 300 } }}>
              <img src={error404} alt="mantis" style={{ width: '100%', height: '100%' }} />
            </Box>
          </Grid>
          <Grid item sx={{ position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 60, left: -40, width: { xs: 130, sm: 390 }, height: { xs: 115, sm: 330 } }}>
              <img src={TwoCone} alt="mantis" style={{ width: '100%', height: '100%' }} />
            </Box>
          </Grid>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography variant="h1">Page Not Found</Typography>
          <Typography color="text.secondary" align="center" sx={{ width: { xs: '73%', sm: '61%' } }}>
            The page you are looking was moved, removed, renamed, or might never exist!
          </Typography>
          <Button component={Link} to={APP_DEFAULT_PATH} variant="contained">
            Back To Home
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
