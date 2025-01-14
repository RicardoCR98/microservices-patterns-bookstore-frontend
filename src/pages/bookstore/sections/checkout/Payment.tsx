import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  RadioGroup,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
  TextField,
  Divider,
  Skeleton
} from '@mui/material';
import { Box } from '@mui/system';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import * as Yup from 'yup';
import { useFormik } from 'formik';

// project imports
import MainCard from '@components/organisms/bookstore/MainCard';
import AddressCard from './AddressCard';
import AddAddress from './AddAddress';
import OrderComplete from './OrderComplete';
import OrderSummary from './OrderSummery';
import PaymentCard from './PaymentCard';
import PaymentOptions from './PaymentOptions';
import PaymentSelect from './PaymentSelect';
import Avatar from '@components/@extended/Avatar';
import IconButton from '@components/@extended/IconButton';
import { useSimpleSnackbar } from '@components/SimpleSnackbarProvider';

import LeftOutlined from '@ant-design/icons/LeftOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import CreditCardOutlined from '@ant-design/icons/CreditCardOutlined';

import master from 'src/assets/images/bookstore/master-card.png';
import paypalcard from 'src/assets/images/bookstore/paypal.png';
import visa from 'src/assets/images/bookstore/visa.png';

// Hooks o funciones de tu API
import { setPaymentCard, setPaymentDetails } from 'src/api/bookstore/cart';
import { useGetPayment, usePostPayment } from 'src/api/bookstore/uPayment';
import { usePostOrders } from 'src/api/bookstore/orders';

// Utils o helpers
import { getImageUrl, ImagePath } from 'src/utils/getImageUrl';

// Tipos
import { CartCheckoutStateProps } from 'src/types/cart';
import { Address, PaymentOptionsProps } from 'src/types/e-commerce';

interface PaymentProps {
  checkout: CartCheckoutStateProps;
  onBack: () => void;
  onNext: () => void;
  removeProduct: (id: string | number | undefined) => void;
  editAddress: (address: Address) => void;
}

// Validación de tarjeta
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

// Función para detectar tipo de tarjeta
const identificarTarjeta = (numeroTarjeta: string): string => {
  const clean = numeroTarjeta.replace(/[\s\-]/g, '');
  if (clean.length < 13 || clean.length > 19) return 'Tarjeta inválida';
  // VISA
  if (clean[0] === '4' && (clean.length === 13 || clean.length === 16)) {
    return 'visa';
  }
  // MASTERCARD
  const mcPrefixes = ['51', '52', '53', '54', '55'];
  const prefix2 = clean.slice(0, 2);
  const prefix4 = parseInt(clean.slice(0, 4), 10);
  if ((mcPrefixes.includes(prefix2) || (prefix4 >= 2221 && prefix4 <= 2720)) && clean.length === 16) {
    return 'mastercard';
  }
  return 'desconocida';
};

export default function Payment({ checkout, onBack, onNext, removeProduct, editAddress }: PaymentProps) {
  const theme = useTheme();
  const { showWarning, showError, showSuccess } = useSimpleSnackbar();

  // Estado local
  const [payment, setPayment] = useState(checkout.payment.type); // "paypal", "card", etc.
  const [tokens, setTokens] = useState(checkout.payment.token);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState<Address | null>(null);
  const [cardType, setCardType] = useState<string>('');

  // Hook para obtener/guardar tarjetas (opcional)
  const { paymentLoading, pay, paymentEmpty } = useGetPayment();
  const { postPayments } = usePostPayment();

  // Hook para crear la orden final
  const { postOrder } = usePostOrders();

  // Controla si la orden ya se completó
  const [complete, setComplete] = useState(false);

  // Copia de los productos para mostrar
  const [rows, setRows] = useState(checkout.products);
  useEffect(() => {
    setRows(checkout.products);
  }, [checkout.products]);

  useEffect(() => {
    if (checkout.step > 2) {
      setComplete(true);
    }
  }, [checkout.step]);

  // Cuando complete = true => se llama a postOrder()
  useEffect(() => {
    if (complete) {
      postOrder();
    }
  }, [complete]);

  // Manejo de Address
  const handleClickOpen = (billingAddress: Address | null) => {
    setOpen(true);
    if (billingAddress) setSelect(billingAddress);
  };
  const handleClose = () => {
    setOpen(false);
    setSelect(null);
  };

  // Manejo del método de pago
  const handlePaymentMethod = (value: string) => {
    setPayment(value);
  };

  // Aquí solo obtenemos orderID y lo guardamos en tokens
  const onPayPalApprove = (paypalOrderId: string) => {
    setPaymentDetails('paypal', paypalOrderId);
    setTokens(paypalOrderId);
    showSuccess(`Aprobado en PayPal. ID de orden: ${paypalOrderId}`);
  };

  // Botón principal
  const completeHandler = () => {
    if (payment === 'card' && (!tokens || tokens === '')) {
      showWarning('Por favor, selecciona o guarda un método de pago.');
      return;
    }
    // Subimos el step => crea la orden (postOrder)
    onNext();
    setComplete(true);
  };

  // Determinar label del botón
  const hasPayPalOrderId = tokens && tokens.length > 0; 
  const buttonLabel = hasPayPalOrderId ? "Ver factura" : "Proceder al pago";

  // Formik para tarjeta
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numero = e.target.value;
    setCardType(identificarTarjeta(numero));
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
      try {
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
        showSuccess('Tarjeta guardada/actualizada correctamente');
      } catch (error) {
        showError('Error al guardar tarjeta');
      }
      resetForm();
    }
  });

  // Helper para iconos de tarjeta
  const getImage = (t: string) => {
    if (t === 'visa') return <img src={visa} alt="card-visa" />;
    if (t === 'mastercard') return <img src={master} alt="card-master" />;
    if (t === 'paypal') return <img src={paypalcard} alt="card-paypal" />;
    return null;
  };

  // Render de tarjetas
  let paymentResult: ReactElement | ReactElement[] = (
    <>
      {[1, 2].map((index) => (
        <Grid key={index} item xs={12} lg={6}>
          <MainCard>
            <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} width={150} />
            <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} width={50} />
          </MainCard>
        </Grid>
      ))}
    </>
  );
  if (pay && !paymentLoading) {
    paymentResult = pay.map((pp: any, idx: number) => (
      <Grid key={idx} item xs={12} lg={4}>
        <PaymentCard
          key={pp.id}
          pay={pp}
          type={pp.cardBrand}
          paymentType={pp.type}
          cardHandler={(c: string) => setTokens(c)}
        />
      </Grid>
    ));
  } else if (paymentEmpty) {
    paymentResult = (
      <Grid item xs={12} lg={6}>
        <MainCard>
          <Typography>Agrega un método de pago</Typography>
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

              {/* Tarjeta */}
              {payment === 'card' && (
                <Grid item xs={12}>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container rowSpacing={2}>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={5}>
                            <InputLabel htmlFor="CardHolderName">Nombre Tarjeta</InputLabel>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              fullWidth
                              id="CardHolderName"
                              name="CardHolderName"
                              placeholder="Nombre del titular"
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
                            <InputLabel htmlFor="CardNumber">Número de Tarjeta</InputLabel>
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
                            <InputLabel htmlFor="ExpiryMonth">Fecha Expiración</InputLabel>
                          </Grid>
                          <Grid item xs={7}>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
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
                            <InputLabel htmlFor="Cvv">CVV</InputLabel>
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
                                  <InputAdornment position="start">
                                    <CreditCardOutlined />
                                  </InputAdornment>
                                )
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
                      <Button variant="outlined" onClick={formik.handleReset}>
                        Cancelar
                      </Button>
                      <Button variant="contained" color="primary" type="submit">
                        Guardar
                      </Button>
                    </Stack>
                  </form>
                </Grid>
              )}

              {/* PAYPAL */}
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
                          throw new Error('actions.order es undefined');
                        }
                        console.log('[PayPal] createOrder data:', data);

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
                      onApprove={async (data, actions) => {
                        if (!data.orderID) {
                          showError('No se obtuvo orderID desde PayPal');
                          return;
                        }
                        onPayPalApprove(data.orderID); 
                        setComplete(true);          
                        onNext();             
                      }}
                      onError={(err) => {
                        console.error('Error en PayPal:', err);
                        showError('Error al procesar pago PayPal');
                      }}
                    />
                  </PayPalScriptProvider>
                </Grid>
              )}

              {/* Divider y render de tarjetas guardadas */}
              <Grid item xs={12}>
                <Stack direction="row" spacing={0} alignItems="center">
                  <Grid item xs={6}>
                    <Divider />
                  </Grid>
                  <Typography sx={{ px: 1 }}>OR</Typography>
                  <Grid item xs={6}>
                    <Divider />
                  </Grid>
                </Stack>
              </Grid>

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

      {/* Resumen de Orden */}
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Stack>
          <MainCard title="Resumen de la orden" sx={{ borderRadius: '4px 4px 0 0', borderBottom: 'none' }} content={false}>
            {rows.map((row, index) => (
              <List
                key={index}
                component="nav"
                sx={{
                  '& .MuiListItemButton-root': {
                    py: 0.5,
                    pl: '15px',
                    pr: '8px',
                    '& .MuiListItemAvatar-root': { mr: '7px' },
                    '& .MuiListItemSecondaryAction-root': {
                      alignSelf: 'flex-start',
                      ml: 1,
                      position: 'relative',
                      right: 'auto',
                      top: 'auto',
                      transform: 'none'
                    }
                  },
                  p: 0
                }}
              >
                <ListItemButton divider>
                  <ListItemAvatar>
                    <Avatar
                      alt={row.name}
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

          {/* Botón con label dinámico según si hay 'tokens' */}
          <Button variant="contained" sx={{ textTransform: 'none', mt: 3 }} onClick={completeHandler} fullWidth>
            {buttonLabel}
          </Button>

          <OrderComplete open={complete} orderID={tokens} />
        </Stack>
      </Grid>

      {/* Modal para editar / añadir dirección */}
      <AddAddress open={open} handleClose={handleClose} address={select!} editAddress={editAddress} />
    </Grid>
  );
}
