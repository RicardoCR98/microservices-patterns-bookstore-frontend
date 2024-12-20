// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '@components/organisms/bookstore/MainCard';
import { ThemeMode } from 'src/config';

// assets
import RightOutlined from '@ant-design/icons/RightOutlined';
import imageEmpty from 'src/assets/images/bookstore/empty.png';
import imageDarkEmpty from 'src/assets/images/bookstore/empty-dark.png';
import { Link as RouterLink } from 'react-router-dom';

// ==============================|| CHECKOUT CART - NO/EMPTY CART ITEMS ||============================== //

export default function CartEmpty() {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <MainCard content={false}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{ my: 3, height: { xs: 'auto', md: 'calc(100vh - 240px)' }, p: { xs: 2.5, md: 'auto' } }}
      >
        <Grid item>
          <CardMedia
            component="img"
            image={theme.palette.mode === ThemeMode.DARK ? imageDarkEmpty : imageEmpty}
            title="Cart Empty"
            sx={{ width: { xs: 240, md: 320, lg: 440 } }}
          />
        </Grid>
        <Grid item>
          <Stack spacing={0.5}>
            <Typography variant={downLG ? 'h3' : 'h1'} color="inherit">
            Añade artículos a tu carrito
            </Typography>
            <Typography variant="h5" color="text.secondary">
            Explora mas libros y añadelos a tu carrito.
            </Typography>
            <Box sx={{ pt: 3 }}>
              <Button component={RouterLink} to="/home" variant="contained" size="large" endIcon={<RightOutlined />} >
                Explorar mas Libros
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}
