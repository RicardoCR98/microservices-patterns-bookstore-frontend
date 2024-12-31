import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// project import
import MainCard from '@components/organisms/bookstore/MainCard';
import IconButton from '@components/@extended/IconButton';
import { ThemeMode } from 'src/config';
// import { openSnackbar } from 'src/api/snackbar';

// Third-party
import { TransformWrapper, TransformComponent, ReactZoomPanPinchHandlers } from 'react-zoom-pan-pinch';

// Assets (Iconos)
import ZoomInOutlined from '@ant-design/icons/ZoomInOutlined';
import ZoomOutOutlined from '@ant-design/icons/ZoomOutOutlined';
import RedoOutlined from '@ant-design/icons/RedoOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import HeartOutlined from '@ant-design/icons/HeartOutlined';

// types
import { SnackbarProps } from 'src/types/snackbar';
import { Products } from 'src/types/e-commerce';
import { useSimpleSnackbar } from '@components/SimpleSnackbarProvider';

// ==============================|| PRODUCT DETAILS - IMAGE ||============================== //

export default function ProductImages({ product }: { product: Products }) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const { showInfo } = useSimpleSnackbar();
  const [wishlisted, setWishlisted] = useState<boolean>(false);
  const addToFavourite = () => {
    setWishlisted(!wishlisted);
    showInfo(!wishlisted ? 'Añadido a favoritos' : 'Removido de favoritos');
  };

  // Estado para almacenar la URL de la imagen
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    if (product && product.cover) {
      setSelected(product.cover); // Asumiendo que product.cover ya es una URL completa
    }
  }, [product]);

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <MainCard
          content={false}
          border={false}
          boxShadow={false}
          shadow={false}
          sx={{
            m: '0 auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'grey.50' : 'secondary.lighter',
            position: 'relative', // Asegura que los iconos se posicionen correctamente
            '& .react-transform-wrapper': { cursor: 'crosshair', height: '100%' },
            '& .react-transform-component': { height: '100%' }
          }}
        >
          <TransformWrapper initialScale={1}>
            {({ zoomIn, zoomOut, resetTransform }: ReactZoomPanPinchHandlers) => (
              <>
                <TransformComponent>
                  <CardMedia
                    // Puedes eliminar el manejo del modal si no lo necesitas
                    // onClick={() => setModal(!modal)}
                    component="img"
                    src={selected} // Usar 'src' en lugar de 'image' para evitar conflictos
                    alt="Imagen del Producto"
                    title="Zoom de Producto"
                    sx={{ borderRadius: `4px`, width: '100%', height: 'auto', cursor: 'pointer' }}
                  />
                </TransformComponent>
                <Stack direction="row" className="tools" sx={{ position: 'absolute', bottom: 10, right: 10, zIndex: 1 }}>
                  <IconButton color="secondary" onClick={() => zoomIn()}>
                    <ZoomInOutlined style={{ fontSize: '1.15rem' }} />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => zoomOut()}>
                    <ZoomOutOutlined style={{ fontSize: '1.15rem' }} />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => resetTransform()}>
                    <RedoOutlined style={{ fontSize: '1.15rem' }} />
                  </IconButton>
                </Stack>
              </>
            )}
          </TransformWrapper>
          <IconButton
            color="secondary"
            sx={{ position: 'absolute', top: 5, right: 5, '&:hover': { bgcolor: 'transparent' } }}
            onClick={addToFavourite}
          >
            {wishlisted ? (
              <HeartFilled style={{ fontSize: '1.15rem', color: theme.palette.error.main }} />
            ) : (
              <HeartOutlined style={{ fontSize: '1.15rem' }} />
            )}
          </IconButton>
        </MainCard>
      </Grid>
    </Grid>
  );
}
