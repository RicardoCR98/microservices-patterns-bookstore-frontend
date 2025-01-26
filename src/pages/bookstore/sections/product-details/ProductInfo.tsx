import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// third-party
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';

// project imports
import ColorOptions from '../products/ColorOptions';
import Avatar from '@components/@extended/Avatar';

import { addToCart, useGetCart } from 'src/api/bookstore/cart';
// import { openSnackbar } from 'src/api/snackbar';
import { ThemeMode } from 'src/config';

// assets
import DownOutlined from '@ant-design/icons/DownOutlined';
import StarFilled from '@ant-design/icons/StarFilled';
import StarOutlined from '@ant-design/icons/StarOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';

// types
import { ColorsOptionsProps, Products } from 'src/types/e-commerce';
import { SnackbarProps } from 'src/types/snackbar';
import { useSimpleSnackbar } from '@components/SimpleSnackbarProvider';

// product color select
function getColor(color: string) {
  return ColorOptions.filter((item) => item.value === color);
}

const validationSchema = yup.object({
  color: yup.string().required('Color selection is required')
});

// ==============================|| COLORS OPTION ||============================== //

function Colors({ checked, colorsData }: { checked?: boolean; colorsData: ColorsOptionsProps[] }) {
  const theme = useTheme();
  return (
    <Grid item>
      <Tooltip title={colorsData.length && colorsData[0] && colorsData[0].label ? colorsData[0].label : ''}>
        <ButtonBase
          sx={{
            borderRadius: '50%',
            '&:focus-visible': {
              outline: `2px solid ${theme.palette.secondary.dark}`,
              outlineOffset: 2
            }
          }}
        >
          <Avatar
            color="inherit"
            size="sm"
            sx={{
              bgcolor: colorsData[0]?.bg,
              color: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[800] : theme.palette.grey[50],
              border: '3px solid',
              borderColor: checked ? theme.palette.secondary.light : theme.palette.background.paper
            }}
          >
            {' '}
          </Avatar>
        </ButtonBase>
      </Tooltip>
    </Grid>
  );
}

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

export default function ProductInfo({ product }: { product: Products }) {
  const theme = useTheme();

  const [value, setValue] = useState<number>(1);
  const history = useNavigate();
  const { cart } = useGetCart();
  const { showSuccess } = useSimpleSnackbar();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: product.id,
      name: product.title,
      image: product.cover,
      salePrice: product.salePrice,
      offerPrice: product.offerPrice,
      rating: product.rating,
      // color: '',
      size: '',
      quantity: 1
    },
    validationSchema,
    onSubmit: (values) => {
      values.quantity = value;
      const base64Image = typeof product.cover === "string" ? product.cover : "";
      const imageSrc = base64Image.startsWith("data:image")
        ? base64Image
        : `data:image/png;base64,${base64Image}`; 
      addToCart({ ...values, image:imageSrc }, cart.products);
      showSuccess('Producto añadido al carrito con éxito');

      history('/my-books');
    }
  });

  const { errors, values, handleSubmit, handleChange } = formik;

  const addCart = () => {
    const base64Image = typeof product.cover === "string" ? product.cover : "";
    const imageSrc = base64Image.startsWith("data:image")
      ? base64Image
      : `data:image/png;base64,${base64Image}`; // Asegurarse del formato de la imagen
    // values.color = values.color ? values.color : 'primaryDark';
    values.quantity = value;
    addToCart({ ...values, image: imageSrc }, cart.products);
    showSuccess('Producto añadido al carrito con éxito');
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* <Rating
          name="simple-controlled"
          value={product.rating}
          icon={<StarFilled style={{ fontSize: 'inherit' }} />}
          emptyIcon={<StarOutlined style={{ fontSize: 'inherit' }} />}
          precision={0.1}
          readOnly
        />
        <Typography color="text.secondary">({product.rating?.toFixed(1)})</Typography> */}
      </Stack>
      <Stack direction="row" spacing={1}>
        <Typography variant="h3">{product.title}</Typography>
        <Chip
          size="small"
          label={product.isAvailable ? 'En Stock' : 'Fuera de Stock'}
          sx={{
            width: 'fit-content',
            borderRadius: '4px',
            color: product.isAvailable ? 'success.main' : 'error.main',
            bgcolor: product.isAvailable ? 'success.lighter' : 'error.lighter'
          }}
        />
      </Stack>
      <Typography color="text.secondary">
        Condición:{' '}
        <Chip
          size="small"
          label={product.condition ? 'NUEVO' : 'USADO'}
          sx={{
            width: 'fit-content',
            borderRadius: '4px',
            color: product.condition ? 'primary.main' : 'error.main',
            bgcolor: product.condition ? 'primary.lighter' : 'error.lighter'
          }}
        />
      </Typography>

      <Typography color="text.secondary">
        Número de Páginas:{' '}
        <Chip
          size="small"
          label={product.npages}
          sx={{
            width: 'fit-content',
            borderRadius: '4px',
            color: 'primary.main',
            bgcolor: 'primary.lighter'
          }}
        />
      </Typography>
      <Typography color="text.secondary">{product.description}</Typography>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <Stack direction="row" alignItems="center" spacing={4.5}>
              <Typography color="text.secondary">Cantidad</Typography>
              <Stack justifyContent="flex-end">
                <Stack direction="row">
                  <TextField
                    name="rty-incre"
                    value={value > 0 ? value : ''}
                    onChange={(e: any) => setValue(Number(e.target.value))}
                    sx={{ '& .MuiOutlinedInput-input': { p: 1.25 }, width: '33%', '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                  />
                  <Stack>
                    <Button
                      key="one"
                      color="secondary"
                      variant="outlined"
                      onClick={() => setValue(value + 1)}
                      sx={{
                        px: 0.5,
                        py: 0.35,
                        minWidth: '0px !important',
                        borderRadius: 0,
                        borderLeft: 'none',
                        '&:hover': { borderLeft: 'none', borderColor: theme.palette.secondary.light },
                        '&.Mui-disabled': { borderLeft: 'none', borderColor: theme.palette.secondary.light }
                      }}
                    >
                      <UpOutlined style={{ fontSize: 'small' }} />
                    </Button>
                    <Button
                      key="three"
                      color="secondary"
                      variant="outlined"
                      disabled={value <= 1}
                      onClick={() => setValue(value - 1)}
                      sx={{
                        px: 0.5,
                        py: 0.35,
                        minWidth: '0px !important',
                        borderRadius: 0,
                        borderTop: 'none',
                        borderLeft: 'none',
                        '&:hover': { borderTop: 'none', borderLeft: 'none', borderColor: theme.palette.secondary.light },
                        '&.Mui-disabled': { borderTop: 'none', borderLeft: 'none', borderColor: theme.palette.secondary.light }
                      }}
                    >
                      <DownOutlined style={{ fontSize: 'small' }} />
                    </Button>
                  </Stack>
                </Stack>
                {value === 0 && <FormHelperText sx={{ color: theme.palette.error.main }}>Seleccione una cantidad mayor a 0</FormHelperText>}
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h3">${product.offerPrice}</Typography>
              {product.salePrice && (
                <Typography variant="h4" color="text.secondary" sx={{ textDecoration: 'line-through', opacity: 0.5, fontWeight: 400 }}>
                  ${product.salePrice}
                </Typography>
              )}
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 4 }}>
            <Button type="submit" fullWidth disabled={value < 1 || !product.isAvailable} color="primary" variant="contained" size="large">
              {!product.isAvailable ? 'Agotado' : 'Comprar Ahora'}
            </Button>

            {product.isAvailable && value > 0 && (
              <Button fullWidth color="secondary" variant="outlined" size="large" onClick={addCart}>
                Añadir al Carrito
              </Button>
            )}
          </Stack>
        </Form>
      </FormikProvider>
    </Stack>
  );
}
