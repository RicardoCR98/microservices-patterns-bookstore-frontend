import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Skeleton from '@mui/material/Skeleton';
import * as Yup from 'yup';

// project imports
import AddressCard from './AddressCard';
import CartDiscount from './CartDiscount';
import OrderSummary from './OrderSummery';
import MainCard from '@components/organisms/bookstore/MainCard';
import Avatar from '@components/@extended/Avatar';
import IconButton from '@components/@extended/IconButton';
import { useGetAddress, usePostAddress } from 'src/api/bookstore/address';
import { getImageUrl, ImagePath } from 'src/utils/getImageUrl';

// types
import { Address } from 'src/types/e-commerce';
import { CartCheckoutStateProps } from 'src/types/cart';

// assets
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { useFormik } from 'formik';

interface BillingAddressProps {
  checkout: CartCheckoutStateProps;
  onBack: () => void;
  billingAddressHandler: (billingAddress: Address | null) => void;
  removeProduct: (id: string | number | undefined) => void;
}

const validationSchema = Yup.object({
  label: Yup.string().required('El nombre de la dirección es requerido'),
  line1: Yup.string().required('La calle principal es requerida'),
  city: Yup.string().required('La ciudad es requerida'),
  state: Yup.string().required('El estado es requerido'),
  country: Yup.string().required('El país es requerido'),
  zipCode: Yup.string().required('El código postal es requerido'),
  phoneNumber: Yup.string().required('El número de teléfono es requerido')
});

// ==============================|| CHECKOUT BILLING ADDRESS - MAIN ||============================== //

export default function BillingAddress({ checkout, onBack, billingAddressHandler, removeProduct }: BillingAddressProps) {
  const theme = useTheme();
  const [rows, setRows] = useState(checkout.products);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const { addressLoading, address, addressEmpty } = useGetAddress();
  const { postAddress } = usePostAddress();

  function handleSelectAddress(address: Address) {
    setSelectedAddress(address);
  }

  useEffect(() => {
    setRows(checkout.products);
  }, [checkout.products]);

  const formik = useFormik({
    initialValues: {
      label: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phoneNumber: '',
      defaultAddress: false
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('Submitting address:', values);
      await postAddress(values);
      resetForm();
    }
  });

  let addressResult: ReactElement | ReactElement[] = (
    <>
      {[1, 2].map((index) => (
        <Grid key={index} item xs={12} lg={6}>
          <MainCard>
            <Grid container spacing={0.5}>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} width={150} />
                    <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} width={50} />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Box>
                    <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} width="40%" />
                  </Box>
                  <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} />
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      ))}
    </>
  );
  if (address && !addressLoading) {
    addressResult = address.map((address: Address, index: number) => (
      <Grid key={index} item xs={12} lg={6}>
        <AddressCard  key={address.id} address={address} billingAddressHandler={() => handleSelectAddress(address)} />
      </Grid>
    ));
  } else if (addressEmpty) {
    addressResult = (
      <Grid item xs={12} lg={6}>
        <MainCard>
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle1">No address found</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    );
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Stack spacing={2} alignItems="flex-end">
          <MainCard title="Información de Envío">
            <Grid container spacing={2} sx={{ mb: 2.5 }}>
              {addressResult}
            </Grid>
            <Grid container spacing={2} component="form" onSubmit={formik.handleSubmit}>
              <Grid item xs={12}>
                <InputLabel>Nombre:</InputLabel>
                <TextField
                  fullWidth
                  placeholder="Ejemplo: Casa, Oficina, etc."
                  name="label"
                  value={formik.values.label}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.label && Boolean(formik.errors.label)}
                  helperText={formik.touched.label && formik.errors.label}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Calle principal</InputLabel>
                <TextField
                  placeholder="Ejemplo: Calle 1, Av. 2, etc."
                  fullWidth
                  name="line1"
                  value={formik.values.line1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.line1 && Boolean(formik.errors.line1)}
                  helperText={formik.touched.line1 && formik.errors.line1}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Calle secundaria</InputLabel>
                <TextField
                  fullWidth
                  placeholder="Ejemplo: Calle 2, Av. 3, etc."
                  name="line2"
                  value={formik.values.line2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.line2 && Boolean(formik.errors.line2)}
                  helperText={formik.touched.line2 && formik.errors.line2}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Ciudad</InputLabel>
                <TextField
                  fullWidth
                  placeholder="Ejemplo: Quito, Guayaquil, etc."
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Estado</InputLabel>
                <TextField
                  fullWidth
                  placeholder="Ejemplo: Pichincha, Guayas, etc."
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>País</InputLabel>
                <TextField
                  fullWidth
                  placeholder="Ejemplo: Ecuador, Colombia, etc."
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  helperText={formik.touched.country && formik.errors.country}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Código Postal</InputLabel>
                <TextField
                  fullWidth
                  placeholder="Ejemplo: EC170150, 090150, etc."
                  name="zipCode"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Número de teléfono</InputLabel>
                <TextField
                  fullWidth
                  placeholder="Ejemplo: 0999999999, 022222222, etc."
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Checkbox name="defaultAddress" checked={formik.values.defaultAddress} onChange={formik.handleChange} />
                  <Typography>Establecer como dirección predeterminada</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button variant="outlined" color="secondary" onClick={formik.handleReset}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
          <Button variant="text" color="secondary" startIcon={<LeftOutlined />} onClick={onBack}>
            <Typography variant="h6" color="text.primary">
              Regresar al carrito de compras
            </Typography>
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <Stack>
            <MainCard title="Resumen de la orden" sx={{ borderRadius: '4px 4px 0 0', borderBottom: 'none' }} content={false}>
              {rows.map((row, index) => (
                <List
                  key={index}
                  component="nav"
                  sx={{
                    '& .MuiListItemButton-root': {
                      '& .MuiListItemSecondaryAction-root': {
                        alignSelf: 'flex-start',
                        ml: 1,
                        position: 'relative',
                        right: 'auto',
                        top: 'auto',
                        transform: 'none'
                      },
                      '& .MuiListItemAvatar-root': { mr: '7px' },
                      py: 0.5,
                      pl: '15px',
                      pr: '8px'
                    },
                    p: 0
                  }}
                >
                  <ListItemButton divider>
                    <ListItemAvatar>
                      <Avatar
                        alt="Avatar"
                        size="lg"
                        variant="rounded"
                        color="secondary"
                        type="combined"
                        src={row.image ? getImageUrl(`thumbs/${row.image}`, ImagePath.ECOMMERCE) : ''}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography
                          component={Link}
                          to={`/apps/e-commerce/product-details/${row.id}`}
                          target="_blank"
                          variant="subtitle1"
                          color="text.primary"
                          sx={{ textDecoration: 'none' }}
                        >
                          {row.name}
                        </Typography>
                      }
                      secondary={
                        <Stack spacing={1}>
                          <Typography color="text.secondary">{row.description}</Typography>
                          <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography>${row.offerPrice}</Typography>
                            <Typography color="text.secondary">{row.quantity} items</Typography>
                          </Stack>
                        </Stack>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        size="medium"
                        color="secondary"
                        sx={{ opacity: 0.5, '&:hover': { bgcolor: 'transparent' } }}
                        onClick={() => removeProduct(row.itemId)}
                      >
                        <DeleteOutlined style={{ color: theme.palette.grey[500] }} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </List>
              ))}
            </MainCard>
            <OrderSummary checkout={checkout} show={false} />
          </Stack>
          <Button
            variant="contained"
            fullWidth
            sx={{ textTransform: 'none' }}
            onClick={() => billingAddressHandler(selectedAddress)}
            disabled={!selectedAddress}
          >
            Proceder al Pago
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
