import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from '@components/organisms/bookstore/MainCard';
import IconButton from '@components/@extended/IconButton';
import SkeletonProductPlaceholder from '../skeleton/ProductPlaceholder';
import { useGetCart, addToCart } from 'src/api/bookstore/cart';
import { useSimpleSnackbar } from 'src/components/SimpleSnackbarProvider'; // Importa el hook para usar el Snackbar
import { ImagePath, getImageUrl } from '@utils/getImageUrl';

// types
import { ProductCardProps } from 'src/types/cart';

// assets
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';

export default function ProductCard({
  id,
  name,
  author,
  offer,
  isStock,
  image,
  description,
  offerPrice,
  salePrice,
  rating
}: ProductCardProps) {
  const theme = useTheme();
  const { cart } = useGetCart();
  const { showSuccess, showInfo } = useSimpleSnackbar(); 

  const [wishlisted, setWishlisted] = useState<boolean>(false);

  const addCart = () => {
    addToCart({ id, name, image, salePrice, offerPrice, size: 8, quantity: 1, description }, cart.products);
    showSuccess('Producto añadido al carrito con éxito');
  };

  const addToFavourite = () => {
    setWishlisted(!wishlisted);
    showInfo(!wishlisted ? 'Añadido a favoritos' : 'Removido de favoritos'); 
  };

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonProductPlaceholder />
      ) : (
        <MainCard content={false} boxShadow sx={{ '&:hover': { transform: 'scale3d(1.02, 1.02, 1)', transition: 'all .4s ease-in-out' } }}>
          <Box sx={{ width: 250, m: 'auto' }}>
            <CardMedia
              sx={{ height: 250, textDecoration: 'none', opacity: isStock ? 1 : 0.25 }}
              image={image}
              component={Link}
              to={`/product/${id}`}
            />
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: '100%', position: 'absolute', top: 0, pt: 1.75, pl: 2, pr: 1 }}
          >
            {!isStock && <Chip variant="light" color="error" size="small" label="Agotado" />}
            {offer > 0 && <Chip label={`${offer} %`} variant="combined" color="success" size="small" />}
            <IconButton color="secondary" sx={{ ml: 'auto', '&:hover': { bgcolor: 'transparent' } }} onClick={addToFavourite}>
              {wishlisted ? (
                <HeartFilled style={{ fontSize: '1.15rem', color: theme.palette.error.main }} />
              ) : (
                <HeartOutlined style={{ fontSize: '1.15rem' }} />
              )}
            </IconButton>
          </Stack>
          <Divider />
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack>
                  <Typography
                    component={Link}
                    to={`/product/${id}`}
                    color="text.primary"
                    variant="h5"
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                  >
                    {name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {author}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap" rowGap={1.75}>
                  <Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h5">${offerPrice}</Typography>
                      {salePrice && salePrice !== offerPrice && (
                        <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                          ${salePrice}
                        </Typography>
                      )}
                    </Stack>
                    <Stack direction="row" alignItems="flex-start">
                      <Rating precision={0.5} name="size-small" value={rating} size="small" readOnly />
                      <Typography variant="caption">({rating?.toFixed(1)})</Typography>
                    </Stack>
                  </Stack>

                  <Button
                    variant="contained"
                    onClick={addCart}
                    disabled={!isStock}
                    sx={{ '&.Mui-disabled': { color: theme.palette.grey[400] } }}
                  >
                    {!isStock ? 'Agotado' : 'Añadir al Carrito'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
}
