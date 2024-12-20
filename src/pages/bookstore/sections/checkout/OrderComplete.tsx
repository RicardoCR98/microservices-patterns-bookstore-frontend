import { Link } from 'react-router-dom';

// material-ui
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import { Chance } from 'chance';

// project-imports
import MainCard from '@components/organisms/bookstore/MainCard';
import { PopupTransition } from '@components/@extended/Transitions';

// assets
import completed from 'src/assets/images/bookstore/completed.png';

const chance = new Chance();

// ==============================|| CHECKOUT - ORDER COMPLETE ||============================== //

export default function OrderComplete({ open }: { open: boolean }) {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      fullScreen
      TransitionComponent={PopupTransition}
      sx={{ '& .MuiDialog-paper': { bgcolor: 'background.paper', backgroundImage: 'none' } }}
    >
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item>
          <MainCard border={false}>
            <Stack spacing={2} alignItems="center">
              <Box sx={{ position: 'relative', width: { xs: 320, sm: 500 } }}>
                <img src={completed} alt="Order Complete" style={{ width: 'inherit' }} />
              </Box>
              <Typography variant={downMD ? 'h3' : 'h1'} align="center">
                Gracias por la compra
              </Typography>
              <Box sx={{ px: 2.5 }}>
                <Typography align="center" color="text.secondary">
                 Enviaremos una correo con la factura.
                </Typography>
                <Typography align="center" color="text.secondary">
                  Tu número de orden es:{' '}
                  <Typography variant="subtitle1" component="span" color="primary">
                    {chance.guid()}
                  </Typography>
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ py: { xs: 1, sm: 3 } }}>
                (593) 0978683525
              </Typography>
              <Stack direction="row" justifyContent="center" spacing={3}>
                <Button
                  component={Link}
                  to="/apps/e-commerce/products"
                  variant="outlined"
                  color="secondary"
                  size={downMD ? 'small' : 'medium'}
                >
                  Continuar comprando
                </Button>
                <Button
                  component={Link}
                  to="/apps/e-commerce/products"
                  variant="contained"
                  color="primary"
                  size={downMD ? 'small' : 'medium'}
                >
                  Descargar factura
                </Button>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </Dialog>
  );
}
