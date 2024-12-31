import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import RadioGroup from '@mui/material/RadioGroup';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import * as Yup from 'yup';

// project imports
import AddAddress from './AddAddress';
import AddressCard from './AddressCard';
import CartDiscount from './CartDiscount';
import OrderComplete from './OrderComplete';
import OrderSummary from './OrderSummery';
import PaymentCard from './PaymentCard';
import PaymentOptions from './PaymentOptions';
import PaymentSelect from './PaymentSelect';
import MainCard from '@components/organisms/bookstore/MainCard';
import Avatar from '@components/@extended/Avatar';
import IconButton from '@components/@extended/IconButton';

import { setPaymentCard } from 'src/api/bookstore/cart';
// import { openSnackbar } from 'src/api/snackbar';
import { getImageUrl, ImagePath } from 'src/utils/getImageUrl';
import {usePostOrders} from 'src/api/bookstore/orders';

// assets
import CreditCardOutlined from '@ant-design/icons/CreditCardOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

import master from 'src/assets/images/bookstore/master-card.png';
import paypalcard from 'src/assets/images/bookstore/paypal.png';
import visa from 'src/assets/images/bookstore/visa.png';

// types
import { SnackbarProps } from 'src/types/snackbar';
import { CartCheckoutStateProps } from 'src/types/cart';
import { Address, PaymentOptionsProps } from 'src/types/e-commerce';
import { useFormik } from 'formik';
import { useGetPayment, usePostPayment } from 'src/api/bookstore/uPayment';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import { PaymentMethod } from 'src/types/users';
import { setPaymentDetails } from 'src/api/bookstore/cart';
import { useSimpleSnackbar } from '@components/SimpleSnackbarProvider';

// ==============================|| CHECKOUT PAYMENT - MAIN ||============================== //

interface PaymentProps {
  checkout: CartCheckoutStateProps;
  onBack: () => void;
  onNext: () => void;
  removeProduct: (id: string | number | undefined) => void;
  editAddress: (address: Address) => void;
}

const validationSchema = Yup.object({
  CardNumber: Yup.string()
    .required('El número de la tarjeta es requerido')
    .matches(/^[0-9]{13,16}$/, 'Debe tener entre 13 y 16 dígitos'),
  ExpiryMonth: Yup.string()
    .required('El mes de expiración es requerido')
    .matches(/^(0[1-9]|1[0-2])$/, 'Mes inválido'),
  ExpiryYear: Yup.string()
    .required('El año de expiración es requerido')
    .matches(/^[0-9]{4}$/, 'Debe tener 4 dígitos'),
  Cvv: Yup.string()
    .required('El CVV es requerido')
    .matches(/^[0-9]{3,4}$/, 'Debe tener 3 o 4 dígitos')
});
// Función para identificar la tarjeta
const identificarTarjeta = (numeroTarjeta: string): string => {
  numeroTarjeta = numeroTarjeta.replace(/[\s\-]/g, '');
  if (numeroTarjeta.length < 13 || numeroTarjeta.length > 19) {
    return 'Tarjeta inválida';
  }
  if (numeroTarjeta[0] === '4' && (numeroTarjeta.length === 13 || numeroTarjeta.length === 16)) {
    return 'visa';
  }
  const mastercardPrefixes = ['51', '52', '53', '54', '55'];
  const mastercardPrefix = numeroTarjeta.slice(0, 2);
  const mastercardPrefixRange = parseInt(numeroTarjeta.slice(0, 4));
  if (
    (mastercardPrefixes.includes(mastercardPrefix) || (mastercardPrefixRange >= 2221 && mastercardPrefixRange <= 2720)) &&
    numeroTarjeta.length === 16
  ) {
    return 'mastercard';
  }
  return 'desconocida';
};

export default function Payment({ checkout, onBack, onNext, removeProduct, editAddress }: PaymentProps) {
  const theme = useTheme();

  const [payment, setPayment] = useState(checkout.payment.type);
  const [rows, setRows] = useState(checkout.products);
  const [tokens, setTokens] = useState(checkout.payment.token);
  const [select, setSelect] = useState<Address | null>(null);
  const [cardType, setCardType] = useState<string>('');
  const { postPayments } = usePostPayment();
  const [open, setOpen] = useState(false);
  const { paymentLoading, pay, paymentEmpty } = useGetPayment();
  const [typePayment, setTypePayment] = useState('');
  const [orderID, setOrderID] = useState('');
  const {postOrder} = usePostOrders();
  const { showWarning, showError } = useSimpleSnackbar(); 

  const handleClickOpen = (billingAddress: Address | null) => {
    setOpen(true);
    billingAddress && setSelect(billingAddress!);
  };

    // Este efecto se ejecutará cuando `orderID` o `typePayment` cambien
    useEffect(() => {
      if (orderID && typePayment) {
        setPaymentDetails(typePayment, orderID); 
      }
    }, [orderID, typePayment]);

  const handleClose = () => {
    setOpen(false);
    setSelect(null);
  };

  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (checkout.step > 2) {
      setComplete(true);
    }
  }, [checkout.step]);

  useEffect(() => {
    setRows(checkout.products);
  }, [checkout.products]);

  useEffect(() => {
    if (complete) {
      postOrder();
    }
  }, [complete]);

  const cardHandler = (card: string) => {
    if (payment === 'card') {
      setTokens(card);
      setPaymentCard(card);
    }
  };

  const handlePaymentMethod = (value: string) => {
    setPayment(value);
    // setPaymentMethod(value);
  };

  const handleApprove = (orderId: string) => {
    console.log('Pago exitoso con ID de orden:', orderId);
    setOrderID(orderId);
    setComplete(true); // Marca el proceso como completo después del pago exitoso
    onNext(); // Navega al siguiente paso si es necesario
  };

  const completeHandler = () => {
    if (payment === 'card' && (tokens === '' || tokens === null)) {
      showWarning('Por favor, selecciona un método de pago');
    } else {
      onNext();
      setComplete(true);
    }
  };

  const getImage = (cardType: string) => {
    if (cardType === 'visa') {
      return <img src={visa} alt="card-visa" />;
    }
    if (cardType === 'mastercard') {
      return <img src={master} alt="card-master" />;
    }
    if (cardType === 'paypal') {
      return <img src={paypalcard} alt="card-paypal" />;
    }
    return null;
  };

  // Manejar el cambio en el número de la tarjeta
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numeroTarjeta = e.target.value;
    const tipoTarjeta = identificarTarjeta(numeroTarjeta);
    setCardType(tipoTarjeta);
    formik.handleChange(e);
  };

  const formik = useFormik({
    initialValues: {
      CardHolderName: '',
      CardNumber: '',
      ExpiryMonth: '',
      ExpiryYear: '',
      Cvv: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('Enviando método de pago:', values);
      await postPayments({
        id: '',
        type: 'card',
        cardBrand: cardType,
        cardHolderName: values.CardHolderName,
        cardNumber: values.CardNumber,
        expirationMonth: values.ExpiryMonth,
        expirationYear: values.ExpiryYear,
        last4: values.Cvv
      });
      resetForm();
    }
  });

  let paymentResult: ReactElement | ReactElement[] = (
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
  if (pay && !paymentLoading) {
    paymentResult = pay.map((pay: PaymentMethod, index: number) => (
      <Grid key={index} item xs={12} lg={4}>
        <PaymentCard key={pay.id} pay={pay} type={pay.cardBrand} paymentType={pay.type} cardHandler={cardHandler} />
      </Grid>
    ));
  } else if (paymentEmpty) {
    paymentResult = (
      <Grid item xs={12} lg={6}>
        <MainCard>
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle1">Agrega un método de pago</Typography>
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
      <Grid item xs={12} md={6} lg={8} xl={9}>
        <Stack spacing={2} alignItems="flex-end">
          <MainCard title="Método de pago">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* <AddressCard change address={checkout.billing} handleClickOpen={handleClickOpen} /> */}
                <AddressCard address={checkout.billing} handleClickOpen={handleClickOpen} />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup
                    aria-label="payment-options"
                    value={payment}
                    onChange={(e) => handlePaymentMethod(e.target.value)}
                    name="payment-options"
                  >
                    <Grid container spacing={2} alignItems="center">
                      {PaymentOptions.map((item: PaymentOptionsProps, index: number) => (
                        <Grid item xs={12} sm={6} lg={6} key={index}>
                          <PaymentSelect item={item} />
                        </Grid>
                      ))}
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>

              {payment === 'card' && (
                <Grid item xs={12}>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container rowSpacing={2}>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={5}>
                            <Stack>
                              <InputLabel htmlFor="CardHolderName">Nombre de la Tarjeta:</InputLabel>
                              <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                Ingresa el nombre del titular de la tarjeta
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              fullWidth
                              id="CardHolderName"
                              name="CardHolderName"
                              placeholder="Nombre del titular de la tarjeta"
                              value={formik.values.CardHolderName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.CardHolderName && Boolean(formik.errors.CardHolderName)}
                              helperText={formik.touched.CardHolderName && formik.errors.CardHolderName}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={5}>
                            <Stack>
                              <InputLabel htmlFor="CardNumber">Número de Tarjeta:</InputLabel>
                              <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                Ingresa el número de 16 dígitos de la tarjeta
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              fullWidth
                              id="CardNumber"
                              name="CardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formik.values.CardNumber}
                              onChange={handleCardNumberChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.CardNumber && Boolean(formik.errors.CardNumber)}
                              helperText={formik.touched.CardNumber && formik.errors.CardNumber}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">{getImage(cardType)}</InputAdornment>,
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <CheckOutlined />
                                  </InputAdornment>
                                )
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={5}>
                            <Stack>
                              <InputLabel htmlFor="ExpiryMonth">Fecha de Expiración:</InputLabel>
                              <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                Ingresa la fecha de expiración de la tarjeta
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={7}>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                  <TextField
                                    fullWidth
                                    id="ExpiryMonth"
                                    name="ExpiryMonth"
                                    placeholder="MM"
                                    value={formik.values.ExpiryMonth}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.ExpiryMonth && Boolean(formik.errors.ExpiryMonth)}
                                    helperText={formik.touched.ExpiryMonth && formik.errors.ExpiryMonth}
                                  />
                                  <Typography color="text.secondary">/</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  id="ExpiryYear"
                                  name="ExpiryYear"
                                  placeholder="YYYY"
                                  value={formik.values.ExpiryYear}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.ExpiryYear && Boolean(formik.errors.ExpiryYear)}
                                  helperText={formik.touched.ExpiryYear && formik.errors.ExpiryYear}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={5}>
                            <Stack>
                              <InputLabel htmlFor="Cvv">Número CVV:</InputLabel>
                              <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                Ingresa el número de 3 o 4 dígitos de la tarjeta
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              fullWidth
                              id="Cvv"
                              name="Cvv"
                              type="password"
                              placeholder="123"
                              value={formik.values.Cvv}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.Cvv && Boolean(formik.errors.Cvv)}
                              helperText={formik.touched.Cvv && formik.errors.Cvv}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                                    <CreditCardOutlined style={{ fontSize: '1.15rem', color: 'inherit' }} />
                                  </InputAdornment>
                                )
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button variant="outlined" color="secondary" onClick={formik.handleReset}>
                          Cancelar
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                          Guardar
                        </Button>
                      </Stack>
                    </Grid>
                  </form>
                </Grid>
              )}

              {payment === 'paypal' && (
                <Grid item xs={12}>
                  <PayPalScriptProvider
                    options={{
                      clientId: 'Achq-oXU9dHDIxdPA6cG9IulSSVUHz6xTRGndeS1O7puGXC4s4rY-uxeuGUpnyU86JG8fl3MbZghKg_r',
                      currency: 'USD'
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: 'vertical' }}
                      createOrder={(data, actions) => {
                        if (!actions.order) {
                          throw new Error('actions.order is undefined');
                        }
                        console.log('Orden creada para PayPal:', data);
                        setTypePayment(data.paymentSource)
                        return actions.order.create({
                          intent: 'CAPTURE',
                          purchase_units: [
                            {
                              amount: {
                                currency_code: 'USD',
                                value: checkout.total.toFixed(2)
                              }
                            }
                          ]
                        });
                      }}
                      onApprove={(data, actions) => {
                        if (!actions.order) {
                          throw new Error('actions.order is undefined');
                        }
                        return actions.order.capture().then((details) => {
                          const orderId = data.orderID;
                          setOrderID(orderId);
                          console.log('Pago exitoso para el ID de orden:', orderId);
                          handleApprove(orderId);
                        });
                      }}
                      onError={(err) => {
                        console.error('Error en el pago de PayPal', err);
                        showError('Error en el pago de PayPal');
                      }}
                    />
                  </PayPalScriptProvider>
                </Grid>
              )}

              <Grid item xs={12}>
                <Stack direction="row" spacing={0} alignItems="center">
                  <Grid item xs={6}>
                    <Divider />
                  </Grid>
                  {/* Puedes descomentar estas líneas si deseas mostrar un separador "OR" */}
                  <Typography sx={{ px: 1 }}>OR</Typography>
                  <Grid item xs={6}>
                    <Divider />
                  </Grid>
                </Stack>
              </Grid>

              {/* Puedes mantener o eliminar esta sección según tus necesidades */}
              <Grid item xs={12} sm={12} lg={10}>
                <Grid container spacing={2}>
                    {paymentResult}
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
          <Button variant="text" color="secondary" startIcon={<LeftOutlined />} onClick={onBack}>
            <Typography variant="h6" color="text.primary">
              Volver a la información de envío
            </Typography>
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Stack>
          {/* Puedes mantener o eliminar esta sección según tus necesidades */}
          {/* <MainCard sx={{ mb: 3 }}>
            <CartDiscount />
          </MainCard> */}
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
          <Button variant="contained" sx={{ textTransform: 'none', mt: 3 }} onClick={completeHandler} fullWidth>
            Proceder al pago
          </Button>
          <OrderComplete open={complete} orderID={orderID} />
        </Stack>
      </Grid>
      <AddAddress open={open} handleClose={handleClose} address={select!} editAddress={editAddress} />
    </Grid>
  );
}
